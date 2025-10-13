import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rollNo: {
    type: String,
    required: true,
    trim: true, // optional, if roll numbers must be unique
  },
  phoneNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // simple validation for 10-digit numbers
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: String, // could also use Number if you prefer
    required: true,
  },
  interests: {
    type: [String], // array of strings
    default: [],
  },
  sessionTopics: {
    type: String,
    default: "",
  }, 
  hasMembership: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  membershipNumber: {
    type: String,
    default: "",
  },
  membershipCardUrl:  {
    type: String,
    default: "",
  },
  paymentScreenshotUrl : {
    type: String,
    default: "",
  },
}, { timestamps: true }); // adds createdAt, updatedAt

const Form = mongoose.model("Form", formSchema);

export default Form;
