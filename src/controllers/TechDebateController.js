import Club from "../models/Club.js"
import Debate from "../models/Debate.js"
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

    },
    startRound: async (req, res) => {
        try {
            const { leftTeam, rightTeam, Topic } = req.body;
            if (!leftTeam || !rightTeam || !Topic) {
                return res.status(400).json({ "error": "Please Type All Fields" });
            }
            try {
                const leftteam = await Club.findOne({Name:leftTeam})
                const rightteam= await Club.findOne({Name:rightTeam})
                const debate = await new Debate(leftteam.Name, rightteam.Name, Topic).save();
                return res.status(201).json({ "Success": true, debate });
            } catch (error) {
                return res.status(404).json({ "error": "Club not found" });
            }

        } catch (err) {
            return res.status(500).json({ "error": err.message });
        }
    },
    endRound: async (req, res) => {
        try {
            const { leftTeam,rightTeam} = req.body;
            const debate = await Debate.findOne({leftTeam,rightTeam})
            const right= await Club.findOne({Name:rightTeam})
            const left = await Club.findOne({Name:leftTeam})
            let winner;
            if (debate.rightScore > debate.leftScore) {
                debate.winner = right._id;
                winner = right;
            }else{
                debate.winner=left._id;
                winner=left;
            }
            debate.isAlive=false
            await debate.save()
            return res.status(200).json({"message":"success","Winner team":winner.Name})
    }catch(err){
        return res.status(500).json({"error":err.message})
    }
},
increment: async (req, res) => {
  try {
    const { leftTeam, rightTeam, side } = req.body;

    // Basic validation
    if (!leftTeam || !rightTeam || !side) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Decide which score field to increment
    const field = side === "left" ? "leftScore" : "rightScore";
    let updatedDebate;
    try {
      updatedDebate = await Debate.findOneAndUpdate(
        { leftTeam, rightTeam },
        { $inc: { [field]: 1 } },
        { new: true }
      );
    } catch (dbError) {
      return res.status(500).json({
        success: false,
        message: "Database update failed",
        error: dbError.message,
      });
    }
    if (!updatedDebate) {
      return res.status(404).json({
        success: false,
        message: "Debate not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Score incremented successfully",
      updatedDebate,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
},
getScore : async (req,res) => {
  //find debate using left and right team, then return the whole debate object 
  const {leftTeam,rightTeam}   = req.body;
  let debate;
 try {
    debate = await Debate.findOne({leftTeam,rightTeam})
   if (!debate) {
     return res.status(400).json({"error":"error finding the debate with"+leftTeam + " and " +  rightTeam})
   }
 } catch (error) {
  return res.status(400).json({"error":error.message})
 }
 return res.status(200).json({"success":"true",debate})
},
getClubs: async (req,res) => {
    try {
        const clubs = await Club.find({});      
        return res.status(200).json({"success":true,clubs})
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
}
}