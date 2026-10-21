# Reusable mechanics for game to survivors ports

Build a survival game around movement, readable automatic combat, meaningful build choices, and short encounters with a clear exit. Recover the source game's identities, appearances, sounds, regions, and creature behavior; adapt its progression and economy to this loop.

This guide is a reusable design and validation method for adapting any source game into a survival game. Source-specific identities, adapters and configurations remain separate from the general rules. Numeric examples are starting hypotheses, not universal balance targets. Keep each project's actual settings and experiment history in a separate profile and case study.

Companion workflows and evidence:

- [Playtesting and balance workflow](playtesting-and-balance-log.md): reproduce reports, diagnose failures, compare experiments and maintain a project-specific change log.
- [UI workflow](nostalgic-ui-workflow.md): recover native components, preserve familiar interactions, and generate menu art or missing pieces selectively.
- [Promo video workflow](promo-video-workflow.md): record continuous gameplay, make comic inserts, edit sound and motion, and verify the export.

## Define the playable loop

The player continuously moves, attacks automatically, collects resources, chooses improvements, defeats a local boss, and leaves through an exit. A safe break after the exit allows purchases and inventory decisions before the next area.

```text
Start with a useful class and weapon
  -> Explore and fight timed waves
  -> Collect XP, currency, healing and equipment
  -> Pause for character upgrades and periodic new abilities
  -> Fight the area boss while waves continue
  -> Collect remaining rewards during a short evacuation window
  -> Enter the exit
  -> Buy improvements, equip or sell items, then continue
  -> Repeat until victory or death
```

Give each system a reason to exist in this loop. Long travel, maintenance, crafting prerequisites, resource starvation, and elaborate hotbars can consume attention without making movement or build decisions better. Keep them only when they create a deliberate survival decision.

Decide the following before making a large content catalog: target inputs and screens; class roles; manual actions; offensive and defensive capacity; how new abilities enter a build; run length; boss timing; extraction rules; and what persists after a run.

## Separate original content from survival rules

Keep an immutable source catalog and a separate adaptation layer. A source record can contain mana costs, equipment requirements, original spell ranks, or a quest-only monster even when none belong in the playable pool.

| Record | Preserve from the source | Define for the port |
| --- | --- | --- |
| Creature | Stable identity, appearance variants, native HP and attacks, behavior evidence | Wave eligibility, encounter role, pacing multipliers, reward policy |
| Ability | Identity, icon, effect, damage identity, original targeting behavior | Automatic target selection, cooldown, useful upgrades, availability |
| Item | Identity, logical slot, appearance layers, fixed unique properties | Active affixes, slot eligibility, price, comparison and autosell rules |
| Region | Original coordinates, heights, terrain, props, local spawns | Arena bounds, connected floor, route placement, entry and exit |
| Class | Recognizable combat role and starting equipment | Starting power, durability, movement, scaling and supported builds |

Record whether each recovered fact comes from source code, data, observed runtime behavior, or inference. Label cooldown changes, encounter promotions, and synthetic affixes as adaptations. Keep original fixed uniques identifiable even when unsupported fields are omitted from their playable description.

Use stable IDs across extraction, simulation, rendering, tooltips, saves, and tests. Display names are unsuitable as slot keys or behavior identifiers.

## Filter abilities by practical value

Preserve the original in-game display name from the selected edition and
language for every included source skill/spell. Map its stable source ID to
the correct icon, cast/projectile/impact/status sprites or VFX, and sounds;
use those resources in actual gameplay wherever applicable and available.
Record missing/unsupported presentation explicitly. Do not silently rename
spells or substitute a different spell's art/sound because it decodes easily.
Keep source names separate from internal IDs and authored upgrade/branch names.
Explain adapted targeting, timing or effects in the description and evidence
ledger. If a substantial redesign needs a new name, label it as an authored
ability and record its source inspiration rather than claiming reproduction.

Audit every ability, including passive skills and equipment procs. An icon and an animation do not establish a useful mechanic.

For each ability, answer these questions:

1. Which implemented game state does it change?
2. How does an automatic caster choose a useful target, position, and time?
3. How often will that opportunity occur in a normal run?
4. Does the effect matter in a crowd or during a boss fight?
5. What feedback lets the player understand its contribution?
6. Which upgrades continue to help it, and when do those upgrades stop helping?

Choose **keep**, **adapt**, **exclude**, or **defer**. Exclude removes an ability from offers and grants; defer reserves its identity until its dependent system exists. Adapt requires an explicit new behavior and a test proving that behavior.

For each included ability, resolve fidelity before tuning: reproduce observed
behavior, adapt targeting/timing for automatic use, or deliberately redesign the
effect. Splash, branching, extra targets or a different field shape are authored
changes, not implied permission from the treatment examples below. Keep the
chosen category, evidence/uncertainty and comparison probe with the source ID.
Do not silently change attack identity to solve crowd pressure.

Attach capability dependencies to eligibility decisions: required state/targets,
runtime consumer, reason for exclusion and what change reopens the audit. Keep
a reverse lookup from changed capability to affected offers, affixes, UI,
valuation, AI and saved content. Scope dependencies to the actor/system: removing
player mana need not remove an enemy resource. A newly possible cleanse still
needs useful removable statuses in normal encounters before entering offers.

