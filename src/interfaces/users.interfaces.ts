import { QueryResult } from "pg"
import { createUserSchema, returnUserSchema, allUserSchemas } from "../schemas/users.schemas"
import { z } from "zod"

type IUserRequest = z.infer<typeof createUserSchema>
type IUser = z.infer<typeof returnUserSchema>

type IUserWithoutPassword = Omit<IUser, "password">
type IUserResult = QueryResult<IUserWithoutPassword>
type IUserResultWithPass = QueryResult<IUser>
type IAllUsersReturn = z.infer<typeof allUserSchemas>

export {
    IUserRequest,
    IUser,
    IUserWithoutPassword,
    IUserResultWithPass,
    IUserResult,
    IAllUsersReturn
}