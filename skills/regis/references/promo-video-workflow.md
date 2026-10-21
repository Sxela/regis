# Making a promo video for any game

Show the real game in motion, make one clear promise per shot, and give the edit a recognizable visual voice. Original sprites or models, fonts, UI and sounds provide authenticity; generated illustrations and animation can supply deliberate comedy or missing cinematic moments. This workflow applies to any game, engine or port. Numeric examples are optional production settings.

Use this with the [mechanics guide](game-to-survivors-mechanics.md), [UI workflow](nostalgic-ui-workflow.md) and [playtesting workflow](playtesting-and-balance-log.md). A staged promo demonstrates features and atmosphere, not default difficulty or balance.

## Choose the format and the idea

Decide the audience, aspect ratio, duration and tone before recording. A useful first specification is a 30–45 second, 1080 by 1920 vertical video at 30 fps, with captions readable at phone size. Desktop or store-page delivery may need a separate horizontal composition rather than a center crop.

Establish the creative treatment alongside the output format: audience, sincere or comic tone, source-specific premise, gameplay-to-insert rhythm, announcement cards and voice performance. Record the included creative deliverables before capture. A technically complete feature reel does not satisfy a requested comic treatment by itself. Do not require comedy or generated scenes for every promo.

When the user supplies finished references, inspect representative frames and cuts before designing the edit. Identify transferable qualities such as action-first openings, character scale, short announcement holds, typography, banter and returns to combat. Adapt those qualities to the current world's tone and actual mechanics. Invent new copy, visual jokes and performances rather than transplanting another game's dialogue, characters or generic recurring joke. Keep comparison-only material out of selected production assets unless its reuse is authorized.

Build around a short premise. A sincere feature reel can show the world, combat, progression, equipment and the next encounter. A comic reel needs a readable setup, reversal and payoff grounded in its characters and setting; an intimidated boss asking for help is only one possible structure. Give the joke time to read without letting it replace gameplay. For a dynamic action reel, alternate short, varied combat takes with purposeful cards or UI pauses. Choose cuts for attacks, impacts, threats and meaningful decisions, rather than merely displaying a moving player.

Write a timed shot list with the feature, subject, action, caption, audio cue and transition for every segment. Keep action near the middle, captions inside safe margins, and important text away from platform controls. Use short captions with a punchline or concrete feature; paragraphs become unreadable over moving footage.

## Record in an isolated session

Use an isolated capture environment: a separate engine profile, save slot, test account, browser profile or local server as appropriate. Preserve live sessions and saves. Keep scene-control code and alternate art in production tools rather than shipping them as gameplay changes. Native screen capture, engine recording, replay cameras and browser capture are all valid; choose the method that preserves actual rendering and reliable timing.

Staging may control locations, opponents, units, equipment, abilities, resources and timing, but use the actual renderer and rules for gameplay shots. Record interventions in production notes. Invulnerability or a controlled replay may produce a clean take; it must not be presented as an ordinary earned result.

Capture at the intended aspect ratio and zoom. If using a 540 by 960 CSS viewport with device scale factor 2, verify that the result is actually 1080 by 1920 pixels. Wait for relevant scenes, fonts, character layers, shaders and effects to load before rolling. Use current menus and offer counts; an older capture script can accidentally show superseded mechanics.

Record game audio from its own master bus into a separate track. This preserves source impacts, actions, interactions and transitions and makes the final mix easier to control. Avoid capturing notification sounds, microphone input or unrelated desktop applications.

## Match movement to the game

Capture the movement rhythm the game actually rewards. Continuous traversal suits a fast survival game; deliberate pauses may suit stealth, turn-based tactics, construction or a strategy overview. Do not force every genre into constant running. When continuous movement is intended, avoid both repeated start/stop input and conspicuous closed loops.

For traversal shots, plan a route over the real navigation space using clearance, height and movement rules. For unit-based or camera-led footage, plan subject and camera motion separately. Smooth unnecessary corners while keeping real obstacles. Make the route long enough for the entire shot at the actual movement speed. Follow successive waypoints without repeatedly canceling/restarting steering, and do not close the last point back to the first.

Use terrain-driven bends, changing enemy groups, approaching threats, an escape and collection opportunities for variety. Continuous movement does not require a straight line, but arbitrary oscillation looks as artificial as a circle. Inventory, level rewards and shops may pause naturally.

Log player positions and timestamps during each take. Review total travel, end displacement, moving fraction and longest idle interval, together with the footage. A high travel distance with almost no displacement can reveal a loop, although deliberate kiting needs visual judgment. Check long timestamp gaps and frame-time spikes too: a metric that skips delayed samples can hide stutter.

Verify visible animation separately from translation. Camera movement, position logs and a true moving flag can coexist with a frozen body or a sliding firing pose. Inspect ordinary traversal and movement during combat at delivery size. Check source clip selection, changing gait frames, action/direction, equipped variants and foot anchors. Frequent attacks can continually reset a shared animation clock or suppress locomotion; diagnose this in the game before recording replacement footage. Where movement during attacks is supported, preserve a readable gait using the source's layers, separate locomotion timing or appropriate brief action poses. Deliberate stationary attacks remain valid for games whose rules require them.

