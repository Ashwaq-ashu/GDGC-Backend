import { success } from "zod"
import  User from "../models/User.js"
export const dashboardController = {
    accessDashboard : async (req,res)=>{
        const user = await User.findOne({_id:req.id}).select("name email qr_id -_id")
        return res.json({
            success:true,
            user:user
        })
    }
}