| Source mechanic | Useful survival treatment | Removal condition |
| --- | --- | --- |
| Projectile or direct strike | Preserve its identity; add a modest splash or penetration when crowd targeting needs help | Incorrect effects or targeting are bugs to fix, not reasons to remove it |
| Chain attack | Upgrade chain targets; show bounce order and range | No valid chain selection or distinction from a normal explosion |
| Persistent damage field | Place against an approaching group; keep damage and duration visible | Placement repeatedly misses or prevents useful movement |
| Blocking wall | Keep with reliable placement control or a tested escape/zone-control role | Automatic walls trap the player, shelter unreachable enemies, or do no useful work |
| Single-target slow or paralysis | Apply to a small group, a threatening target, or a boss with bounded effectiveness | Negligible crowd value, immediate breakage, or almost universal immunity |
| Interrupt or silence | Prefer active casters; interrupt pending casts and prevent new ones for a visible period | Enemies have no casting system |
| Cure, cleanse, dispel | Keep only against a real, frequent status or summoned threat | The harmful status or target category does not exist |
| Mana or stamina drain | Reinterpret as a clearly named useful combat effect, or exclude | The resource has no implemented combat role |
| Stat blessing | Map to actual damage, movement or defense; state the mapping | It changes a removed primary attribute |
| Reflection | Return a real incoming attack with explicit duration, charges and refresh behavior | It only draws a shield without modifying incoming spells |
| Heal or ward | Cast when injured or endangered; show recovery or protection numerically | It fires uselessly at full health or spends all uptime on trivial threats |
| Party/group heal (for example, Mass Heal) | Keep only when allies or summons are meaningful healing targets | Solo play has no group to heal; use a suitable original self/single-target heal instead of relabeling the group spell |
| Summon | Give it reliable targeting, movement, damage, expiration and ownership | It is decoration or repeatedly becomes stuck |
| Travel, food, locks, resurrection | Keep only if the run explicitly supports their purpose | They depend on a world, party or economy absent from the port |

Retain fire, cold, poison and similar identities for VFX, sound and statuses even if damage calculation uses fewer channels. Consolidating resistance categories does not require making every attack behave alike.

These decisions depend on the implemented mode, not a universal spell blacklist.
For example, exclude Stone Wall when automated placement blocks escape or has
no useful tactical role; retain it only with tested placement, escape and enemy
navigation. Do not implement otherwise absent party/resource systems solely to
justify keeping an unsuitable spell. Remove excluded/deferred abilities from
starting loadouts, drops, learning offers, shops and equipment procs, and remove
their unusable dependent upgrades/stats from generation, previews and scoring.
Handle old saves explicitly so removed content cannot re-enter the playable pool.
Preserve the immutable source catalog and record each exclusion and its reason.

Generate offers from current usefulness. Do not offer duration on an instantaneous hit, area on a self-only buff, more chain targets after its cap, or more uptime on an already continuously maintained buff. Re-evaluate eligibility after purchases and equipment changes.

For a zero damage ability, show what it actually provides: silence duration and radius, healing, mitigation, movement distance, or summon damage. Avoid labeling every form of potency as damage.

## Filter stats and item affixes together

A stat belongs in the playable pool only when its value reaches a simulation calculation and a player can observe the consequence. Audit generated affixes, fixed items, shop previews, tooltips, comparison scoring, autosell, and restored saves together.

| Missing system | Remove or remap all dependent fields |
| --- | --- |
| Mana | Maximum mana, regeneration, cost reduction, mana leech, drains and mana requirements |
| Stamina | Maximum stamina, regeneration, stamina leech, stamina costs and requirements |
| Item breakage | Durability, repair, self repair and durability bonuses |
| Primary attributes | Attribute bonuses, equip requirements, lower requirements and attribute-based formulas |
| Reagents, hunger or darkness | Reagent discounts, food effects or night vision unless their systems remain meaningful |
| Skill checks | Skill bonuses and difficulty modifiers without an implemented action |
| Enemy evasion or summons | Accuracy or dispel bonuses unless valid targets exist |

Use an explicit active-stat registry. Each entry should name its unit, baseline, consumer, stacking rule, limits, eligible item families, display label, and validation scenario. Unknown properties remain source metadata until mapped; an unknown positive number must not automatically become loot value.

Calibrate a small loot sample before bulk generation: record recovered native
ranges, chosen survival ranges, typical hero baseline, units and caps. Separate
integer ranks from continuous bonuses. Build a threat-channel table showing
which local enemies exercise each defense and when; a theoretical consumer
does not make an early resistance reward useful. Inspect common/rare/unique
items across supported slots/roles, rolled distributions and earned builds.
Label deliberately situational equipment. Check that displayed ranges, actual
rolls and saved-item migrations agree; quality and drop occurrence stay separate.

Example audit record:

```text
id: cast_speed
unit: fractional increase in casts per second
consumer: autocast interval
base: unmodified ability cooldown
stacking: add item, passive and applicable upgrade contributions
formula: interval = base_interval / (1 + total_speed_bonus)
limit: minimum interval and useful-uptime eligibility
test: equal simulated time produces the predicted number of casts
```

