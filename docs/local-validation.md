# Local validation

Validated on Windows with Node.js 24.20.0 on 2026-10-20.

Quality-target revision validated on the same platform on 2026-10-21: package
verification passed with 23 tests; the packaged initializer emits the quality
brief; skill-creator quick_validate.py reports a valid skill; git diff --check
passes. These are structure/package checks, not a fresh adaptation quality run.

- npm run verify --cache .cache/npm: 23 behavioral tests passed, no skips/failures; documentation and syntax checks passed; portable skill built; offline npm-tarball install/CLI/skill/project smoke and pinned REA dependency resolution passed.
- Harness routing: all 18 catalog clients installed and repeated idempotently in temporary projects; personal/profile roots and explicit destinations checked. Live client discovery and MCP integration were not tested.
- REA 6.7.0 acquired with npm install --ignore-scripts; acquisition and package checks launched no REA tools/providers or registrations. Node engine requirements match that release. The separate trial used static REA resource inspection.
- git diff --check passed.
- Earlier baseline checks: Codex skill-creator quick_validate.py reported a valid skill; GitHub workflow YAML parsed successfully; npm and standalone skill tarballs built with SHA-256 sums saved in dist.

The GitHub OS/Node matrix and registry publication have not run here.
These package checks certify no game's gameplay, balance, mobile/device behavior,
REA provider integration or promo quality. A separate assisted Allods II trial
is discussed in [trial findings](trial-findings.md); it fell short of the intended
quality target. The revised workflow has not yet completed a fresh game-generation
trial. Generated games require their own default unit/browser/mobile tests,
quality reviews and platform builds under the skill contract.
