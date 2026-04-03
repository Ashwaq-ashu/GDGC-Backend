import express from "express";
import {
  createTweet,
  getTweets,
  toggleLike,
  replyToTweet
} from "../controllers/tweetController.js";

const router = express.Router();

// Create tweet
router.post("/", createTweet);

// Get all tweets
router.get("/", getTweets);

// Like tweet
router.post("/:id/like", toggleLike);

// Reply tweet
router.post("/:id/reply", replyToTweet);

export default router;