After removing a resource, trace its dependencies through the complete game. Hiding its HUD bar alone leaves dead loot, meaningless choices and misleading comparisons.

## Use explicit arithmetic and units

Keep raw bases separate from accumulated improvements. Add bonuses against their documented base rather than repeatedly modifying the running result.

```text
total_bonus = item_bonus + passive_bonus + upgrade_bonus + temporary_bonus
current_value = base_value * (1 + total_bonus) + flat_amount
```

For a stat using this pool, +50% and +5% give `base * 1.55`, rather than `base * 1.50 * 1.05`. Store the contributions so they can be explained and recomputed after unequipping or expiring an effect.

Damage, rate, duration and radius are different units. A +50% cast speed bonus gives `base_interval / 1.5`; it does not subtract half the interval. A +50% radius increase covers 2.25 times the original area on an unrestricted circular field. Decide whether an area upgrade changes radius or geometric area and expose that decision consistently. Fractional extra projectiles need an explicit policy, such as a proportional extra-shot chance; chain targets remain whole targets.

For simplified defense, two channels such as physical and elemental can support readable item decisions. Choose the aggregation rule for native elemental resistances explicitly, particularly when the source has different numbers of elements or mixed damage attacks.

One bounded class-base model is:

```text
resistance_points = clamp(class_base_points * (1 + relative_bonus)
                          + flat_resistance_points, 0, resistance_cap)
```

A class with 5% physical resistance and +50% relative resistance reaches 7.5%, before flat item points. A flat +5 percentage points instead reaches 10%. Label these separately. If class bases make relative upgrades too weak, test larger flat class bases or more flat item additions before changing every source of defense.

A class damage bonus can use the same arithmetic, but the resulting bonus must then be applied to attack damage. A 20% class bonus increased by 50% becomes a 30% bonus and a `1.30` damage multiplier. It does not mean +50% raw attack damage. Alternatively, let generic damage upgrades act directly on raw damage; choose one convention and document it.

Independent layers can still multiply: a spell's base potency improvement, a class damage multiplier, and an enemy's resistance describe different operations. Add within each pool and apply each layer once. Name and test the complete outgoing and incoming pipelines, including flat armor, mitigation, absorption, reflection and procs.

Use full precision in calculations and round only at defined boundaries. Tooltips and comparisons must use the same conventions. Test unequip/re-equip, temporary buff expiry and save restoration for accidental repeated scaling.

## Design complementary classes

Give each class a useful attack immediately, a recognizable strength, a pressure point, and several viable improvement paths. Compare them at equal earned budgets and encounter times rather than comparing one attack's damage number.

| Role | Possible advantages | Failure to test |
| --- | --- | --- |
| Close combat | Reach, sweeping hits, stronger physical defense, life leech | Dies before reaching targets or becomes permanently invulnerable in a crowd |
| Ranged weapon | Attack tempo, penetration, movement, focused boss damage | Slow single-target shots cannot handle waves |
| Caster | Area coverage, elemental damage, fields, control, equipment autocasts | Basic attack dominates its spellbook or resource starvation prevents casting |

Equipment from any supported slot may grant an ability. Track learned ownership/
rank, equipment grants, shared upgrades and temporary modifiers separately.
Define effective rank, casting and individual-upgrade eligibility, slot use,
cooldown continuity and effect cleanup when the last grant disappears. A simple
project may allow equipment-only autocasts to receive shared bonuses but not
individual upgrades; record the chosen rule. Test equip-unlearned/cast/learn,
overlapping grants, unequip, pending choices and intermediate save/restore. No
duplicate casting, accidental permanent learning or free cooldown resets on swaps.

Give other weapon families equivalent ways to gain identity: area hits, attack speed, mixed damage, penetration or bounded leech. A caster-only weapon system should not leave the other classes with ordinary damage sticks.

Preserve source restrictions only when they support a real build decision. Removed attributes should not survive as equip gates.

## Allow a source-supported companion

When the source has a party, hireling or mercenary system, provide an optional
single active companion rather than reproducing an entire squad. Preserve a
recognizable source identity/role, native appearance, animations and sounds.
Define recruitment/replacement, earned XP and level growth, shared versus personal
rewards, support/combat abilities, equipment ownership if supported, and death/
recovery/dismissal rules. A companion is separate from the three starting player
classes and must not become mandatory for a solo winning route.

Use actual follow, pursuit and combat logic, with legal terrain/door traversal,
readable health/level and useful support targeting. Keep the companion's state,
level, cooldowns, equipment and alive/dead status coherent across travel and saves.
Test solo versus accompanied earned runs, narrow routes, separation/rejoining,
recruitment costs and repeated replacement so the ally cannot duplicate rewards,
gear or free healing. Report navigation recovery rather than silently teleporting.

Where the source provides companion conversation, barks or remarks, reuse those
lines and associated portraits/voice cues in an in-game conversation/log or
contextual remarks. Identify the speaker, preserve localization, use suitable
triggers and cooldowns, and expose text/mute controls; do not spam repeated lines
or invent voiced dialogue and label it original. This is local game dialogue,
not an external messaging integration. Record authored connective dialogue.

