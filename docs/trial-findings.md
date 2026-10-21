# Adaptation trial findings

## Observed result

On 2026-10-20, an assisted local REGIS trial used a copy of the supplied Allods II
distribution. The existing chat agent followed the skill; this was not an
independent harness evaluation. It reused prior format knowledge but wrote a
fresh smaller adapter and game rather than copying the earlier adaptation.
Original source hashes were checked before and after. Generated assets, source
files, screenshots, raw reports and builds remain outside the package and tracked
repository. This document contains only the findings relevant to REGIS's workflow.

The trial produced a playable browser loop with three classes, three authored
encounters sharing a layout, eight selected sprite sheets, upgrades, camps,
saves and touch-pointer handling. Thirteen simulation tests, five adapter tests
and seven browser configurations passed. These results establish those observed
functions, not source coverage, visual fidelity or completion of the full skill.

The user judged the result far below the earlier adaptation. Its documentation
describes native-map regions and elevation, layered/animated actors, broader
spells/status/equipment, native UI elements and richer inspection screens. Those
are useful quality references; the earlier project also records balance defects
and limited test coverage, so it is not treated as certified complete.

## Failures to correct

| Finding | Workflow correction |
| --- | --- |
| A full workflow trial became a small prototype without an agreed quality baseline | Resolve scope and source/benchmark quality targets first; a trial label does not authorize silent reduction. |
| Easily decoded resources became the content boundary | Track discovered, decoded, mapped, implemented and validated coverage; resolve companion resources and pursue required formats. |
| Native-world work was deferred in favor of one repeated authored arena | Make the first slice representative of required geography, then expand the scoped native regions and encounters. |
| Static enemies, guessed animation indexing and primitive effects remained | Verify action/direction metadata and actual playback, anchors, scale, terrain, depth and native VFX; compare motion. |
| Native font plus generic panels passed a screenshot review | Compare matched source/benchmark screens and component provenance; integrate native UI and appropriate gap artwork. |
| Upgrade percentages substituted for the reference's richer build interactions | Define source-appropriate useful loadouts, learning/specialization/equipment and two behaviorally distinct earned directions per class. |
| Functional tests dominated the result assessment | Review coverage, visual/motion quality, gameplay, balance and distribution separately. |
| Easy improvements were followed by handoff with several zero-win Medium/Hard class rows | Diagnose controller and game mechanics, iterate capable earned policies and preserve other-mode regressions. Zero wins leave viability unestablished. |
| Synthetic pointer events were described too broadly as touch coverage | Exercise browser touch delivery when supported; separate synthetic edge cases, audio-unlock state and physical-device/audio review. |
| An Electron access violation remained unresolved and environment attribution was uncertain | Retain logs/runtime/build identity and isolate app versus host/runtime causes; do not infer sandbox causation or count a built folder as a launched app. |
| A silent rough recording stood in for a requested promo phase | Retain it as source capture and continue the edit/audio/review workflow when available. |

## Revised acceptance of the same trial

Under [the quality-target review](../skills/regis/references/quality-and-scope.md),
the trial remains an intermediate slice. Coverage, fidelity, build breadth,
several class/mode viability rows, required desktop execution and the finished
promo are open. A defer list honestly records them but does not satisfy them.
Some targets require more supported implementation; human/device evidence has
separate access limits. Those are distinct reasons for unfinished work.

The correction is game-agnostic. It does not mandate this source's map count,
spell list, equipment scheme or UI style for another game. An explicitly requested
small prototype or timebox still receives the corresponding smaller scope.

The user clarified that a quick survival trial should be a narrow but complete
vertical slice: perhaps a small fraction of spells, monsters and zones, with
full gameplay logic and presentation for those entries. Missing native UI,
backward movement and absent spell sprites are integration defects even in that
scope. The workflow now separates limited content breadth from required system
depth. Full-catalog expansion, promo and release breadth need not be included
in an explicitly scoped survival test.

## Follow-up reviews from two adaptations

