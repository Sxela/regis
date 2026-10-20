# Node.js SPA, Electron and mobile by default

Use one browser SPA and simulation for desktop web, mobile web and Electron.
Node.js serves development/local assets and runs extraction/build tooling;
Electron wraps the SPA for desktop. Choose Canvas/WebGL/rendering based on source
assets rather than switching the application stack. Electron does not run on
Android/iOS; the default phone delivery is the responsive web build. Add a PWA
or native mobile wrapper only when the project actually needs it.

## Mobile is part of the normal implementation

Implement touch controls while building the first playable slice. Support phone
portrait, landscape and tablet, safe-area insets, high pixel density, dynamic
viewport height and orientation changes without resetting the run. Keep the
simulation's coordinate space independent from display/device scale.

Continuous hold/drag movement must handle pointer capture, cancellation,
multi-touch and leaving the playfield. Release held input when a menu opens,
focus changes or the browser backgrounds. Disable page gestures only where
needed on the battlefield; menus and long comparisons must still scroll.
Provide tap/focus alternatives to hover. Make targets large enough for fingers
(around 44 CSS px is a useful starting point), without obscuring combat warnings.
Support audio unlock on a user gesture, persistent volume and graceful resume.

Size HUD, tooltips, inventory, upgrade/shop cards, settings and exit/continue
controls for narrow screens. No offscreen mandatory button, overlap, hover-only
essential information or accidental purchase is acceptable. Resize and restore
saved control positions safely. Test the most crowded supported HUD/loadout.

## Mobile tests run by default

In the generated game, make `npm test` include unit, browser **and mobile**
tests. For example, adapt the command names to the actual project:

```json
{
  "test": "npm run test:unit && npm run test:browser && npm run test:mobile",
  "test:mobile": "playwright test --project=phone-chromium --project=phone-webkit --project=tablet",
  "build:web": "node tools/build-web.mjs",
  "build:desktop": "node tools/build-desktop.mjs"
}
```

These names describe commands the implementation must actually supply; do not
copy scripts pointing at absent files or a test that skips when mobile is absent.
The normal CI gate runs all suites, installing the browser binaries explicitly
(for example, Playwright's Chromium and WebKit). Keep dependencies/lockfiles in
the generated game and use the actual game code with seeded synthetic or
redistributable test assets. Do not substitute a separate demo for the gameplay
being tested.

| Default mobile scenario | Required observation |
| --- | --- |
| Portrait + landscape phone, tablet | No horizontal overflow or obscured mandatory actions; legible maximum-load HUD. |
| Touch move/hold/drag/cancel | Actor moves continuously through valid terrain and stops on release/background/modal. |
| Full loop | Choose each class/difficulty; encounter, loot, upgrade, boss/exit, shop, death/victory and continue. |
| Panels | Tap inspect, scroll, compare/equip, buy, reroll, cancel/back; no stale-input purchases or hover dependence. |
| Upgrade card fit | At normal text size, the full choice set, heading and every Choose/Buy button fit vertically inside the usable viewport without scrolling, clipping or overlap; test longest content, smallest portrait/landscape screens and orientation changes. Preserve readable text and touch targets; test accessible scrolling fallback for enlarged text. |
| Orientation/resize | Run and controls remain usable; coordinates, collision and viewport-derived spawns still agree. |
| Audio/persistence | Gesture unlock, mute/volume, save/reload, background/resume without burst catch-up damage. |
| Performance | Record frame-time/memory/texture/decode costs under crowd/VFX load; no ignored worst-frame stalls. |

Browser emulation is a required regression tool, not certification of physical
phones. Add real Android/iOS browser sessions when devices are available and
state the untested combinations. Test Chromium and WebKit paths; do not label a
desktop Chromium resize as an iOS device run.

## Exercise actual touch input

Use real touch actions supported by the browser harness, including hold/drag,
release and cancellation, rather than relying only on dispatched JavaScript
PointerEvents. Synthetic pointer sequences remain useful for edge cases but
do not prove touch capture, browser gesture handling or multitouch works.
If a harness cannot deliver a required input mode, name that gap and use a
supported browser/device path when available. Check both frozen simulation time
and released input after modals/backgrounding, not only a changed overlay label.
Audio-unlocked state is separate from successful audible playback/review.

## Platform builds

Produce a web build that can be served for phone play, plus Electron desktop
artifacts on matching Windows, Linux and macOS runners (architectures selected
and documented per project). Separate the shared SPA from platform packaging.
Keep privileged Electron work in the main process and a narrow preload bridge;
use context isolation and avoid enabling Node integration for remote content.
Use an existing packaging tool such as electron-builder with locked versions.

Smoke-test the packaged desktop executable, asset setup, input, audio and
save/continue; a dev server run alone does not validate a platform build. A phone
needs access to generated resources: document local-network serving or a
deliberate local import/cache flow. Never assume a desktop filesystem path is
accessible from the phone. Provide explicit host/port and firewall instructions
when relevant, and keep developer absolute paths out of the shipped UI.

## Diagnose a failed desktop launch

Keep the exact command, executable/runtime version, artifact digest, exit code
and main/renderer logs. Check the entrypoint and packaged resource paths, missing
runtime libraries, writable save/profile location and launch arguments. Inspect
relevant inherited environment flags individually: for example,
`ELECTRON_RUN_AS_NODE` changes Electron's launch mode and can make browser switches
invalid. Do not dump unrelated environment values. Test a minimal owned wrapper
with the same selected runtime to separate application failures from host/runtime
failures, then repeat the actual packaged launch after a correction.

Follow the host's execution controls for any retry. An access-denied operation,
a startup crash and a missing working directory are distinct observations.
Without an isolating reproduction, record the cause as unknown; do not attribute
an access violation to the sandbox by assumption. Keep required desktop delivery
open while fixing available packaging/launch defects. A browser fallback is a
review path, not evidence that Electron passed.