Reaudit ally-dependent abilities, item properties and AI when enabling the ally:
heals, wards, revival or support buffs may now have useful targets. A single ally
does not automatically justify every mass/party spell; demonstrate practical value
and balance its opportunity cost. Keep player and companion resource/stat consumers
separate and exclude unsupported dependencies from both playable pools.

## Separate learning from improving

Use distinct rewards for acquiring an ability, improving a specific ability, improving related abilities globally, and improving the hero. This prevents one menu from mixing fundamentally different decisions.

| Reward | Eligible choices | State affected |
| --- | --- | --- |
| Ordinary character level | Hero passives, owned-ability improvements, useful shared improvements | Selected stat pool |
| Periodic learning milestone | New abilities only | Loadout; optional replacement |
| Ability improvement milestone | Two meaningful behavior changes | That learned ability |
| Between-area shop | Repeatable paid improvements | Same legal pools as progression |

Three choices work well for quick in-run decisions. A safe shop can show more. Make every draw usable with the current loadout. Group eligible choices before sampling so a large family cannot crowd out every other kind of reward. Guarantee a useful passive fallback for ordinary draws where possible. When only one family remains eligible, return valid choices rather than inventing false variety.

Once slots are full, ordinary upgrades should improve the existing build. A separate learning milestone may allow replacement, but the player must be able to keep the current spells. State that replacing an ability resets its individual improvements and behavior milestones while shared bonuses remain.

An example rarity schedule is:

| Rarity | Individual ability or hero bonus | Shared bonus |
| --- | --- | --- |
| Common | 5% | 5% |
| Uncommon | 10% | 10% |
| Rare | 15% | 15% |
| Epic | 25% | 20% |
| Legendary | 50% | 25% |

These percentages describe their designated stat base. A rarity's larger numeric bonus need not advance more milestone steps: count successful individual purchases, not percentage size. For integer effects such as chain targets, define a separate rarity-to-target-count table.

After a configurable number of individual improvements, offer a separate behavior choice without consuming another character reward. Examples include faster weaker casts, slower stronger casts, or additional projectiles, fields or summons with reduced potency. Expose tradeoffs, enforce useful caps, queue multiple pending milestones, and save them. A new projectile pattern or field placement must pass collision and performance checks as well as a damage calculation.

Every level-up, shop and behavior-milestone card must state its exact rolled value with unit and base, and the before → after value of each affected stat. Compute the preview by applying the offer to a copy of the current build through the same helpers combat uses, so a card cannot disagree with the result. Do not use fixed description strings for options whose value depends on rarity, level, class or equipment. A card reading "Gain 25 maximum health" at every rarity, or "+10 to Endurance" with no unit, leaves the player unable to compare choices.

```text
Endurance · Rare
Maximum health +15% of base (+16.5 HP): 110 → 126.5; heals the added health
Fireball · Uncommon · Damage / potency +10% of base
Damage 24 → 26.4 · Splash 14.4 → 15.8 · Cooldown 2.0 s (unchanged)
```

Hero passives follow the same rule. Each states what it changes in concrete units (HP, percent of a named base, px/s, HP/s, world units), so a themed name never stands alone. Persistent camp or legacy purchases show the value of one point and the current total next to their price.

When damage or interval changes, show before/after sustained throughput using
runtime values. A repeatable hit may use damage/interval; fields, multihits,
channels, summons and resource-limited attacks need stated contact/target/uptime
assumptions or a more appropriate metric. Label per-target/pre-resistance estimates
and keep recent observed damage separate. Pure support shows healing, capacity,
uptime or control rather than damage DPS. Test mixed speed/damage tradeoffs,
shared multi-ability offers and interval thresholds. Keep each ability's name
and metric scope legible; applying the offer must match its preview.

Luck can improve rarity distribution for both equipment and upgrade offers. Keep quality, drop occurrence, number of choices, and price as separate systems. Test the rarity distribution statistically with and without luck, including caps.

## Build an economy that funds decisions

Currency sources can include ordinary enemy drops, guaranteed encounter rewards, autosold equipment and optional mining. Currency sinks include item purchases, upgrades, healing if supported, and escalating rerolls.

Model the budget at each area:

```text
expected_currency = carried_currency + encounter_rewards + ordinary_drops
                    + sold_items + optional_resource_income
spendable_choices = expected_currency / representative_upgrade_price
```

Keep optional income separate. A player who avoids risky mining should still have a coherent progression path. A player who mines or sells deliberately should gain additional choices without requiring infinite farming.

Use a repeatable shop after extraction: buy as many improvements as affordable, reroll at an explicit price, open inventory, buy/sell items, and press Next when finished. Higher-rarity offers should cost more if their bonuses are larger. Show balance, exact price, rarity, expected improvement and affordability before purchase.

Treat purchases as transactions. Validate the selected offer and target, apply the change once, then debit currency once. A canceled replacement, rejected action, stale offer or double-click must not spend money. Decide whether a successful purchase refreshes all offers or only the purchased slot, then keep that behavior stable.

Use explicit Buy/Choose buttons rather than making the whole card actionable. Discard held input when a modal opens and block its first activation briefly; this avoids a movement or boss-kill click buying an unintended offer. The guard must cover keyboard and touch activation too.

