import test from 'node:test';
import assert from 'node:assert/strict';
import {supportedNode, dependencyRea} from '../lib/runtime.mjs';
import {readFile} from 'node:fs/promises';

test('Node compatibility matches REA release engine boundaries', () => {
  for (const version of ['22.19.0', '22.20.0', '24.11.0', '24.20.0', '26.0.0', '27.0.0']) assert.equal(supportedNode(version), true, version);
  for (const version of ['20.20.0', '22.18.0', '23.0.0', '24.10.0', '25.0.0']) assert.equal(supportedNode(version), false, version);
});

test('REA dependency resolves without launching it or relying on PATH', async () => {
  const result = await dependencyRea();
  const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(result.version, manifest.dependencies['rea-agents']);
  assert.match(await readFile(result.entry, 'utf8'), /node/);
});
