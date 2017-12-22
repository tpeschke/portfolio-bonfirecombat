select namecombat, sum(DISTINCT countnum) as countnum, count(DISTINCT namefighter) as fighternum, sum(cast(dead as INT)) as deadnum from combat
full join combatants on combatants.idcombat = combat.id
where iduser = 1
group by namecombat