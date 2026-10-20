# Local validation

Validated on Windows with Node.js 24.20.0 on 2026-10-20.

- npm run verify --cache .cache/npm: 23 behavioral tests passed, no skips/failures; documentation and syntax checks passed; portable skill built; offline npm-tarball install/CLI/skill/project smoke and pinned REA dependency resolution passed.
- Harness routing: all 18 catalog clients installed and repeated idempotently in temporary projects; personal/profile roots and explicit destinations checked. Live client discovery and MCP integration were not tested.
- REA 6.7.0 acquired with npm install --ignore-scripts; no REA tools/providers were launched or registered. Node engine requirements match that release.
- git diff --check passed.
- Earlier baseline checks: Codex skill-creator quick_validate.py reported a valid skill; GitHub workflow YAML parsed successfully; npm and standalone skill tarballs built with SHA-256 sums saved in dist.

The GitHub OS/Node matrix and registry publication have not run here.
No game target was supplied to REGIS itself: no actual game, gameplay balance,
mobile browser/device session, REA provider integration or promo generation is
claimed by these package checks. Generated games require their own default
unit/browser/mobile tests and platform builds under the skill contract.
