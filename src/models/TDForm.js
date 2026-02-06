import mongoose from 'mongoose';
const schema = mongoose.Schema;

const TDFormSchema = new schema({
    name:{
        type:String,
        required:true,
    },
    members:[{
        required:true,
        name:String,
        email:String,
        isLeader:{
            type:Boolean,
            default:false
        }
    }],
    clubImage:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

export default mongoose.model('TDForm',TDFormSchema);