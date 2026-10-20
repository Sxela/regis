import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, rm, symlink, readdir} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {initializeProject, checkProject, projectConfiguration, validateConfiguration} from '../lib/project.mjs';

async function workspace(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'regis-project-test-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  return root;
}

test('new brief preserves source bytes and explicitly reports nonplayable status', async t => {
  const root = await workspace(t), source = path.join(root, 'source');
  await mkdir(source); await writeFile(path.join(source, 'data.bin'), Buffer.from([0, 1, 255]));
  const target = path.join(root, 'adaptation');
  const result = await initializeProject(target, {source, name: 'Example adaptation'});
  assert.equal(result.playable, false);
  assert.deepEqual(await readFile(path.join(source, 'data.bin')), Buffer.from([0, 1, 255]));
  assert.equal((await checkProject(target)).valid, true);
  const config = JSON.parse(await readFile(path.join(target, 'regis-project.json')));
  assert.equal(config.classes.length, 3);
  assert.equal(config.runtime.desktop, 'electron');
  assert.equal(config.testing.mobile.enabled, true);
  assert.deepEqual(config.stages.map(stage => stage.state), Array(7).fill('not_started'));
});

test('refuses existing destination without modifying it', async t => {
  const root = await workspace(t), target = path.join(root, 'existing');
  await mkdir(target); await writeFile(path.join(target, 'keep'), 'unchanged');
  await assert.rejects(initializeProject(target), /already exists/);
  assert.equal(await readFile(path.join(target, 'keep'), 'utf8'), 'unchanged');
  assert.deepEqual(await readdir(target), ['keep']);
});

test('refuses a project inside source or through a source directory alias', async t => {
  const root = await workspace(t), source = path.join(root, 'source');
  await mkdir(source);
  await assert.rejects(initializeProject(path.join(source, 'output'), {source}), /outside the source/);
  const alias = path.join(root, 'alias');
  await symlink(source, alias, process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(initializeProject(path.join(alias, 'output'), {source}), /outside the source/);
  assert.deepEqual(await readdir(source), []);
});

test('rejects nonexistent source before creating output', async t => {
  const root = await workspace(t);
  await assert.rejects(initializeProject(path.join(root, 'output'), {source: path.join(root, 'missing')}), /does not exist/);
  assert.deepEqual(await readdir(root), []);
});

test('class/difficulty and evidence contracts reject incomplete declarations', () => {
  const config = projectConfiguration('Synthetic example');
  config.classes[2].id = config.classes[0].id;
  config.classes[1].buildDirections = [];
  delete config.difficulties.hard;
  config.stages[0].state = 'passed';
  const errors = validateConfiguration(config);
  assert.ok(errors.some(e => /unique/.test(e)));
  assert.ok(errors.some(e => /build directions/.test(e)));
  assert.ok(errors.some(e => /hard/.test(e)));
  assert.ok(errors.some(e => /evidence/.test(e)));
});

test('mobile cannot silently become optional or lose orientation coverage', () => {
  const config = projectConfiguration('Mobile example');
  config.testing.requiredByDefault = ['unit', 'browser'];
  config.testing.mobile.enabled = false;
  config.testing.mobile.viewports = ['phone-portrait'];
  const errors = validateConfiguration(config);
  assert.ok(errors.some(e => /include mobile/.test(e)));
  assert.ok(errors.some(e => /enabled by default/.test(e)));
  assert.ok(errors.some(e => /phone-landscape/.test(e)));
  assert.ok(errors.some(e => /tablet/.test(e)));
});

test('malformed classes and unsupported schema produce validation errors', () => {
  assert.deepEqual(validateConfiguration(null), ['Configuration must be an object.']);
  const config = projectConfiguration('Example');
  config.schemaVersion = 2; config.classes = [null, {}, {}];
  assert.ok(validateConfiguration(config).length >= 3);
});

test('malformed mobile declarations fail cleanly instead of throwing or disabling coverage', () => {
  const config = projectConfiguration('Example');
  config.testing = {requiredByDefault: 42, mobile: {enabled: true, viewports: null}};
  const errors = validateConfiguration(config);
  assert.ok(errors.some(e => /include mobile/.test(e)));
  assert.ok(errors.some(e => /webkit/.test(e)));
  assert.ok(errors.some(e => /touch-movement/.test(e)));
});
