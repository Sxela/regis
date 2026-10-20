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

## Validation limits

REGIS package checks and skill-structure validation cover the revised documents,
portable payload, initializer and CLI. Reviewing the old trial against a new
rubric demonstrates why it is inadequate; it does not prove that a new generation
will reach the target. A fresh artifact-producing trial against the recorded
source/benchmark target is still required before claiming improved output quality.
