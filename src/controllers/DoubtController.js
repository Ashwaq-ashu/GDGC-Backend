import Doubt from "../models/Doubt.js";
export const doubtController = {
    postDoubt : async (req,res)=>{
        const {message} = req.body
        const tag = req.body?.tag || 'General'
        if (!message) {
            return res.status(400).json({error:"dont leave fields empty"})
        }
        const doubt = new Doubt({
            message,tag
        })
         await doubt.save()
        return res.status(200).json(doubt)
    },
    getDoubts : async (req,res)=>{
        const maxLimit = 10
       const doubts=  await Doubt.find().sort({createdAt:-1}).limit(maxLimit).select("message createdAt tag")
       if (doubts) {
        
           if (doubts.length==0) {
            return res.status(200).json({"status":"no messages"})
           }
           return res.status(200).json({doubts})
       }
       return res.status(500).json({"status":"server Error"})
    }
}