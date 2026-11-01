# Reusable mechanics for game-to-runner ports

Apply the selected defaults and user overrides in the [module workflow](workflow.md).
Only selected systems require their corresponding scenarios.


Build a runner around readable lanes, fast decisions, the source game's own
threats and tools, and a between-run loop of loot, equipment and upgrades that
makes the next run go further. Recover the source game's identities, appearances,
sounds, areas and creature behavior; adapt its progression and economy to this loop.

This is a reusable design and validation method. Source-specific identities,
adapters and configurations stay in the generated project. Numeric examples are
starting hypotheses, not universal balance targets.

Companion workflows:

- [Track generation and fairness](track-generation-and-fairness.md): movement contract, chunks, solver.
- [Genre adaptation matrix](genre-adaptation-matrix.md): which systems each source genre brings.
- [Playtesting and balance workflow](playtesting.md): survivability agents and experiments.
- [UI workflow](../../nostalgic-ui-workflow.md): native components and end-round screens.
- [Promo video workflow](../../promo-video-workflow.md): gameplay capture and editing.

## Define the playable loop

```text
Pick a starting runner and loadout (permanent upgrades applied)
  -> Safe opening: a few seconds of pickups, no hazards
  -> Run: lanes, jumps, slides, enemies and pickups in the first source biome
  -> Pickups autoequip when they improve the build; resources fill
  -> Biome gate: native exit/portal/door; next biome with its own roster
  -> Boss gate at the end of an act or episode
  -> Death, or finish the final biome (victory, then optional endless mode)
  -> End round: loot summary, inventory, equipment comparison, shop buy/sell,
     permanent upgrades
  -> Next run
```

Every system needs a reason to exist in this loop. Runner attention is scarce:
the player is reading lanes at speed. Deep crafting trees, many hotkeys or long
inventory sorting belong in the end-round screens, not on the track.

Decide before building a large catalog: input scheme per platform; which actions
are manual (lane, jump, slide, fire) and which are automatic (aim, autoequip,
pickup magnet); run length and biome count; boss gates; what persists after a
run; and how the genre module changes moment-to-moment play.

## Separate original content from runner rules

Keep an immutable source catalog and a separate adaptation layer:

| Record | Preserve from the source | Define for the runner |
| --- | --- | --- |
| Area | Identity, textures/backgrounds, props, music, local spawns | Biome order, chunk pool, hazard families, length, gate |
| Creature | Identity, appearance, native HP, attacks, speed, behavior evidence | Lane behavior, telegraph, spawn weight per biome, reward policy |
| Weapon/ability | Identity, icon/sprite, damage, rate, ammo/resource, sound | Lane targeting, spread across lanes, cooldown, upgrade path |
| Item/pickup | Identity, sprite, slot, native effect and amount | Runner effect, rarity, price, comparison and autoequip rules |
| Player character | Recognizable role, starting equipment, sprite/animations | Starting runner stats, movement feel, scaling, build paths |

Record whether each fact comes from source code, data, observed runtime behavior
or inference. Label telegraph wind-ups added to hitscan attacks, lane behaviors,
invented item variants and rarities as adaptations. Use stable IDs across
extraction, simulation, rendering, tooltips, saves and tests; display names are
unsuitable as keys.

## Map creatures to lane behaviors

Translate each source creature's role into a runner behavior that keeps its
identity and gives a readable answer:

| Source role | Lane behavior | Telegraph | Answer |
| --- | --- | --- | --- |
| Fodder melee | Walks toward the runner in a lane | Visible at distance | Kill or change lane |
| Hitscan gunner | Stands in a lane, winds up, fires down it | Native attack frame + sound, fixed delay | Leave the lane during wind-up, or kill first |
| Projectile caster | Fires a slow projectile down its lane | Cast frame; projectile visible in flight | Change lane, or jump/slide by projectile height |
| Charger | Accelerates down a lane | Roar/alert frame, dust or speed lines | Change lane early; kill window shrinks |
| Flyer | Hovers above lanes, drifts across them | Shadow on the floor shows lane | Kill, or avoid its lane |
| Tank / elite | Slow, high HP, blocks a lane for a long stretch | Large silhouette | Commit to another lane or a sustained burst |
| Boss | Gate encounter at the end of an act | Each attack telegraphed, at least one safe lane per attack | Survive and damage within the gate |

