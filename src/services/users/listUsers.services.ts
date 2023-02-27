import {IAllUsersReturn, IUserResult} from "../../interfaces/users.interfaces"
import { client } from "../../dataBase"
import { allUserSchemas } from "../../schemas/users.schemas"
// import { AppError } from "../../errors"


const listUserService = async (): Promise<IAllUsersReturn> => {
    
    const queryString: string = 
        `
        SELECT
            *
        FROM 
            users u;
        `

    const queryResult: IUserResult = await client.query(queryString)

    return allUserSchemas.parse(queryResult.rows)
}

export default listUserService