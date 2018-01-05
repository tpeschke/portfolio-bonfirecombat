Update combatatants
set namefighter = $1, colorcode = $2, speed = $3, actioncount = $4, topcheck = $5, acting = $6, dead = $7
where id = $8;



--     insert into combatants (namefighter, colorcode, speed, actioncount, topcheck, acting, dead, idcombat)
-- values 
--      ('Ragnar','#FF0000', 5, 17, '0', '0', '0',1),

Update combat
set countNum = $9
where id = $10

-- insert into combat (namecombat, iduser, countNum)
-- values ('Battle of Minas Tirith', 1, 0),