# Choose the target genre

The target loop and the source game's genre are separate decisions. Continue an
existing project's selected loop; explicit user choices override module defaults.

| Target | Read | Specific design and verification |
| --- | --- | --- |
| Survival / survivors | [Survival module](survival/workflow.md) | Free movement, automatic combat, useful source abilities, earned builds, crowd pressure and navigation. |
| Forward runner | [Runner module](runner/workflow.md) | Lane/jump/slide contract, source-genre verbs, authored or seeded tracks, fair clearances and reaction windows. |
| Another genre / hybrid | Define its project-specific loop using shared references | State verbs, constraints, win/loss, progression if any, and measurable difficulty; do not import either module's mandatory classes, shop or movement rules. |

Load only the selected module and relevant shared references. For hybrids record
which rule owns each system and resolve conflicts in the design brief. There is
no universal Easy stationary policy, lane count, class count or upgrade system.

The CLI's `init --genre survival|runner` selects a bundled structural brief.
Omitting the flag retains survival for compatibility. Existing version-1 briefs
without `adaptation` remain survival. This is a scaffold, not gameplay validation.
An alternative genre requires an explicit project contract; a document describing
it does not mean the CLI already validates that genre's mechanics.

Shared asset extraction, delivery, UI, playtesting, promo and tool guidance live
once in the parent references directory. Module-specific documents link back to
them; no installed sibling skill or repository is required.


If equipment is selected, use the shared
[equipment/comparison contract](../equipment-and-comparison.md). The modules
choose different automatic policies; do not copy those defaults into shared UI.
