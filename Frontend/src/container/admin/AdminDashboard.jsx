// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, Clock, MapPin, User, Truck, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function AdminDashboard() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchPickups();
    fetchAgents();
  }, []);
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="https://clean-cycle-po6i.onrender.com"
  const fetchPickups = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/pickups`);
      setPickups(res.data);
    } catch {
      toast.error("Failed to load pickups");
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/users?role=agent`);
      setAgents(res.data);
    } catch {
      toast.error("Failed to load agents");
    }
  };

  const handleAssign = async (pickupId, agentId) => {
    try {
      await axios.put(`${BASE_URI}/pickups/${pickupId}`, { assignedTo: agentId });
      toast.success("Agent assigned");
      fetchPickups();
    } catch {
      toast.error("Failed to assign agent");
    }
  };

  const handleStatusChange = async (pickupId, status) => {
    try {
      await axios.put(`${BASE_URI}/pickups/${pickupId}`, { status });
      toast.success("Status updated");
      fetchPickups();
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Updated status colors: solid background with white text
  const statusColors = {
    Scheduled: "bg-yellow-500 text-white hover:bg-yellow-600",
    Completed: "bg-green-600 text-white hover:bg-green-700",
    Cancelled: "bg-red-600 text-white hover:bg-red-700",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  const totalPickups = pickups.length;
  const completed = pickups.filter((p) => p.status === "Completed").length;
  const scheduled = pickups.filter((p) => p.status === "Scheduled").length;
  const cancelled = pickups.filter((p) => p.status === "Cancelled").length;

  return (
    <div> <Navbar/>
    <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
     
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800">📦 Admin Dashboard</h2>
        <p className="text-gray-500 mt-1">Manage & Monitor All Pickups</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-white rounded-2xl shadow-lg flex flex-col items-center">
          <Truck size={28} className="text-blue-500 mb-2" />
          <h3 className="text-xl font-bold">{totalPickups}</h3>
          <p className="text-gray-500 text-sm">Total Pickups</p>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-lg flex flex-col items-center">
          <CheckCircle size={28} className="text-green-500 mb-2" />
          <h3 className="text-xl font-bold">{completed}</h3>
          <p className="text-gray-500 text-sm">Completed</p>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-lg flex flex-col items-center">
          <Calendar size={28} className="text-yellow-500 mb-2" />
          <h3 className="text-xl font-bold">{scheduled}</h3>
          <p className="text-gray-500 text-sm">Scheduled</p>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-lg flex flex-col items-center">
          <XCircle size={28} className="text-red-500 mb-2" />
          <h3 className="text-xl font-bold">{cancelled}</h3>
          <p className="text-gray-500 text-sm">Cancelled</p>
        </div>
      </div>

      {/* Pickup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pickups.map((pickup) => (
          <div
            key={pickup._id}
            className="rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 flex items-center gap-2 text-white">
              <Truck size={20} />
              <h3 className="font-semibold text-lg">{pickup.wasteType}</h3>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" /> {new Date(pickup.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-purple-500" /> {pickup.timeslot}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-red-500" /> {pickup.address}
              </p>
              <p className="flex items-center gap-2">
                <User size={16} className="text-green-500" /> {pickup.user?.name || "Unknown"}
              </p>
            </div>

            {/* Assign Agent */}
            <div className="px-5">
              <label className="text-xs font-semibold text-gray-600">Assign Agent:</label>
              <select
                value={pickup.assignedTo?._id || ""}
                onChange={(e) => handleAssign(pickup._id, e.target.value)}
                className="mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Unassigned</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Badges */}
            <div className="px-5 py-4 flex gap-2">
              {["Scheduled", "Completed", "Cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(pickup._id, status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${statusColors[status]} ${
                    pickup.status === status ? "ring-2 ring-offset-1 ring-indigo-500" : ""
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
 <div><Footer/></div>    
    </div>
  );
}
