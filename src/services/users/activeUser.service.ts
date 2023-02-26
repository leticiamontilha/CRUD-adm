import { QueryConfig } from "pg"
import { client } from "../../dataBase"
import { AppError } from "../../errors"

const activeUserService = async (userId: number) => {

    const queryStringUserActive: string = `
    SELECT 
        *
    FROM
        users
    WHERE
        "id" = $1
    AND 
        "active" = true; 
    `

    const queryConfigUserActive: QueryConfig = {
        text: queryStringUserActive,
        values: [userId]
    }

    const queryResultUserActive = await client.query(queryConfigUserActive)

    if(queryResultUserActive.rowCount > 0) {
        throw new AppError("O usuário já é ativo")
    }

    const queryString: string = `
    UPDATE
        users
    SET
        "active" = true
    WHERE
        "id" = $1
    
    RETURNING *;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default activeUserService