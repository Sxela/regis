# REGIS release history

These retrospective milestones describe the changes at their original commits.
GitHub publication dates reflect when the releases were created, not when the
features were implemented. Dated `milestone-*` tags identify repository snapshots;
the npm package version remains `0.1.0`. Workflow requirements describe work an
agent must perform, not game systems automatically implemented by the CLI.

## 2026-11-01 — Runner modules and shared art production

[GitHub release](https://github.com/Sxela/regis/releases/tag/milestone-2026-11-01-runner-and-art)

REGIS expands from a survival-only entrypoint into a shared adaptation toolkit with bundled survival and forward-runner genre modules.

### Genre and project tooling

- Add `regis init --genre survival|runner`; existing and unspecified projects retain the survival default.
- Runner briefs cover candidate roles, lane/action rules, fairness, source-mechanic adaptations, equipment safeguards and end-of-round policy.
- Add runner design, implementation, track-generation, fairness and novice/average/expert playtest references.
- Require mobile swipe and combined-action checks where those controls apply.

### Shared production workflows

- Dedicated visual-style and renderer selection, sprite/atlas production, 3D asset benchmarks and equipment-comparison guidance.
- Localization workflow covering game text, layout and release presentation.
- Stronger streaming/loading, runtime performance, native UI and promo-production guidance.
- Tool and skill selection guidance without requiring a sibling Runner checkout.

### Illustrated example

Include five authorized screenshots and a provenance manifest from the authored Railway Runner example. They illustrate a real renderer and declared capture conditions; they are not evidence of human playtesting, physical-device coverage or balance.

### Validation

All 28 local tests and the full package verification passed, including offline tarball installation, skill installation and survival/runner brief checks. Package version remains `0.1.0`; these dated milestone releases describe repository history.

**Commit:** [4726280](https://github.com/Sxela/regis/commit/47262804ab1f338d78ad98c43368953b3007accd)

**Full changes:** [2a5c956...4726280](https://github.com/Sxela/regis/compare/2a5c956da96388cccdb8c05db3935630ff7732dd...47262804ab1f338d78ad98c43368953b3007accd)

## 2026-10-31 — Localized social link previews

[GitHub release](https://github.com/Sxela/regis/releases/tag/milestone-2026-10-31-social-previews)

Web releases gain a dedicated workflow for useful, source-faithful previews when players share a game link.

### Features

- Localized preview metadata delivered in the initial HTML rather than relying on client-side JavaScript.
- Native or source-consistent share artwork connected to the actual game's presentation.
- Explicit social-preview checks as part of game delivery and release preparation.

### Changes

- Add a self-contained social-link-preview reference to the packaged skill.
- Connect preview work to the main workflow and game-delivery guidance.
- Require checks against the final package and deployed URL where available, with unavailable hosting checks reported explicitly.

### Scope

This update adds workflow requirements for generated games. It does not publish a game, host an image or configure a deployment as a side effect of installing or testing REGIS.

**Commit:** [2a5c956](https://github.com/Sxela/regis/commit/2a5c956da96388cccdb8c05db3935630ff7732dd)

**Full changes:** [5e8e0f9...2a5c956](https://github.com/Sxela/regis/compare/5e8e0f925cf559ad94c9c0f65698aed97cd1c7e3...2a5c956da96388cccdb8c05db3935630ff7732dd)

## 2026-10-24 — Network-aware performance and runtime acceptance

[GitHub release](https://github.com/Sxela/regis/releases/tag/milestone-2026-10-24-performance-playtests)

Performance becomes a separate acceptance pass against the delivered game, covering loading, frame pacing, memory and recovery under constrained network conditions.

### Features

- Reproducible workloads for cold launch, save continuation, area boundaries, peak combat and repeated load/unload cycles.
- Shared-throughput network throttling with explicit latency semantics, verified caps and separate cold, warm and version-change cases.
- Reference constrained-network profiles, clearly identified as authored starting points rather than measured mobile-network claims.
- Raw frame-time distributions, p95/p99, worst stalls, long tasks and retained-resource measurements.

### Runtime acceptance

- Loading feedback must paint promptly and reflect transfer, decode and scene setup.
- Required-content delays must not advance combat over absent terrain or expose unusable controls.
- Verify cancellation, failed requests, retry and coherent asset versions.
- Capture reproducible traces and compare reviewed visuals and interactions after optimization.
- Distinguish throttled localhost from deployed hosting, browser emulation from physical devices, and package tests from actual game performance.

### Reporting

A dedicated report template records budgets, build and asset identities, tools, cache state, samples, results and remaining device or hosting checks.

**Commit:** [5e8e0f9](https://github.com/Sxela/regis/commit/5e8e0f925cf559ad94c9c0f65698aed97cd1c7e3)

**Full changes:** [a893147...5e8e0f9](https://github.com/Sxela/regis/compare/a893147e3718956c13a75e27b30c1ef3475ac466...5e8e0f925cf559ad94c9c0f65698aed97cd1c7e3)

## 2026-10-24 — Atlases, asset delivery budgets and combat validation

[GitHub release](https://github.com/Sxela/regis/releases/tag/milestone-2026-10-24-asset-delivery)

Separate the complete extraction catalog from the assets players actually download, while preserving every resource required by the selected gameplay.

### Asset delivery

- Measure request counts, transfer size, decode/upload stalls and decoded image/audio memory.
- Choose multi-page texture atlases or indexed packs based on actual use; preserve frame rectangles, directions, timing, anchors, palettes and source identities.
- Load first-playable dependencies first, stream later regions and optional content, and bound prefetch and retained resources.
- Verify persistent caching, coherent version updates, compression, codec support and missing/corrupt-resource recovery.

### Gameplay and UI

- Test crowd scaling for sweeps, chains, explosions and damage-over-time, including effects on kills, XP and purchasing power.
- Define attacks allowed while moving and test ranged enemies at close range.
- Check capped upgrades, ability capacity and conservative autosell income in earned runs.
- Review native panel proportions, comparisons, minimap markers and control readability.

### Packaging fixes included

The intervening CI fix `b07db72` makes offline tarball smoke tests use locked dependency data and canonicalizes temporary Windows paths. These are package checks, separate from gameplay acceptance.

**Commit:** [a893147](https://github.com/Sxela/regis/commit/a893147e3718956c13a75e27b30c1ef3475ac466)

**Full changes:** [26aa2a1...a893147](https://github.com/Sxela/regis/compare/26aa2a1f959bce3b5605ee3b38a0ccf32c420df7...a893147e3718956c13a75e27b30c1ef3475ac466)

## 2026-10-21 — Complete asset lifecycles and production acceptance

[GitHub release](https://github.com/Sxela/regis/releases/tag/milestone-2026-10-21-production-workflows)

Real adaptation runs drive a broader production workflow: retain the source game's identity, make included systems usable, and keep acceptance evidence tied to the current build.

### Features

- Original spell names and complete applicable icon, cast, projectile, impact, lingering-effect and audio lifecycles.
- Character movement, attacks, death/corpse stages and sound, with resources connected to actual runtime events.
- Native paperdolls, inventory and shop presentation, plus visible equipped gear when the source supports it.
- Side-by-side comparisons, drag/drop and double-click equip, selectable autoequip and conservative iterative autosell that preserves tradeoffs and protected gear.
- One optional source-supported companion with earned leveling, persistence and original remarks or voice cues.

### Quality and delivery

- Stronger earned-run, walkability, rendered performance and adversarial UI checks; relevant changes invalidate acceptance evidence.
- Gameplay-led promos, reproducible extraction and clean-package launch checks.
- Optional image-model edits for baked native UI text or buttons, with real interactive controls implemented separately.
- README feature one-liners, short pitches and current screenshots.

### Included earlier changes

Platform and preferred-control discovery, mouse/touch-first guidance with optional keyboard input, stronger playtest reporting and source-faithful spell selection from `9e1e3ab`.

**Commit:** [26aa2a1](https://github.com/Sxela/regis/commit/26aa2a1f959bce3b5605ee3b38a0ccf32c420df7)

**Full changes:** [d8d8a55...26aa2a1](https://github.com/Sxela/regis/compare/d8d8a55dedbceedba3552cdadecf450006b09dc1...26aa2a1f959bce3b5605ee3b38a0ccf32c420df7)

## 2026-10-21 — Full-depth vertical slices and fidelity reviews

[GitHub release](https://github.com/Sxela/regis/releases/tag/milestone-2026-10-21-full-depth-slices)

A trial with fewer maps or spells must still deliver complete gameplay depth. This update turns that expectation into an explicit scope and quality review.

### Features

- A dedicated quality-and-scope workflow covering the requested product, representative reference screens and included content.
- Complete included features across assets, animation, gameplay, progression, feedback, UI and persistence.
- Source coverage and fidelity reviews that catch missing native UI, incorrect facing and incomplete spell presentation before expanding content.

### Changes

- Project initialization now creates a quality-target brief that starts unreviewed.
- Add documented trial findings and clearer separation of source facts, adaptations, unknowns and tested scope.
- Strengthen implementation, source-discovery, platform and delivery guidance.
- Require review of a representative playable slice before broadening the content catalog.

### Acceptance

A small demonstration or passing package test is insufficient evidence of a complete adaptation. The selected catalog may be small; included mechanics and presentation must still meet the agreed quality target.

**Commit:** [d8d8a55](https://github.com/Sxela/regis/commit/d8d8a55dedbceedba3552cdadecf450006b09dc1)

**Full changes:** [bb95e01...d8d8a55](https://github.com/Sxela/regis/compare/bb95e018c70f570d936c1072d7d5db7561f0a516...d8d8a55dedbceedba3552cdadecf450006b09dc1)

## 2026-10-20 — Chat harness installation and pinned REA

[GitHub release](https://github.com/Sxela/regis/releases/tag/milestone-2026-10-20-chat-harnesses)

REGIS becomes easier to use across coding agents, with a declared REA dependency and clearer installation boundaries.

### Features

- Installation destinations for 18 supported chat and coding-agent harnesses, including Codex, Cursor, Gemini CLI, Windsurf, OpenCode and Copilot.
- Project and user scopes where supported, destination overrides and dry-run installation plans.
- Read-only runtime diagnostics that distinguish dependency visibility from an active MCP connection.

### Changes

- Pin `rea-agents` to `6.7.0` and record its complete dependency closure in the lockfile.
- Extend installer and CLI tests for harness selection, scopes and runtime reporting.
- Update harness, packaging, setup and third-party documentation.
- Exercise the actual packed distribution with its REA dependency.

### Installation behavior

Installing REGIS does not silently register REA providers or modify unrelated MCP settings. Analysis engines and media-generation services remain separate setup choices.

**Commit:** [bb95e01](https://github.com/Sxela/regis/commit/bb95e018c70f570d936c1072d7d5db7561f0a516)

**Full changes:** [2268198...bb95e01](https://github.com/Sxela/regis/compare/226819887aacb833fba6843f776a0a9e90d5c3d0...bb95e018c70f570d936c1072d7d5db7561f0a516)

## 2026-10-20 — Initial game adaptation toolkit

[GitHub release](https://github.com/Sxela/regis/releases/tag/milestone-2026-10-20-initial-toolkit)

REGIS starts as an end-to-end workflow for adapting an installed game into a source-faithful survival experience.

### Features

- REA-backed discovery and extraction guidance for maps, collision, actors, abilities, items, UI, audio and progression.
- Survival design with three source-themed classes, distinct build paths and Easy/Medium/Hard behavior contracts.
- Native UI reuse, generation for genuine gaps, and gameplay-led promo production.
- Node.js SPA and Electron desktop delivery, responsive mobile web support and mobile browser tests by default.

### Tooling and delivery

- CLI commands to install the bundled skill, initialize a project brief and check its contract.
- Portable skill packaging, replacement safeguards, source provenance and reproducible build guidance.
- Synthetic package tests and CI workflows for verification, release preparation and separately invoked npm publishing.

### Scope

This is an agent skill and toolkit: the CLI prepares the workflow; an agent and the available analysis, coding and media tools implement the game. Package tests do not certify gameplay or physical-device performance.

**Commit:** [2268198](https://github.com/Sxela/regis/commit/226819887aacb833fba6843f776a0a9e90d5c3d0)
