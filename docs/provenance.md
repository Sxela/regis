# Guide provenance

The user supplied these reusable game-port production guides and asked that
REGIS use them. They are bundled under the skill's references so installation
does not depend on the original repository:

- [Survival mechanics](../skills/regis/references/game-to-survivors-mechanics.md).
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
