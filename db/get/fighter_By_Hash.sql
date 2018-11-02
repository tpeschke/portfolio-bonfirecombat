select combatants.id as id, namefighter, colorcode, topcheck, dead, hidden from combatants
join combat on combatants.idcombat = combat.id
where urlhash = $1;