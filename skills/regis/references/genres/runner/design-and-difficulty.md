# Design, replayability and three difficulty modes

Apply the selected defaults and user overrides in the [module workflow](workflow.md).
Only selected systems require their corresponding scenarios.


Start with the source's recognizable actions and threats. The three starting
runners may be characters, classes, vehicles or weapon loadouts. The roles below
are comparison dimensions, not mandatory names.

| Runner role | Distinct strength | Pressure point | Two example build directions |
| --- | --- | --- | --- |
| Durable | Health, armor, recovery, forgiving collisions | Slow kills, weak against long elite lanes | Armor and recovery; close-range burst |
| Precision | Damage per hit, reach, boss focus | Crowds and multi-lane pressure | Long-range elite focus; fast multi-lane coverage |
| Utility | Pickups, economy, control, extra grace | Lower raw damage and health | Magnet and economy; area control and slows |

For each runner document the starting loadout, base stats with units, signature
mechanic, weakness, equipment access and two earned build paths. Test each against
fodder crowds, projectile lanes, chargers, elites and the boss gate. Define how
each build direction changes actual decisions: which lane to hold, when to fight
versus dodge, which pickups to chase, what to buy.

## Iterate for fun and replayability

1. Build a complete small loop: one source biome, the full hazard set, an enemy,
   a weapon/ability, an autoequipped pickup, a death, the end-round flow and a
   second run that uses the purchase.
2. State a hypothesis: which moments should feel good (a close dodge, a clean
   multi-kill, a big drop), what motivates another run, how builds differ.
3. Play all three runners. Record confusing telegraphs, boring stretches,
   unfair deaths, useless pickups and builds that feel identical.
4. Change one diagnosed system and compare before/after on the same seeds.

Replayability comes from biome rosters, chunk variety, risk lines with better
rewards, loot tradeoffs, build choices and permanent progression that opens new
options rather than only bigger numbers. Support seed replay and concise run
summaries (death cause, distance, best moment) so losses teach something.

## Difficulty is a behavior contract

Easy: a novice agent (slow reactions, occasional wrong input) with starter gear
clears the first biome on most seeds. Telegraphs are long, hazards sparse,
enemies few and slow, ammo/resources generous.

Medium: lane reading, combat and pickups all matter. An average agent survives a
meaningful share of seeds through the first biomes; an expert reliably advances.
Running dry of ammo or ignoring enemies should usually end runs.

Hard: dense, fast and demanding but fair. Zero unavoidable patterns at the speed
cap. Practiced play with earned gear reaches the final biome; fresh gear may need
several attempts.

Vary pressure through speed caps, hazard density, chunk difficulty bands, enemy
mix and count, telegraph length and resource generosity. Prefer source difficulty
data (spawn flags per skill level, native damage multipliers) over invented
multipliers. Keep collision rules, telegraph semantics, truthful tooltips and
source identity identical across difficulties.

Define measured targets before tuning. For example, an initial project might test:

| Agent | Easy | Medium | Hard |
| --- | --- | --- | --- |
| Novice, starter gear | First-biome clear ≥ 70% | ≥ 30% | ≥ 5% |
| Average, starter gear | ≥ 90% | ≥ 50% | ≥ 20% |
| Expert, starter gear | ≈ 100% | ≥ 80% | ≥ 40% |
| Average, earned mid gear | Deeper median distance than starter gear in every mode | | |

These are revisable hypotheses, not mandated rates or claims about human players.
Report sample counts, seed ranges and confidence intervals (Wilson intervals suit
small samples), plus survival-time distributions and death causes.

## Check upgrade pressure and economy

Upgrades must make runs easier and longer, never make the first biome possible.
Measure each mode with fresh gear and with gear an agent can actually earn in a
stated number of runs. Check for runaway sustain (regeneration beating all damage),
inflation (late prices outpacing income), and dead offers (shop items that change
nothing measurable). A permanent upgrade tree that ends with immortality removes
the game; cap it or keep scaling threats.

## Close failed runner/mode investigations

Review the full three-runner by three-mode matrix with each agent profile. For a
row with poor survival, replay representative deaths and classify them:

| Death cause | First question |
| --- | --- |
| Unreadable hazard | Was the telegraph visible for the full reaction window? |
| Generator pattern | Does the solver accept this row? Is it readable? |
| Enemy damage | Was the attack telegraphed in the right lane? Could the weapon kill in time? |
| Ammo starvation | Did pickups and fallback weapons cover the biome? |
| Agent limitation | Would a capable policy have survived? |
| Genuine skill check | Was the answer available and fair? Then it is the intended difficulty. |

Fix generation, telegraph and collision defects first, then economy, then damage.
Rerun affected agents and modes after each change and keep Easy regressions.
Keep the investigation open until the behavior contract is supported, or record
the concrete remaining blocker without calling balance complete.
