# Playtesting and balance workflow for game ports

Use this process to turn observations into tested changes for any game or standalone port. Keep the reusable method, each project's configuration, and that project's historical results separate. Examples below are hypothetical diagnostic patterns, not measured outcomes or prescribed settings.

Adapt the process to characters, units, vehicles, weapons, abilities, resources and objectives that actually exist in the target game. A game without classes, equipment or currency does not need those systems merely to follow this workflow. For survival adaptations, see the [mechanics guide](game-to-survivors-mechanics.md); [UI](nostalgic-ui-workflow.md) and [promo](promo-video-workflow.md) have separate validation workflows.

## Define the intended experience

Describe the important player actions, threats, progression, session length and difficulty. Identify which source-game properties preserve identity and which are deliberate adaptations. Separate mandatory systems from optional activities such as gathering or trading.

Set measurable initial targets, then revise them through play. Examples include time to defeat a basic enemy, usable warning/reaction time, major-encounter duration, improvement frequency, affordable purchases per stage, or stationary survival time. Record units, starting build and conditions. A slow tactical game and a fast action game need different targets.

Keep raw bases and configuration separate from content identities. Define every stat's consumer, stacking rule, cap and display precision before changing it.

## Capture reproducible observations

Record what the player saw before interpreting its cause. “Stalls recover without many enemies disappearing” is an observation; “too many enemies” is one possible diagnosis. A preference for faster combat or a larger map is not automatically a correctness defect.

| Category | Information to record |
| --- | --- |
| Build | Version, configuration/content hashes, modifications and save version |
| Scenario | Seed, map/stage, elapsed time, objective and encounter state |
| Player | Character/unit type, equipment, abilities, improvements and resources |
| Input | Mouse, keyboard, touch or controller; actions before the problem |
| Device | Hardware, rendering settings, viewport, scaling and input latency |
| Evidence | Recording, screenshot, save/replay and relevant telemetry |
| Outcome | Expected behavior, observed behavior, frequency and severity |

When a seed, date or build is unknown, mark it unknown. Preserve reports even when the first diagnosis proves wrong. Distinguish human observations, mechanical verification, synthetic stress and earned progression experiments.

## Keep acceptance evidence current

Each acceptance result identifies the relevant code/configuration fingerprints,
asset recipe, content IDs, seed/route/checkpoint, controller and grants, runtime,
device/input/viewport, exact command or replay, expected result, observed outcome
and retained artifacts. A subsystem digest or explicit input list is sufficient;
an unrelated documentation edit need not invalidate combat. After a relevant
change, mark the claim stale, retain its historical report and rerun affected
scenarios before using it as current acceptance. Never silently relabel old wins,
navigation probes or media reviews as results for a replacement build.

| Changed input | Required affected review |
| --- | --- |
| Map origin, support, collision or crop | Placement, actual pursuit/traversal, pickups/exits, saved positions and matched rendered views. |
| Targeting, contact policy, procs or recovery | Hit selection/accounting, controller use, reported sustain cases and affected earned encounters. |
| Rewards, prices, item pools or grants | Eligibility, previews/transactions, comparison and earned build feasibility. |
| Viewport, zoom, input or HUD/modal layout | Arrival/warning visibility, escape space, control release and difficult UI states. |
| Asset mapping, palette or projection | Contextual visual/motion probes and affected gameplay feedback. |
| Illustration, generated clip, audio or edit | Actual revision's identity, shot promise, motion/audio and exported master. |
| Packaging or asset lookup | Clean extraction, launch, save/input and delivered documentation. |

Keep the smallest deterministic reproduction of each reported defect alongside
broader campaigns. Reconstruct unknown checkpoint details explicitly. Do not
close a report because a nearby optimization shipped or a different seed passed.

## Classify the problem before balancing it

