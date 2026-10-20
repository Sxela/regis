---
name: regis
description: Build a survival or survivors adaptation from supplied game files using REA evidence, three character classes, tested mechanics, source-compatible UI, difficulty tuning, promo production, and reproducible game releases. Use for end-to-end game-to-survival work or a requested phase of that adaptation; not for unrelated binary analysis or ordinary game advice.
---

# REGIS — Reverse Engineer Game Into Survival

Turn the selected game's files into a playable, recognizable survival adaptation.
Use the actual source game's identity, not a fantasy template imposed on every
game. The default stack is a **Node.js-served SPA with Electron desktop builds**
and **responsive mobile browser support tested by default**. Source adapters,
perspective, controls, numeric balance and platform details are project decisions.
Support sprites, 3D models, units, vehicles and
other protagonists where appropriate. Design **exactly three starting classes**
with distinct strengths and multiple viable builds, named and themed for the
selected source. Additional classes require a scope change.

Follow the user's requested scope: continue an existing project or phase rather
than restarting completed work. For a full project, persist through discovery,
design, implementation, playtesting, promo and release preparation. Keep a short
phase/evidence log with pending work and blockers. A scaffold, passing unit
tests or staged trailer is not a finished game.

## Establish the target and evidence

Resolve source path, edition/version, output repository, supported platforms and
available REA tools from the session. Ask only for information that prevents
meaningful progress. Keep the source installation unchanged and generated output
outside it. Record hashes, archive/member IDs and extraction parameters.

Read [source discovery](references/source-discovery.md). Use the available REA
skill and actual advertised tool schemas to inspect shipped artifacts and
recover unknown formats, resource mappings, stats and spawn behavior. Do not
invent a universal asset-scan tool or treat every archive as a native executable.
The REGIS npm package depends on REA; a standalone skill copy still needs
separately available REA tools. Installation does not register MCP, configure
providers, execute the source game, or supply every decoder.
When a provider is unavailable, retain the bounded unknown, continue supported
work and report the actual blocker. Use ordinary source tools for complete
source repositories; use REA where shipped-artifact evidence is required.

Inventory maps/terrain/collision/heights; characters and animation/equipment
layers; mobs/bosses; spells/skills/projectiles; items; VFX; sounds/music; UI/fonts;
stats/traits/resistances; region boundaries, area spawns and encounter rules.
Include present/missing/unsupported status, provenance and extraction coverage
for each family. A filename or sprite does not prove behavior or local spawns.
Keep observed facts, inferences and deliberately adapted rules separate.

## Design and iterate before expanding content

Read [mechanics](references/game-to-survivors-mechanics.md) and
[design and difficulty](references/design-and-difficulty.md). Build a source
catalog separate from the survival rules. Audit abilities, stats and affixes as
keep/adapt/exclude/defer, with a real runtime consumer and useful feedback.

Propose three class identities with starting attack, strength, weakness,
movement/escape rule, scaling, at least two build directions and their failure
cases. Compare them at equal **earned** budgets. Iterate a small complete loop:
start, move/autofight, collect, choose upgrades, boss, exit, safe improvement,
next area, death/victory and save/continue. Use this loop to judge fun, readable
counterplay, choice quality and replayability before generating a large catalog.
Record design hypotheses and what changed after play; do not claim that a design
document establishes fun.

Preserve coherent source regions and their local spawn identities. Make every
offered ability, passive and item property useful in the implemented loop.
Prefer distinct behavior and viable tradeoffs over mandatory stat inflation.

## Implement and test the actual game

Read [implementation and validation](references/implementation-and-validation.md).
Read [platform and mobile defaults](references/platform-and-mobile.md). Use the
Node.js SPA for web/mobile and Electron for native desktop platform builds unless
the user explicitly changes that stack. Select Canvas/WebGL or equivalent SPA
rendering to fit recovered assets. Keep extraction
adapters, source catalog, survival configuration, simulation, rendering, UI and
production tooling separate. Reuse the playable simulation in headless tests or
instrumented engine replays. Test formulas, targeting, status execution,
progression, transactions, collision, saves and migrations with meaningful
observable outcomes. Do not create passing placeholder mechanics or a second
toy simulator that cannot fail with the game.

