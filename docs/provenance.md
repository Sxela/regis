# Guide provenance

The user supplied these reusable game-port production guides and asked that
REGIS use them. They are bundled under the skill's references so installation
does not depend on the original repository:

- [Survival mechanics](../skills/regis/references/genres/survival/game-to-survivors-mechanics.md).
- [Playtesting and balance](../skills/regis/references/playtesting-and-balance-log.md).
- [Native-style UI](../skills/regis/references/nostalgic-ui-workflow.md).
- [Promo production](../skills/regis/references/promo-video-workflow.md).

The original filenames are retained. Source-project case-study links and an
example's source-specific item name were removed/generalized in the mechanics
copy. Generic examples remain examples, not mandatory settings. No source-game
assets or private case-study results are included.

New references supply REA routing/evidence, exactly three classes, explicit
difficulty behaviors, implementation/navigation validation, Node.js SPA/Electron
and default mobile testing, reproducible game delivery, and exact voice/action
prompting with first-frame anatomy review. These encode the user's workflow
requirements without depending on a particular game, machine or installed model.

The REA packaging comparison records the inspected upstream sources separately;
REGIS does not vendor REA or claim that its CLI is an asset-decoding engine.

An assisted local adaptation trial exposed a quality regression despite passing
functional tests. Its [findings](trial-findings.md) informed the portable
[quality-target workflow](../skills/regis/references/quality-and-scope.md):
explicit scope, source/benchmark calibration, coverage through runtime validation,
animation/UI comparison, class/mode investigation and launch diagnosis. These
are workflow changes; no fixed source-game counts, paths, artwork or gameplay
implementation were added to the packaged skill.


## Integrated genre modules

The user requested integration of REGIS Runner into REGIS. Runner mechanics,
source-genre mapping, track fairness, simulation and survivability guidance are
bundled under `skills/regis/references/genres/runner`. Existing survival mechanics
and difficulty guidance moved under `genres/survival`. Shared discovery, asset
delivery, UI, performance, promo and release notes are maintained once.
This is a toolkit integration; the standalone runner repository is not removed.

The optional PixelFX tool reference records the inspected upstream skill at
commit `fe7103c36d94e02f2d7df7d8f7a341e493837cde`. It links instructions rather
than vendoring implementation or output assets. Upstream capabilities, adapted
integration advice and package validation scope are distinct: these package tests
do not certify PixelFX effects, a local model or gameplay on a physical device.


## Authored-game visual examples

At the user's explicit request, a curated English railway-runner gallery is
bundled as illustrative media. Four screenshots use the actual English renderer
and an intentionally staged electrical collision; a fifth image is composed
English social-preview artwork. The image manifest records dimensions, hashes
and capture scope. Only selected lossless images and captions are included;
no runtime asset packs, music, game data or private trial logs are bundled.


## Style-specific findings

The shared style/rendering and sprite/atlas guides distill the authored railway
runner's CRT/motion/scenery notes and the classic shooter runner's renderer,
delivery-atlas, loader and performance records. Direct source inspection
confirmed native billboard offsets, mirrored anchors, the top-down UV/texture
flip convention, cutout/fullbright/translucent material roles and cached isolated
surface crops for repeating textures. The guides distinguish these observed
adapters from recommended checks and optional future techniques.

Project-specific strengths, frame budgets, original asset counts and performance
numbers are not universal defaults. No new runtime, physical-phone, CRT calibration
or model-quality study was run for this documentation update. Toolkit verification
checks portable references, packaging and synthetic contracts only; source-game
assets and private measurement logs remain outside the toolkit.