Validate first that the creature can reach its lane, that its attack lands where
the telegraph says, and that the answer works at the speed cap. More damage
cannot fix an attack that hits from an invisible position.

Apply line of sight both ways. Full-height blockers (walls, pillars, tall
props) stop shots from the runner and from enemies, and a blocked shot shows
an impact on the blocker. Low hazards that the runner jumps do not block, and
neither do destructible props meant to be shot. A runner that kills through
walls makes cover meaningless; an enemy that does so breaks the telegraph.

Build boss gates from the source's own boss encounters: the creatures that the
act's final level or the source's boss table places, one of each kind first
and the strongest first. Fall back to the strongest non-fodder creatures only
when the source names none. Give the gate an HP budget that scales with route
position and difficulty, not with the number of bosses. Turn signature boss
attacks (volleys, sweeps) into telegraphed patterns that leave a safe lane, and
check that a long fight still fits the playtest horizon.

During a boss fight, keep the boss in view and make navigation matter by
switching the track to floor-only obstacles: things the runner jumps or steps
around, never full-height blockers or overheads that hide the boss. Start with
a short calm stretch, never cover all lanes in one row, and keep the arena
active if the fight outlasts the level.

## Filter abilities and weapons by practical value

Preserve the original display name, icon, sprites and sounds for every included
weapon, skill or spell. Then audit what it does at runner speed:

1. Which simulation state does it change?
2. How does it choose a target in a lane world (current lane, nearest, spread)?
3. How often does a useful opportunity occur in a normal run?
4. Does it matter against crowds, elites and bosses?
5. What feedback shows its contribution?
6. Which upgrades keep improving it, and where do they cap?

Choose **keep**, **adapt**, **exclude** or **defer** for each. Adapt needs a
stated new behavior and a test. Typical treatments:

| Source mechanic | Runner treatment | Exclude when |
| --- | --- | --- |
| Single-target hitscan | Hits the first enemy in the current lane | Never; it is the baseline |
| Spread / shotgun | Hits current lane strongly, adjacent lanes weakly | Spread cannot reach adjacent lanes at track width |
| Splash / rocket | Area damage on impact in a lane radius; decide self-damage | Splash only ever hits the runner |
| Melee | Short range in current lane; reward close timing | No approach window exists at speed |
| Beam / chain | Lane-long beam or chain between lanes | No visible distinction from a normal shot |
| Area field | Leaves a damaging lane strip behind or ahead | It blocks the runner's own escape lane |
| Heal / ward | Triggered when hurt; shows the amount | It fires at full health |
| Summon | Companion that runs in a lane and fights | It is decoration or gets stuck |
| Movement skill | Dash across two lanes, double jump, slide extension | It bypasses the fairness contract |
| Mana/stamina costs | Map to a runner resource with a real consumer, or exclude | The resource has no consumer |

Remove excluded abilities from loadouts, drops, shops and procs, along with their
dependent stats. Handle old saves so removed content cannot return.

## Filter stats and item properties together

A stat belongs in the playable pool only when its value reaches a simulation
calculation and the player can observe the consequence. Audit generated affixes,
fixed items, shop previews, tooltips, comparison scoring, autoequip and restored
saves together. Keep an active-stat registry: unit, baseline, consumer, stacking
rule, limits, eligible item families, display label and validation scenario.

Runner-relevant stat families include: max health, armor/absorb, damage per hit,
fire rate, ammo capacity, ammo efficiency, spread lanes, projectile speed, pickup
magnet radius, run speed tolerance (slower acceleration), grace time, revive
charges, coin/score multipliers and luck. Stats tied to systems the runner lacks
(carry weight, lockpicking, dialogue checks) are excluded or remapped explicitly.

## Use explicit arithmetic and units

Keep raw bases separate from accumulated improvements. Add bonuses against their
documented base rather than repeatedly modifying the running result:

```text
total_bonus = item_bonus + passive_bonus + upgrade_bonus + temporary_bonus
current_value = base_value * (1 + total_bonus) + flat_amount
```

Damage, rate, duration and radius are different units. A +50% fire rate gives
`base_interval / 1.5`. Independent layers (weapon damage, runner multiplier,
enemy armor) multiply once each. Round only at defined display boundaries, and
make tooltips and comparisons use the same helpers as combat. Test
unequip/re-equip, buff expiry and save restoration for accidental repeated scaling.

