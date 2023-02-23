import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers"
import ensureDataValidateMiddleware from "../middlewares/ensureDataValidate.middlewares";
import { createLoginSchema } from "../schemas/login.schema"

const loginRoutes: Router = Router()

loginRoutes.post("", ensureDataValidateMiddleware(createLoginSchema), createLoginController)

export default loginRoutes