Record a little more than the intended edit length so cuts can start after loading and end before a route runs out. Retain original capture timestamps; resample into a constant-frame-rate edit from elapsed time rather than assuming every recorded image arrived at equal intervals.

## Choose the right original artwork

Confirm the edition, asset ID, archive/model variant, palette/materials and pose before making a large illustration or animation. A modern replacement can share the name and logical identifier of an older asset. Inspect a contact sheet or pose sheet when the requested identity is ambiguous.

For recognizable faces, use a front three-quarter facing when available. Do not confuse a side-facing atlas row with three-quarter merely because the game world is isometric. Show several native facings side by side. Preserve horns, face shape, wing silhouette, clothing and colors that identify the character.

Choose facing according to the shot's purpose. A front three-quarter sprite or model pose can show a recognizable face; a back-facing protagonist may support an approach or reveal. These are separate framing decisions. Inspect the actual atlas row or model camera rather than assuming an index corresponds to a familiar view.

A capture-only artwork override can align the filmed monster with the announcement. Keep that override explicit; do not silently change the playable game to make the film match.

## Make boss announcements as motion design

Use the requested comic convention as a direction, then build an original composition: a freeze or hard cut, a large character cutout, a strong silhouette, diagonal ink bands, a huge name, a short sarcastic role and a quick exit back to gameplay.

Keep the character and text on separate layers. Native sprite cutouts can scale with nearest-neighbor sampling and a restrained outline/shadow; high-resolution illustrations need suitable smooth resampling. Preserve sprite proportions and anchors. Keep a visible face and recognizable pose rather than cropping down to an anonymous wing or torso.

Animate a fast entrance, a short settle, a readable hold and a decisive exit. A small overshoot, registration offset, halftone texture and impact flash can sell the print-comic treatment. Repeated camera shake and long white flashes weaken readability. Boss cards usually need only a few seconds.

For a requested comic announcement treatment, plan the cards as distinct motion-design shots; a single static illustration throughout the reel does not supply the same rhythm.

Use one joke or descriptive hook per card, derived from the subject's role: an overconfident commander, exhausted guardian, unreliable machine or territorial creature. Let the name remain dominant. Satire should fit the game's tone and remain understandable without audio. If humor is inappropriate, use the same structure for a serious threat or feature reveal.

## Generate illustrations only where useful

Use an image-generation tool for a new painted menu, cinematic insert, comic scene or missing illustrative asset. Keep original sprites when their exact pixels and identity are the point. Record the actual tool, prompts, references and selected output; retain drafts separately so the wrong edition is not reused later.

Give each reference a role: composition, authoritative character identity, costume, environment or style. If editing an existing image, state what remains fixed and what changes. Supply the correct facing and source appearance before committing to video generation.

Example illustration specification:

```text
Purpose: first frame of a vertical comic promo insert.
Composition: a clear confrontation, reveal or action suited to the source setting.
Identity reference: the supplied original sprite or model, with the required facing.
Protagonist reference: actual character/unit appearance and equipment; specify facing.
Action: one readable setup and reaction that support the chosen premise.
Style: the chosen source-compatible art direction and limited palette.
Keep: identifying features, costume/materials, readable silhouettes and scene geography.
Space: quiet top/bottom areas for captions added during editing.
Exclude: embedded text, logos, UI, speech balloons and watermarks.
```

Add captions and logos in the edit rather than trusting generated lettering. Inspect hands, limbs, props, clothing, expression and source identity at full size. A beautiful result that uses the wrong generation of monster art is still the wrong asset.

## Animate comic inserts with local ComfyUI

Inspect the running server's available nodes, local model names and queue before building a workflow. Use local nodes when local generation is intended; a node exposed by a local UI can still call a paid cloud service. Do not assume two nodes with similar model names execute in the same place.

Start with a short image-to-video shot and a single clear action. Provide a timeline with a setup, reaction and finish; keep character identities, facing, costume and camera behavior explicit. Specify audio/dialogue separately from written captions. Avoid asking for several camera angles, transformations and new props in one short generation.

Select resolution, duration and frame count from the chosen model's supported shapes. A 5-7 second insert is often enough for a setup and reaction, but it is an editorial example rather than a model requirement. Convert frame counts using the generation frame rate, then select the useful section for the edit. Preserve the face or distinguishing feature needed to read the reaction.

Model checkpoints, task variants, encoders, decoders, optional acceleration files and sampling schedules must be compatible. MiniMax or another installed video model can be used; the workflow is not tied to a particular release or step count. If an optional attention/acceleration patch is incompatible, use a supported path before replacing the user's environment. Check installed nodes rather than copying another project's graph blindly.

Save the API workflow and job ID. Poll or collect only your own job, inspect failures, and download outputs into the project. Do not clear an unrelated queue or assume acceptance means generation succeeded. Review a contact sheet across the whole clip and listen to the generated audio before using it. Keep useful good generations rather than rerolling without a specific correction.

