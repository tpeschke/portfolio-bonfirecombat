select namecombat, sum(DISTINCT countnum) as countnum, count(DISTINCT namefighter) as fighternum, sum(cast(dead as INT)) as deadnum, sum(DISTINCT combat.id) id  from combat
full join combatants on combatants.idcombat = combat.id
where iduser = 1
group by namecombat