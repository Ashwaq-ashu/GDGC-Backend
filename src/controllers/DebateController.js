import Debate from "../models/Debate.js";
import Club from "../models/Club.js";

//in this file, there is code for Judge Interface of frontend to select clubs and score them and finally submit them, also there is code for long polling in HR interface so that it is visible to judges what changes they made while scoring or is there any descrepancy, also this file contains controller of live score page , and all recent matches 
export default {
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
}

};
