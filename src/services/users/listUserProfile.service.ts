import { IUserWithoutPassword } from "../../interfaces/users.interfaces"
import { QueryConfig } from "pg"
import { client } from "../../dataBase"

const listUserProfileService = async (userId: number): Promise<IUserWithoutPassword> => {

    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            "id" = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default listUserProfileService