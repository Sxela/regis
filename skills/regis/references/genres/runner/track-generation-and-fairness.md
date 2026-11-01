# Track generation and fairness

Apply the selected defaults and user overrides in the [module workflow](workflow.md).
Only selected systems require their corresponding scenarios.


A runner is only as good as its track. The player must always have an answer,
must see the question in time, and must lose only to their own mistakes. This
guide defines the movement contract, the chunk grammar, the solver that proves
fairness, and the tests that keep it proven.

## Write the movement contract first

Record these values in `docs/track-fairness.md` before generating content, in
simulation units (meters and seconds), not pixels:

| Quantity | Meaning |
| --- | --- |
| Lane count and width | Three lanes by default; width sets visual spacing and side-hit tolerance |
| Lane-change time | Seconds to move one lane; two-lane changes take twice as long unless buffered |
| Jump duration and clearance | Airtime and the height cleared; which hazard heights it beats |
| Slide duration and clearance | Ground time under low obstacles; whether slide cancels jump (fast-fall) |
| Speed curve | Start speed, growth per second or per meter, cap per difficulty |
| Reaction window | Time from a hazard becoming readable to the last moment an answer works |
| Input buffer and grace | Buffered input window; coyote/grace time for late answers; hitbox insets |

The reaction window shrinks as speed grows. Compute it at the speed cap for each
difficulty: `window = (visible_distance - answer_distance) / speed`. If the window
at top speed is below the agreed minimum, cap the speed, extend view distance or
lengthen telegraphs; do not leave it to luck.

## Represent the track as rows of lane cells

Discretize the track into rows (for example every 2–4 meters). Each lane cell in
a row holds at most one hazard and any number of pickups:

| Cell content | Answer | Notes |
| --- | --- | --- |
| Empty | Any | Pickups may sit here |
| Full blocker | Change lane | Tall prop, wall, vehicle; collision ends or damages the run |
| Low hazard | Jump (or change lane) | Barrier, pit, damaging floor strip |
| High hazard | Slide (or change lane) | Overhead bar, gap under a door, beam |
| Enemy | Destroy (genre) or change lane | Must die in time or leave the lane open; a kill must not be the only answer unless ammo/attacks are guaranteed |
| Projectile lane | Change lane, or jump/slide if its height allows | Telegraphed by the firing enemy's wind-up |
| Gate / boss | Defined by the boss contract | Bosses keep at least one safe lane per attack |

Hazards come from source art: a source barrier for a low hazard, a source doorway
or pipe for a high hazard, a source pillar or machine for a full blocker.

Damaging floor strips come from the source's damaging surfaces (acid, slime,
lava, toxic water). Use the area's own surfaces where it has them, play their
native animation sequence, derive damage from the source's surface damage, and
honour the source's protective items. A floor hazard can span adjacent lanes as
one pool, but never every lane. These floor hazards also suit boss arenas,
where obstacles must not hide the boss (see the boss contract in the
[mechanics guide](game-to-runner-mechanics.md)).

## Chunk grammar

Author or extract **chunks**: short sequences of rows with a name, biome tag,
difficulty band, entry and exit lane sets, and required abilities. The generator
stitches chunks:

1. Choose the next chunk from the biome's pool by difficulty band and recent
   history (avoid repeats; ramp intensity; insert breathers).
2. Require the previous chunk's exit lane set to overlap the next chunk's entry
   set, or insert a transition chunk.
3. Seed everything from a single run seed plus chunk index, so any row is
   reproducible from `(seed, index)`.
4. Place pickups on reachable cells only, preferably on the safe line, with
   optional risk lines for better rewards.

Procedural rows (random per-row placement) are acceptable when the solver below
filters them; chunk authoring gives better rhythm and readability.

## Prove reachability with a solver

Run a reachability pass over generated rows. Model the player state as
`(row, lane, vertical state)` and allowed transitions from the movement contract:
stay, move one lane (or two if the row spacing at current speed allows it), jump,
slide. A state is legal if the cell's hazard is answered by that state. A row
sequence is fair if a path exists from every reachable state of the previous
row. Use a breadth-first sweep across rows; it is linear in rows × lanes.

Reject or repair any unfair row at generation time (open a lane, change the hazard
type, or space the rows). Enemy cells count as passable only through the lane-change
answer unless a kill is guaranteed by construction (for example, infinite fallback
ammo and enough time-to-kill at that speed). Projectile lanes count as blocked
for the impact rows.

Also reject patterns that are technically solvable but unreadable:

- A hazard hidden behind another hazard in the same lane until too late.
- Two consecutive answers that need contradictory inputs inside the input buffer.
- Pickups that lure the player into a forced loss.
- A spawn or projectile appearing inside the reaction window.

## Telegraphs and readability

Every hazard and every enemy attack has a readable telegraph in source art or
sound: a visible obstacle at distance, an enemy wind-up frame, a muzzle flash, a
warning sound, a floor highlight. The telegraph must appear before the reaction
window starts. Fog or darkness from the source is welcome atmosphere, but it
shortens visibility; account for it in the window computation. Test telegraph
visibility at the smallest supported viewport and under the busiest HUD.

## Speed, rhythm and biomes

- Start each run with a safe opening (several seconds with no hazards and a few
  pickups) so the first death cannot come before the player has their bearings.
- Intensity rises within a biome and resets slightly at each biome start.
- Insert breathers: short calm stretches after dense chunks and before bosses.
- Biome transitions use a recognizable gate from the source (door, portal,
  teleporter, level exit) and change wall/floor/sky art, roster and hazards.

## Collision fairness

- Use hitbox insets so near misses read as misses.
- Resolve lane-change collision against the target lane only after the change
  passes the lane midpoint (or another declared rule).
- Apply a short grace time for answers that begin slightly late.
- Use invulnerability frames after damage so one mistake cannot chain into
  several hits from the same obstacle cluster.
- Never deal damage from an object the player has not been able to see.

## Required tests

| Test | Pass condition |
| --- | --- |
| Determinism | Same seed gives identical rows, pickups and spawns |
| Reachability sweep | Zero unfair rows across at least 10,000 generated rows per biome and difficulty |
| Transition audit | Every chunk boundary and biome transition passes the solver |
| Reaction window | Every hazard is readable for at least the minimum window at the speed cap |
| Opening safety | No hazard in the declared opening distance on any seed |
| Spawn audit | No enemy or projectile appears inside the reaction window |
| Regression seeds | Every reported unfair death has a seeded replay asserting it no longer happens |

Report the counts with the generator version and seed ranges. A passing sweep
proves solvability for the modeled player, not readability for a human; keep
rendered and human checks separate.
