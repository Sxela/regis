# Design, replayability and three difficulty modes

Start with the source's recognizable actions and threats. Its three classes may
be characters, unit roles, pilots or vehicle loadouts. The roles below are
comparison dimensions, not mandatory fantasy names or a fixed weapon catalog.

| Class role | Distinct strength | Pressure point | Two example build directions |
| --- | --- | --- | --- |
| Close-pressure specialist | Sweeps, impact, bounded sustain or defensive timing | Exposure, escape routes, ranged threats | Durable attrition; burst/retaliation. |
| Precision/mobile specialist | Reach, penetration, focused damage or movement | Density, aim/target selection, fragile defense | Fast coverage; elite/boss focus. |
| Control/coverage specialist | Fields, area effects, drones/summons or statuses | Setup, cooldown gaps, control-resistant threats | Persistent zones; rapid reactive effects. |

Replace these example roles when the source suggests a stronger trio. For each
class document an immediately useful attack, movement/escape behavior, base
stats with units, class mechanic, weakness, equipment/ability access and at least
two earned build paths. Test every class against crowds, ranged threats, boss
pressure and confined geometry. No class should require an unavailable mechanic
or luck-only early drop to become playable.

Class identity includes a useful developing loadout and meaningful combinations
of source-themed abilities, passives and equipment where those systems apply.
Define how each build direction changes actual choices or execution: target
selection, coverage, timing, sustain, mobility or tradeoffs. Repeating damage,
speed and health percentage purchases is not by itself evidence of two viable
builds. Keep acquisition, learning/replacement, caps, specialization, comparison
and inspection connected to implemented mechanics. Scope their breadth against
the selected source and quality target; do not impose a universal item/spell count.

## Iterate for fun and replayability

1. Establish a complete small loop with one source-derived region, meaningful
   rewards, a boss/exit, safe progression, death/victory and save/continue.
2. State a hypothesis: which decisions and moments should be enjoyable, why
   movement matters, how each build changes play, and what motivates another run.
3. Play all three classes and record confusing choices, passive waiting, forced
   picks, boring bosses, unfair damage and situations where different builds
   nevertheless feel identical. A damage spreadsheet cannot answer these alone.
4. Adjust a diagnosed system and compare before/after using the same conditions.
   Keep the good distinct mechanics; avoid flattening every class into one DPS
   curve. Expand content only after the representative loop works.

Replayability should change decisions: zone order within sensible difficulty
brackets, local enemy compositions, branching ability milestones, equipment
tradeoffs, bounded events and optional risk/reward. Avoid random starting deaths,
dead offers, required grind or a single mandatory build disguised as variety.
Support seed replay and concise run summaries so losses teach something.

## Difficulty is a behavior contract

Easy: a player selecting sensible earned upgrades can win most runs with mostly
stationary **combat**. Required pickups, doors and exits may still need movement.
Do not misclassify an exit timeout as combat failure in a stationary probe.

Medium: moving, dodging, collecting and planning a build materially improve
results; stationary combat should usually fail. Use readable threats and usable
warnings rather than invisible tracking damage to enforce movement.

Hard: survival demands execution and build adaptation; initial losses should
teach threats or upgrade synergies. Several attempts may be necessary, but
practiced, well-built earned runs must have a fair route to victory. Avoid
unavoidable early bursts and impossible economy/HP growth.

Define measured targets before tuning. For example, an initial project might
test Easy stationary combat clear rates around 70–90%, Medium moving/earned
policies around 50–80% with much weaker stationary results, and Hard initial
attempts around 15–40% with improvement after learning. These are revisable
hypotheses, not mandated rates or claims about human players. Report sample
counts, seed/region coverage, confidence limits where useful, and both wins and
incomplete runs. Small samples cannot certify a band.

Vary pressure through spawn pacing, telegraphs, enemy mixes, resource generosity
and progression where appropriate. Keep collision, targeting correctness,
truthful tooltips and source identity identical across difficulty. Tune active
time consistently; menu time must not secretly accelerate waves.

Use the companion playtesting guide for paired experiments. Include movement
and stationary policies with legal rewards/purchases, genuinely earned middle
and late checkpoints, all three classes, and human fresh starts. Synthetic
stress is useful for exploits but is not proof of an obtainable winning build.

## Check crowd amplification and reward access

Measure per-target and total damage, affected targets and pack-clear time at
representative densities, including initial and earned mature builds. Include
sweeps, retaliation, overlapping blasts, chains, fields and refreshed statuses;
single-target DPS alone misses their density multiplier. Trace kill/XP access,
healing and purchases after tuning: dividing a fixed damage budget across every
new enemy can delay all kills and starve progression even at unchanged total DPS.

Choose arcs, falloff, target limits or budgets to fit the affected attack and
source identity. Preserve useful class differences. A melee exploit does not
justify weakening every dedicated area tool or compensating with global HP
inflation. Recheck the declared difficulty contract after a targeted correction.

Before interpreting a bot loss, verify actual firing windows, warning response,
collection, useful legal spending, equipment tradeoffs and extraction. Keep the
policy fixed for paired comparisons or disclose its change; an automated win
frequency is not a human difficulty/enjoyment rating.

## Close failed class/mode investigations

Separate controller competence, earned winning-path evidence and observed win
frequency using the [playtesting workflow](playtesting-and-balance-log.md#separate-controller-capability-feasible-progression-and-frequency).
Compare equal investment to actual earned progression: richer difficulty rewards
can buy enough damage/recovery to reverse late pressure. Track purchasing power
and preserve reported sustain checkpoints rather than tuning combat in isolation.

Review the full three-class by three-mode matrix; an Easy sweep does not satisfy
missing Medium/Hard rows. For a row with no earned wins, replay a representative
failure and inspect the controller as well as the game: can it approach ranged
threats, use escape/defense, collect rewards, choose a coherent build, buy useful
stock and reach the exit? Add a documented capable policy or controlled replay
when the original bot cannot exercise a mechanic. Neither zero bot wins nor a
granted-power win establishes whether normal progression is fair.

Trace damage rate, simultaneous contacts, stacked warnings, target reach,
recovery uptime, spawn pressure and available earned power before changing
multipliers. Use the intended shared-hit/immunity rules if the source/adaptation
defines them; do not let accidental per-enemy frame damage dictate balance.
Use pickup/approach tuning to fix inaccessible rewards without hiding a broken
targeting or geometry system. Preserve difficulty distinctions and useful class
mechanics. Rerun affected earned early/middle/late scenarios and Easy regressions
after each meaningful change. Keep the investigation open until winning
progression and the behavioral contract are supported, or record the concrete
remaining blocker without calling balance complete.