Clearly distinguish the impossible comic gag from gameplay, for example with a small “Comedy insert” label and production notes. Keep the satire's timing and identity honest even when its movement is intentionally impossible in the game.

## Assemble the edit and soundtrack

Maintain a timeline as data: scene ID, source, in-point, duration, caption, caption position and audio behavior. Separate raw captures, generated assets, graphics, intermediate renders and final exports. Keep previous approved videos rather than overwriting them during a revision.

Build a visual hierarchy with a short kicker, one or two headline lines and optional supporting text. Place type around the real action and menus. Treat a boss splash differently from a native inventory shot: the former can fill the screen, while the latter should keep the doll, item and comparison readable.

Cut to motion, impact or a beat. A boss reveal benefits from a brief interruption; a comic reversal benefits from an awkward pause, scratch or ducked music. Return to gameplay promptly after the punchline. Finish with a legible game title and a short reason to play.

Use original composition, licensed music or another explicitly suitable source. A synthesized score and captured effects are one option; suitable licensed tracks are another. Record the origin and usage terms of every sound source. Style references do not require copying a recognizable voice, commercial soundtrack or another game's footage.

Balance dialogue first, then impacts, gameplay and music. Duck the music around speech and punchlines. Measure the final encoded file rather than assuming the requested loudness filter target was achieved. A practical starting aim is approximately -15 to -16 LUFS integrated and true peak at or below -1.5 dBTP, then check comfortable playback on a phone. Do not normalize every quiet detail into a loud hit.

## Verify the deliverable

Bind the source image, generated clip, speech/audio review and edited master by
revision or digest. A replacement invalidates affected review; a previous
transcript or checked caption field cannot validate the new artifact. Record
source identity invariants and inspect useful crops of distinguishing anatomy,
costume and props. Ambiguous silhouettes remain defects: redraw the source
clearly before regenerating motion rather than repeating a count in the prompt.

Give each feature shot a visible proof criterion at delivery size: the announced
boss is in frame, terrain relief reads in the scene, upgrade values/actions are
legible. Inspect brief repeated menu flashes, loading frames and hold durations.
For multi-speaker inserts, record contrasting voice profiles, turn timing and
silent participants, then listen to the actual revision for attribution as well
as wording. Preserve the selected master and disclose staged gameplay.

Inspect available tools/models before verification work and budget optional
transcription downloads/retries. Reuse suitable available tooling. A stalled
optional tool is neither audio validation nor a reason to hide completed scoped
work; regenerated audio remains pending until checked. Keep requested production
work and optional tooling separate, without adding a routine approval gate.

Check the entire final export, not only a poster:

| Check | What to inspect |
| --- | --- |
| Container | Duration, dimensions, aspect ratio, frame rate, frame count, codecs and pixel format |
| Decode | Decode video and audio end to end; detect truncation or corrupt frames |
| Picture | Read every title, inspect cuts, source facings, empty frames, crop, generated artifacts and the final hold |
| Motion | Actual gait/action frame changes during traversal and combat; no unintended sliding, route loops or idle gaps; intended menu pauses |
| Audio | Understandable speech, correct timing, comfortable balance, measured loudness and true peak |
| Claims | Current feature counts, staged-capture disclosure, clearly separate comic inserts and attribution |
| Reproduction | Exact prompts/workflow/seed, source references, edit settings and validation output |

Example local commands, with paths adapted to the project:

```sh
ffprobe -v error -show_streams -show_format -of json promo.mp4
ffmpeg -v error -i promo.mp4 -f null -
ffmpeg -i promo.mp4 -af ebur128=peak=true -f null -
```

Save a master video, poster, storyboard/contact sheet, edit manifest, production notes and validation report. Read the report back. Decode tool output with its actual encoding, verify parsed numeric fields, reject empty measurements and retain raw evidence. A successful command does not establish that a later parser recorded its results correctly.

## Deliver a portable production package

Use project-neutral output roles rather than depending on a particular repository layout:

```text
references/         source identity, poses, UI and visual direction
captures/           raw gameplay, timestamps, audio and staged-state notes
assets/             selected illustration, sprite/model renders and generated clips
workflows/          prompts, model/node versions, seeds and generation graph
edit/               timeline, graphics, sound sources and rendering configuration
exports/            master video, poster, storyboard and validation report
```

Store platform-specific paths and capture adapters in configuration. Another project should only need its own approved assets, game/capture adapter and production settings, not the original project's engine or personal filesystem.

Use relative paths or explicit configuration for selected inputs; copying an edit script into a ZIP is insufficient if it still reads the original workspace. Verify the selected package after unpacking into a fresh directory and rebuild the edit there. Compare artifact hashes when the toolchain is deterministic; otherwise compare decoded content and document the expected variation. Distinguish standalone edit reproduction using included selected media from recreating gameplay captures or rerunning a generative model.

Before handing over, record the output format, shot list, source versions, staging, generated material, music provenance and tested scope. Include reproduction instructions and identify which intermediate assets are necessary to rebuild the edit. Keep an approved master when making revisions.
