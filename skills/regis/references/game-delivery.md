# Deliver the generated game

This is the generated game's release workflow. REGIS's own skill/package release
pipeline is a separate repository concern.

## Rebuild from the player's source files

Ship supported source editions/platforms, exact prerequisites, install/build/run
commands, expected output paths and extraction limitations. The user selects
their own source installation using configuration or an explicit path. Avoid
developer-specific absolute paths and undocumented sibling repositories.

Provide an asset setup command with a check/dry-run mode where useful: identify
source version/hashes; validate files and dependencies; extract with bounded
parsers; write into a fresh staging area; verify a manifest; activate only a
successful result. Preserve the previous usable output on failure. Re-running
the same inputs/recipe should reproduce output hashes where the formats permit;
document nondeterministic fields and tool versions explicitly.

Keep source archives, original/extracted art, music and private runtime evidence
out of the public repository and default source-only releases. Apply both Git
ignore rules and a distribution allowlist; ignored files can still enter an
installer through a broad packaging glob. A fan-project note is attribution,
not permission to redistribute another game's resources. If particular material
has established redistribution permission, record that provenance separately.

## The final package includes its extractor

Every final game package must include a runnable asset-extraction script or
launcher, the extraction recipe/configuration and all nonproprietary adapters
needed to turn the player's supported original game files into runtime assets.
Do not leave the extractor only in the development checkout or require an
undocumented sibling repository, pre-extracted download or developer machine.
Include the script in the release allowlist and verify its presence in the
actual archive/installer, not just the source tree.

Document one concrete command accepting the original game path and output path,
for example `node tools/extract-assets.mjs --source <game-path> --output <assets-path>`.
That is an interface example; ship a working implementation for the selected
source format. Bundle its redistributable dependencies or state exact install
steps and runtime requirements. Electron packages must provide a usable launcher
or documented runtime for the extractor; do not assume system Node/Python exists
just because Electron contains a runtime. Place generated assets in a writable
location and tell the game how to find them, without writing into installed
application resources or modifying the original game.

For mobile web, include the extractor in the downloadable setup package and
document generating resources on a supported desktop and serving/importing them
for phone play, unless on-device extraction is actually implemented. Do not
pretend a phone browser can read an arbitrary desktop installation path.

Validate the delivered script from a clean unpacked package: check missing or
unsupported source files, run extraction into an empty output directory, verify
the manifest, launch the packaged game with those assets, and verify that a
failed rerun preserves working output. Use synthetic fixtures in public CI;
record a real supported-installation test separately or mark it untested.

## Game repository contents

- A playable source project, lockfiles and versioned configuration.
- Extraction/adaptation code, source inventory and evidence references, without
  accidentally bundling private evidence or game bytes.
- Three documented classes and current mechanics/difficulty settings.
- Synthetic/redistributable tests, navigation scenarios and balance results.
- Main-menu/credits/README fan-project note and asset provenance.
- Platform install/run, asset-setup, save-location and troubleshooting docs.
- Promo master/poster/storyboard, or an explicit remaining production blocker;
  distribution permission for media is tracked separately from local production.

An example note, adapted to actual attribution: "Unofficial fan project.
Not affiliated with or endorsed by the original game's creators or publishers.
Original names and resources belong to their respective owners. A supported
local game installation is required to generate resources."

## README screenshots from the finished build

The finished game README must embed screenshots of the actual implemented game,
not only link to a gallery or describe its appearance. Capture the release
candidate using its real renderer and current UI. Include representative desktop
gameplay, a mobile portrait view and an upgrade/build-choice screen; add class,
inventory, boss or landscape views when they explain an important feature.
Show upgrade cards fitting vertically with their action buttons visible.

Store screenshot files in a versioned documentation/media directory and use
portable relative Markdown image paths, meaningful alt text and short captions.
Verify that the images render from a clean checkout and remain available wherever
the README is distributed. Keep screenshots current with the delivered build;
do not substitute generated concept art, mockups or obsolete UI for gameplay.
Disclose staged encounters/stats where relevant and keep the fan-project note.

Review the source-game resource permissions before putting screenshots in a
public repository or release. When public screenshot distribution is not
established, keep real screenshots embedded in the local/private delivered
README and explicitly record the public-distribution limitation. Do not silently
omit the requested screenshots or replace them with invented gameplay.

## Game CI and release checks

Use the project's engine-native build/test tools. Run deterministic logic tests,
extractor tests with nonproprietary fixtures, UI/navigation smoke tests and
platform build jobs on matching runners. If a licensed installation is absent,
mark real extraction untested; synthetic fixtures cannot validate real files.
When authorized local/secure testing supplies real files, keep them and their
private output off public CI artifacts/logs.

Audit packaged content before release. Test a clean source checkout and packaged
app with freshly generated assets: launch, class/difficulty selection, first
encounter, movement, progression, exit, save/reload, audio/input and quit. Check
that missing/unsupported game files yield useful instructions rather than a
blank screen. Document which OS/architecture/device combinations actually ran.

Prepare checksums, versioned artifacts and changelog/release notes. Keep CI test
artifacts separate from public downloads. Build source-only packages when game
resource redistribution is not established. Prepare external release work for
review and publish only within the user's authorization; a request to add CI/CD
does not by itself authorize account/repository creation or a public upload.

## Handoff

Revisit the [quality target](quality-and-scope.md) and compare delivered coverage,
matched screenshots/motion, class/build results and required platform launches
against it. Resolve supported omissions before handoff. A working browser demo,
a silent unedited capture or an unlaunched desktop folder cannot replace the
requested game, promo or runnable package. Keep partial outputs useful while
stating the unmet targets and concrete blockers; do not silently redefine the
requested result around whichever artifacts passed their easiest tests.

Give exact commands for source setup, test, build and run on supported platforms.
List output paths, tested classes/difficulties/routes/devices, balance evidence,
asset recipe identity, remaining defects and limitations. Distinguish prepared
CI from executed CI, a built package from a launched package, and a local release
from a published release. A full end-to-end delivery includes all requested
phases; unresolved external blockers remain explicit.
