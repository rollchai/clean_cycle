import User from "../model/User.js";
import Pickup from "../model/Pickup.js";
import Feedback from "../model/Feedback.js";

// 📌 GET - Overview Stats
export const getStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    const pickupsToday = await Pickup.countDocuments({ date: { $gte: startOfDay } });
    const completedPickups = await Pickup.countDocuments({ status: "Completed" });
    const pendingPickups = await Pickup.countDocuments({ status: "Scheduled" }); // ✅ FIXED

    const citizens = await User.countDocuments({ role: "citizen" });
    const agents = await User.countDocuments({ role: "agent" });

    res.json({ pickupsToday, completedPickups, pendingPickups, citizens, agents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 GET - All Pickup Requests
export const getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find()
      .populate("user", "name email")        // ✅ FIXED
      .populate("assignedTo", "name email"); // ✅ FIXED
    res.json(pickups);
  } catch (error) {
    console.error("Error in getAllPickups:", error);
    res.status(500).json({ message: error.message });
  }
};

// 📌 PUT - Change Pickup Status or Assign Agent
export const updatePickup = async (req, res) => {
  try {
    const { status, assignedTo } = req.body; // ✅ FIXED naming
    const pickup = await Pickup.findByIdAndUpdate(
      req.params.id,
      { status, assignedTo },
      { new: true }
    );
    res.json(pickup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 GET - Citizens & Agents
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["citizen", "agent"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 DELETE - Delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 GET - Feedbacks
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email"); // ✅ FIXED for your schema
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
