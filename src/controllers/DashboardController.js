import { success } from "zod"

export const dashboardController = {
    accessDashboard : async (req,res)=>{
        return res.json({
            success:true
        })
    }
}