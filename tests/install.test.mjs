import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, rm, readdir, symlink} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {installSkill, skillDestination} from '../lib/install.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'regis-install-test-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const source = path.join(root, 'bundled'); await mkdir(source);
  await writeFile(path.join(source, 'SKILL.md'), '---\nname: regis\ndescription: Example\n---\nInstructions.\n');
  await mkdir(path.join(source, 'references'));
  await writeFile(path.join(source, 'references', 'guide.md'), 'Portable guide.\n');
  return {root, source, destination: path.join(root, 'installed', 'regis')};
}

test('client/scope routing selects separate project and user locations', () => {
  const base = path.resolve('synthetic-home');
  assert.equal(skillDestination({home: base, scope: 'user'}), path.join(base, '.codex', 'skills', 'regis'));
  assert.equal(skillDestination({project: base}), path.join(base, '.agents', 'skills', 'regis'));
  assert.equal(skillDestination({home: base, scope: 'user', client: 'claude_code'}), path.join(base, '.claude', 'skills', 'regis'));
  assert.throws(() => skillDestination({scope: 'invalid'}), /Scope/);
});

test('dry run produces no files or parent directories', async t => {
  const fixtureData = await fixture(t);
  const {root, source, destination} = fixtureData;
  const before = await readdir(root);
  const plan = await installSkill(source, {destination, dryRun: true});
  assert.equal(plan.action, 'install');
  assert.deepEqual(await readdir(root), before);
});

test('installation is self-contained and repeated installation is unchanged', async t => {
  const {source, destination} = await fixture(t);
  assert.equal((await installSkill(source, {destination})).action, 'install');
  await rm(source, {recursive: true});
  assert.equal(await readFile(path.join(destination, 'references', 'guide.md'), 'utf8'), 'Portable guide.\n');
});

test('identical install is idempotent; differing install needs explicit replace and backup', async t => {
  const {source, destination} = await fixture(t);
  await installSkill(source, {destination});
  assert.equal((await installSkill(source, {destination})).action, 'unchanged');
  await writeFile(path.join(source, 'references', 'guide.md'), 'Revised guide.\n');
  await assert.rejects(installSkill(source, {destination}), /differs/);
  const result = await installSkill(source, {destination, replace: true});
  assert.equal(result.action, 'replace');
  assert.equal(await readFile(path.join(result.backup, 'references', 'guide.md'), 'utf8'), 'Portable guide.\n');
  assert.equal(await readFile(path.join(destination, 'references', 'guide.md'), 'utf8'), 'Revised guide.\n');
});

test('replace refuses an unrelated directory and preserves its files', async t => {
  const {source, destination} = await fixture(t);
  await mkdir(destination, {recursive: true}); await writeFile(path.join(destination, 'keep'), 'valuable');
  await assert.rejects(installSkill(source, {destination, replace: true}), /not an existing REGIS/);
  assert.equal(await readFile(path.join(destination, 'keep'), 'utf8'), 'valuable');
});

test('refuses linked payloads, linked destinations and overlapping directories', async t => {
  const {root, source, destination} = await fixture(t);
  const outside = path.join(root, 'outside'); await mkdir(outside);
  await symlink(outside, path.join(source, 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(installSkill(source, {destination}), /Links are not allowed/);
  await rm(path.join(source, 'linked'));
  await mkdir(path.dirname(destination));
  await symlink(outside, destination, process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(installSkill(source, {destination, replace: true}), /linked skill destination/);
  await assert.rejects(installSkill(source, {destination: path.join(source, 'nested')}), /overlaps/);
  assert.deepEqual(await readdir(outside), []);
});
