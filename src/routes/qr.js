import express from "express"
import { QrController } from "../controllers/QrController.js"
// import { randomMiddleWare } from "../middleware/AuthMiddleware"
export const qrRouter = express.Router()

// in this request the persons scan will be redirected to a particular website 
qrRouter.route('/redirect/:id').get(QrController.redirect)
qrRouter.route('/redirect').post(QrController.updateRedirectionData)
qrRouter.route('/data').get(QrController.getDataOfQr)