Rerolls should change choices without granting the upgrade. Document whether costs escalate per menu, per area or per run, and when the counter resets. Avoid an endless unaffordable menu by always exposing a valid continue or keep-current action.

## Make equipment drops useful and comparable

Support the source game's meaningful equipment slots, including jewelry and secondary layers. Choose a logical comparison slot before considering shared visual layers. A chest piece with an unusual name still compares with the equipped chest piece.

Filter candidates before rolling, then validate the final item. Every gameplay equipment drop should contain an implemented benefit or a useful granted ability. Cosmetic-only items can remain in a deliberately separate cosmetic system; they should not dilute equipment rewards.

Preserve fixed unique properties where evidence supports them. Keep derived weapon traits separately so generated adaptations never overwrite original values. Assign affix pools by equipment family and include all supported slot families in sampling; otherwise weapons dominate simply because the source catalog contains more of them.

Make loot visible with a consistent container or marker. Automatic walk-over opening reduces missed small items. Check reach, floor and walls before collection, and show the actual item in inventory, shop and comparison views.

Use conservative autosell. Sell an item automatically only when a compatible item is at least as good in every active comparison dimension and better in at least one. Different damage identities, granted abilities, restrictions and meaningful nonnumeric properties can make items incomparable. A scalar score is useful for a simple bot, but is insufficient evidence for deleting a human player's tradeoff.

Share a semantic comparison result across tooltips, autoequip and autosell:
equal, dominates, dominated, tradeoff or incomparable. Define absent-value and
near-equality policies, lower-is-better stats, caps/penalties and meaningful
nonnumeric properties. Missing is zero only where the system defines it so;
display rounding must not delete a real tradeoff. Test an extra useful bonus,
an absent bonus, lost ability grants and class restrictions. Autoequip is an
explicit project policy: if enabled, fill legal empty slots or replace clearly
dominated gear with atomic equip/displacement/sale. Repeated pickups or opening
inventory must not repeat sales or multiply bonuses.

Track protected/favorite/equipped items and define full-inventory behavior. Show autosell income explicitly. Equipped-item hover needs its own stats, while an unequipped item may compare beside it; comparing an item to itself adds no information. Keep scrollable tooltip overlays clear of item and trash targets, and provide a touch equivalent to hover.

Provide player-selectable autoequip and autosell settings plus explicit equip,
remove and sell actions. Compare against all retained compatible items of the
same logical slot, not only the currently worn item. Include companion usability
when its inventory is supported: an item inferior for the player can still be
useful to the ally. Preserve meaningful tradeoffs, favorites and unique effects.

Iterative autosell computes a stable retained set: identify a strictly dominated
unprotected candidate using the shared comparison semantics, sell it once, then
recompute eligibility/comparisons after any sale or automatic equipment change.
Continue until no eligible dominated item remains. Every sale needs a retained
compatible dominator; preserve the non-dominated alternatives. Do not treat equal
duplicates as strictly inferior without an explicit duplicate-sale policy. Use
stable IDs/order, stop when no change occurs, and never sell the last useful item
for a slot or repeatedly swap equal gear. Preview the sale set and show proceeds.

Test a chain of three progressively better same-slot items in different pickup
orders, incomparable tradeoffs, equal duplicates, restrictions/ability grants,
protected and equipped items, companion-only gear and full inventory. The final
retained choices and proceeds must follow the declared policy without double
sales, lost equipment or repeated stat application after load/reopen/reprocessing.

## Preserve coherent zones and native geography

Build a zone catalog from named region boundaries, actual map geometry, and spawn data. Associate each area's biome, scenery, local creatures and boss candidates with that zone. A region name alone is not a spawn table, and a sprite catalog alone cannot establish where a monster belongs.

Rank regions using native creature strength, considering a typical measure and dangerous outliers. Median ordinary HP, damage, attack frequency, ranged behavior and population are more informative than a single weakest creature. Keep rare source bosses out of early ordinary waves.

Shuffle within difficulty brackets, then normalize the selected route upward so an unlucky region order does not reduce the target HP, damage or rewards. Preserve differences among creatures within a region. For example:

```text
target_hp[i] = max(native_typical_hp[i] * authored_progression[i],
                   target_hp[i-1] * minimum_step)
local_hp_scale[i] = target_hp[i] / native_typical_hp[i]
```

Use equivalent schedules for damage and rewards with their own coefficients. Route growth, difficulty settings, within-area pressure and boss promotion are separate layers; report the final values to detect double scaling. Even a modest per-area multiplier becomes large across a long route: inspect the last area mathematically before relying on opening playtests.

Copy original sections verbatim when possible, including heights, buildings, floors, furniture and lights. For stitched worlds, use native transition tiles rather than color interpolation, and complete lakes, coastlines and mountain contours. Keep natural barriers meaningful.

Named region rectangles describe provenance; they should not create invisible walls on otherwise connected terrain. Expand cramped crops into the neighboring native map and recompute collision, walk heights, connected floor, radar, scenery and spawn candidates. Measure reachable tiles rather than only image dimensions. A larger crop cannot create more floor inside a physically sealed dungeon.

