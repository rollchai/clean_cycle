// src/pages/admin/AssigAgentsPage.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

function AssigAgentsPage() {
  const [pickups, setPickups] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectAgents, setSelectAgents] = useState({});
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="http://localhost:5000";
  // Fetch pickups
  const fetchPickup = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/unassigned`);
      setPickups(res.data);
    } catch (error) {
      console.error("Error fetching pickups", error);
      toast.error("Failed to fetch unassigned pickups");
    }
  };

  // Fetch agents
  const fetchAgent = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/agents`);
      setAgents(res.data);
    } catch (error) {
      console.error("Error fetching agents", error);
      toast.error("Failed to fetch agents");
    }
  };

  useEffect(() => {
    fetchPickup();
    fetchAgent();
  }, []);

  // Assign agent
  const handleAssign = async (pickupId) => {
    const agentId = selectAgents[pickupId];
    if (!agentId) return toast.warning("⚠️ Please select an agent first");

    try {
      await axios.put(`${BASE_URI}/pickup/${pickupId}/assign`, { agentId });
      toast.success("✅ Agent assigned successfully");
      fetchPickup();
    } catch (error) {
      console.error("Failed to assign agent:", error);
      toast.error("❌ Error assigning agent");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-8">
          🚛 Assign Agents to Pickups
        </h2>

        {pickups.length === 0 ? (
          <p className="text-center text-gray-500 mt-16 text-lg">
            ✅ No unassigned pickups right now.
          </p>
        ) : (
          <div className="grid gap-6">
            {pickups.map((pickup) => (
              <div
                key={pickup._id}
                className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-blue-400 hover:shadow-xl transition transform hover:scale-[1.02]"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">📍 Address</p>
                    <p className="text-lg font-semibold text-gray-800">{pickup.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">🗓️ Date</p>
                    <p className="text-lg font-semibold text-gray-800">{new Date(pickup.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">♻️ Waste Type</p>
                    <p className="text-lg font-semibold text-gray-800">{pickup.wasteType}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <select
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
                    value={selectAgents[pickup._id] || ""}
                    onChange={(e) =>
                      setSelectAgents({ ...selectAgents, [pickup._id]: e.target.value })
                    }
                  >
                    <option value="">-- Select Agent --</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name} ({agent.area})
                      </option>
                    ))}
                  </select>

                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    onClick={() => handleAssign(pickup._id)}
                  >
                    ✅ Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AssigAgentsPage;
