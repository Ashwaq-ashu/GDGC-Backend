import express from "express";
import {
  CreateTweet,
  getRecentTweet,
  getUserTweets,
 
} from "../controllers/tweetController.js";

const router = express.Router();

//tweet create
router.post("/tweet", CreateTweet);

//recent tweets.
router.get("/tweet/recent",getRecentTweet);


//get user's tweet
router.get("/user/:userId", getUserTweets);



export default router;