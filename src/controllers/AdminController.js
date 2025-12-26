import Blog from "../models/Blog";

export default AdminController={
    submitBlog: async(req,res)=>{
        const {title,des,banner,tags,content}= req.body;
        const Admin = req.admin;
        const blog = new Blog({
            title,des,banner,tags,content,Admin
        })
       try {
         const bllog = await blog.save()
         return res.json({success:true,blogSaved:bllog})
       } catch (error) {
        return res.json({success:false,error:error.message})
       }
        
    }
}