import express from "express";
import {BlogController} from "../controllers/BlogController.js";
import { VerifyToken } from "../middleware/AuthMiddleware.js";
export const blogRouter = express.Router()


blogRouter.route('/get-blogs').get(VerifyToken,BlogController.getBlogs)
blogRouter.route('/get-blog').post(VerifyToken,BlogController.getBlog)
blogRouter.route('/publish-blog').post(VerifyToken,BlogController.publishBlog)
blogRouter.route('/upvote-blog').post(VerifyToken,BlogController.upVoteBlog)
blogRouter.route('/downvote-blog').post(VerifyToken,BlogController.downVoteBlog)
blogRouter.route('/delete-blog').post(VerifyToken,BlogController.deleteBlog)