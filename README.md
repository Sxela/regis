# REGIS

**Reverse Engineer Game Into Survival.** A game-agnostic agent skill that takes
supplied game files through REA discovery, three-class survival design,
implementation and tests, source-compatible UI, playtesting/balance, promo
production and reproducible game releases.

The default game stack is a **Node.js SPA + Electron desktop wrapper**, with
**responsive mobile web support and mobile tests enabled by default**. Source
format, visual style, perspective, renderer and mechanics remain game-specific.
The same process can adapt sprites, models, units, vehicles and other protagonists.

REGIS is an instruction/toolkit package. An agent executes the workflow using
REA, coding, browser/testing and image/video tools as available. The CLI installs
the skill and creates/checks a project brief; it does not automatically decode
every game or produce a finished game from a single command.

## Install from this checkout

Prerequisite: Node.js 22.19+, 24.11+, or 26+. REGIS depends on pinned
`rea-agents`; `npm ci` installs REA and its dependencies. Analysis engines,
image/video models, game dependencies and test browsers remain separate.

```sh
npm ci
npm run verify
node bin/regis.mjs doctor --json
```

Install the skill into the current game's repository, or choose user scope:

```sh
node bin/regis.mjs skill install --client codex --scope project --project /path/to/game-project --dry-run
node bin/regis.mjs skill install --client codex --scope project --project /path/to/game-project
node bin/regis.mjs skill install --client codex --scope user
```

Run `node bin/regis.mjs skill clients` to list all 18 supported harnesses,
including Cursor, Gemini CLI, Windsurf, OpenCode, Copilot CLI and VS Code.
For example, use `skill install --client cursor --scope project --dry-run`.
See [harness destinations and scope](docs/harnesses.md) for paths and overrides.
Codex project scope uses `.agents/skills/regis`; user scope retains
`~/.codex/skills/regis`. For another skill-capable agent, use
`--destination /its/skill-directory/regis`, or copy the folder returned by
`node bin/regis.mjs skill path`. Client discovery/reload behavior is client-specific.

Installations are idempotent for identical files. A differing installed skill
requires `--replace`, which preserves a sibling backup. Review the plan using
`--dry-run --replace`. The installer refuses unrelated directories, linked
payloads and overlap with its own bundled skill. It does not register MCP or
modify unrelated client settings.

## Use REGIS

Invoke the installed skill in your agent:

```text
Use $regis with the game files at <source path> and build the adaptation in
<new project path>. Use the Node.js SPA/Electron stack with mobile support and
default mobile tests. Complete all three classes, balance modes, promo and
reproducible source-file setup/build instructions.
```

Supply the exact game edition and supported target devices when known. The
agent starts with an inventory and evidence ledger rather than substituting a
generic game's assets. It retains original facts separately from adaptations.

An optional project brief helps track the work:

```sh
node bin/regis.mjs init /path/to/new-project --source /path/to/installed-game --name "My survival adaptation"
node bin/regis.mjs check /path/to/new-project
```

Use a new output directory outside the source installation. `init` writes a
configuration, fan note and design/asset/mobile briefs. Its three roles are
candidate archetypes to be themed and iterated, not implemented classes. `check`
validates the configuration contract; it does not certify playable mechanics,
asset decoding, balance, mobile behavior or a release.

`doctor` is read-only and reports local Node/skill/REA CLI visibility. It cannot
observe your agent's active MCP session. A missing CLI does not prove that REA
MCP tools are absent. `--strict` additionally requires the installed REA
dependency or a `rea` executable on PATH. The dependency entry and version
are reported separately from PATH visibility. Diagnostics never launch REA.

To connect MCP tools, explicitly review a plan for your harness:

```sh
npm exec -- rea setup --client cursor --dry-run --json
```

After reviewing it, run `npm exec -- rea setup --client cursor`, follow REA's
approval flow, then restart the harness. This separate operation can install
REA's matching skill and modify client-wide MCP configuration.

## What the skill delivers

1. REA-backed inventory and extraction recipes for maps/collision/heights,
   actors/mobs/bosses, abilities, items, VFX, sounds/music, UI/fonts, stats/traits
   and region spawns; explicit coverage and unknowns.
2. An iterated survival loop with exactly three distinct source-themed classes,
   useful upgrades and multiple earned build paths.
3. Implemented mechanics and behavior tests using the actual simulation;
   source-compatible UI, with generated images for genuine gaps.
4. Easy (mostly stationary combat can win), Medium (movement/build planning)
   and Hard (demanding fair survival with learning), verified within a reported
   test scope. Walkability, stuck mobs and pathfinding are correctness checks.
5. Default mobile browser tests for touch, portrait/landscape/tablet, menus,
   progression, orientation, audio, saves and performance, plus device sessions
   where available. Electron is for desktop; phones receive the web build.
6. A promo using real gameplay, with staged/generated material labeled,
   explicit voice/action scripts where used, and image/anatomy/audio validation.
7. Game CI/build/release preparation, Electron platform artifacts and mobile web
   build, install/run docs, deterministic setup from supported game files and
   a readable fan-project note.

Tools, source versions or device access can limit a phase. The skill requires
honest remaining-work reports rather than fabricated extraction, playtests,
speech reviews or platform certification. Private game resources are not
bundled into the REGIS package or default public game releases.

## Package REGIS

```sh
npm run build
npm pack
npm run test:package
```

`build` produces `dist/skills/regis` and a SHA-256 manifest. `npm pack` creates a
versioned `regis-agents` tarball containing the CLI and portable skill. A local
tarball can be installed with `npm install /path/to/regis-agents-0.1.0.tgz`, then
invoked with `npm exec -- regis --help`. No registry publication is needed for
local use. Registry commands using the package name become valid only after a
successful publication; version 0.1.0 is prepared locally, not claimed published.

The repository has [CI and release preparation](docs/ci-cd.md),
[architecture and development notes](docs/development.md),
[workflow acceptance criteria](docs/acceptance.md),
[REA packaging comparison](docs/rea-packaging.md) and
[guide provenance](docs/provenance.md).

## License and attribution

REGIS code and original documentation use the [MIT license](LICENSE).
See [third-party notices](THIRD_PARTY_NOTICES.md). REA is a separate dependency;
installing REGIS does not install its providers. A fan-project note does not
grant permission to redistribute source-game resources.
