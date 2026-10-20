# Working on REGIS

REGIS is the skill/toolkit repository, not a generated game. Keep the packaged
skill self-contained under skills/regis and game-agnostic. The default generated
game stack is Node.js SPA + Electron, with mobile browser tests required by
default. Do not confuse package tests with gameplay or physical-device tests.

Run npm run verify for changes to the package, installer, project contract or
skill references. Keep the package dependency-free unless a demonstrated need
justifies an explicit dependency change. Tests use temporary directories and
synthetic files; never include game installations or proprietary extraction.

Do not add machine-specific paths to the skill. Record source-derived facts,
adaptations, unknowns and tested scope separately. No generated game, publication,
REA registration or client-wide installation occurs as a side effect of checks.
