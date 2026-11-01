# Equipment comparison and safe item handling

When equipment is selected, support the source game's meaningful equipment slots, including weapon slots, vehicle parts, jewelry and secondary layers where relevant. Choose a logical comparison slot before considering shared visual layers. A chest piece with an unusual name still compares with the equipped chest piece.

Filter candidates before rolling, then validate the final item. Every gameplay equipment drop should contain an implemented benefit or a useful granted ability. Cosmetic-only items can remain in a deliberately separate cosmetic system; they should not dilute equipment rewards.

Preserve fixed unique properties where evidence supports them. Keep derived weapon traits separately so generated adaptations never overwrite original values. Assign affix pools by equipment family and include all supported slot families in sampling; otherwise weapons dominate simply because the source catalog contains more of them.

Make loot visible with a consistent container or marker. Automatic walk-over opening can reduce missed small items when appropriate to the loop. Check reach, floor and walls before collection, and show the actual item in inventory, shop and comparison views.

Use conservative autosell. Sell an item automatically only when a compatible item is at least as good in every active comparison dimension and better in at least one. Different damage identities, granted abilities, restrictions and meaningful nonnumeric properties can make items incomparable. A scalar score is useful for a simple bot, but is insufficient evidence for deleting a human player's tradeoff.

Share a semantic comparison result across tooltips, autoequip and autosell:
equal, dominates, dominated, tradeoff or incomparable. Define absent-value and
near-equality policies, lower-is-better stats, caps/penalties and meaningful
nonnumeric properties. Missing is zero only where the system defines it so;
display rounding must not delete a real tradeoff. Test an extra useful bonus,
an absent bonus, lost ability grants and class restrictions. Autoequip is an
explicit project policy: if enabled, fill legal empty slots or replace clearly
dominated gear with atomic equip/displacement/sale. Repeated pickups or opening
inventory must not repeat sales or multiply bonuses.

Track protected/favorite/equipped items and define full-inventory behavior. Show autosell income explicitly. Equipped-item hover needs its own stats, while an unequipped item may compare beside it; comparing an item to itself adds no information. Keep scrollable tooltip overlays clear of item and trash targets, and provide a touch equivalent to hover.

Provide player-selectable autoequip and autosell settings plus explicit equip,
remove and sell actions. Compare against all retained compatible items of the
same logical slot, not only the currently worn item. Include companion usability
when its inventory is supported: an item inferior for the player can still be
useful to the ally. Preserve meaningful tradeoffs, favorites and unique effects.

Iterative autosell computes a stable retained set: identify a strictly dominated
unprotected candidate using the shared comparison semantics, sell it once, then
recompute eligibility/comparisons after any sale or automatic equipment change.
Continue until no eligible dominated item remains. Every sale needs a retained
compatible dominator; preserve the non-dominated alternatives. Do not treat equal
duplicates as strictly inferior without an explicit duplicate-sale policy. Use
stable IDs/order, stop when no change occurs, and never sell the last useful item
for a slot or repeatedly swap equal gear. Preview the sale set and show proceeds.

Test a chain of three progressively better same-slot items in different pickup
orders, incomparable tradeoffs, equal duplicates, restrictions/ability grants,
protected and equipped items, companion-only gear and full inventory. The final
retained choices and proceeds must follow the declared policy without double
sales, lost equipment or repeated stat application after load/reopen/reprocessing.



## Autoequip utility is not autosell proof

The selected genre/project defines whether autoequip is enabled, whether it can
replace a tradeoff, and the margin required. A utility model may combine expected
damage/coverage, survival, economy, resource costs and build synergy. Record its
weights and test it against the actual loop. Protect locked, set-critical and
build-defining gear; show the slot and key changes immediately. Utility rankings
must not silently authorize selling incomparable human choices.

Choose autoequip/autosell defaults in the genre or project profile. Preserve
saved player choices and define missing-setting migrations explicitly. Shared
comparison semantics do not impose either module's automatic behavior on others.
