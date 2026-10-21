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

For a fresh project initialized below, open its folder and invoke the installed
skill in a new agent chat. This example selects desktop and mobile with mouse/
touch as primary controls; change those preferences to match your project:

```text
Use $regis to build a survival adaptation from the source installation
recorded in regis-project.json.

Work in this folder. Start from the original game files; do not reuse
previous generated games or converted assets. Keep the source installation
unchanged and record any reused source-format knowledge.

Target desktop and mobile with the Node.js SPA/Electron stack and default
mobile tests. Mouse point-and-click and touch are primary; WASD and keyboard
shortcuts can be optional.

Establish the content scope and quality target before implementation.
A smaller selection of maps, spells or items must still have complete
asset lifecycles, gameplay, progression, UI and save behavior. Preserve
original names, native presentation and source-supported equipment views;
record deliberate adaptations and missing resources.

Follow SKILL.md and its references through implementation, earned playtests,
walkability/performance checks, gameplay promo, documentation and reproducible
packaging for the agreed scope. Keep acceptance evidence current after changes.
Include README feature one-liners with short pitches and actual screenshots.
Fix supported failures before handoff; report unavailable human/device/tool
checks explicitly rather than claiming they passed.
```

Without a project brief, supply the exact source path and new output path in the
prompt instead. For continuation or repair, replace the fresh-start restriction
with your actual reuse policy and requested changes; preserve completed work.

Supply the exact game edition and supported target devices when known. The
agent starts with an inventory and evidence ledger rather than substituting a
generic game's assets. It retains original facts separately from adaptations.

The workflow first records a source/benchmark quality target, then reviews a
representative playable slice before expanding it. It separately checks source
coverage, animation/visual fidelity, useful builds, every class/difficulty and
actual platform launches. Passing browser tests does not certify those qualities.
See [quality targets](skills/regis/references/quality-and-scope.md).

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

`init` also creates `docs/quality-target.md` for the requested scope, reference
screens, source coverage and review findings. It starts unreviewed; populate it
from the actual source and user-supplied benchmark rather than accepting a tiny
demo as the target. The [trial findings](docs/trial-findings.md) explain the
observed gaps behind this workflow revision.

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

These are agent workflow requirements, applied to the selected source and scope.
They are not game systems implemented automatically by the installer or CLI.

**Source discovery — build from the game's identity, with evidence for each mapping.**

REGIS uses REA and format-aware adapters to connect maps, actors, spells, items,
UI and audio to their source files and behavior. An immutable source catalog,
reproducible extraction recipes and explicit unknowns keep recovered facts
separate from survival adaptations.

**Complete depth at any content scope — fewer maps or spells still make a complete game.**

Choose a small catalog or a broad adaptation without accepting half-working
systems. The workflow checks every included feature through its assets, gameplay,
progression, feedback and saves, then reviews the requested product against a
concrete quality target rather than treating a passing demo as completion.

**Distinct classes and useful builds — give every run meaningful decisions.**

Three source-themed starting classes are the default, each with distinct strengths
and multiple earned build paths. Ability and stat audits remove dead choices;
Easy, Medium and Hard have explicit behavior contracts, with reward economies
and mature builds tested alongside combat rather than tuned in isolation.

**Complete asset lifecycles — reproduce more than icons and walking sprites.**

Included spells retain original names and matching cast, projectile, splash,
lingering-effect and sound resources where applicable. Characters receive their
native actions, death/corpse stages and audio; each role is traced to an actual
runtime event and verified, with missing resources and adaptations recorded.

**Native UI and worn equipment — preserve the screens and silhouettes players recognize.**

Reuse original paperdolls, inventory containers, shops, fonts, slots and controls
where available, with generated artwork reserved for genuine gaps. When the
source displays worn gear, equipped items update the corresponding paperdoll and
world appearance across movement, attacks and saves, rather than only their stats.

**Practical item handling — compare, equip and clear inferior loot without losing tradeoffs.**

The equipment workflow covers side-by-side comparison, drag/drop, double-click
equip, selectable autoequip and explicit selling. Iterative autosell compares
compatible same-slot candidates using shared rules, preserving non-dominated
choices, protected items, useful ability grants and companion equipment.

**One source-supported companion — bring a useful ally and their personality into the run.**

Games with parties or mercenaries can offer one optional recruit with earned
leveling, combat support and persistent state. Original conversation, remarks
and voice cues are reused where supplied; ally-dependent skills are reassessed
without making the companion compulsory for a viable solo route.

**Desktop and mobile controls — choose inputs for the player and test them in the real game.**

REGIS resolves target platforms and preferred controls before committing to the
layout. The default Node.js SPA supports desktop web, Electron and responsive
mobile web, with touch interactions, appropriate prompts, portrait/landscape
layouts and mobile browser tests included by default.

**Playtests that catch regressions — measure navigation, performance and earned progression.**

Tests exercise the actual game rules, rendered combat, required walking routes
and difficult UI states. Reports separate controller capability, earned winning
paths and sampled win rates; frame distributions, worst stalls and stuck actors
remain visible. Acceptance evidence becomes stale when relevant inputs change,
and reported defects become targeted regressions.

**Gameplay-led promos — show real features and verify the exported result.**

Promo production connects a storyboard and feature claims to actual gameplay
shots, with staged footage and generated inserts labeled. Source-image identity,
dialogue, motion, audio and the final encoded master receive separate checks;
an attractive poster or silent raw capture cannot stand in for a finished promo.

**Reproducible delivery — prove the player's setup works beyond the development checkout.**

Ship the extractor, declared prerequisites, build/run instructions and selected
platform artifacts, then test fresh extraction and launch without hidden cache
or developer-file fallbacks. The game README explains important features with
one-line benefits and short pitches, alongside current screenshots and setup
instructions. Private source resources stay outside default public packages.

**Portable harness installation — carry the same workflow into your chosen agent.**

The CLI previews and installs a self-contained skill into supported project or
user destinations, preserves replacement backups and checks project briefs.
Read-only diagnostics distinguish local dependency visibility from an active
MCP connection; installing the skill does not silently configure providers or
publish a game.

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