Audit floors and occlusion together: actors, corpses, ore and loot use the correct walking surface; furniture stays on its support; upper floors remain visible outside a building; only foreground objects overlapping the character activate cutaway or transparency. Preserve world positions when a crop origin changes, including existing saves and spell endpoints.

Choose entry, exit, ore and spawn points from reachable cells with body clearance. Validate a walking path rather than relying solely on visual grass or a passable flag. Test narrow doors, stair entries, corners and large promoted bodies. Movement abilities may bypass intermediate walls intentionally, but their destinations must remain legal and on a supported floor.

## Pace waves and extraction explicitly

Use elapsed active combat time to schedule waves and the boss. A kill quota can stall a run behind unreachable enemies and encourages clearing too slowly; timed pressure gives a clear progression clock.

Set a density target before choosing wave sizes: arriving enemies per second and a typical alive count on screen, measured with an entry-level build. A starting hypothesis is 0.8–1.7 arrivals per second at the first area (for example 25–50 creatures every 30 seconds), increasing within the area and along the route. Check the alive count in play; if early areas show only a handful of enemies, area weapons, chains and fields have nothing to hit and the genre's crowd pressure disappears. Bounding wave growth by route progress is reasonable for very long routes, but a low absolute ceiling (for example 8 growing to 24 per wave) makes every area feel empty. Grow density within each area as well, so the boss and escape phases feel more crowded than the opening.

Randomize wave size within a configured range and distribute placements around usable space. Add an encounter leader to every scheduled wave if leaders are the equipment source. Queue failed placements rather than silently losing enemies or guaranteed rewards. Keep combat identity local to the current zone.

Continue pressure through the boss fight. After boss death, expose the exit immediately, preserve remaining loot, and allow a short collection period. Increasing reinforcements and a visible extraction deadline make departure a decision without allowing unlimited farming. State the consequence of missing the exit. Pause reward and inventory interactions consistently with the chosen active-time rules.

The safe shop begins after entering the exit. Do not interrupt the boss death with a purchase modal while the player is still steering through drops. Advancing the shop loads the next area; completing the final area's flow wins the run.

World transitions need deliberate activation: legal reachable ground with
clearance from the player, reward pile and hazards, plus a suitable interaction,
arming, hold or release-and-reenter policy. Use active-time clocks. Test a boss
kill while steering/holding input, a flying/off-floor death, remaining reward
collection and pause/save/continue. No instant unintended departure or stranded
exit; guaranteed placement failures must retain a recoverable transition.

Choose visible or offscreen spawning deliberately. For on-screen spawning, use a readable arrival effect and exclude unfair contact spawns. For offscreen spawning, place just beyond the current camera edge with a valid route inward. In either case derive distance from the actual viewport, zoom and elevation rather than a fixed world circle or remote map edges. Test both wide desktop and narrow portrait screens.

Optimize unbounded populations with spatial indexing, budgeted pathfinding, cached visibility and careful effect counts. If performance requires a population cap, make it an explicit design change rather than silently canceling queued waves. A burst of 50 enemies need not instantiate all rendering and navigation work in one frame.

## Add optional resource risk

Finite deposits reward standing close and still for a visible mining duration. This exchanges movement safety for money and gives the player a reason to delay extraction without requiring a separate mining control.

Place deposits on reachable floors, within an interaction distance that does not require overlapping their collision. Show progress, remaining quantity, pickup feedback and the wallet. Reset or pause progress according to a documented rule when the player moves away or changes floors. Remove the deposit when depleted; save its remaining contents so loading cannot refill it.

Test mining under pressure. It should be a tempting optional source, not safe income from a disconnected ledge and not an economy requirement disguised as an optional feature.

## Validate combat before tuning damage

An enemy that cannot reach or target the player is a movement or targeting defect. Increasing its damage will not fix the encounter. Validate attacks, floor checks, range, line of sight and pathfinding first.

Targeted enemy spells need a casting range, warning, impact timing and a reliable dodge rule. Decide whether leaving range cancels a cast, whether a marked ground position stays fixed, and which effects can be reflected. Wider ranges can work when warnings and movement provide counterplay; unavoidable screen-wide hits need another escape or mitigation mechanism.

Give bosses readable attacks and survivable mistakes. Large HP multipliers should be checked against actual earned single-target damage. Native high-tier creatures should retain their identity without appearing as weak early trash.

Test sustain as a system. Compare incoming damage after defenses with regeneration, healing, leech and shields over a time window. If recovery permanently exceeds incoming pressure, standing still can become the best strategy.

Useful controls include delayed recovery after damage, capped healing per proc, shared proc cooldowns, diminishing returns and bounded resistance. Choose controls that preserve intentional healing builds. Test recursive procs for unlimited triggering. With a shared contact invulnerability window, ensure a weak overlapping creature cannot indefinitely protect the player from a boss by winning array order.

## Run reproducible balance experiments

Keep the simulation independent of graphics, audio and interface. Use the same combat, rewards, collision and progression code as the playable build. Seed randomness, save the initial state, and record source/configuration hashes with every result.

Use several kinds of experiment because each answers a different question:

