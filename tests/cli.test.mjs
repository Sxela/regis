import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, rm, readdir} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const cli = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../bin/regis.mjs');
function run(args, cwd) { return spawnSync(process.execPath, [cli, ...args], {cwd, encoding: 'utf8'}); }

test('read-only doctor works without installing or launching providers', async t => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'regis-doctor-test-'));
  t.after(() => rm(temp, {recursive: true, force: true}));
  const result = run(['doctor', '--json'], temp);
  assert.equal(result.status, 0, result.stderr);
  const data = JSON.parse(result.stdout);
  assert.equal(data.supportedNode, true);
  assert.deepEqual(data.changes, []);
  assert.match(data.reaMcpSession, /unknown/);
  assert.deepEqual(await readdir(temp), []);
});

test('CLI rejects unknown/duplicate/missing options before any installation', () => {
  for (const args of [
    ['skill', 'install', '--unknown'], ['skill', 'install', '--scope'],
    ['skill', 'install', '--scope', 'user', '--scope', 'project'],
    ['init'], ['check'], ['not-a-command']
  ]) {
    const result = run(args);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /regis:/);
  }
});

test('CLI lists clients and previews a Cursor install without writing', async t => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'regis-clients-test-'));
  t.after(() => rm(temp, {recursive: true, force: true}));
  const listed = run(['skill', 'clients'], temp);
  assert.equal(listed.status, 0, listed.stderr);
  assert.ok(JSON.parse(listed.stdout).cursor);
  const result = run(['skill', 'install', '--client', 'cursor', '--project', temp, '--dry-run'], temp);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).destination, path.join(temp, '.cursor', 'skills', 'regis'));
  assert.deepEqual(await readdir(temp), []);
});

test('packaged entrypoint can initialize and check a mobile-default project', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'regis-cli-test-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const project = path.join(root, 'project with spaces');
  const result = run(['init', project, '--name', 'A test adaptation'], root);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).playable, false);
  const checked = run(['check', project], root);
  assert.equal(checked.status, 0, checked.stderr);
  assert.equal(JSON.parse(checked.stdout).valid, true);
});
