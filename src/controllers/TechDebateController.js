import Club from "../models/Club.js"
import {success, z} from "zod"

export const TechDebateController = {
    formSubmit:async(req,res)=>{
        try {
            const teamMemberSchema = z.object({
                name:z.string(),
                rollNo:z.string(),
                isLeader:z.boolean()
            });
            const requiredBody = z.object({
                clubName:z.string(),
                teamMembers:z.array(teamMemberSchema),
                clubImageUrl:z.string()
            })
            const testBody = requiredBody.safeParse(req.body);
            if(!testBody.success){
                return res.status(401).json({
                    message:"improper credentials",
                    error:testBody.error
                })
            }
            const {clubName,teamMembers,clubImageUrl} = req.body;
            await Club.create({
                clubName,
                teamMembers,
                clubImageUrl
            })
            res.status(200).json({
                success:true,
            })
            

        } catch (error) {
            res.status(500).json({
                message:error.message
            })
        }

    }
}