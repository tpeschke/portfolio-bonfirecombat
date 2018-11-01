insert into combatants (namefighter, colorcode, actioncount, topcheck, acting, dead, idcombat)
values ($1, $2, $3, $4, $5, $6, $7)
returning id