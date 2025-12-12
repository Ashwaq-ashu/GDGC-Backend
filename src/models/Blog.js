import mongoose from "mongoose"
const blogSchema = new mongoose.Schema({
    title:{
        type:String,required:true
    },
    des:{
        type:String,required:true
    },
    content:{
        type:[]
    },
    tags:{
        type:[String]
    },
    banner:String
    ,
    Admin:{
       type: Schema.Types.ObjectId,
       req:true,
       ref:'users'
    },
    total_likes:{
        type:Number,
        default:0
    }
},{timestamps:true});
export default mongoose.model('Blog', blogSchema);
