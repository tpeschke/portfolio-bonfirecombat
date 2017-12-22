create table users (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(40),
    userHash VARCHAR(40)
    );

create table combatants (
    id SERIAL PRIMARY KEY,
    namefighter VARCHAR(40),
    colorCode VarChar(10),
    speed Int,
    actionCount INT,
    top BIT,
    acting bit,
    dead bit
    )

create table statuses (
    id SERIAL PRIMARY KEY,
    namestatus VARCHAR(40),
    timestatus Int
    )

create table combat (
    id SERIAL PRIMARY KEY,
    nameCombat VARCHAR(40),
    idUser Int,
    idCombatant int,
    idStatus int,
        FOREIGN Key (idUser) REFERENCES users(id),
        FOREIGN KEY (idCombatant) REFERENCES combatants(id),
        FOREIGN KEY (idstatus) REFERENCES statuses(id)
    )