On 2026-10-21 the user supplied `regis-improvement-suggestions.md` from the
Allods adaptation and `regis-skill-improvement-review.md` from the UO adaptation.
These are retrospective suggestions with historical evidence, not fresh tests
of either game's current build. Their shared conclusion was to make existing
advice enforceable through reproducible scenarios and change-sensitive evidence,
rather than copy either game's tuning or append both reviews to the skill.

| Review finding | Reusable correction |
| --- | --- |
| Earlier passes survived relevant map, combat or media changes | Acceptance ledger binds results to relevant inputs; change-impact table selects reruns and preserves stale history. |
| Valid assets still produced wrong surfaces, effects or elevation | Structural versus semantic/contextual review, explicit spatial/world-model limits and visual traversal probes. |
| Plausible crowd adaptations drifted from source attacks | Per-ability fidelity decisions and difficult-family source/runtime comparison before expansion. |
| Bot clears, checkpoints and complete earned campaigns were conflated | Separate controller capability, feasible earned progression and frequency; retain exact sustain failures and economy feedback checks. |
| Equipment grants, comparisons and previews needed repeated repairs | Grant lifecycle scenarios, shared dominance semantics, calibrated stats/threat channels and runtime-derived throughput previews. |
| Quiet gaps, obscured warnings and accidental exits escaped broad tests | Visible pacing/counterplay traces and deliberate world-transition activation scenarios. |
| Responsive opening screens hid saved-menu and modal failures | Deterministic adversarial state fixtures with real actions and state assertions. |
| Promo revisions and cached development output obscured delivery quality | Artifact-specific shot review, bounded production retention and clean release tests without development fallbacks; optional manifest-based exports. |

The packaged skill keeps these methods game-agnostic and retains its three-class,
Node.js SPA/Electron and default mobile policy with explicit user scope overrides.
Selected content breadth never excuses incomplete selected systems. No source
game bytes, review attachments, developer paths or game-specific scripts are
needed by the packaged instructions.

This update revises instructions and acceptance scenarios. Repository verification
checks packaging and structure; it does not establish improved generated gameplay.
A subsequent representative adaptation must exercise the changed scenarios and
compare artifacts/failures before claiming a behavioral quality improvement.

## Revised-skill acceptance run

A subsequent local Allods acceptance run on 2026-10-21 used a separate ignored
workspace, snapshotted the revised skill and re-extracted original resources.
It explicitly reused the earlier small trial's adapter/game/harness and the same
chat agent; it was a regression/continuation exercise, not independent discovery.
The user selected desktop/mobile with primary mouse point-and-click and touch,
optional WASD, and inventory/pause shortcuts.

The scenarios exposed and corrected automatic portal travel, branch-dependent
preview errors, attacker-order-dependent contact damage and stale navigation
cache after loading. Source/context review also corrected spell icon/audio
associations, missing homing and lingering poison, and flat actor grounding over
interpolated terrain. These findings demonstrate useful failures caught by the
new method rather than merely successful package installation.

Retained local evidence includes 35 simulation/adapter checks, nine native-asset
browser configurations, 128 movement probes without recovery, 180 earned
campaigns and a 60-second rendered crowd sample. Every class/mode/build-priority
row has an earned moving clear in the sampled policies. The actual Windows app
and a freshly extracted isolated web candidate launched; an edited source-audio
showcase was decoded and technically measured. Synthetic CI fixtures received a
separate desktop check. These are local observations, not cloud CI, human rates,
physical-phone results or original-engine equivalence. Artifacts remain private
and outside the package. An unfamiliar-source independent generation is still
needed to assess broader generality.

## Validation limits

REGIS package checks and skill-structure validation cover the revised documents,
portable payload, initializer and CLI. Reviewing the old trial against a new
rubric demonstrates why it is inadequate; it does not prove that a new generation
will reach the target. A fresh artifact-producing trial against the recorded
source/benchmark target is still required before claiming improved output quality.
