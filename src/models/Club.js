import mongoose from 'mongoose';
const schema = mongoose.Schema;

const ClubSchema = new schema({
    clubName:{
        type:String,
        required:true,
    },
    teamMembers: [{
        name: {
            type: String,
            required: true
        },
        rollNo: {
            type: String,
            required: true
        },
        isLeader: {
            type: Boolean,
            default: false
        }
    }],
    clubImageUrl:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

export default mongoose.model('Club',ClubSchema);