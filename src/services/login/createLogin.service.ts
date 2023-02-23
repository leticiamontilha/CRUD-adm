import { QueryConfig } from "pg"
import { IloginRequest } from "../../interfaces/login.interfaces"
import { IUserResultWithPass } from "../../interfaces/users.interfaces"
import { client } from "../../dataBase"
import { AppError } from "../../errors"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"

const createLoginService = async (loginData: IloginRequest): Promise<string> => {

    const queryString: string = 
    `
    SELECT
        *
    FROM
        users
    WHERE 
        email = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [loginData.email]
    }

    const queryResult: IUserResultWithPass = await client.query(queryConfig)

    if(queryResult.rowCount === 0){
        throw new AppError("O email ou a senha estão incorretas", 401)
    }

    const matchPassword: boolean = await compare(loginData.password, queryResult.rows[0].password)
    
    if(!matchPassword){
        throw new AppError("O email ou a senha estão incorretas", 401)
    }

    const token: string = jwt.sign(
        {
            admin: queryResult.rows[0].admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: queryResult.rows[0].id.toString()
        }
    )

    return token
}

export default createLoginService