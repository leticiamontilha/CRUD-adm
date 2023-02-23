import { hashSync } from "bcryptjs"
import { z } from "zod"

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().transform((pass) => {
        return hashSync(pass, 10)
    }),
    admin: z.boolean(),
    active: z.boolean()
})

const returnUserSchema = createUserSchema.extend({
    id: z.number()
})

const returnUserSchemaWithoutPassword = returnUserSchema.omit({password: true})

const allUserSchemas = z.array(returnUserSchemaWithoutPassword)

const editUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional()
})

export {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword,
    allUserSchemas,
    editUserSchema
}
