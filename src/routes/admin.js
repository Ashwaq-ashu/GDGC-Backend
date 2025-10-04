import express from "express"
import { AuthController } from "../controllers/AuthController"
export const adminRouter = express.Router()

adminRouter.route('/signin').post(AuthController.LoginAdmin)
adminRouter.route('/signup').post(randomMiddleWare , AuthController.Register)