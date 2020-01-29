Update weapons
set 
    combatant = $1,
    weapon = $2,
    selected = $3,
    speed = $4,
    encumb = $5
where 
    id = $6