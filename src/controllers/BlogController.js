import Blog from "../models/Blog.js";

export const BlogController = {
    getBlog:async(req,res)=>{
        const {_id} = req.body;
        const foundBlog = await Blog.findOne({_id})
        if (foundBlog) {
            return res.json(foundBlog)
        }
        return res.json({success:false})
    },
    getBlogs:async(req,res)=>{
        let BlogArray = []
       try {
          BlogArray = await Blog.find().sort({"total_activity.total_upvotes" : -1}).limit(11)
       } catch (error) {
        return res.json({message:"Error in fetching blogs "+error.message})
       }
        return res.json({BlogArray})
    },
    upVoteBlog : async(req,res)=>{
        const {_id} = req.body;
        const blog =await Blog.findByIdAndUpdate(_id,{ $inc: { 'activity.total_upvotes': 1 } },   
);
        return res.json({"message":"upVoted successfully"})
    },
    downVoteBlog: async(req,res)=>{
         const {_id} = req.body;
        await Blog.findByIdAndUpdate(_id,{ $inc: { 'activity.total_upvotes': -1 } }
);
        return res.json({"message":"downVoted successfully"})
    }
,
    publishBlog:async(req,res)=>{
        const {blog:{title,des,banner,content}} = req.body; //state from frontend
        const toBePublished = new Blog({
            title,des,banner,author:req.id,content
        })
        try {
            await toBePublished.save()
        } catch (error) {
            return res.json({"message":"Error in publishing blog "+error.message})
        }
        return res.json({"message":"Blog successfully uploaded",blog:toBePublished})
    },
    deleteBlog: async(req,res)=>{
        const {_id} = req.body;
        const blog = await Blog.findById(_id)
        if (blog.author == req.id) {
            await Blog.findByIdAndDelete(_id)
            return res.json({"message":"Blog deleted successfully"})
        }else{
            return res.json({"message":"unauthorized request"})
        }
    }
}