// src/pages/agent/CompletePickupPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2, MapPin, User, Calendar, Award } from "lucide-react"; // icons
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function CompletePickupPage({ pickupId }) {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [quality, setQuality] = useState("good");
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="http://localhost:5000";
  // Get logged-in agent
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id;

  const handleCompletePickup = async () => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    console.log("Payload being sent:", { pickupId, userId, segregationQuality: quality });

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URI}/score`, {
        pickupId,
        userId,
        segregationQuality: quality,
      });

      toast.success(res.data.message);
      setScore(res.data.score.totalPoints);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navbar />

      <main className="flex-grow flex flex-col items-center px-6 py-10">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-green-700">
            Agent Pickup Completion
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Confirm pickup details and rate segregation quality before completing this request.
          </p>
        </div>

        {/* Pickup Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl transition hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Pickup Details
          </h2>
          <div className="space-y-2 mb-6 text-gray-700">
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-green-600" />
              <span>123 Green Street</span>
            </p>
            <p className="flex items-center gap-2">
              <User size={18} className="text-green-600" />
              <span>John Doe</span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={18} className="text-green-600" />
              <span>16 Aug 2025</span>
            </p>
          </div>

          {/* Dropdown */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Segregation Quality
          </label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-6 focus:ring-2 focus:ring-green-500 outline-none transition"
          >
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>

          {/* Complete Pickup Button */}
          <button
            onClick={handleCompletePickup}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 px-5 py-3 rounded-xl text-white font-medium transition shadow-md ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Processing..." : "Complete Pickup"}
          </button>

          {/* Score Display */}
          {score !== null && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="flex items-center justify-center gap-2 text-green-700 font-semibold text-lg">
                <Award size={20} className="text-green-600" />
                ✅ Citizen’s Total Score: {score} points
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
