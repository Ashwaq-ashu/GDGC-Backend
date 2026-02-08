import mongoose from "mongoose"
import Club from "./Club.js";
const debateSchema = new mongoose.Schema({
   title:{
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
   isDead:{
    type:Boolean,
    default:false
   },
   winner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Club,
    required:false
   }
},{timestamps:true});
export default mongoose.model('Debate', debateSchema);