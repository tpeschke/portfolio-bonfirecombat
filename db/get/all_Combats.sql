select namecombat, sum(countnum) as countnum, count(namefighter) as fighternum, sum(cast(dead as INT)) as deadnum, sum(distinct combat.id) id  from combat
full join combatants on combatants.idcombat = combat.id
where iduser = $1
group by namecombat