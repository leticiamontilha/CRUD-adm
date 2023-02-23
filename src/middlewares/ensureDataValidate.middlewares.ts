import {Request, Response, NextFunction} from "express"
import { ZodTypeAny } from "zod"

const ensureDataValidateMiddleware = (schema: ZodTypeAny) => (request: Request, response: Response, next: NextFunction) => {
   
    const validateData = schema.parse(request.body)
   
    request.body = validateData

    return next()
}   

export default ensureDataValidateMiddleware