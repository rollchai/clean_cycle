import mongoose from "mongoose";

const userschema=mongoose.Schema({
    name: {type:String},
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['citizen','admin','agent'],default:'citizen',   
    },
      address:
     { type: String},
     area:{
        type:String
     },
     assignedPickups:{
        type:Number,
        default:0
     },
 
},{timestamps:true})
const usermodel=mongoose.model("user",userschema)
export default usermodel