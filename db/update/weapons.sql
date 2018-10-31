Update weapons
set 
    combatant = $1,
    weapon = $2,
    selected = $3,
    speed = $4
where 
    id = $5