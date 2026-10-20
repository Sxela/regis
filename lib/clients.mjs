import path from 'node:path';
import os from 'node:os';

// Skill destinations only. MCP registrations belong to REA's explicit setup.
export const clients = Object.freeze({
  codex: {project: '.agents/skills', user: '.codex/skills', override: 'CODEX_HOME'},
  claude_code: {project: '.claude/skills', user: '.claude/skills', override: 'CLAUDE_CONFIG_DIR'},
  cursor: {project: '.cursor/skills', user: '.cursor/skills'},
  gemini_cli: {project: '.agents/skills', user: '.agents/skills', homeOverride: 'GEMINI_CLI_HOME'},
  windsurf: {project: '.windsurf/skills', user: '.codeium/windsurf/skills'},
  opencode: {project: '.opencode/skills', user: '.config/opencode/skills', override: 'OPENCODE_CONFIG_DIR', xdg: true},
  copilot_cli: {project: '.github/skills', user: '.copilot/skills', override: 'COPILOT_HOME'},
  vscode: {project: '.github/skills', user: '.copilot/skills'},
  antigravity: {project: '.agent/skills', user: '.gemini/config/skills'},
  qwen_code: {project: '.agents/skills', user: '.agents/skills'},
  kimi: {project: '.agents/skills', user: '.agents/skills'},
  pi: {project: '.agents/skills', user: '.agents/skills'},
  droid: {project: '.factory/skills', user: '.factory/skills'},
  qoder: {project: '.qoder/skills', user: '.qoder/skills', override: 'QODER_CONFIG_DIR'},
  trae: {project: '.trae/skills', user: '.trae/skills'},
  workbuddy: {project: '.workbuddy/skills', user: '.workbuddy/skills'},
  zcode: {project: '.zcode/skills', user: '.zcode/skills'},
  dsh: {project: '.agents/skills', user: '.agents/skills', override: 'DSH_AGENTS_HOME'}
});

function expand(value, home) {
  return value === '~' ? home : /^~[/\\]/.test(value) ? path.resolve(home, value.slice(2)) : path.resolve(value);
}

export function skillDestination({client = 'codex', scope = 'project', project = process.cwd(), destination, home = os.homedir(), env = process.env} = {}) {
  if (!['project', 'user'].includes(scope)) throw Error('Scope must be project or user.');
  // Explicit paths also support clients outside the catalog.
  if (destination) return path.resolve(destination);
  if (!Object.hasOwn(clients, client)) throw Error(`Supported clients: ${Object.keys(clients).join(', ')}. Use --destination for another client.`);
  const config = clients[client];
  if (scope === 'project') return path.resolve(project, config.project, 'regis');
  if (config.override && env[config.override]?.trim()) return path.resolve(expand(env[config.override], home), 'skills', 'regis');
  if (config.homeOverride && env[config.homeOverride]?.trim()) home = expand(env[config.homeOverride], home);
  if (config.xdg && env.XDG_CONFIG_HOME) return path.resolve(expand(env.XDG_CONFIG_HOME, home), 'opencode', 'skills', 'regis');
  return path.resolve(home, config.user, 'regis');
}
