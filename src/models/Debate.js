import mongoose from "mongoose"
import Club from "./Club.js";
const debateSchema = new mongoose.Schema({
   Topic:{
    type:String,
    required:true,
   },
   leftTeam:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Club
   },
   rightTeam:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Club
   },
   leftScore:{
    type:Number,
    default:0
   },
   rightScore:{
    type:Number,
    default:0
   },
   isLive:{
    type:Boolean,
    default:false
   },
   winner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Club,
    required:false
   },
   status:{
      type:String,
      enum:["League","SemiFinal","Final"],
      default:"League"
   },
   votesLeft:{type:Number,default:0},
   votesRight:{type:Number,default:0},
},{timestamps:true});
export default mongoose.model('Debate', debateSchema);