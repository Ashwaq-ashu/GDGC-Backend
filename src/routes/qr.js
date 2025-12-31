import express from "express"
import { QrController } from "../controllers/QrController.js"
// import { randomMiddleWare } from "../middleware/AuthMiddleware"
export const qrRouter = express.Router()

// More specific routes first
qrRouter.route('/redirect').post(QrController.updateRedirectionData)
qrRouter.route('/data').get(QrController.getDataOfQr)

// Dynamic route last (this catches anything that doesn't match above)
qrRouter.route('/:id').get(QrController.redirect)
