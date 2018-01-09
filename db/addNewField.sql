    insert into combat (nameCombat, countNum, idUser)
values 
     ($1,0,1)
     where not exists (select nameCombat from combat where $1 = $1);
    
    select id, nameCombat from combat
    where nameCombat = $1