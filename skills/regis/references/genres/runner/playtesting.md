# Runner playtesting supplement

Apply the selected defaults and user overrides in the [module workflow](workflow.md).
Only selected systems require their corresponding scenarios.


Read [shared playtesting](../../playtesting-and-balance-log.md) first.

## Runner survivability protocol

Survivability is the central runner playtest. Run it on every build that changes
generation, speed, hazards, enemies, weapons, economy or collision.

### Evidence tiers

| Tier | Method | Counts as gameplay evidence? |
| --- | --- | --- |
| A | Unit/property tests of isolated rules | No |
| B | Headless seeded simulation importing the real game module | Survival distributions for stated policies; not rendered evidence |
| C | Automated agents driving the rendered build through real keyboard/touch input | Yes, earned gameplay evidence |
| D | Human playtests | Yes, reported separately from automated claims |

Never conflate tiers in reports. A tier-B survival rate is not a tier-C result.

### Agent profiles

Agents read only what a player can see: rows within the visible distance, enemy
telegraphs that have started, HUD values. They act through the same input queue
as the player.

| Profile | Reaction delay | Look-ahead | Errors | Combat and pickups |
| --- | --- | --- | --- | --- |
| Novice | 350–500 ms | Nearest hazard only | 8–12% wrong or missed inputs | Fires when an enemy is in lane; ignores most pickups |
| Average | 200–300 ms | Two or three rows | 2–4% errors | Fires sensibly, collects pickups on the safe line, switches weapons on ammo |
| Expert | 80–150 ms | Full visible distance, solver-guided | ~0% | Plans lanes, conserves ammo, takes risk lines for rewards |

Record the exact parameters used; they are policies, not human models. Add a
do-nothing probe (never steers) and a greedy pickup-chaser as diagnostics.

### Required scenarios

1. First run, starter equipment, the safe opening and the first 15–30 seconds.
2. Generator sweeps: large fixed-seed samples per biome and difficulty, every
   chunk and biome transition (see [track fairness](track-generation-and-fairness.md)).
3. All three agents × three difficulties × three starting runners, at least the
   project's minimum seeds each (30 is a useful floor), with fresh gear and with
   gear earned by an agent over a stated number of runs.
4. Enemy DPS versus runner health; ammo starvation; safe dodge windows; boss
   telegraphs; no mandatory lucky drop.
5. Autoequip decisions, inventory/shop transactions, permanent upgrades and
   save/reload across the end-round flow.
6. Long runs at the speed cap, many entities, mobile swipe latency, portrait and
   landscape, background/resume without catch-up damage.
7. Readability: contrast, hazard silhouettes against biome textures, no invisible
   hits, no spawns inside the reaction window.
8. A seeded regression replay for every defect found.

### Audit that each system actually creates pressure

Before tuning, read damage taken by source for every agent profile. If the genre
module (monsters, weapons, spells) contributes almost none of the damage, agents
are treating enemies as lane blockers and the module is decorative, whatever the
kill counts say. Typical fixes are source-grounded: native spread or splash that
reaches adjacent lanes, attack cadence, resource scarcity, rather than invisible
damage. Likewise, zero resource-starvation time means the ammo or mana economy
does not matter. Treat long boss phases, horizons and aborts as defects to trace
(for example, an automatic fallback to melee that never switches back when ammo
returns) before treating them as balance data.

Read expert results as evidence of winnability. An expert profile with
near-optimal reactions and no errors may clear Hard almost every time; that
supports fairness, while novice and average profiles carry the difficulty
contract.

### Report format

Record build/commit, source version, hardware/browser, viewport, date, difficulty,
runner, agent profile and parameters, gear source, seeds and sample size. Report
mean/median/p10/p90 survival time and distance, biome-clear fraction with a
confidence interval, death causes by hazard/enemy ID, damage by source, ammo
starvation time, loot found and autoequipped, currency earned, and frame timing
for rendered runs. Mark unrun items BLOCKED, never PASS.

### Stop-ship failures

Unavoidable patterns; damage without a visible telegraph or counterplay; mobile
controls not working; crashes or corrupted saves; item or currency duplication;
autoequip displacing locked gear; a broken end-round shop; survival that depends
on permanent upgrades for the first biome; and claims of playtest success that
were not earned at the stated tier.
