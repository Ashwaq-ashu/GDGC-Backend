import mongoose from "mongoose"
const ForgotSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    isSet:{
        type : Boolean , 
        default : false
    },
    createdAt:{
        type:Date,
        default : Date.now
    }
},{timestamps:true});
export default mongoose.model('Forgot', ForgotSchema);
