import express from "express"
import { dashboardController } from "../controllers/DashboardController.js";
import { VerifyToken } from "../middleware/AuthMiddleware.js";
export const dashboardRouter = express.Router();
dashboardRouter.route('/get-dashboard').get(VerifyToken,dashboardController.accessDashboard);
dashboardRouter.route('/landing-page').get(VerifyToken,dashboardController.landingPage)