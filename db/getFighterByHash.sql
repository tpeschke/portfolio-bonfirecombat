select namefighter, colorcode, actioncount, topcheck, dead from combatants
join combat on combatants.idcombat = combat.id
where urlhash = $1