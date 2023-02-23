import {IUserResult, IAllUsersReturn} from "../../interfaces/users.interfaces"
import { client } from "../../dataBase"
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

    return queryResult.rows
}

export default listUserService