| Experiment | What it establishes | What it cannot establish alone |
| --- | --- | --- |
| Formula and transaction tests | Correct stacking, cooldowns, prices, cancellation and restoration | Whether combat is enjoyable |
| Small encounter probes | Targeting, attack identity, mitigation, boss time to kill | An earned campaign economy |
| Native navigation probes | Legal spawning, floor transitions and pursuit for sampled bodies | Every hiding location or every monster size |
| Synthetic build stress | Potential abuse under a stated generous allocation | Whether a player can earn that allocation |
| Earned campaign bots | Progression under the bot's real reward and purchase policy | Human win rate or strong tactical play |
| Human sessions | Readability, decisions, control, fatigue and practical difficulty | Broad distribution coverage from a few runs |
| Packaged device sessions | Actual loading, input, rendering and frame pacing | Balance across all builds and routes |

Run a matrix across classes, difficulty, seeds, area checkpoints, builds, body sizes and screen shapes. Include stationary, movement/collection, defensive, damage, area and low-luck policies. Test no-shopping or no-mining paths when those systems are optional. Sample difficult native geometry as well as open terrain.

Interpret stationary play by mode and build: Easy's mostly stationary combat
wins are intended; mature defense may legitimately earn safety. In Medium/Hard,
use it to diagnose whether threats, reachability and sustain obey the chosen
contract. A movement bot must navigate and collect rather than follow one circle.
Report recovery teleports or other escape fallbacks because they can mask defects.

For synthetic builds, state the exact level, passive purchases, ability purchases, equipment, luck and free resources. For earned campaigns, buy with real currency, respect replacement and shop rules, and avoid free heals or restored consumables at area transitions. If the harness abstracts exit travel, omits mining, or uses a simplistic item score, record that limitation with the results.

Record these measurements:

| Family | Measurements |
| --- | --- |
| Outcome | Seed, route, class, difficulty, reached area, death/win/horizon/abort and active time |
| Player power | Base/current HP, defenses, recovery, per-attack and per-ability damage, intervals, coverage, loadout and sources |
| Enemy pressure | Spawned/alive counts, queue delay, native/scaled HP and damage, hit frequency, boss HP and time to kill |
| Movement | Time stuck, failed paths, failed placements, body clearance, floor changes and recovery events |
| Economy | XP, level timing, gold by source, purchases, rerolls, chest counts, quality, empty slots and autosell income |
| Sustain | Incoming damage, actual healing, overheal, absorbed damage, proc counts and uninterrupted stationary survival |
| Performance | Simulation cost, frame-time percentiles, worst stalls, active effects/projectiles, decoded bytes and asset loads |

Instrumentation must not consume extra random numbers or change game state. Attribute recursive proc damage once, and separate actual healing from attempted healing. Use source hashes to prevent old output from being mistaken for a result of the latest build.

Keep simulated time and wall-clock budgets separate. Reaching a horizon means survival for that duration, not victory. A CPU timeout or blocked reward menu is incomplete, not a successful clear. Paired seeds help compare versions, but altered proc behavior can change subsequent RNG draws; they do not guarantee identical encounters.

## Tune with a specific hypothesis

Set initial targets before running experiments. Example starting hypotheses for a new port might be ordinary enemies taking 0.5–2 seconds to kill at entry, a first boss taking 20–45 seconds of active engagement, and a warning allowing enough time to cross its danger radius. Replace these numbers with measured targets for the intended attack pace and controls.

Useful estimates are:

```text
single_target_dps = damage_per_hit * hits_per_second * practical_hit_fraction
boss_time_to_kill = boss_effective_hp / practical_single_target_dps
net_hp_loss_rate = post_defense_incoming_dps - actual_recovery_per_second
time_to_die = available_hp / net_hp_loss_rate       # only when rate is positive
estimated_population_growth = spawn_rate - kill_rate
```

Area damage and crowd density make practical damage depart from paper DPS. Recovery and burst damage make average time to die insufficient on its own. Use these estimates to locate problems, then verify with the actual simulation and human play.

Change one system or a tightly related set, preserve before/after data, and rerun the failing scenario plus relevant regression checks.

| Observation | Inspect first | Possible change after diagnosis |
| --- | --- | --- |
| Standing still is safe | Reachability, hit selection, recovery and damage floor | Fix navigation/contact bugs; bound recovery; then adjust pressure |
| Frequent early unavoidable deaths | Caster frequency, overlapping warnings, range, start budget and terrain | Stagger threats, improve counterplay, move dangerous families later |
| Boss lasts too long | Earned boss DPS, source HP, route scale, pressure and promotion | Reduce the responsible multiplier or increase useful focused damage |
| One class falls behind | Coverage, tempo, access to procs and economic opportunity | Improve its distinct mechanic before erasing class differences |
| Later areas become easier | Native roster variance, route normalization and earned growth | Raise progression floors while preserving local creature differences |
| Late route becomes impossible | Compounded area growth and expected earned upgrades | Flatten long-run scaling or shorten the route; verify earned checkpoints |
| Loot feels repetitive | Slot sampling, active affix pools and comparison compatibility | Sample by useful family, protect tradeoffs, remove dead fields |
| Shops offer nothing useful | Eligibility after caps, grouping, prices and full loadouts | Filter capped stats, keep useful fallback choices, repair price pacing |
| FPS returns without crowd reduction | One-off path searches, decode/GC bursts, particular effects and terrain rebuilds | Profile worst frames and budget expensive work; do not assume count alone |
| A zone feels cramped | Connected reachable floor, crop boundaries and body clearance | Expand the native crop or select a more suitable original section |

