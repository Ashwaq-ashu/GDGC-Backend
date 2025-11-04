import mongoose from 'mongoose';

const qrSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true ,
    unique : true 
  }, 
  qrcode : {
    type : String ,
    required : true  
  },
  qrcodeurl : {
    type : String ,
    required : true , 
  } ,
  authority : {
    type : String ,
    enum : ["gb","execom","core"] ,
  } ,
  destination: {
    type: String,
    required: true,
    lowercase: true
  }
}, {    
  timestamps: true
});

export default mongoose.model('Qr', qrSchema);