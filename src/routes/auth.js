import express from "express"
import { AuthController } from "../controllers/AuthController.js"

export const authRouter = express.Router()

// authRouter.route('/signin').post(AuthController.LoginAdmin)
authRouter.route('/signup').post(AuthController.CreateUserFromEmail)
authRouter.route('/signin').post(AuthController.LoginUser)