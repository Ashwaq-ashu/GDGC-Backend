import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    unique: true,   
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  qr_id : {
    type : String ,
    require : true 
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);