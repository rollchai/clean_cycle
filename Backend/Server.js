
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {  getallagents, getProfile, login, register, saveFcmToken, updateProfile } from "./controller/User.js";
import { completePickup, deletePickup, getAgentPickup, getCitizenPickups, getpickup, getRewardInfo, historyPickup, pickup, scorepickup, updatePickupStatus } from "./controller/Pickup.js";
import { assignAgent, pickuprequest } from "./controller/PickupRequest.js";
import {deleteUser, getAllPickups, getFeedbacks, getStats, getUsers, updatePickup} from "./controller/adminController.js"
import { sendContactMessage } from "./controller/Email.js";
import { createFeedback } from "./controller/feed.js";
import { getUserPoints } from "./controller/Score.js";
import admin from "firebase-admin";

dotenv.config();


try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  // Ensure the private key exists and fix newline characters
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  } else {
    throw new Error("Private key is missing from the service account object.");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("Firebase initialization error:", error.message);
  // Optional: prevent the server from starting if Firebase is critical
  // process.exit(1); 
}

const app=express();
app.use(cors())

app.use(express.json());

// user
app.post("/registration",register)
app.post("/login",login)
app.put("/updateprofile",updateProfile)
app.get("/getprofile/:id",getProfile)
app.get("/agents",getallagents)
app.post("/email",sendContactMessage)
app.post("/save-fcm-token",  saveFcmToken);

app.get("/stats", getStats);         // For admin statistics  
app.get("/pickups", getAllPickups);  // Get all pickups (for management)  
app.put("/pickups/:id", updatePickup); // Update pickup status/details  
app.get("/users", getUsers);         // Get all users  
app.delete("/users/:id", deleteUser); // Remove a user  
app.get("/feedbacks", getFeedbacks); // Get feedback data  


// POST feedback
app.post("/feed", createFeedback);
app.post("/score",scorepickup)
app.get("/getscore",getUserPoints)



// pickup data
app.post("/pickup/:userId",pickup)
app.get("/getpickup",getpickup)
app.put("/update",updatePickupStatus)
app.delete("/delete",deletePickup)
app.get("/pickup/agent/:agentId",getAgentPickup)
app.put("/pickup/:pickupId/complete",completePickup)
app.get("/pickup/citizen/:userId",getCitizenPickups)
app.get("/pickup/citizen/:userId",historyPickup)
// reward
app.get("/pickup/reward/:userId",getRewardInfo)


//requestpickup
app.get("/unassigned",pickuprequest)
app.put('/pickup/:pickupId/assign', assignAgent);

mongoose.connect(process.env.MONGO_URI).then(()=>
  { console.log("server connected") 
    console.log(process.env.PORT) 
    app.listen(process.env.PORT,()=>{ console.log("app is runnning at this"+ process.env.PORT) }) }).catch((err) =>
       { console.error("MongoDB connection failed:", err); // 👈 add this });
       })