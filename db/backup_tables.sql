create table usersAuth (
    id SERIAL PRIMARY KEY,
    auth0 TEXT
    );


--     insert into usersauth (auth0)
-- values ('adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou')
    

    create table combat (
    id SERIAL PRIMARY KEY,
    nameCombat VARCHAR(40),
    countNum INT,
    idUser Int,
        FOREIGN Key (idUser) REFERENCES usersAuth(id)
    )

-- insert into combat (namecombat, iduser, countNum)
-- values ('Battle of Minas Tirith', 1, 0),
-- ('Pellinor Fields', 1, 10),
-- (Siege of Troy, 1, 3)
    

create table combatants (
    id SERIAL PRIMARY KEY,
    namefighter VARCHAR(40),
    colorCode VarChar(10),
    speed Int,
    actionCount INT,
    topcheck BIT,
    acting bit,
    dead bit,
    idCombat Int,
        FOREIGN Key (idCombat) REFERENCES combat(id)
    )

--     insert into combatants (namefighter, colorcode, speed, actioncount, topcheck, acting, dead, idcombat)
-- values 
--      ('Ragnar','#FF0000', 5, 17, '0', '0', '0',1),
--      ('Sir William','#FFFF00',7, 10,'0', '0', '0',1)
--      ('Robert','#FF00FF', 15, 10, '0', '0', '0', 2),
--      ('Urlich VonLichstein','#FFFFFF',10, 1,'0', '0', '0', 2)
--      ('Harris', '#000000', 3, 5, '0', '0', '1', 1)

create table statuses (
    id SERIAL PRIMARY KEY,
    namestatus VARCHAR(40),
    timestatus Int,
    idCombat Int,
        FOREIGN Key (idCombat) REFERENCES combat(id)
    )

--     insert into statuses (namestatus, timestatus, idcombat)
-- values 
--      ('Darkness', 16, 1),
--      ('Fire', 12, 1)
--      ('Darkness', 25, 2)