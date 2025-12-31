import mongoose from "mongoose";

const pickupschema=mongoose.Schema({

wasteType:{
    type:String,
    required:true,
    enum:["Plastic", "E-waste", "Dry waste", "Other"],
},
date:{
    type:Date,
    required:true
},
timeslot:{
    type:String,
    required:true
},
address:{
      type:String,
    required:true
}, 
 assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
    ref: "user",  // references the agent from the user collection
    default: null
     },
 instructions: { type: String },
 
 user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
  required:true
 },
    status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  To_number:{
     type: String, // ✅ FIX: Use string instead of Number
    required: true,
  }
},{timestamp:true})
const pickupMOdel=mongoose.model("pickup",pickupschema)
export default pickupMOdel




