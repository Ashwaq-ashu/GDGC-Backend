import express from "express"
import { doubtController } from "../controllers/DoubtController.js" 
// import { randomMiddleWare } from "../middleware/AuthMiddleware"
export const userRouter = express.Router()


//userRouter.route('/random').post(randomMiddleWare , )
//userRouter.route('/application').post(EventsController.addApplicatinForEvent)
//userRouter.route('/application').get(EventsController.getApplicatinForEvent)
userRouter.route('/post-doubt').post(doubtController.postDoubt)
userRouter.route('/get-doubt').get(doubtController.getDoubts)