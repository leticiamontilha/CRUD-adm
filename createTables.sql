CREATE TABLE IF NOT EXISTS users(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20) NOT NULL,
	"email" VARCHAR(100) NOT NULL UNIQUE,
	"password" VARCHAR(120) NOT NULL,
	"admin" BOOLEAN NOT NULL DEFAULT FALSE,
	"active" BOOLEAN NOT NULL DEFAULT TRUE
	);

UPDATE
	users
SET
	"active" = true
WHERE
	"id" = $1
RETURNING *;

SELECT 
	* 
FROM 
	users 
WHERE 
	email = $1;
			 
UPDATE 
	users
SET
	"active" = false
WHERE
	id = $1;
    

UPDATE
	users
SET (%I) = ROW(%L)
WHERE
	"id" = $1
RETURNING *;


SELECT
	*
FROM
	users
WHERE
	"id" = $1;

SELECT
	*
FROM
	users
WHERE 
	email = $1