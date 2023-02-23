import { Request, Response, NextFunction } from "express"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../dataBase"
import { AppError } from "../errors"

const userExist = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    
    const userId: number = +request.params.id
    
    const queryStringUserExist: string = 
    `
    SELECT
        *
    FROM
        users
    WHERE
        id = $1;
    `

    const queryConfigUserExist: QueryConfig = {
        text: queryStringUserExist,
        values: [userId]
    }

    const queryResult: QueryResult = await client.query(queryConfigUserExist)

    if(queryResult.rowCount === 0) {
        throw new AppError("O usuário não existe", 404)
    }

    return next()
}

export default userExist