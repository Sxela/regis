import {readFile, lstat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {filesUnder, contains} from '../lib/files.mjs';

export async function checkRepository(root) {
  const skill = path.join(root, 'skills', 'regis');
  const all = await filesUnder(skill);
  const entry = await readFile(path.join(skill, 'SKILL.md'), 'utf8');
  if (!/^---\r?\nname: regis\r?\ndescription: .+\r?\n---/m.test(entry)) throw Error('Missing REGIS skill frontmatter.');
  if (entry.split(/\r?\n/).length > 250) throw Error('Move detailed skill procedures to references.');
  const metadata = await readFile(path.join(skill, 'agents', 'openai.yaml'), 'utf8');
  if (!metadata.includes('$regis')) throw Error('UI metadata must invoke $regis.');
  const markdown = [...all.filter(file => file.endsWith('.md'))];
  for (const name of ['README.md', 'THIRD_PARTY_NOTICES.md']) markdown.push(path.join(root, name));
  const docs = await filesUnder(path.join(root, 'docs'));
  markdown.push(...docs.filter(file => file.endsWith('.md')));
  for (const file of markdown) {
    const content = await readFile(file, 'utf8');
    if (contains(skill, file) && /[A-Z]:[\\/]|\b(?:uo-rea|britannia|runuo)\b/i.test(content)) throw Error(`Source-project dependency in portable skill: ${file}`);
    for (const match of content.matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)) {
      let target = match[1];
      if (/^(?:https?:|mailto:|#)/.test(target)) continue;
      target = decodeURIComponent(target.split('#')[0]);
      if (!target) continue;
      const destination = path.resolve(path.dirname(file), target);
      if (!contains(contains(skill, file) ? skill : root, destination)) throw Error(`Nonportable documentation link: ${file} -> ${target}`);
      await lstat(destination).catch(() => { throw Error(`Broken documentation link: ${file} -> ${target}`); });
    }
  }
  const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  if (pkg.bin?.regis !== 'bin/regis.mjs') throw Error('CLI entrypoint mismatch.');
  if (Object.keys(pkg.dependencies ?? {}).length !== 1 || !/^\d+\.\d+\.\d+$/.test(pkg.dependencies?.['rea-agents'] ?? '')) throw Error('The reviewed runtime dependency is an exact rea-agents version only.');
  const sourceFiles = [];
  for (const folder of ['bin', 'lib', 'scripts', 'tests']) sourceFiles.push(...await filesUnder(path.join(root, folder)));
  for (const file of sourceFiles.filter(file => file.endsWith('.mjs'))) {
    const result = spawnSync(process.execPath, ['--check', file], {encoding: 'utf8'});
    if (result.status !== 0) throw Error(result.stderr || `Syntax check failed: ${file}`);
  }
  return {skillFiles: all.length, markdownFiles: markdown.length, syntaxFiles: sourceFiles.filter(file => file.endsWith('.mjs')).length};
}

const invoked = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (invoked) {
  const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  try { console.log(JSON.stringify(await checkRepository(root), null, 2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
