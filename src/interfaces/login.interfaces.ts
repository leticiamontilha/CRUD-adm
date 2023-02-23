import { createLoginSchema } from "../schemas/login.schema"
import { z } from "zod"

type IloginRequest = z.infer<typeof createLoginSchema>

export {
    IloginRequest
}