Read [UI](references/nostalgic-ui-workflow.md) during interface work. Recover native
components first; generate images when existing art does not fit a needed UI
role. Use an available image-generation tool/skill, source identity references,
quiet text-safe regions and deterministic interactive text. Keep original,
adapted and generated assets labeled. Keep a readable fan-project note in menu,
README, credits and distribution instructions; do not imply endorsement.
Fit the normal upgrade choice set and every action button vertically within the
usable screen, including small mobile portrait/landscape layouts; keep text and
touch targets readable. Validate longest-content cards and orientation changes.

## Playtest, diagnose and balance

Read [playtesting](references/playtesting-and-balance-log.md) and the difficulty
contract in [design and difficulty](references/design-and-difficulty.md).

| Mode | Intended experience |
| --- | --- |
| Easy | Most runs can win with mostly stationary combat, ordinary earned upgrades and occasional required collection/objective movement. |
| Medium | Success requires movement, dodging and deliberate build planning; standing still is usually insufficient. |
| Hard | Real survival: fair but demanding movement and build choices; several attempts may be needed to understand threats and assemble a winning build. |

Measure those behaviors across all three classes, representative maps, seeds,
early/mid/late checkpoints and earned builds. Treat numeric win-rate bands as
project hypotheses, not universal claims or guaranteed human outcomes. Easy's
stationary success is intentional; do not "fix" it to match Medium. Hard must
remain winnable without hidden bonuses or compulsory grind.

Fix terrain walkability, body clearance, floors, disconnected spawns, stuck mobs,
line of sight and pathfinding **before** compensating with damage changes. Probe
doors, corners, stairs, edges, large enemies, moving targets and supported screen
shapes. Log recovery teleports and other fallbacks instead of counting them as
clean navigation. Include human sessions; if unavailable, state that validation
gap and deliver runnable review builds without claiming human-tested balance.

## Produce the promo

Read [promo creation](references/promo-video-workflow.md) and
[generation and dialogue](references/generation-and-dialogue.md). Use real game
capture for feature claims; disclose staged stats and generated inserts. Record
continuous meaningful movement where the game calls for it, source audio, edit
timings and provenance. Inspect the **source illustration** before animation:
edition, costume, anatomy, horn/limb counts, facings and props must match the
chosen identity. Fix a wrong image before spending a video generation.

For spoken inserts, define the exact words, sole/stable speakers, concrete
actions, pauses and voice delivery. Use the chosen model's supported prompt
syntax; do not copy reference-mode tags into a base mode blindly. Review the
whole clip and listen; ASR can check wording but cannot certify acting or timing.
Decode the master end to end and save poster, storyboard, edit and validation.
If generation or audio review is unavailable, preserve completed work and state
the missing deliverable rather than claiming the promo complete.

## Package the game and hand it over

Read [game delivery](references/game-delivery.md). Deliver game source, tests,
CI/build workflows, Electron platform artifacts, a mobile web build, platform-specific install/run instructions
and deterministic local asset setup from the user's supported game files.
Every final game package must ship its runnable asset-extraction script/launcher,
recipe and required adapters, with explicit source/output paths and dependency
setup. Test extraction and launch from the unpacked release, not only the repo.
Embed current screenshots from the finished game in its README: real desktop
gameplay, mobile portrait and upgrade choices, with portable image paths, alt
text and captions. Verify the images render in the delivered documentation.
Keep proprietary source/extracted content out of the public repository and
default source-only releases. Provide checks, hashes, useful failure messages
and supported-version limits; never pretend synthetic CI assets prove that a
real installation extracts correctly. The fan-project note does not grant asset
redistribution rights. Use redistributable material only where its permission
is actually established.

Separate the generated game's CI/CD from REGIS's own package CI. Prepare a
reviewable release locally; publishing, repository creation, uploads, signing
and external deployments follow the user's actual authorization. Finish with
tested commands, output locations, tested classes/difficulties/platforms,
evidence-backed limits and outstanding work.
