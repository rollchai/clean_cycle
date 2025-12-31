import pickupMOdel from "../model/Pickup.js"
import Score from "../model/Score.js";
import usermodel from "../model/User.js"
import dotenv from "dotenv";
import twilio from "twilio";


dotenv.config();

// Twilio client
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const pickup = async (req, res) => {
  try {
    // Create pickup
    const pickup = await pickupMOdel.create({
      wasteType: req.body.wasteType,
      date: req.body.date,
      timeslot: req.body.timeslot,
      address: req.body.address,
      instructions: req.body.instructions,
      status: req.body.status,
      user: req.params.userId,
      To_number:req.body.To_number
    });

    if (pickup) {
      // Send SMS
      try {
        await client.messages.create({
          from: process.env.TWILIO_PHONE_NUMBER, // SMS number from .env
          to: pickup.To_number,            // Receiver from .env
          body: `✅ Pickup confirmed!\nDate: ${pickup.date}\nTime: ${pickup.timeslot}\nWaste Type: ${pickup.wasteType}`
        });

        return res.status(201).send({
          message: "Pickup confirmed and SMS sent",
          pickup
        });

      } catch (twilioError) {
        console.error("Twilio error:", twilioError);
        return res.status(201).send({
          message: "Pickup confirmed but failed to send SMS",
          pickup
        });
      }

    } else {
      return res.status(400).send({ message: "Pickup not confirmed" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server error",
      error: error.message
    });
  }
};



export const getpickup=async(req,res)=>{
    try {
         const pickupdata=await pickupMOdel.find({
    }).sort({ createdAt: -1 });
    res.json({pickupdata})
    } catch (error) {
        res.status(500).json({error:"failed to fetch pickup"})
    }
}
export const deletePickup=async(req,res)=>{
  try {
    const deletepickup=await pickupMOdel.deleteOne({
      _id:req.body.id,
    })
    if(deletePickup)res.status(201).send({message:"schdule deleted"})
        else res.status(401).send({message:"unable to delete schdule"})
  } catch (error) {
    console.log("fail to delete schdule")
  }
}

export const updatePickupStatus = async (req, res) => {
  try {
    const update = await pickupMOdel.findByIdAndUpdate(
      req.body._id,
      {
        wasteType: req.body.wasteType,
        date: req.body.date,
        timeslot: req.body.timeslot,
        address: req.body.address,
        instructions: req.body.instructions,
        status: req.body.status,
        To_number:req.body.To_number
      },
      { new: true } // return updated document
    );

    if (!update) {
      return res.status(404).send({ message: "Pickup not found" });
    }

    // Send SMS after update
    try {
      await client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: update.To_number,
        body: `✅ Your Pickup has been updated successfully!
Date: ${update.date}
Time: ${update.timeslot}
Waste Type: ${update.wasteType}`
      });

      return res.status(200).send({
        message: "Pickup updated and SMS sent",
        update
      });

    } catch (twilioError) {
      console.error("Twilio error:", twilioError);
      return res.status(200).send({
        message: "Pickup updated but failed to send SMS",
        update
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Server error",
      error: error.message
    });
  }
};

// Get pickups assigned to a specific agent
export const getAgentPickup=async (req,res)=>{
    const {agentId}=req.params
   try {
    const pickup=await pickupMOdel.find({
      assignedTo:agentId
    })
    res.json(pickup)
   } catch (error) {
    console.log("failed to getagentpickup")
   } 
  }

  export const  completePickup=async(req,res)=>{
    const{pickupId}=req.params;
    try {
      const update=await pickupMOdel.findByIdAndUpdate(
        pickupId,
        {
          status:"Completed"
        },
        {new:true}
      );
      res.json(update)
    } catch (error) {
      console.log("Failed to complete pickup")
    }
  }

  // for citizen deshboard

export const getCitizenPickups = async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching pickups for user:", userId); 

  try {
    const pickups = await pickupMOdel.find({ user: userId }); 
    console.log("Pickups found:", pickups); 
    res.json(pickups);
  } catch (error) {
    console.error("Error fetching pickups:", error);
    res.status(500).json({ error: "Failed to fetch pickups" });
  }
};
export const historyPickup = async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching pickups for user:", userId); 

  try {
    const pickups = await pickupMOdel.find({ user: userId }); 
    console.log("Pickups found:", pickups); 
    res.json(pickups);
  } catch (error) {
    console.error("Error fetching pickups:", error);
    res.status(500).json({ error: "Failed to fetch pickups" });
  }
};

//get rewards

export const getRewardInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await usermodel.findById(userId).select("name points score");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching reward info:", error);
    res.status(500).json({ error: "Failed to fetch reward info" });
  }
};



// score
export const scorepickup=async(req,res)=>{
  try {
    const {pickupId,userId,segregationQuality}=req.body;
    let points=10; 
    if(segregationQuality==="good") points+=5;
    let score =await Score.findOne({userId})
    if(!score){
      score=new Score({userId,totalPoints:points,history:[{points,reason:"Pickup completed"}]})
    } else {
      score.totalPoints+=points;
      score.history.push({points,reason:"pickup completed"})
    }
    await score.save();
    res.json({message:"pickup completed and points added",score})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