## Design three complementary starting runners

Give each runner a useful starting loadout, a recognizable strength, a pressure
point and two improvement paths that change decisions, not just numbers:

| Role | Possible advantages | Failure to test |
| --- | --- | --- |
| Durable | More health/armor, damage resistance, recovery on kill | Plays identically to the others because hazards ignore durability |
| Precision | High damage per shot, long reach, elite/boss focus | Fodder crowds overwhelm slow single-target fire |
| Utility | Pickup magnet, economy, area control, slows, extra grace | Contributes nothing measurable to survival |

Compare runners at equal earned budgets on the same seeds. No runner may require
an unavailable mechanic or a lucky early drop to survive the first biome.

## Separate learning from improving (RPG modules)

For RPG-style modules, use distinct rewards for acquiring an ability, improving a
specific ability and improving the runner. Three choices per level-up work well;
pause or slow time while choosing. Every card states its exact value with unit
and the before → after change, computed by applying the offer to a copy of the
current build with the same helpers combat uses:

```text
Plasma Rifle · Rare variant
Damage per cell 20 → 24 (+20% of base) · Fire rate 11.7/s (unchanged)
Sustained lane DPS 234 → 281 · Ammo per second 11.7 (unchanged)
```

## Loot, autoequip and comparison

Use [shared equipment and comparison](../../equipment-and-comparison.md) for
logical slots, pairwise comparison, atomic operations and iterative autosell.
Runner defaults enable autoequip and leave autosell off; user choices override.

**Utility for autoequip.** When items are tradeoffs rather than strict upgrades,
autoequip may still act on an estimated build utility:

```text
utility(item, build) = expected_lane_dps_gain * threat_weight
                     + survivability_gain * survival_weight
                     + economy_gain * economy_weight
                     - resource_cost (ammo/energy availability)
                     + synergy_bonus (set, runner class, current weapon family)
```

Autoequip fills legal empty slots and replaces dominated gear. Tradeoffs require
a declared utility margin and protection for locked, set-critical or build-defining
items; otherwise retain them for end-round comparison. Show immediate slot/item/
stat feedback. Respect class and ammo restrictions, full inventory, save/reload
and repeated pickups. If autosell is enabled, apply the shared strict-dominance
policy rather than the utility score. Never displace protected gear silently.

## End-round management and the shop

The end-round flow begins only after death or finish; never interrupt a run with
a purchase modal.

| Screen | Contents |
| --- | --- |
| Loot summary | Distance, score, kills, currency earned by source, items found, what autoequipped |
| Inventory | Every retained item with rarity, slot, lock/favorite toggles, sell button and sale value |
| Equipment | Equipped slots, side-by-side comparison for any selected item, explicit Equip/Unequip |
| Shop: buy | Source-themed stock with exact price, preview against current gear, affordability |
| Shop: sell | Sell items for a fixed fraction; confirm high-value or locked items |
| Permanent upgrades | Global progression with current level, next effect in units and price |

Treat purchases as transactions: validate offer and currency, apply once, debit
once. A double click, stale offer or canceled confirmation must not spend money
or duplicate items. Use explicit Buy/Sell/Equip buttons, release held run input
when screens open, and block the first activation briefly so a final swipe cannot
buy something. Always expose Next Run.

Separate the currencies and states: run-only buffs (gone at run end), earned
currency (persists), owned items (persist), equipped loadout (persists) and
permanent upgrades (persist). Check: no negative prices, no buy/sell arbitrage
(sell price below buy price), no runaway inflation, no dead-end progression where
nothing affordable improves survival.

## Build an economy that funds decisions

```text
expected_currency_per_run = distance_reward + kill_rewards + pickups
                          + boss_reward + sold_items
runs_to_afford(upgrade) = price / expected_currency_per_run(agent, difficulty)
```

Model this for novice, average and expert agents. A novice should afford a
meaningful upgrade every one to three runs early on; prices escalate, but each
tier stays reachable. Permanent upgrades should shorten the path to the final
biome, never be required to clear the first one.

## Preserve coherent biomes

