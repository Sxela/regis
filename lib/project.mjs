import {lstat, readFile, writeFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {canonical, contains, exists, stageDirectory} from './files.mjs';

export const fanNote = 'Unofficial fan project. Not affiliated with or endorsed by the original game creators or publishers. Original names and resources belong to their respective owners. Supply your own supported game files to generate resources.';

export function projectConfiguration(name, sourcePath = null, genre = 'survival') {
  if (!['survival', 'runner'].includes(genre)) throw Error('Unsupported target genre; use survival or runner.');
  const config = {
    schemaVersion: 1,
    adaptation: {genre},
    name,
    source: {path: sourcePath, edition: null, version: null, manifest: 'evidence/source-manifest.json'},
    runtime: {engine: 'nodejs-spa', desktop: 'electron', mobile: 'responsive-web', platforms: ['web', 'windows', 'linux', 'macos']},
    testing: {
      requiredByDefault: ['unit', 'browser', 'mobile'],
      mobile: {enabled: true, browserEngines: ['chromium', 'webkit'], viewports: ['phone-portrait', 'phone-landscape', 'tablet'], checks: ['touch-movement', 'modal-input', 'responsive-layout', 'orientation', 'save-continue', 'audio-unlock', 'performance']}
    },
    classes: [
      {id: 'pressure', name: 'Pressure specialist', role: 'Close pressure and bounded sustain', status: 'candidate', buildDirections: ['Durable attrition', 'Burst and retaliation']},
      {id: 'precision', name: 'Precision specialist', role: 'Mobility and focused damage', status: 'candidate', buildDirections: ['Fast coverage', 'Elite and boss focus']},
      {id: 'control', name: 'Control specialist', role: 'Area coverage and threat control', status: 'candidate', buildDirections: ['Persistent zones', 'Reactive effects']}
    ],
    difficulties: {
      easy: {contract: 'Can win most runs with mostly stationary combat and sensible earned upgrades; required objectives may need movement.'},
      medium: {contract: 'Movement, dodging and build planning are necessary; standing still usually fails.'},
      hard: {contract: 'Demanding but fair survival; several learning attempts may be needed, and practiced earned builds can win.'}
    },
    stages: ['discovery', 'design', 'implementation', 'ui', 'playtest', 'promo', 'delivery'].map(id => ({id, state: 'not_started', evidence: [], limitations: []})),
    content: {mode: 'source-only', generatedAssets: 'local-assets/', extractionRecipe: null},
    fanProjectNote: fanNote
  };
  if (genre === 'runner') {
    config.classes = [
      {id: 'durable', name: 'Durable runner', role: 'Forgives mistakes but has weaker reach', status: 'candidate', buildDirections: ['Armor and recovery', 'Close burst']},
      {id: 'precision', name: 'Precision runner', role: 'Focused damage with crowd vulnerability', status: 'candidate', buildDirections: ['Elite focus', 'Multi-lane coverage']},
      {id: 'utility', name: 'Utility runner', role: 'Controls hazards with lower direct damage', status: 'candidate', buildDirections: ['Pickup tools', 'Area control']}
    ];
    config.track = {lanes: 3, actions: ['lane-left', 'lane-right', 'jump', 'slide'], layout: 'seeded-constraint-chunks', fairness: {maxUnavoidablePatterns: 0, reactionWindowMs: null, telegraphRequired: true}};
    config.sourceGenre = {modules: [], status: 'unresolved'};
    config.progression = {autoequip: {enabled: true, respectsLocks: true, playerToggle: true}, endRound: ['loot-summary', 'inventory', 'equipment', 'shop-buy', 'shop-sell', 'permanent-upgrades']};
    config.playtest = {agents: ['novice', 'average', 'expert'], evidenceTiers: ['unit', 'headless-simulation', 'rendered-automation', 'human']};
    config.difficulties = {
      easy: {contract: 'Novices clear the first biome on most seeds with starter gear, sparse hazards and long telegraphs.'},
      medium: {contract: 'Lane reading and the selected source-genre verbs matter; average policies survive a meaningful share and experts advance.'},
      hard: {contract: 'Dense and fast but fair: zero unavoidable patterns, with practiced play reaching the final biome.'}
    };
    config.testing.mobile.checks = config.testing.mobile.checks.filter(check => check !== 'touch-movement');
    config.testing.mobile.checks.push('swipe-lanes', 'combined-actions');
  }
  return config;
}

export function validateConfiguration(config) {
  const errors = [];
  if (!config || typeof config !== 'object' || Array.isArray(config)) return ['Configuration must be an object.'];
  if (config.schemaVersion !== 1) errors.push('Unsupported schemaVersion.');
  if (typeof config.name !== 'string' || !config.name.trim()) errors.push('Project name is required.');
  if (!config.source || (config.source.path !== null && (typeof config.source.path !== 'string' || !path.isAbsolute(config.source.path)))) errors.push('source.path must be an absolute path or null.');
  if (config.runtime?.engine !== 'nodejs-spa' || config.runtime?.desktop !== 'electron' || config.runtime?.mobile !== 'responsive-web') errors.push('Default runtime requires Node.js SPA, Electron desktop and responsive mobile web. Explicit stack changes need a revised project contract.');
  for (const suite of ['unit', 'browser', 'mobile']) {
    if (!Array.isArray(config.testing?.requiredByDefault) || !config.testing.requiredByDefault.includes(suite)) errors.push(`Default test command must include ${suite}.`);
  }
  if (config.testing?.mobile?.enabled !== true) errors.push('Mobile tests must be enabled by default.');
  for (const viewport of ['phone-portrait', 'phone-landscape', 'tablet']) {
    if (!Array.isArray(config.testing?.mobile?.viewports) || !config.testing.mobile.viewports.includes(viewport)) errors.push(`Missing default mobile viewport: ${viewport}.`);
  }
  for (const engine of ['chromium', 'webkit']) {
    if (!Array.isArray(config.testing?.mobile?.browserEngines) || !config.testing.mobile.browserEngines.includes(engine)) errors.push(`Missing mobile browser engine: ${engine}.`);
  }
  const genre = config.adaptation === undefined ? 'survival' : config.adaptation?.genre;
  const movementChecks = genre === 'runner' ? ['swipe-lanes', 'combined-actions'] : ['touch-movement'];
  for (const check of [...movementChecks, 'modal-input', 'responsive-layout', 'orientation', 'save-continue', 'audio-unlock', 'performance']) {
    if (!Array.isArray(config.testing?.mobile?.checks) || !config.testing.mobile.checks.includes(check)) errors.push(`Missing mobile check: ${check}.`);
  }
  if (!['survival', 'runner'].includes(genre)) errors.push('Unsupported target genre; use survival or runner.');
  if (genre === 'runner') {
    if (!Number.isInteger(config.track?.lanes) || config.track.lanes < 1) errors.push('Runner track needs a positive integer lane count.');
    for (const action of ['lane-left', 'lane-right', 'jump', 'slide']) {
      if (!Array.isArray(config.track?.actions) || !config.track.actions.includes(action)) errors.push(`Missing runner action: ${action}.`);
    }
    if (!['seeded-constraint-chunks', 'authored'].includes(config.track?.layout)) errors.push('Runner track.layout must be seeded-constraint-chunks or authored.');
    if (config.track?.fairness?.maxUnavoidablePatterns !== 0 || config.track?.fairness?.telegraphRequired !== true) errors.push('Runner fairness requires zero unavoidable patterns and visible telegraphs.');
    const reaction = config.track?.fairness?.reactionWindowMs;
    if (reaction !== null && !(Number.isFinite(reaction) && reaction > 0)) errors.push('Runner reactionWindowMs must be positive or null until measured.');
    if (!Array.isArray(config.sourceGenre?.modules) || config.sourceGenre.modules.some(module => typeof module !== 'string' || !module.trim())) errors.push('Runner sourceGenre.modules must be an array of module names.');
    const autoequip = config.progression?.autoequip;
    if (typeof autoequip?.enabled !== 'boolean' || (autoequip.enabled && (autoequip.respectsLocks !== true || autoequip.playerToggle !== true))) errors.push('Runner autoequip needs explicit enablement, protected locks and a player toggle.');
    if (!Array.isArray(config.progression?.endRound) || config.progression.endRound.some(step => typeof step !== 'string' || !step.trim()) || new Set(config.progression.endRound).size !== config.progression.endRound.length) errors.push('Runner endRound must contain unique step names; use an empty list when excluded.');
    for (const agent of ['novice', 'average', 'expert']) {
      if (!Array.isArray(config.playtest?.agents) || !config.playtest.agents.includes(agent)) errors.push(`Missing runner playtest agent: ${agent}.`);
    }
  }
  const classes = config.classes;
  if (!Array.isArray(classes) || classes.length !== 3) errors.push('Exactly three candidate or implemented classes are required.');
  if (Array.isArray(classes)) {
    const ids = new Set();
    for (const value of classes) {
      if (!value || typeof value.id !== 'string' || !value.id.trim() || ids.has(value.id)) errors.push('Class IDs must be nonempty and unique.');
      if (value && typeof value.id === 'string') ids.add(value.id);
      if (!value || typeof value.role !== 'string' || !value.role.trim()) errors.push('Every class needs a role.');
      if (!value || !Array.isArray(value.buildDirections) || value.buildDirections.length < 2 || value.buildDirections.some(v => typeof v !== 'string' || !v.trim())) errors.push('Every class needs at least two build directions.');
    }
  }
  for (const mode of ['easy', 'medium', 'hard']) {
    if (typeof config.difficulties?.[mode]?.contract !== 'string' || !config.difficulties[mode].contract.trim()) errors.push(`Missing ${mode} difficulty contract.`);
  }
  const phases = ['discovery', 'design', 'implementation', 'ui', 'playtest', 'promo', 'delivery'];
  for (const phase of phases) {
    const matches = Array.isArray(config.stages) ? config.stages.filter(s => s?.id === phase) : [];
    if (matches.length !== 1) { errors.push(`Stage ${phase} must occur exactly once.`); continue; }
    const stage = matches[0];
    if (!['not_started', 'in_progress', 'passed', 'blocked'].includes(stage.state)) errors.push(`Invalid state for ${phase}.`);
    if (!Array.isArray(stage.evidence) || stage.evidence.some(v => typeof v !== 'string' || !v.trim())) errors.push(`Invalid evidence list for ${phase}.`);
    if (!Array.isArray(stage.limitations)) errors.push(`Invalid limitations list for ${phase}.`);
    if (stage.state === 'passed' && !stage.evidence?.length) errors.push(`Passed stage ${phase} needs evidence references.`);
  }
  if (typeof config.fanProjectNote !== 'string' || !config.fanProjectNote.trim()) errors.push('A fan-project note is required.');
  return errors;
}

export async function initializeProject(destination, {source, name, genre = 'survival'} = {}) {
  const target = await canonical(destination);
  if (await exists(target)) throw Error(`Destination already exists; choose a new directory: ${target}`);
  let sourcePath = null;
  if (source) {
    sourcePath = await canonical(source);
    if (!(await exists(sourcePath))) throw Error(`Source does not exist: ${sourcePath}`);
    const sourceBase = (await lstat(sourcePath)).isDirectory() ? sourcePath : path.dirname(sourcePath);
    if (contains(sourceBase, target)) throw Error('Project output must be outside the source installation.');
  }
  const config = projectConfiguration(name || path.basename(target), sourcePath, genre);
  const errors = validateConfiguration(config);
  if (errors.length) throw Error(errors.join('\n'));
  await stageDirectory(target, async stage => {
    await mkdir(path.join(stage, 'docs'));
    await writeFile(path.join(stage, 'docs', 'quality-target.md'), `# Quality target and review

This brief is unreviewed. Define the requested result before selecting the
renderer or treating a playable slice as sufficient. A structural regis check
does not evaluate this target or certify game quality.

## Requested scope

Record the actual user request: full adaptation, explicitly limited prototype,
phase or repair. Identify any timebox and exclusions with their reason/authority.
Trying the skill does not silently reduce the requested target to a minimal demo.
For a quick selected-genre test, list the small content sample separately from the
systems requiring complete depth. Included actors need correct facing/animation,
included spells need their actual effect assets and rules, and used UI screens
need native components. Full-catalog, promo and release breadth can be outside
that scope; broken included behavior cannot.

## Source and benchmark

Identify the selected edition, supplied companion resources, reference screens
and any user-supplied existing adaptation. Record which qualities carry over and
known reference defects. Distinguish prior format knowledge/code reuse from new
discovery. Use source-specific targets rather than universal asset-count quotas.

## Coverage and acceptance

For each relevant family record: source ID, required behavior/presentation,
implemented consumer, evidence, status, next action and explicit exclusions.
Track discovered, decoded, mapped, implemented and validated coverage separately.

| Dimension | Required result and reference | Review evidence and remaining work |
| --- | --- | --- |
| World | Resolve native maps, projection, height, collision and local encounters | Unreviewed |
| Actors and effects | Resolve actions/directions, layers, animation and actual attacks | Unreviewed |
| Builds and progression | Resolve genre-appropriate choices, useful abilities/items and earned builds where selected | Unreviewed |
| Interface | Resolve source components, inspections, desktop/touch layouts and audio | Unreviewed |
| Balance | Resolve all role/mode rows, genre-specific policies and earned states where selected | Unreviewed |
| Delivery | Resolve clean asset setup, actual platform launches, screenshots and promo | Unreviewed |

## Milestones and handoff

Choose a representative slice that exercises the source's hard parts. Compare
matched screens and motion, correct departures, then extend required coverage.
Keep implementation tests, visual quality, balance and platform execution as
separate evidence. Diagnose failed reviews and continue supported work. Record
exact blockers without counting deferred requirements as complete.
`);
    await writeFile(path.join(stage, 'regis-project.json'), JSON.stringify(config, null, 2) + '\n');
    await writeFile(path.join(stage, '.gitignore'), 'local-assets/\nsource-files/\n.cache/\ndist/\nnode_modules/\nevidence/private/\n*.log\n');
    await writeFile(path.join(stage, 'README.md'), `# ${config.name}\n\n${fanNote}\n\nThis is a REGIS project brief, not a playable game yet.\nUse $regis with the selected game files to complete discovery, design,\nimplementation, UI, playtesting, promo and delivery.\n\nTarget genre: ${genre}.\nDefault stack: Node.js SPA, Electron desktop builds, responsive mobile web.\nThe three candidate roles must be themed and validated against the source.\nThe renderer and asset recipe are selected after discovery. Default game tests\nmust include unit, browser and mobile suites; see docs/platform-and-mobile.md.\nKeep source-derived resources out of public builds.\n`);
    await writeFile(path.join(stage, 'docs', 'design-brief.md'), `# Design brief

Target genre: ${genre}. The classes field contains candidate starting roles,
including runners/loadouts; theme and test them against the actual source.
Record loop, controls, run length, useful source systems, authored adaptations,
explicit user overrides and replayability hypotheses. Inventory and upgrades
are module defaults where relevant, not universal game requirements.

${Object.entries(config.difficulties).map(([mode, value]) => `${mode}: ${value.contract}`).join('\n')}

${genre === 'runner' ? 'Document lane/action timings, combined jump+strafe inputs, roof/overhead clearances, reaction windows at the speed cap, authored-route or seeded reachability, biome transitions and novice/average/expert results.' : 'Document automatic combat, useful abilities, distinct earned builds, crowd pressure, connected objectives, actor clearance and stationary versus moving sustain.'}

Record experiments and unresolved issues. This is a brief, not a game.
`);
    await writeFile(path.join(stage, 'docs', 'asset-pipeline.md'), '# Asset pipeline\n\nInventory source paths/hashes and REA evidence for maps, actors, mobs, abilities,\nitems, VFX, audio/music, UI/fonts, stats/traits and area spawns. Record unknowns.\nKeep original catalogs separate from selected-genre adaptations.\n\nImplement a deterministic local extraction recipe with supported versions, input\nchecks, staged output, manifest verification and useful failure messages. Record\nreal-install validation separately from synthetic CI fixtures.\n');
    await writeFile(path.join(stage, 'docs', 'platform-and-mobile.md'), `# Platform and mobile contract\n\nBuild a Node.js SPA shared by browsers and Electron desktop wrappers. Mobile\nuses responsive web; Electron does not provide an Android/iOS runtime.\n\nImplement npm test as unit + browser + mobile suites. Run Chromium and WebKit\nphone portrait/landscape and tablet tests in CI by default; do not mark a missing\nmobile suite as passing. Test ${genre === 'runner' ? 'swipes, diagonal jump+strafe and simultaneous buttons' : 'touch movement'}, modal input, hover alternatives,\nsafe-area/resize/orientation, real progression, save/continue, audio unlock and\nperformance. Use the actual game with synthetic/redistributable CI assets.\nDevice emulation does not certify real phone performance or browser behavior.\n\nBuild Electron releases on Windows, Linux and macOS runners and smoke-test the\npackaged app. Produce a separate mobile web build and setup/run instructions.\n`);
  });
  return {destination: target, kind: 'project-brief', playable: false, source: sourcePath};
}

export async function checkProject(directory) {
  const file = path.resolve(directory, 'regis-project.json');
  const config = JSON.parse(await readFile(file, 'utf8'));
  const errors = validateConfiguration(config);
  return {file, valid: errors.length === 0, scope: 'Configuration structure only; not asset, gameplay, balance or release certification.', errors};
}
