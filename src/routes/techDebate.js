import express from "express";
import { TechDebateController } from "../controllers/TechDebateController.js";
export const techDebateRouter = express.Router();

techDebateRouter.route('/form').post(TechDebateController.formSubmit)
techDebateRouter.route('/start-round').post(TechDebateController.startRound)
techDebateRouter.route('/get-clubs').get(TechDebateController.getClubs)
techDebateRouter.route('/get-score').get(TechDebateController.getScore)
// techDebateRouter.route('/temp').post(TechDebateController.createDebatesfortesting)
