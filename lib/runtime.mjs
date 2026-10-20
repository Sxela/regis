import {createRequire} from 'node:module';
import {readFile, access} from 'node:fs/promises';
import path from 'node:path';

export function supportedNode(version = process.versions.node) {
  const [major, minor] = version.replace(/^v/, '').split('.').map(Number);
  return (major === 22 && minor >= 19) || (major === 24 && minor >= 11) || major >= 26;
}

export async function dependencyRea() {
  try {
    const manifest = createRequire(import.meta.url).resolve('rea-agents/package.json');
    const pkg = JSON.parse(await readFile(manifest, 'utf8'));
    const entry = path.resolve(path.dirname(manifest), pkg.bin.rea);
    await access(entry);
    return {version: pkg.version, entry};
  } catch (error) {
    return {version: null, entry: null, error: error.message};
  }
}