| Family | First question | Example |
| --- | --- | --- |
| Functional defect | Does the advertised mechanic execute? | A status icon appears but changes nothing |
| Navigation/geometry | Can actors reach and interact on the intended surface? | A powerful enemy cannot hit through a broken floor boundary |
| Readability/control | Can the player perceive and respond? | Effects obscure an otherwise usable warning |
| Content mapping | Was the correct source data/behavior imported? | A late threat enters an opening pool with generic weak stats |
| Numerical balance | Does a working mechanic create the intended pressure? | Modest recovery permanently exceeds incoming damage |
| Progression/economy | Can the assumed build actually be earned? | An allegedly normal build costs more than the route supplies |
| Performance | Which operation produced the slow frame? | A path search or decode spike occurs independently of population |

Fix execution, mapping and reachability before compensating with numbers. More damage cannot make an unreachable enemy dangerous, and better rarity cannot make an item with unsupported properties useful.

## Audit useful mechanics and dependencies

Give each ability, skill, stat and item property a decision: keep, adapt, exclude or defer. Record source behavior, runtime consumer, trigger, player feedback and a validation scenario.

When removing a resource or rule, audit costs, recovery, drains, requirements, affixes, AI, UI, comparisons, shops and restored saves. Remove dead properties from the playable pools. Revisit exclusions when their dependency changes: introducing a harmful status can make a previously useless cleanse valuable.

Evaluate abilities under the intended density and objectives. A single-target interrupt may matter in a duel but contribute little in a horde; an automatic barrier may trap the player. Adapt only when the resulting behavior has a clear role and evidence.

## Choose complementary experiments

| Method | Useful for | Limit |
| --- | --- | --- |
| Formula/transaction tests | Stacking, prices, cancellation, cooldowns and saves | Cannot establish enjoyable difficulty |
| Controlled encounters | Contribution of an attack, defense or behavior | Cannot establish campaign economy |
| Geometry/spawn probes | Sampled reachability, sight, body clearance and placement | Cannot prove every position or body size |
| Synthetic stress builds | Exploits under a stated generous allocation | Granted power is not an earned save |
| Earned progression simulation | Rewards and growth under a stated policy | A simple bot is not a human player |
| Human sessions | Fairness, readability, control, decisions and fatigue | A few sessions do not cover every seed |
| Packaged/device sessions | Real distribution, loading, input and frame pacing | One platform cannot certify every device |

Use the actual rules in simulation where possible. When headless execution is unavailable, use instrumented replays, controlled saves, scripted inputs or engine automation. Spreadsheet estimates help locate scaling risks but do not replace combat runs.

## Build a representative matrix

Vary supported archetypes, difficulty, seeds, maps, checkpoints, investment strategies and target devices. Include optional-economy participation and nonparticipation, sparse/dense fights, close/ranged threats, large collision bodies and confined geometry.

Compare relevant control policies: stationary, avoidance, objective/loot collection, focused damage and defensive play. A stationary probe can reveal passive invulnerability but should not be the only standard for success. A movement bot should follow meaningful routes rather than circle a safe point indefinitely.

Test the beginning, middle and end. Inspect long-run growth independently: small repeated multipliers can become extreme across many stages. Preserve local content differences while measuring aggregate encounter pressure.

For synthetic checkpoints, list every grant: levels, improvements, equipment, unlocks, currency, consumables and healing. For earned runs, obey actual rewards, prices, travel, replacement rules and depletion. Avoid free transition healing or refills unless the real game supplies them.

## Separate controller capability, feasible progression and frequency

Report three separate findings: whether the controller can use the class and
complete interactions; whether a reproducible winning route uses only actually
earned resources; and how often stated policies win over stated seeds. Diagnose
weak movement, ignored defenses, shopping, collection and exit travel before
balancing around a bot. A capable replay or human run can establish a path the
bot cannot execute; one route cannot establish a win rate. Estimate session
length, late scaling, boss duration and available rewards before large sweeps.
Retained earned checkpoints help diagnosis but do not replace required full
routes and transitions.

For reported sustain failures, replay the actual or explicitly reconstructed
checkpoint both stationary and moving. Account for healing, overheal, wards,
shield-break recovery, regeneration, leech, hit protection, level-up healing and
item grants where implemented. Pair a granted stress fixture with an earned
route proving attainability. Retest affected mature builds after threat,
recovery, reward or shop changes and preserve Easy's forgiving contract.

