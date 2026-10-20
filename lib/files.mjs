import {lstat, mkdir, mkdtemp, readdir, realpath, rename, rm, readFile} from 'node:fs/promises';
import path from 'node:path';

export async function exists(file) {
  try { await lstat(file); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}

export async function canonical(file) {
  const absolute = path.resolve(file);
  try { return await realpath(absolute); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const parent = path.dirname(absolute);
    if (parent === absolute) throw error;
    return path.join(await canonical(parent), path.basename(absolute));
  }
}

export function contains(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

export async function filesUnder(root) {
  const files = [];
  async function visit(directory) {
    for (const entry of await readdir(directory, {withFileTypes: true})) {
      const file = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) throw Error(`Links are not allowed in a skill payload: ${file}`);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile()) files.push(file);
      else throw Error(`Unsupported payload entry: ${file}`);
    }
  }
  await visit(root);
  return files.sort();
}

export async function sameTree(left, right) {
  const a = await filesUnder(left), b = await filesUnder(right);
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (path.relative(left, a[i]) !== path.relative(right, b[i])) return false;
    if (!(await readFile(a[i])).equals(await readFile(b[i]))) return false;
  }
  return true;
}

// Stage in a newly owned sibling directory. Callers validate destination scope.
export async function stageDirectory(destination, populate) {
  const parent = path.dirname(destination);
  await mkdir(parent, {recursive: true});
  const stage = await mkdtemp(path.join(parent, '.regis-stage-'));
  try {
    await populate(stage);
    await rename(stage, destination);
  } finally {
    await rm(stage, {recursive: true, force: true});
  }
}
