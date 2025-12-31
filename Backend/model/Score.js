import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  totalPoints: { type: Number, default: 0 },
  history: [
    {
      points: Number,
      reason: String, // e.g., "Pickup completed", "Segregation bonus"
      date: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("Score", scoreSchema);
