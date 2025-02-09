import { Router } from "express"
import { createUser } from "../UserModule/UserController.js"


export const user_routes = Router()

user_routes.post('/users', createUser)


