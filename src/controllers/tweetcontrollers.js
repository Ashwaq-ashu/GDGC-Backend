import { Tweet } from "../models/Tweet.js";


//1. CREATE TWEET

export const createTweet = async (req, res) => {
  try {
    const { text, hashtags } = req.body;

    const tweet = await Tweet.create({
      author: req.user?._id || null,
      text,
      hashtags,
    });

    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 2. GET ALL TWEETS

export const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 3. GET SINGLE TWEET

export const getTweetById = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
      .populate("author", "name email");

    if (!tweet) return res.status(404).json({ message: "Not found" });

    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 4. DELETE TWEET (SOFT DELETE

export const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) return res.status(404).json({ message: "Not found" });

    tweet.isDeleted = true;
    tweet.deletedAt = new Date();

    await tweet.save();

    res.json({ message: "Tweet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 5. LIKE / UNLIKE TWEET (IMPORTANT)

export const toggleLike = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    const userId = req.user?._id;

    if (!tweet) return res.status(404).json({ message: "Not found" });

    const alreadyLiked = tweet.likedBy.includes(userId);

    if (alreadyLiked) {
      tweet.likedBy.pull(userId);
      tweet.likeCount -= 1;
    } else {
      tweet.likedBy.push(userId);
      tweet.likeCount += 1;
    }

    await tweet.save();

    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 6. REPLY TO TWEET

export const replyToTweet = async (req, res) => {
  try {
    const { text } = req.body;
    const parent = await Tweet.findById(req.params.id);

    if (!parent) return res.status(404).json({ message: "Not found" });

    const reply = await Tweet.create({
      author: req.user?._id || null,
      text,
      parentTweet: parent._id,
      rootTweet: parent.rootTweet || parent._id,
      isReply: true,
      replyToUser: parent.author,
    });

    parent.replyCount += 1;
    await parent.save();

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 7. GET REPLIES OF A TWEET

export const getReplies = async (req, res) => {
  try {
    const replies = await Tweet.find({
      parentTweet: req.params.id,
    }).sort({ createdAt: 1 });

    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 8. SEARCH BY HASHTAG

export const searchByHashtag = async (req, res) => {
  try {
    const { tag } = req.params;

    const tweets = await Tweet.find({
      hashtags: tag.toLowerCase(),
    }).sort({ createdAt: -1 });

    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};