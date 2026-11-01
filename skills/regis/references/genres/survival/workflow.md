# Survival / survivors module

Read this only for a survival/survivors target. The source genre is separate:
units, vehicles and non-fantasy protagonists can use this loop too.

## Product defaults and overrides

Default to exactly three source-themed classes, each with a useful starting
attack, strength, weakness, movement/escape rule and two earned build directions.
The loop is start, move/autofight, collect, choose improvements, boss/exit,
safe improvement, next area, death/victory and save/continue. Use inventory,
autoequip, shops and companions only where they have a useful, selected role.
Honor explicit scope overrides, including games without leveling or upgrades.

Read [mechanics](game-to-survivors-mechanics.md) and
[design and difficulty](design-and-difficulty.md) before designing the loop.
Audit abilities, stats and affixes as keep/adapt/exclude/defer; every included
property needs an implemented consumer and useful feedback. Preserve native
names and matching icons, cast/travel/impact/status art and sounds. A familiar
name over an unrelated generic attack is not source fidelity.
If optional source-supported companions are included, implement their complete
recruit/follow/combat/XP/death/persistence lifecycle and re-audit ally-only skills.

## Genre-specific acceptance

| Mode | Intended experience |
| --- | --- |
| Easy | Most runs can win with mostly stationary combat and sensible earned improvements; objectives may still require travel. |
| Medium | Movement, dodging and deliberate build planning matter; standing still usually fails. |
| Hard | Demanding but fair survival; practiced earned builds can win after learning threats. |

Compare equal earned budgets across classes, representative regions, seeds and
early/middle/late checkpoints. Numeric win-rate bands are project hypotheses.
Diagnose zero-win rows rather than hand off a broken class/mode. Preserve Easy's
forgiving contract while fixing Hard. Resolve walkability, body clearance,
floors, connected objectives, pursuit and stuck spawns before adjusting damage.
Record recoveries/teleports separately from successful navigation.

Use [shared playtesting](../../playtesting-and-balance-log.md), including
stationary/moving sustain reproductions and earned progression evidence, plus
the independent [performance pass](../../performance-playtest.md).
For equipment, reuse native comparison/paperdoll components and connect worn
appearance to world actors where supported; verify equip/remove in motion and
after restore. Included item handling needs safe autoequip and conservative
iterative autosell when those features are selected.

Choose a representative complete slice before expanding the catalog. For a
quick trial, reduce content breadth, keeping included actors, spells, UI and
mechanics complete. A passing scaffold does not establish game quality.
