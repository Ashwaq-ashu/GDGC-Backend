import express from "express";
import { TechDebateController } from "../controllers/TechDebateController.js";
export const techDebateRouter = express.Router();
import SuperAdminMiddleware from "../middleware/SuperAdminMiddleware.js";
import AdminMiddleware from "../middleware/AdminMiddleware.js";
import { formLimiter, strictLimiter, defaultLimiter } from "../middleware/RateLimitter.js";

// Public routes with rate limiting
techDebateRouter.route('/form').post(formLimiter, TechDebateController.formSubmit)
techDebateRouter.route('/get-score').get(defaultLimiter, TechDebateController.getScore)
techDebateRouter.route('/vote').post(strictLimiter, TechDebateController.vote)
techDebateRouter.route('/get-history').get(defaultLimiter, TechDebateController.history)

// Admin protected routes (no rate limiting needed)
techDebateRouter.route('/start-round').post(AdminMiddleware, TechDebateController.startDebate)
techDebateRouter.route('/get-clubs').get(AdminMiddleware, TechDebateController.getClubs)
techDebateRouter.route('/increment-score').post(AdminMiddleware, TechDebateController.increment)
techDebateRouter.route('/end-debate').post(AdminMiddleware, TechDebateController.endDebate)
techDebateRouter.route('/temp').post(AdminMiddleware , TechDebateController.createDebatesfortesting)
techDebateRouter.route('/delete-debates').delete(AdminMiddleware, TechDebateController.deleteAllDebateDocuments) 
techDebateRouter.route('/delete-clubs').delete(AdminMiddleware, TechDebateController.deleteAllClubDocuments)
techDebateRouter.route('/pause').post(AdminMiddleware, TechDebateController.pauseDebate)
techDebateRouter.route('/resume').post(AdminMiddleware, TechDebateController.resumeDebate)
