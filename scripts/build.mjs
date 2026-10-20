import {cp, lstat, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {checkRepository} from './check.mjs';
import {exists, filesUnder} from '../lib/files.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
await checkRepository(root);
const dist = path.join(root, 'dist');
if (await exists(dist)) {
  if ((await lstat(dist)).isSymbolicLink()) throw Error('Refusing to clean linked dist directory.');
  await rm(dist, {recursive: true});
}
await mkdir(path.join(dist, 'skills'), {recursive: true});
await cp(path.join(root, 'skills', 'regis'), path.join(dist, 'skills', 'regis'), {recursive: true});
const entries = [];
for (const file of await filesUnder(path.join(dist, 'skills'))) {
  const bytes = await readFile(file);
  entries.push({path: path.relative(dist, file).split(path.sep).join('/'), bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex')});
}
await writeFile(path.join(dist, 'manifest.json'), JSON.stringify({version: JSON.parse(await readFile(path.join(root, 'package.json'))).version, files: entries}, null, 2) + '\n');
console.log(`Built portable skill: ${path.join(dist, 'skills', 'regis')}`);
