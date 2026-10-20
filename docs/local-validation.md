# Local validation

Validated on Windows with Node.js 24.20.0 on 2026-10-20.

- npm run verify: 17 behavioral tests passed, no skips/failures; documentation and syntax checks passed; portable skill built; offline npm-tarball install/CLI/skill/project smoke passed.
- Codex skill-creator quick_validate.py: Skill is valid.
- GitHub workflow YAML parsed successfully.
- npm tarball and standalone skill tarball built; SHA-256 sums saved in dist.

The GitHub OS/Node matrix and registry publication have not run here.
No game target was supplied to REGIS itself: no actual game, gameplay balance,
mobile browser/device session, REA provider integration or promo generation is
claimed by these package checks. Generated games require their own default
unit/browser/mobile tests and platform builds under the skill contract.
