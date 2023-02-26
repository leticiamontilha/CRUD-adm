import { Router } from "express";
import { createUsersController, listUserController, deleteUserControler, listUserProfile, editUserControler, activeUserControler } from "../controllers/user.controllers";
import userExist from "../middlewares/userExist.middleware"
import { createUserSchema, editUserSchema} from "../schemas/users.schemas"
import ensureDataValidateMiddleware from "../middlewares/ensureDataValidate.middlewares"
import { ensureTokeIsValidMiddleware, verifyUserPermission } from "../middlewares/validTokenAndUserPermission.middlewares"

const userRoutes: Router = Router()

userRoutes.post('', ensureDataValidateMiddleware(createUserSchema), createUsersController)
userRoutes.get('', ensureTokeIsValidMiddleware, verifyUserPermission, listUserController)
userRoutes.get('/profile', ensureTokeIsValidMiddleware, listUserProfile)
userRoutes.patch('/:id', userExist, ensureTokeIsValidMiddleware, verifyUserPermission, ensureDataValidateMiddleware(editUserSchema), editUserControler) 
userRoutes.delete('/:id', userExist, ensureTokeIsValidMiddleware, deleteUserControler)
userRoutes.put('/:id/recover', userExist, ensureTokeIsValidMiddleware, verifyUserPermission, activeUserControler) 

export {
    userRoutes
}