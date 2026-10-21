# CI/CD: REGIS and generated games

## REGIS repository pipeline

CI runs Node.js 22 and 24 on Windows, Linux and macOS. Each job uses `npm ci`,
then `npm run verify`: portable references/syntax, behavioral tests, skill build
and offline npm-tarball smoke. Tests use only synthetic data and temporary paths.
Cross-platform jobs are prepared here; local checks alone do not mean GitHub ran
them. No real game files, paid generation or REA providers are required.

The offline tarball smoke installs the newly packed REGIS archive into a temporary
consumer using the repository's locked dependency graph. It needs the dependency
tarballs cached by the preceding `npm ci`, not registry version metadata left over
from an earlier `npm install`. This checks the real package and pinned REA closure
without making a fresh dependency-resolution request during verification.

The release workflow runs manually or for a `v*` tag. It verifies the package,
checks a tag against package.json, creates the npm tarball and standalone skill
tarball, writes SHA-256 sums and uploads workflow artifacts. A manual run only
prepares artifacts. A matching tag creates a **draft** GitHub release. Review it
before making it public. These workflows become active after this repository
is put on GitHub; no remote repository is created by REGIS tooling.

An optional separate, manual npm publish job uses trusted publishing/OIDC. Before
enabling it, choose/confirm the registry name, configure npm's trusted publisher
for the actual GitHub repository/workflow/environment, and protect the `npm`
environment with required reviewers. The provided package name is a proposed
name, not a reservation. Publishing requires that external setup and explicit
workflow execution. There is no npm token embedded in this repository.
Set package.json's repository.url to the actual git+https GitHub URL before
tagging a publishable version; the publish workflow checks that binding.
See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) for the
provider configuration and supported npm/Node versions. The workflow uses Node
24; ensure its npm is at least 11.5.1 before enabling trusted publishing.

The publish workflow accepts an existing version tag, checks it against the
package version, reruns verification and publishes with provenance. Test commands
and regular CI never publish. The registry may reject an unavailable name or a
version already published; do not retry by inventing a version without review.

## Generated game pipeline

Each game has its own package/lockfile and Node.js SPA/Electron build configuration.
Its default test command runs unit, browser **and mobile** tests. CI installs
the required Chromium/WebKit binaries and fails if required mobile checks are
missing, failing or unexpectedly skipped. Real mobile device sessions and local
game-file extraction are reported separately from browser emulation/synthetic CI.

Build Electron platform releases on native Windows/Linux/macOS runners and a
separate mobile web artifact. Smoke-test packaged launch, input/audio, saves and
asset discovery. Use synthetic/redistributable fixtures in public CI and source-only
release allowlists. The player generates resources locally from supported game
files using the documented asset recipe. See
[game delivery](../skills/regis/references/game-delivery.md) and
[platform/mobile defaults](../skills/regis/references/platform-and-mobile.md).
