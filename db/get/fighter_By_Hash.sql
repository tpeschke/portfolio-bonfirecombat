select combatants.id as id, namefighter, colorcode, topcheck, dead from combatants
join combat on combatants.idcombat = combat.id
where urlhash = $1;