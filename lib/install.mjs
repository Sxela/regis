import {cp, lstat, mkdir, mkdtemp, readFile, rename, rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {canonical, contains, exists, filesUnder, sameTree} from './files.mjs';

export function skillDestination({client = 'codex', scope = 'project', project = process.cwd(), destination, home = os.homedir()} = {}) {
  if (!['codex', 'claude_code'].includes(client)) throw Error('Supported clients: codex, claude_code. Use --destination for another client.');
  if (!['project', 'user'].includes(scope)) throw Error('Scope must be project or user.');
  if (destination) return path.resolve(destination);
  const base = scope === 'project' ? project : home;
  const config = client === 'claude_code' ? '.claude' : scope === 'project' ? '.agents' : '.codex';
  return path.resolve(base, config, 'skills', 'regis');
}

export async function installSkill(source, options = {}) {
  const original = path.resolve(source);
  const requested = skillDestination(options);
  if (await exists(requested) && (await lstat(requested)).isSymbolicLink()) throw Error('Refusing to replace a linked skill destination.');
  const from = await canonical(original), to = await canonical(requested);
  if (contains(from, to) || contains(to, from)) throw Error('Install destination overlaps the bundled skill.');
  await filesUnder(from);
  let previous = false;
  if (await exists(to)) {
    if (!(await lstat(to)).isDirectory()) throw Error('Install destination is not a directory.');
    if (await sameTree(from, to)) return {destination: to, action: 'unchanged', dryRun: Boolean(options.dryRun)};
    if (!options.replace) throw Error('Skill differs from installed copy. Review --dry-run --replace, then use --replace to preserve a backup and update.');
    const entry = path.join(to, 'SKILL.md');
    if (!(await exists(entry)) || !/^name:\s*regis\s*$/m.test(await readFile(entry, 'utf8'))) throw Error('Refusing to replace a directory that is not an existing REGIS skill.');
    previous = true;
  }
  const backup = previous ? `${to}.backup-${Date.now()}-${process.pid}` : null;
  const plan = {destination: to, action: previous ? 'replace' : 'install', backup, dryRun: Boolean(options.dryRun)};
  if (options.dryRun) return plan;
  await mkdir(path.dirname(to), {recursive: true});
  const stage = await mkdtemp(path.join(path.dirname(to), '.regis-install-'));
  const payload = path.join(stage, 'payload');
  let movedPrevious = false;
  try {
    await cp(from, payload, {recursive: true, force: false, errorOnExist: true});
    if (previous) { await rename(to, backup); movedPrevious = true; }
    else if (await exists(to)) throw Error('Destination appeared during installation; no files replaced.');
    await rename(payload, to);
  } catch (error) {
    if (movedPrevious && !(await exists(to))) await rename(backup, to);
    throw error;
  } finally {
    await rm(stage, {recursive: true, force: true});
  }
  return plan;
}
