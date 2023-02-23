import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"
import jwt from "jsonwebtoken"

const ensureTokeIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    
   let token = request.headers.authorization

   if(!token){
    throw new AppError("Missing Bearer Token", 401)
   }

   token = token.split(' ')[1]

   jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if(error){
            throw new AppError(error.message, 401)
        }

        request.user = {
            id: parseInt(decoded.sub),
            admin: decoded.admin
        }
        
        return next()
   })
    
}



export {
    ensureTokeIsValidMiddleware
}