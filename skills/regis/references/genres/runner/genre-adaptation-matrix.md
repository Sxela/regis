# Genre adaptation matrix

Apply the selected defaults and user overrides in the [module workflow](workflow.md).
Only selected systems require their corresponding scenarios.


The runner layer (lanes, jump, slide, hazards, speed) is shared. The genre module
distinguishes a shooter-based, RPG-based or racing runner. Pick
modules from the source's actual systems; combine modules for hybrid games. Never
force a module the source lacks unless it adds demonstrable value, and label it
as an authored adaptation when you do.

## Module table

| Module | Runner verbs added | Source assets to preserve | In-run progression | Persistent progression |
| --- | --- | --- | --- | --- |
| shooter | Fire (auto-aim down the current lane, optional auto-fire), weapon switch, reload where native | Weapons with native names/damage/fire rate, ammo types and pickups, monsters, projectiles, hit/death frames, weapon sounds | Weapon pickups, ammo, armor, power-ups | Weapon unlocks and variants, ammo capacity, armor, starting loadout |
| action-rpg | Attack/cast while running, skill hotkeys or autocast, potion use | Classes, gear with native affixes/rarities, monsters, spells, dungeons | XP and levels, skill choices on level-up, loot with rarities, autoequip | Stash, gear, shop, skill/passive tree, global bonuses |
| jrpg | Timed command windows at encounter gates, party assist triggers | Party members, monsters, spells, items, regions, battle UI | XP, party levels, spell unlocks | Gear, party roster, upgrades |
| platformer | Double jump, wall-run lanes, stomp, power-up states | Tiles, hazards, characters, power-ups, collectibles | Power-up states, collectible arcs | Ability unlocks, lives/boosts |
| racing | Steering lanes, boost, drift, near-miss rewards | Vehicles, tracks, traffic, boost pads, HUD | Boost meter, pickups | Garage tuning, vehicle unlocks |
| strategy | Lane unit deploy, resource pickup, tactical branch choice | Units, factions, buildings, maps | Resource-funded deployments | Tech tree, unit upgrades |
| survival-horror | Scarce ammo, stealth windows, chase sequences, flashlight | Monsters, lighting, locations, sounds, item boxes | Limited supplies, healing items | Equipment, storage, upgrades |
| sports | Precision gates, timing challenges, ball/equipment pickups | Athletes, venues, balls, equipment | Combo/streak meters | Skills, training, kit |
| puzzle-adventure | Fast readable path/choice puzzles, interactable objects | Rooms, characters, puzzle symbols, items | Keys, inventory items | Abilities, area unlocks |
| sandbox | Gathering on the run, crafting at round end, vehicle segments | Biomes, tools, NPCs, resources | Resource collection | Crafting recipes, infrastructure |
| fighting | Duel gates with lane-based blocks/counters, combo strings | Fighters, moves, stages, hit sparks, announcer | Meter, combo finishers | Move unlocks, fighter roster |
| stealth | Detection cones as lane hazards, takedown windows | Guards, gadgets, levels, alert UI | Gadget charges | Gadget upgrades |
| rhythm | Beat-synced hazards and lane inputs | Songs, note art, venues | Combo multiplier | Song/track unlocks |

## Shooter module specifics

- **Auto-aim and lanes.** A shot travels down the runner's lane (and adjacent
  lanes for spread weapons). Many classic shooters already used vertical
  auto-aim; record whether the source did.
- **Hitscan enemies need telegraphs.** Instant source hitscan is unavoidable at
  runner speed. Adapt it with a visible wind-up (the native attack frame) and a
  short window to leave the lane, and record it as an adaptation.
- **Weapons keep identity.** Preserve relative damage, fire rate, spread, ammo
  type and sound. A shotgun is a spread, a rocket has splash and self-damage
  rules (decide and document), a melee weapon needs an approach window.
- **Ammo economy.** Ammo pickups come from the source's pickup set and enemy
  drops. Running dry must leave a viable fallback (native melee or pistol), not
  a dead run.
- **Monsters keep roles.** Fodder, ranged casters, chargers, flyers, tanks and
  bosses. Map each to lane behavior: walks toward you, strafes lanes, fires
  projectiles down a lane, charges, hovers, blocks a gate.
- **Autoequip.** Many shooters switched automatically to a newly picked-up
  stronger weapon; follow source behavior and the shared utility rule.

## RPG module specifics

- **XP and levels.** Kills and pickups grant XP; levels raise base stats and
  offer a skill or passive choice (three options, pause or slow-motion picker).
- **Loot.** Drops have native rarities and affixes, filtered to stats with a
  runtime consumer in the runner (see the mechanics guide's stat audit).
- **Autoequip.** Equip the item with the highest build utility when it strictly
  dominates or clearly exceeds the current one; never displace locked, set-bonus
  or build-defining items silently.
- **End-round management.** Inventory, paperdoll comparison, sell/buy, stash,
  and a global progression tree that persists across runs.

## Shared rules across modules

- Map every included source area to a distinct biome with source-grounded chunk
  sets, hazards and roster.
- Bosses use original enemies or source-consistent antagonists, with a gate the
  run cannot bypass and readable attack telegraphs.
- Preserve native naming and item/stat semantics where supported.
- Give each module at least two meaningful decisions beyond lane selection
  (for example weapon choice versus ammo conservation, or skill picks).
- Autoequip utility is estimated encounter effectiveness adjusted for
  survivability, resource economy, restrictions, synergies and player locks.
- When the source lacks a system, label the invention and explain how it fits
  the source fantasy.
- Record module selection and the reasons in `genre` in the project
  configuration and in `docs/genre-adaptation.md` of the generated game.
