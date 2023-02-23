import { QueryConfig } from "pg"
import { client } from "../../dataBase"

const activeUserService = async (userId: number) => {

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