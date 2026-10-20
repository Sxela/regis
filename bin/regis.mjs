#!/usr/bin/env node
import {readFile, access} from 'node:fs/promises';
import {constants} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {installSkill} from '../lib/install.mjs';
import {initializeProject, checkProject} from '../lib/project.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skill = path.join(root, 'skills', 'regis');
const usage = `REGIS — Reverse Engineer Game Into Survival

regis --version
regis doctor [--json] [--strict]
regis skill path
regis skill install [--client codex|claude_code] [--scope project|user]
                    [--project PATH] [--destination PATH] [--dry-run] [--replace]
regis init NEW_DIRECTORY [--source GAME_PATH] [--name NAME]
regis check PROJECT_DIRECTORY

The bundled $regis agent skill performs the game workflow with separately
available REA tools. init creates a project brief, not a playable game.
No command registers MCP, installs REA, executes game files or publishes.
`;

function options(args, accepted, booleans = []) {
  const values = {}, positionals = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith('--')) { positionals.push(arg); continue; }
    const key = arg.slice(2);
    if (!accepted.includes(key)) throw Error(`Unknown option: ${arg}`);
    if (Object.hasOwn(values, key)) throw Error(`Duplicate option: ${arg}`);
    if (booleans.includes(key)) values[key] = true;
    else {
      if (!args[i + 1] || args[i + 1].startsWith('--')) throw Error(`Missing value for ${arg}`);
      values[key] = args[++i];
    }
  }
  return {values, positionals};
}

async function findRea() {
  const suffixes = process.platform === 'win32' ? (process.env.PATHEXT || '.EXE;.CMD;.BAT').split(';') : [''];
  for (const directory of (process.env.PATH || '').split(path.delimiter).filter(Boolean)) {
    for (const suffix of suffixes) {
      const candidate = path.join(directory.replace(/^"|"$/g, ''), 'rea' + suffix.toLowerCase());
      try { await access(candidate, process.platform === 'win32' ? constants.F_OK : constants.X_OK); return candidate; }
      catch { /* Search only. No process launch or package acquisition. */ }
    }
  }
  return null;
}

async function main(args) {
  const [command, ...rest] = args;
  if (!command || command === '--help' || command === 'help') { console.log(usage); return; }
  if (command === '--version') {
    if (rest.length) throw Error('--version takes no arguments.');
    console.log(JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8')).version); return;
  }
  if (command === 'doctor') {
    const {values, positionals} = options(rest, ['json', 'strict'], ['json', 'strict']);
    if (positionals.length) throw Error('doctor takes no positional arguments.');
    const rea = await findRea();
    await access(path.join(skill, 'SKILL.md'));
    const report = {node: process.version, supportedNode: Number(process.versions.node.split('.')[0]) >= 22, skill, reaCli: rea, reaMcpSession: 'unknown: inspect the active agent tool list', changes: [], note: 'No tools were installed or launched. CLI absence does not prove MCP absence.'};
    console.log(values.json ? JSON.stringify(report, null, 2) : `Node: ${report.node}\nSkill: ${skill}\nREA CLI: ${rea || 'not found'}\n${report.reaMcpSession}\n${report.note}`);
    if (!report.supportedNode || (values.strict && !rea)) process.exitCode = 1;
    return;
  }
  if (command === 'skill') {
    if (rest[0] === 'path' && rest.length === 1) { console.log(skill); return; }
    if (rest[0] !== 'install') throw Error('Use skill path or skill install.');
    const {values, positionals} = options(rest.slice(1), ['client', 'scope', 'project', 'destination', 'dry-run', 'replace'], ['dry-run', 'replace']);
    if (positionals.length) throw Error('skill install takes named options only.');
    console.log(JSON.stringify(await installSkill(skill, {...values, dryRun: values['dry-run']}), null, 2)); return;
  }
  if (command === 'init') {
    const {values, positionals} = options(rest, ['source', 'name']);
    if (positionals.length !== 1) throw Error('init requires one new project directory.');
    console.log(JSON.stringify(await initializeProject(positionals[0], values), null, 2)); return;
  }
  if (command === 'check') {
    if (rest.length !== 1 || rest[0].startsWith('--')) throw Error('check requires one project directory.');
    const report = await checkProject(rest[0]);
    console.log(JSON.stringify(report, null, 2));
    if (!report.valid) process.exitCode = 1;
    return;
  }
  throw Error(`Unknown command: ${command}. Use --help.`);
}

try { await main(process.argv.slice(2)); }
catch (error) { console.error(`regis: ${error.message}`); process.exitCode = 1; }
