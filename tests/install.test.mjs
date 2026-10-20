import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, rm, readdir, symlink} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {installSkill, skillDestination} from '../lib/install.mjs';
import {clients} from '../lib/clients.mjs';

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
  assert.equal(skillDestination({home: base, scope: 'user', env: {}}), path.join(base, '.codex', 'skills', 'regis'));
  assert.equal(skillDestination({project: base}), path.join(base, '.agents', 'skills', 'regis'));
  assert.equal(skillDestination({home: base, scope: 'user', client: 'claude_code', env: {}}), path.join(base, '.claude', 'skills', 'regis'));
  assert.throws(() => skillDestination({scope: 'invalid'}), /Scope/);
});

test('popular harnesses route to their documented project and personal roots', () => {
  const base = path.resolve('synthetic-home');
  const expected = {
    cursor: ['.cursor/skills', '.cursor/skills'],
    gemini_cli: ['.agents/skills', '.agents/skills'],
    windsurf: ['.windsurf/skills', '.codeium/windsurf/skills'],
    opencode: ['.opencode/skills', '.config/opencode/skills'],
    copilot_cli: ['.github/skills', '.copilot/skills'],
    vscode: ['.github/skills', '.copilot/skills'],
    antigravity: ['.agent/skills', '.gemini/config/skills'],
    qwen_code: ['.agents/skills', '.agents/skills'],
    kimi: ['.agents/skills', '.agents/skills'],
    pi: ['.agents/skills', '.agents/skills'],
    droid: ['.factory/skills', '.factory/skills'],
    qoder: ['.qoder/skills', '.qoder/skills'],
    trae: ['.trae/skills', '.trae/skills'],
    workbuddy: ['.workbuddy/skills', '.workbuddy/skills'],
    zcode: ['.zcode/skills', '.zcode/skills'],
    dsh: ['.agents/skills', '.agents/skills']
  };
  for (const [client, roots] of Object.entries(expected)) {
    for (const [index, scope] of ['project', 'user'].entries()) {
      assert.equal(skillDestination({client, scope, home: base, project: base, env: {}}), path.resolve(base, roots[index], 'regis'), `${client}/${scope}`);
    }
  }
});

test('profile overrides affect user scope only and explicit destinations support other clients', () => {
  const home = path.resolve('synthetic-home'), profile = path.join(home, 'profile');
  for (const [client, key] of [['codex', 'CODEX_HOME'], ['claude_code', 'CLAUDE_CONFIG_DIR'], ['opencode', 'OPENCODE_CONFIG_DIR'], ['copilot_cli', 'COPILOT_HOME'], ['qoder', 'QODER_CONFIG_DIR'], ['dsh', 'DSH_AGENTS_HOME']]) {
    const env = {[key]: '~/profile'};
    assert.equal(skillDestination({client, scope: 'user', home, env}), path.join(profile, 'skills', 'regis'));
    assert.equal(skillDestination({client, project: home, home, env}), skillDestination({client, project: home, home, env: {}}));
  }
  assert.equal(skillDestination({client: 'gemini_cli', scope: 'user', home, env: {GEMINI_CLI_HOME: profile}}), path.join(profile, '.agents', 'skills', 'regis'));
  assert.equal(skillDestination({client: 'opencode', scope: 'user', home, env: {XDG_CONFIG_HOME: profile}}), path.join(profile, 'opencode', 'skills', 'regis'));
  assert.equal(skillDestination({client: 'another-agent', destination: profile}), profile);
  assert.throws(() => skillDestination({client: 'another-agent'}), /Supported clients/);
  assert.throws(() => skillDestination({client: 'toString'}), /Supported clients/);
});

test('every catalog client installs portable references in an isolated project', async t => {
  const {root, source} = await fixture(t);
  for (const client of Object.keys(clients)) {
    const project = path.join(root, client);
    const plan = await installSkill(source, {client, project});
    assert.equal(await readFile(path.join(plan.destination, 'references', 'guide.md'), 'utf8'), 'Portable guide.\n');
    assert.equal((await installSkill(source, {client, project})).action, 'unchanged');
    assert.deepEqual(await readdir(project), [clients[client].project.split('/')[0]]);
  }
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
