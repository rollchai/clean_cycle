import mongoose from "mongoose";
const pickupSchema=new mongoose.Schema({
    citizenId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    wasteType:{
        type:String,
        enum:["Plastic","E-Waste", "Dry waste", "Other"]
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
}},{timestamps:true})
const pickuprequestmodel=mongoose.model("pickuprequest",pickupSchema)
export default pickuprequestmodel