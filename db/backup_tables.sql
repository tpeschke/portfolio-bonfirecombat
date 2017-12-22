create table usersAuth (
    id SERIAL PRIMARY KEY,
    auth0 TEXT
    );


--     insert into usersauth (auth0)
-- values ('adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou')
    

    create table combat (
    id SERIAL PRIMARY KEY,
    nameCombat VARCHAR(40),
    idUser Int,
        FOREIGN Key (idUser) REFERENCES usersAuth(id)
    )

-- insert into combat (namecombat, iduser)
-- values ('Battle of Minas Truth', 1)
    

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
--     ('Ragnar','#FF0000', 5, 17, '0', '0', '0',1),
--     ('Sir William','#FFFF00',7, 10,'0', '0', '0',1)

create table statuses (
    id SERIAL PRIMARY KEY,
    namestatus VARCHAR(40),
    timestatus Int,
    idCombat Int,
        FOREIGN Key (idCombat) REFERENCES combat(id)
    )

