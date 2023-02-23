import { IUserRequest, IUserResult, IUserWithoutPassword } from "../../interfaces/users.interfaces"
import { client } from "../../dataBase"
import format from "pg-format"
import { QueryConfig, QueryResult } from "pg"
import { AppError } from "../../errors"
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas"

const createUserService = async (userData: IUserRequest): Promise<IUserWithoutPassword> => {

    const queryStringUserExist: string = `
        SELECT 
            * 
        FROM 
            users 
        WHERE 
            email = $1;
    `

    const queryConfigUserExist: QueryConfig = {
        text: queryStringUserExist,
        values: [userData.email]
    }
    
    const queryResultUserExist: QueryResult = await client.query(queryConfigUserExist)

    if(queryResultUserExist.rowCount > 0){
        throw new AppError("O usuario já existe", 409)
    }

    const queryString: string = format(
        `
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING *;
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: IUserResult = await client.query(queryString)
     
    const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0])

    return newUser
}

export default createUserService