# Architecture and development

The package contains a CLI and an installed instruction skill. The agent performs
the end-to-end game work; there is no fake converter service or MCP server.

| Location | Responsibility |
| --- | --- |
| skills/regis/SKILL.md | Entry workflow and phase completion criteria. |
| skills/regis/references | Portable production guides and focused REA/design/mobile/delivery procedures. |
| skills/regis/agents/openai.yaml | Display metadata and normal skill discovery. |
| bin/regis.mjs | CLI argument handling and read-only diagnostics. |
| lib/install.mjs | Scoped install, dry run, idempotence, backup and rollback. |
| lib/project.mjs | Candidate project brief and configuration contract. |
| scripts | Documentation/syntax checks, portable build, isolated npm-package smoke. |
| tests | Source preservation, path safety, installation/update, CLI and mobile-default contract tests. |

## Commands

`npm ci` installs from the lockfile. `npm run check` checks skill structure,
internal documentation links, portable references and JavaScript syntax.
`npm test` exercises behavior using synthetic files and temporary directories.
`npm run build` emits the portable skill and a content-hash manifest.
`npm run test:package` packs the allowlisted npm payload, installs it offline
into a temporary directory and exercises the packaged CLI/skill/project brief.
`npm run verify` runs all four. Node.js 22+ is required; the current package has
no npm runtime or development dependencies.

The bundled skill can additionally be checked with a Codex skill-creator
`quick_validate.py` when available. That external validator is not required for
the package's own CI. It cannot establish that the instructions yield a good game.

## Changing the workflow

Update one canonical reference for each substantial procedure and link it from
the entrypoint. Keep the four supplied guides readable independently. The CLI
project contract enforces three classes, all difficulty contracts and default
mobile coverage; explicitly requested future stack changes require adjusting
that versioned contract and its validation, not quietly disabling checks.

The starter is deliberately labeled nonplayable with all phases not_started.
Evidence references are structural declarations, not verified proof; `check`
must never be marketed as gameplay or release certification.

## Tests that require another environment

This repository tests CLI/package behavior, not a specific game's mechanics.
Actual gameplay, browser/touch and device tests belong to the generated game.
The default game test command includes mobile alongside unit/browser suites;
see [the mobile reference](../skills/regis/references/platform-and-mobile.md).
REA provider integration requires a real selected artifact and installed tools;
image/video generation needs the chosen model/service. Report missing integration
coverage instead of adding tests that always pass or silently skip required work.
