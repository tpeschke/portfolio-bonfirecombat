insert into usersAuth (username, img, auth0)
values ($1, $2, $3)
RETURNING *;