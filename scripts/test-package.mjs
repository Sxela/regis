import {mkdtemp, readFile, rm, readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const temp = await mkdtemp(path.join(os.tmpdir(), 'regis-package-'));
const npmCli = process.env.npm_execpath || path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, {cwd, encoding: 'utf8', env: process.env});
  if (result.status !== 0) throw Error(`${args.join(' ')}\n${result.stderr}\n${result.stdout}`);
  return result.stdout;
}
try {
  run(process.execPath, [npmCli, 'pack', '--ignore-scripts', '--pack-destination', temp, '--json']);
  const archive = (await readdir(temp)).find(name => name.endsWith('.tgz'));
  if (!archive) throw Error('npm did not create a package.');
  const installed = path.join(temp, 'installed');
  run(process.execPath, [npmCli, 'install', '--prefix', installed, path.join(temp, archive), '--ignore-scripts', '--offline', '--no-audit', '--no-fund']);
  const packageRoot = path.join(installed, 'node_modules', 'regis-agents');
  const cli = path.join(packageRoot, 'bin', 'regis.mjs');
  const doctor = JSON.parse(run(process.execPath, [cli, 'doctor', '--strict', '--json'], temp));
  if (!doctor.supportedNode || doctor.changes.length) throw Error('Packaged doctor unexpectedly failed or mutated configuration.');
  const manifest = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));
  if (doctor.reaDependency.version !== manifest.dependencies['rea-agents'] || !doctor.reaDependency.entry) throw Error('Packaged REA dependency is missing or mismatched.');
  run(process.execPath, [cli, 'skill', 'install', '--destination', path.join(temp, 'skill', 'regis')], temp);
  const source = path.join(packageRoot, 'skills', 'regis');
  const skill = await readFile(path.join(source, 'SKILL.md'), 'utf8');
  if (!skill.includes('references/platform-and-mobile.md')) throw Error('Packaged skill lost mobile guidance.');
  for (const match of skill.matchAll(/\]\((references\/[^)#]+)(?:#[^)]*)?\)/g)) await readFile(path.join(source, match[1]));
  run(process.execPath, [cli, 'init', path.join(temp, 'game')], temp);
  const report = JSON.parse(run(process.execPath, [cli, 'check', path.join(temp, 'game')], temp));
  if (!report.valid) throw Error('Packaged project brief failed its contract.');
  console.log('npm tarball installed offline; REA dependency, CLI, portable references, skill installation and mobile-default brief verified.');
} finally { await rm(temp, {recursive: true, force: true}); }
