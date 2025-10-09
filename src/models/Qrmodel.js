import mongoose from 'mongoose';

const qrSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true ,
    unique : true 
  },
  destination: {
    type: String,
    required: true,
    lowercase: true
  }
}, {    
  timestamps: true
});

export default mongoose.model('QR', qrSchema);