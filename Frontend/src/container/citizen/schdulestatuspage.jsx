// src/pages/agent/Schdulestatuspage.jsx
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

function Schdulestatuspage() {
  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({
    wasteType: '',
    date: '',
    timeslot: '',
    address: '',
    instructions: '',
    status: 'Scheduled',
    _id: '',
    To_number: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="http://localhost:5000";
  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/getpickup`);
      setSchedules(res.data.pickupdata || []);
    } catch (error) {
      toast.error("⚠️ Failed to fetch schedules");
    }
  };

  const handleEdit = (pickup) => {
    setForm({ ...pickup });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URI}/update`, form);
      toast.success("✅ Schedule updated successfully");
      setIsEditing(false);
      resetForm();
      getAll();
    } catch (error) {
      toast.error("❌ Failed to update schedule");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this schedule?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URI}/delete`, { data: { id } });
      toast.success("🗑️ Schedule deleted successfully");
      getAll();
    } catch (error) {
      toast.error("❌ Failed to delete schedule");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      wasteType: '',
      date: '',
      timeslot: '',
      address: '',
      instructions: '',
      status: 'Scheduled',
      _id: '',
      To_number: ''
    });
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          📋 Scheduled Waste Pickups
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Manage, update or delete your pickup requests in one place.
        </p>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 border-2 border-green-500">
            <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
              🛠️ Edit Pickup Request
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <select
                name="wasteType"
                value={form.wasteType}
                onChange={handleChange}
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-green-600"
              >
                <option value="">Select Waste Type</option>
                <option value="Plastic">Plastic</option>
                <option value="E-waste">E-waste</option>
                <option value="Dry waste">Dry waste</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border-2 border-gray-300 p-3 rounded-lg"
              />
              <input
                type="text"
                name="timeslot"
                placeholder="e.g., 10:00 AM - 12:00 PM"
                value={form.timeslot}
                onChange={handleChange}
                className="border-2 border-gray-300 p-3 rounded-lg"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="border-2 border-gray-300 p-3 rounded-lg"
              />
              <input
                type="text"
                name="instructions"
                placeholder="Special Instructions"
                value={form.instructions}
                onChange={handleChange}
                className="border-2 border-gray-300 p-3 rounded-lg"
              />
              <input
                type="number"
                name="To_number"
                placeholder="Phone Number"
                value={form.To_number}
                onChange={handleChange}
                className="border-2 border-gray-300 p-3 rounded-lg"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border-2 border-gray-300 p-3 rounded-lg bg-white"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                ✅ Update
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}

        {/* Schedule Cards */}
        {schedules.length > 0 ? (
          <div className="grid gap-6">
            {schedules.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md border-l-4 p-5 rounded-xl hover:shadow-lg transition transform hover:scale-[1.01]"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">📅 Date</p>
                    <p className="text-lg font-bold text-gray-800">{item.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">⏰ Time Slot</p>
                    <p className="text-lg font-bold text-gray-800">{item.timeslot}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">🗑️ Waste Type</p>
                    <p className="text-lg font-bold text-gray-800">{item.wasteType}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p><span className="font-semibold">📍 Address:</span> {item.address}</p>
                  <p><span className="font-semibold">📝 Instructions:</span> {item.instructions}</p>
                  <p>
                    <span className="font-semibold">🔖 Status:</span>{' '}
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-sm ${
                        item.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 text-white px-5 py-2 rounded-lg hover:bg-yellow-500 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-16 text-lg">
            🚫 No scheduled pickups found.  
            <br /> Try adding a new pickup request!
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Schdulestatuspage;
