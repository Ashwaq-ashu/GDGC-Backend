import express from "express";
import {BlogController} from "../controllers/BlogController.js";
import { VerifyToken } from "../middleware/AuthMiddleware.js";
export const blogRouter = express.Router()


blogRouter.route('/get-blogs').get( BlogController.getBlogs)
blogRouter.route('/get-blog').post(BlogController.getBlog)
blogRouter.route('/publish-blog').post(BlogController.publishBlog)
blogRouter.route('/upvote-blog').post(BlogController.upVoteBlog)
blogRouter.route('/downvote-blog').post(BlogController.downVoteBlog)
blogRouter.route('/delete-blog').post(BlogController.deleteBlog)
