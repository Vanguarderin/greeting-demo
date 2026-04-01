This list is from the issue https://github.com/leia-uwu/survev/issues/129, each emoji has a meaning:
- ✅: This bug/exploit is fixed.
- ⚠️: This bug/exploit is half-fixed; Has problems and/or not accurate like the original one.
- ❌: This bug/exploit is still not fixed.

> **Note:** Consider using [GitHub Issues](https://github.com/vanguarderin/greeting-demo/issues) to track individual bugs for better visibility and discussion.

# Bugs/exploits:
## Maps
**1. Desert:**
- ✅: Airstrikes/strobes nonfunctional
- ✅: Hardstone blocks have no loot
- ✅: Unable to leave saloon basement

**2. Halloween:**
- ⚠️: Perks and disguises nonfunctional (perk system is implemented, may need further testing)

**3. Potato:**
- ✅: No Potato Cannon (implemented and in loot tables)
- ❌: No Silo Shack (feature not yet implemented)
- ✅: Potatoes nonfunctional (potato objects and throwables are functional)

**4. Woods:**
- ✅: Buildings shouldn't be able to spawn on the central island (fixed: canSpawn now checks lake inner radius)
- ✅: Picking up Shishigami no Kabuto and then removing it will keep the effects (permanently), and you cannot pick up any other helmet (fixed: dropArmor now removes role perks)

**5. Cobalt:**
- ✅: Roles nonfunctional (role system is fully implemented)
- ✅: Twins Bunker central barrel has no loot
- ❌: No class pods (feature not yet implemented)

**6. Savannah:**
- ✅: Map generation incorrect
- ✅: No roles
- ⚠️: Loot tables incorrect

**7. Faction (50v50):**
- ✅: Players in a group will spawn in same spawn point as the group's leader, but each player have different team (Red or Blue)
- ✅: Players who left a 50v50 match are still count as players
- ✅: Missing large bridges (`bridge_lg_structure_01`)
- ✅: Airstrikes nonfunctional
- ❌: Airstrikes yellow zones nonfunctional
