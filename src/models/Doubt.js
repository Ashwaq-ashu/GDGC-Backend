import mongoose from "mongoose"
const doubtSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        tags : String,
        enum:['Web','AI/ML','UI/UX','General','CyberSecurity','Cloud']
    }
},{timestamps:true});
export default mongoose.model('Doubt', doubtSchema);
