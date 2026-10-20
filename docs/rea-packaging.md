# Packaging relationship to REA

REGIS follows useful distribution patterns from the inspected
[REA package manifest](https://github.com/morluto/rea/blob/main/package.json)
and [README](https://github.com/morluto/rea/blob/main/README.md): an npm package,
a command-line entrypoint, bundled agent skills, diagnostics, documentation,
tests and release tooling. Upstream was inspected on 2026-10-20 and its manifest
reported rea-agents 6.7.0; the npm registry independently reported 6.7.0.
REGIS now pins that release as its sole direct runtime dependency at the user's
request, so npm installation supplies the analysis toolkit.

REGIS packages `regis-agents` with the `regis` command and `skills/regis` payload.
Its install command supports project/user scope, a read-only dry run, idempotence
and backups for replacement. Build output includes a portable skill and digest
manifest. npm packing uses a small explicit file allowlist and is smoke-tested
from an isolated offline installation.

REA additionally supplies analysis tools/MCP and analysis engines. REGIS is an
agent workflow and project toolkit: it depends on REA without exposing its own
MCP server, registering MCP or automatically installing providers.
The doctor reports only what it can actually observe. Do not assume an installed
skill means the agent has connected tools.

See [harness support](harnesses.md) for client IDs, destination choices and
the boundary between tested installation and live integration.

The npm name, registry publication and GitHub repository must be established by
the maintainer. This source checkout and its prepared workflows do not imply
that anything has already been published.