For economy tuning, compare equal-investment encounters separately from actual
earned routes. Track income sources, affordable useful purchases per region,
spending, retained currency, items and resulting damage/sustain. Include optional
gathering/selling/rerolls where implemented or disclose omissions. Investigate
systematic late difficulty inversion caused by richer rewards; do not blindly
scale prices with rewards or erase their intended advantage.

## Inspect visible counterplay and pacing

Retain a short threat-response trace: first perceivable warning, impact time,
player speed/position, input/reaction allowance, legal escape distance, collision
and alternative defense. Compare usable response time with the time actually
needed to escape; these are scenario diagnostics, not universal constants or
proof of fairness. Inspect overlapping threats and the busiest supported mobile
HUD: individually dodgeable attacks can jointly remove every safe position,
and a warning under a panel or heavy effect is not perceivable counterplay.

Measure first visible threat, longest meaningful quiet interval, spawn-to-combat
travel, visible populations and burst peaks at documented viewport/zoom/loadout.
Distinguish intended breaks, blocked queues, remote arrivals and rapid clearing.
Adding background pressure requires rerunning sustain, economy and performance;
preserve active-time pause/save behavior and bounded spawn backlog.

## Run performance and walkability passes

Make both passes part of the playtest plan and milestone review, including a
narrow survival slice. Define project-specific budgets and success criteria
before measuring; record build, seed/route, device/browser, viewport, rendering
settings, duration, warm-up and load. Preserve raw results and reproduction
steps for failures. Rerun affected scenarios after changing rendering, spawning,
navigation, collision or map extraction.

For performance, run the actual rendered game through early play, dense
mid/late combat, maximum supported effects/loadouts and boss or region
transitions. Include cold asset loading and a sustained session to expose
growing memory or queues. Record frame-time p50/p95/p99, longest frames and
stalls over the agreed budget, simulation/render/pathfinding costs where
measurable, actor/effect counts and memory/loading costs. Diagnose the slow
operation before optimizing and compare the same scenario afterward. Average
FPS, a short quiet scene or a fast headless bot run cannot establish smooth
combat. Label emulated and software-rendered results; keep unavailable device
measurements explicit rather than treating host timings as phone timings.

For walkability, audit connectivity of every included region, then traverse
required start-to-objective, reward/loot, guardian, camp and exit routes using
the actual movement and collision code. Check the relevant body sizes, moving
enemy pursuit and supported movement inputs. Exercise narrow passages,
diagonal corners, props, height/floor transitions and map boundaries; compare
collision overlays with visible ground. Validate legal spawn placement and
paths into combat, plus reachable interaction/pickup distances. Where maps or
spawns vary, sample reproducible seeds and report coverage. Record unreachable
targets, blocked placements, failed paths and time without progress despite
movement intent. Recoveries, teleports or debug relocation must remain visible
failures/recoveries, not successful traversal. Fix blocked required routes
before accepting the region, and distinguish authored barriers from defects.

## Record useful telemetry

| Family | Measurements |
| --- | --- |
| Outcome | Death, victory, objective clear, horizon, interruption and budget abort |
| Player power | Base/current damage, rate, coverage, defenses, recovery and contribution sources |
| Threat | Native/scaled stats, arrival rate, population, hit frequency, queue delay and major-enemy duration |
| Movement | Failed paths, time stuck, failed placement, floor changes and recovery events |
| Progression | Growth timing, choices, loadouts and earned investment |
| Economy | Income by source, prices, purchases, rerolls, sold/discarded items and optional income |
| Sustain | Actual healing, overheal, absorption, recovery, proc rates and uninterrupted survival |
| Performance | Frame-time distribution, worst stalls, simulation cost, effects, decoded memory and loading |

Instrumentation must not change state or consume additional random numbers. Count nested damage/healing once. Separate attempted healing from restored health and raw damage from post-defense damage.

Keep simulated/active time separate from wall-clock budgets. Surviving until a horizon is not a victory. A timeout, automation failure or blocked choice menu is incomplete. Report teleports, respawns and other recovery fallbacks because they can conceal navigation defects.