Build a biome catalog from real areas: native textures and props, the area's own
spawn roster and its music. Order biomes by source progression or by native
threat (median HP/damage of the local roster). Normalize difficulty upward along
the route so later biomes are never easier by accident. Keep rare source bosses
out of early fodder pools.

When the source has difficulty-dependent spawns (skill flags, spawn tables per
difficulty), use them to build per-difficulty rosters. That is source-grounded
difficulty and beats arbitrary multipliers.

Keep the source's campaign structure. A run that beats a non-final act's boss
continues into the next act rather than ending, and the player can choose a
starting act (a later start begins harder, by route position). Derive acts from
the source's own grouping (episodes, chapters, worlds). When the player
supplies only some of the source data, offer the acts it covers and hide the
rest without errors.

## Validate combat before tuning damage

Check, in order: the enemy appears in time to be read; its attack lands in the
telegraphed lane; the answer works at the speed cap; the runner's weapon actually
hits it; its time-to-kill at the current speed is shorter than its approach time
for the intended weapon tier. Only then tune numbers.

```text
time_to_kill = enemy_hp / (lane_dps * hit_fraction)
approach_time = spawn_distance / (run_speed + enemy_speed)
must_dodge = time_to_kill > approach_time - reaction_window
```

Keep sustain bounded: if health regeneration or armor exceeds incoming damage
at every biome, mistakes stop mattering. Use invulnerability after hits, capped
healing per pickup and bounded armor absorption.

## Run reproducible balance experiments

Keep the simulation independent of graphics, audio and interface, and use the
same module in the playable build. Seed randomness, save the initial state, and
record source/configuration hashes with every result.

| Experiment | What it establishes | What it cannot establish alone |
| --- | --- | --- |
| Formula and transaction tests | Stacking, prices, autoequip decisions, saves | Fun or fairness |
| Generator sweeps | Reachability, transitions, opening safety | Readability |
| Headless agent runs | Survival distributions for stated policies | Human difficulty |
| Rendered automated runs | The real build, input and timing work end to end | Broad distribution coverage |
| Human sessions | Readability, decisions, fun | Coverage across seeds |

Record per run: seed, difficulty, runner, agent profile, gear source (fresh or
earned), distance, time, biome reached, outcome (death/victory/horizon/abort),
death cause (hazard type and ID, enemy ID, projectile), damage taken by source,
ammo starvation time, pickups, items found and autoequipped, currency earned.

## Make the interface explain the rules

HUD priority: health and armor, current weapon and ammo, distance/score, active
power-ups. Keep it compact and out of the lanes. When the active weapon runs
dry, switch at once to the best owned weapon with ammo and say so ("Shotgun
empty: Pistol"); an ammo pickup lifts the runner off a fallback melee weapon,
and manual cycling skips empty weapons. Show the active weapon's name and
ammo, and mark empty owned weapons. A runner holding an empty gun that
silently does nothing reads as a bug. On the end-round screens, show
every stat with base and current values and the contributions of runner, items
and upgrades. Provide a bestiary listing each creature's source identity, biomes,
lane behavior, telegraph and scaled stats.

## Specify persistence and transitions

Write a reset table for new run, death, victory, next biome and new profile.
Save permanent upgrades, owned items, equipped loadout, locks, autoequip and
autosell settings, currency, best distance and seed history. Make migrations
idempotent and recover safely from malformed saves (keep a backup, never wipe
progress silently).

## Reuse the method in the next port

```yaml
track:
  lanes: 3
  actions: [lane-left, lane-right, jump, slide]
  speed: {start: 10, growth_per_s: 0.08, cap_easy: 16, cap_medium: 20, cap_hard: 24}
  min_reaction_window_s: {easy: 1.0, medium: 0.75, hard: 0.55}
genre:
  modules: [shooter]
  fire: auto-aim-current-lane
loot:
  autoequip: dominance-then-utility
  autoequip_margin: 0.1
  autosell: off
end_round: [loot-summary, inventory, equipment, shop-buy, shop-sell, permanent-upgrades]
biomes:
  order: source-progression
  roster: local-source-spawns-by-difficulty
  length_s: 45
```

The first playable slice proves lanes, jump, slide, one hazard of each type, one
enemy, one weapon, one autoequipped pickup, a death, the full end-round flow, a
purchase, a second run using it and save/continue. Then add content in batches
and repeat the audits.
