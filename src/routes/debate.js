import express from "express";
import  DebateController  from "../controllers/DebateController.js";

export const debateRouter = express.Router();

debateRouter.route("/start-round").post(DebateController.startRound);