## Change one diagnosed system

State the causal hypothesis and preserve the baseline first. Change one system or a closely related group, then rerun the failure and relevant regressions.

| Observation | Inspect first | Candidate change after diagnosis |
| --- | --- | --- |
| Standing still is too safe | Reachability, hit selection, recovery and effective damage | Fix interaction defects, then bound sustain or adjust pressure |
| Early deaths feel unavoidable | Warnings, overlap, range, sight and escape actions | Improve counterplay, stagger threats or introduce them later |
| Major encounters drag | Earned focused damage and all HP/mitigation layers | Reduce the responsible layer or repair a missing offensive role |
| One archetype falls behind | Tempo, coverage, survival and upgrade access | Improve its distinctive mechanic before erasing role differences |
| Later stages get easier | Roster variation and progression floors | Normalize pressure while retaining local identities |
| Late progression becomes impossible | Compounded threat versus earned power | Flatten growth, change rewards or revise route length |
| Choices are repetitive/useless | Eligibility, sampling, caps and actual consumers | Remove dead choices and broaden meaningful pools |
| Purchases misfire | Held input, activation targets, prices and cancellation | Use explicit actions and atomic transactions |
| Stalls recover without population changes | Worst-frame traces and one-off expensive work | Budget, cache or cull the measured cause |

Add contributions sharing a documented base, and apply independent layers once. Check unequip/re-equip, load/save and temporary-effect expiry for repeated scaling.

Useful estimates help locate problems:

```text
practical_DPS = damage_per_hit * hits_per_second * practical_hit_fraction
encounter_duration = target_effective_health / practical_DPS
net_health_loss = post_defense_incoming_DPS - actual_recovery_per_second
population_growth = arrival_rate - removal_rate
purchase_budget = earned_currency / representative_price
```

Verify estimates in play. Bursts, density, objectives and downtime can defeat an average-only conclusion. Good area damage can coexist with poor focused damage; adequate average recovery can coexist with unreadable lethal spikes.

## Compare without overstating results

Use paired seeds/initial states when practical, but record that changed procs or AI can alter subsequent RNG draws. Equal seeds do not guarantee identical encounters. Qualify or discard metrics affected by broken instrumentation.

Fill a comparison table with actual data:

```text
Build | Policy | Cases | Cleared | Died | Horizon | Incomplete | Recovery used
Before | ...
After  | ...
```

Explain why the comparison answers the hypothesis and where the conclusion stops. Retain failures and incomplete runs. Synthetic success is not a human win rate, and a sampled map audit is not proof of every hiding position.

Follow with human fresh starts and genuinely earned checkpoints. Ask players what hit them, why they chose an improvement, what changed after equipping, and how they could have escaped or completed the objective. Test each supported input style.

Separate implementation success from experience success. “The attack now hits” can be mechanically verified; “the encounter feels fair” requires play. Strong late investment may legitimately permit some stationary survival, while a weak starter surviving forever may contradict the intended loop.

Reopen decisions after changing geometry, content, economy, controls or progression. A larger map can change density and escape opportunities without changing a single damage value.

## Maintain a project log

Store versions, dates, exact values, source paths and historical outcomes in a separate project-specific log. Keep the general workflow usable without that project's engine, tools or assets. Append experiments or mark corrections explicitly rather than silently rewriting old results.

```text
Entry ID and date:
Build and content/configuration hashes:
Observation or player request:
Evidence type: human / mechanical / synthetic / earned simulation:
Reproduction: seed, map, progression, build, controls and device:
Hypothesis and alternatives considered:
Baseline measurement and intended target:
Change: exact old/new values, units and affected systems:
Validation: scenarios, policies, sample counts and raw output:
Before/after outcomes, including horizons, aborts and recovery:
Conclusion and tested scope:
Superseded decisions, remaining uncertainty and next test:
```

Maintain an open-issues queue with severity, reproduction, next experiment and acceptance criteria. Do not close an issue solely because a nearby optimization shipped. Promotional captures and staged demonstrations are presentation checks, not earned progression results.
