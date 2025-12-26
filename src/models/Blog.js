import mongoose from "mongoose"
const blogSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true,
   },
   banner:{
    type:String
   },content : {
    type:[]
   },
   author:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'users'
   },
   activity:{
    total_upvotes:{
        type:Number,
        default:0
    }
   }
},{timestamps:true});
export default mongoose.model('Blog', blogSchema);