    insert into combat (nameCombat, countNum, idUser)
values 
     ($1,0,$2);
    
    select id, nameCombat from combat
where nameCombat = $1 and idUser = $2