After deterministic checks pass, play fresh starts and earned mid/late saves. Ask players what they understood, why they selected an improvement, why they were hit, and whether they could have left safely. Distinguish a missing effect or unreadable warning from an underpowered ability.

Call a route balanced only for the tested scope. Opening-area tests do not establish a complete campaign; sampled navigation does not prove every position. Keep unresolved findings next to the corresponding result.

## Make the interface explain the rules

Reuse source fonts, icons, buttons and recognizable inventory language where available. Short labels and a small number of actions suit an autocast game better than the source RPG's entire interface.

Keep the battlefield readable: player, warnings, loot and exit first; minimap and currency visible; progress and less urgent statistics compact. Ensure HUD elements do not overlap at desktop, portrait and touch zoom. If icons can be dragged, persist positions and provide reset-to-default.

Provide a current-stats screen reachable during a run. It lists at least maximum HP, movement speed, regeneration and its post-damage rule, pickup radius, luck, attack tempo, each resistance channel and each damage bonus channel. For each stat, show base value, current value, and the contributions of class, items, passives, shop purchases and temporary effects, in the formula's own order (for example `class base 5% × (1 + items 10% + passive 15%) + flat 3 = 9.25%`).

Provide ability inspection with base value, current value, item contributions, passives, individual improvements, shared improvements, behavior milestones and temporary effects. Use the same calculation helpers as combat. Include cooldown, affected targets, radius convention and duration, not only damage. Open it from the HUD ability slots on hover, keyboard focus and tap, without pausing the run for hover. Where possible also show recent feedback, such as damage or healing dealt over the last minute, which answers the ability audit's question of what the player can see an ability contributing.

Provide a bestiary. List each creature with its source identity, appearance variants, the zones where it appears, encounter roles (ordinary, champion, boss) and its scaled HP, damage, attack type and range, resistances and statuses for the current route. Let the player filter by the current zone's roster so they can learn what they are facing. Keep source values and scaled values separately labeled.

Inventory needs visible empty slots, clear equipment targets, dragging or a touch equivalent, explicit discard/sell affordances, and overlays that do not obstruct selection. Shop item art should match inventory art. Gold and important pickups should give immediate feedback near the character and in the wallet.

Preserve continuous tap/hold movement on phones, avoid accidental page gestures in the battlefield, and keep interactive panels scrollable. Test hover information through tap/focus as well. Use a conservative default audio level and persistent volume control.

## Specify persistence and transitions

Write a reset table for new run, continue, death, victory, next area and new profile. Explicitly separate run inventory and upgrades from any intentional camp stash or permanent progression. A New Run action must not silently restore the previous backpack.

Save pending choices, purchases, reroll counters, milestone queues, exit time, remaining deposits, cooldowns and the native map origin. Pause behavior must agree between simulation, UI and saves. Make migrations idempotent so loading twice does not halve boss HP twice, grant a milestone twice or translate positions twice.

Revalidate retired abilities and inactive item stats when restoring older saves. Preserve earned identity and supported bonuses where possible. Store RNG state and stable content IDs so continuing does not reroll uniques, refill ore or replay guaranteed leaders.

## Reuse the method in the next port

Create a small mechanics profile before adding the full catalog:

```yaml
# Design specification example; adapt it to the target runtime.
combat:
  resources: [health]
  damage_channels: [physical, elemental]
  basic_attack: automatic
  manual_actions: [move, escape]
  bonus_stacking: additive_per_documented_base
progression:
  ordinary_choices: 3
  learning_every_levels: 5
  new_ability_choices: 3
  individual_milestone_every_purchases: 5
  behavior_choices: 2
economy:
  shop_after_exit: true
  shop_choices: 5
  repeat_purchases: true
  luck_changes: [equipment_quality, upgrade_quality]
zones:
  roster: local_source_spawns
  order: shuffle_within_difficulty_brackets
  growth: monotonic_targets
  first_boss_seconds: 120
  wave_interval_seconds: 30
  finite_extraction_seconds: 30
```

For each imported ability and stat, keep this audit row:

```text
source ID | source behavior and evidence | keep/adapt/exclude/defer
runtime consumer | automatic target/trigger | useful upgrades and caps
player feedback | validation scenario | remaining issue
```

For every balance change, keep this experiment record:

```text
Hypothesis and player problem:
Source/configuration hashes and build:
Seeds, route, classes and difficulties:
Earned or synthetic build; exact budget and control policy:
Scenario, geometry, device and active/wall-time limits:
Before metrics:
Change:
After metrics and regressions:
Human observation:
Conclusion, tested scope and unresolved cases:
```

The first playable slice should prove movement, one enemy, one attack, one meaningful upgrade, one useful equipment drop, a boss, an exit, the shop, and save/continue. Then add content families in batches and repeat the same audits. Finish with complete earned-route playtests, worst-frame profiling, packaged input checks, and documentation of the actual settings shipped.
