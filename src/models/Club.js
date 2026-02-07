import mongoose from "mongoose"
const clubSchema = new mongoose.Schema({
   Name:{
    type:String,
    required:true
   },
   logo:String,
   isEliminated:{
    type:Boolean,
    default:false
   }
},{timestamps:true});
export default mongoose.model('Club', clubSchema);