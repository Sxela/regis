# Chat and coding harnesses

`regis skill clients` lists the catalog. `regis skill install --client ID`
installs the portable skill with dry-run, replacement backup and idempotence.
Project scope is the default. Each root below receives a `regis` subdirectory.
Personal paths start at `~`.

| Client ID | Project root | Personal root |
| --- | --- | --- |
| codex | .agents/skills | .codex/skills |
| claude_code | .claude/skills | .claude/skills |
| cursor | .cursor/skills | .cursor/skills |
| gemini_cli | .agents/skills | .agents/skills |
| windsurf | .windsurf/skills | .codeium/windsurf/skills |
| opencode | .opencode/skills | .config/opencode/skills |
| copilot_cli, vscode | .github/skills | .copilot/skills |
| antigravity | .agent/skills | .gemini/config/skills |
| qwen_code, kimi, pi, dsh | .agents/skills | .agents/skills |
| droid | .factory/skills | .factory/skills |
| qoder | .qoder/skills | .qoder/skills |
| trae | .trae/skills | .trae/skills |
| workbuddy | .workbuddy/skills | .workbuddy/skills |
| zcode | .zcode/skills | .zcode/skills |

Personal scope honors `CODEX_HOME`, `CLAUDE_CONFIG_DIR`, `OPENCODE_CONFIG_DIR`,
`COPILOT_HOME`, `QODER_CONFIG_DIR` and `DSH_AGENTS_HOME`, appending `skills/regis`.
Gemini uses `GEMINI_CLI_HOME/.agents/skills/regis`. OpenCode otherwise honors
`XDG_CONFIG_HOME/opencode/skills/regis`. Empty overrides use defaults. Leading
`~` expands to home; relative overrides resolve against the working directory.
Project scope ignores personal overrides. `--destination` chooses an exact
directory for any client, including IDs outside the catalog.

## Sources and adaptations

Client IDs and personal roots were checked against REA 6.7.0's packaged
`SupportedClients.js` on 2026-10-20 and
[REA setup documentation](https://github.com/morluto/rea/blob/main/docs/installation.md).
REGIS retains its existing Codex personal destination and selects native roots
for [Cursor](https://cursor.com/docs/skills),
[OpenCode](https://opencode.ai/docs/skills/) and
[VS Code/Copilot](https://code.visualstudio.com/docs/copilot/customization/agent-skills).
[Gemini](https://geminicli.com/docs/cli/skills/) supports shared agent roots.
Other project roots mirror client-specific skill directory conventions; these
are REGIS routing choices rather than REA's user-only setup transaction.

Windsurf targets the existing layout. Its
[documentation](https://docs.windsurf.com/windsurf/cascade/skills) now redirects
to Devin Desktop with renamed roots. For that layout, use `--destination` with
the directory your installed client discovers.

## Tested scope and unknowns

Tests install every client into temporary projects, verify references and
idempotence, and check personal/profile routing. Live skill discovery,
invocation, model compatibility, trust settings and MCP connectivity in each
harness remain unverified. Reload the client and confirm it discovers REGIS.
Hosted chat apps such as Claude Desktop and Grok Bot require separate
upload/connector flows; a local skill folder does not establish support there.

The REA npm dependency supplies its CLI and MCP implementation. It does not
register them in clients or install analysis engines. Use REA's explicit setup
for the selected client, review its plan, approve changes and reconnect.
