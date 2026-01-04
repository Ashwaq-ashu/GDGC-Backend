import express from "express"
import { AuthController } from "../controllers/AuthController.js"
import { VerifyToken } from "../middleware/AuthMiddleware.js"

export const authRouter = express.Router()

// authRouter.route('/signin').post(AuthController.LoginAdmin)
authRouter.route('/signup').post(AuthController.CreateUserFromEmail)
authRouter.route('/signin').post(AuthController.LoginUser)
authRouter.route('/forgot-password').post(AuthController.ForgotPassword)
authRouter.route('/about').get(VerifyToken,AuthController.aboutUser)