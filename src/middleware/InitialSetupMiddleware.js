import User from '../models/User.js'
import {z} from 'zod'
export const InitialSetupVerify = async(req,res,next)=>{
                try {
                    const requiredBody = z.object({
                    id:z.string()
                    })
                    const body = requiredBody.safeParse(req.query);
                    if(!body.success){
                        return res.status(401).json({
                            success:false,
                            message:"give an id in the body"
                        })
                    }
                    let {id} = req.query;
                    id= id/process.env.SECRET;
                    const user = await User.findOne({qr_id:id})
                    if(user){
                         return res.status(401).json({
                            success:false,
                            message:"user already exists"
                        })
                    }
                    next();
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({
                        error:error.message
                    })
                }
}   