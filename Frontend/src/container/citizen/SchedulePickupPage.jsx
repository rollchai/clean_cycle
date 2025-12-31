


import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/layout/Navbar";

function SchedulePickupPage() {
  const [form, setForm] = useState({
    wasteType: "",
    date: "",
    timeslot: "",
    address: "",
    instructions: "",
    To_number: "",
  });
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="https://clean-cycle-po6i.onrender.com"
  // ✅ Reset form after submission
  const resetForm = () => {
    setForm({
      wasteType: "",
      date: "",
      timeslot: "",
      address: "",
      instructions: "",
      To_number: "",
    });
  };

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict phone to numbers only
    if (name === "To_number") {
      if (/^\d*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Submit form
  const scheduleWaste = async (e) => {
    e.preventDefault();

    try {
      const storedUser = localStorage.getItem("user");
      const user = JSON.parse(storedUser);
      const userId = user?._id;

      if (!userId) {
        toast.error("User not logged in. Please login again.");
        return;
      }

      // ✅ Validation
      if (!form.wasteType || !form.date || !form.timeslot || !form.address || !form.To_number) {
        toast.error("Please fill all required fields.");
        return;
      }

      if (form.To_number.length !== 10) {
        toast.error("Please enter a valid 10-digit phone number.");
        return;
      }

      // ✅ Format phone number to +91XXXXXXXXXX
      const phone = `+91${form.To_number}`;

      // ✅ Send API request
      const response = await axios.post(`${BASE_URI}/pickup/${userId}`, {
        ...form,
        To_number: phone,
      });

      toast.success(response.data.message || "Pickup scheduled successfully!");
      resetForm();
    } catch (error) {
      console.error("Error scheduling pickup:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to schedule pickup. Please try again.");
    }
  };

  return (
     <div><Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">📦 Schedule Waste Pickup</h2>

        <form onSubmit={scheduleWaste} className="space-y-4">
          {/* Waste Type */}
          <div>
            <label className="block text-gray-700">Waste Type</label>
            <select
              name="wasteType"
              value={form.wasteType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Waste Type</option>
              <option value="Plastic">Plastic</option>
              <option value="E-waste">E-waste</option>
              <option value="Dry waste">Dry waste</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700">Pickup Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Timeslot */}
          <div>
            <label className="block text-gray-700">Time Slot</label>
            <input
              type="time"
              name="timeslot"
              value={form.timeslot}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700">Pickup Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-gray-700">Instructions (Optional)</label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="To_number"
              value={form.To_number}
              onChange={handleChange}
              maxLength="10"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter 10-digit number"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
          >
            Schedule Pickup
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default SchedulePickupPage;
