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
    required: true
    // removed lowercase: true to preserve URL case sensitivity
  }
}, {    
  timestamps: true
});

const Qr = mongoose.model("Qr", qrSchema);

export default Qr;
