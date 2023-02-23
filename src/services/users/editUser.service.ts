import { QueryConfig } from "pg"
import format from "pg-format"
import { IUserResult } from "../../interfaces/users.interfaces"
import { client } from "../../dataBase"

const editUserService = async (userData: any, userId: number) => {

    const queryString = format(
        `
        UPDATE
            users
        SET (%I) = ROW(%L)
        WHERE
            "id" = $1
        RETURNING *;
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }
    
    const queryResult: IUserResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default editUserService