import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

function AgentDashboard() {
  const [assignedPickups,setAssignedPickups]=useState([])
  const[loading,setloading]=useState([])
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="http://localhost:5000";
  const storedUser = localStorage.getItem("user");
const user = JSON.parse(storedUser);
const agentId = user?._id;
  useEffect(()=>{
    const fetchagent=async()=>{
   
    try {
      const res=await axios.get(`${BASE_URI}/pickup/agent/${agentId}`);
      setAssignedPickups(res.data);
    } catch (error) {
      console.log("Error fetching assigned pickups",error)
    } finally{
      setloading(false)
    }
  }
  fetchagent();
  },[agentId]);

  const completePickup = async (pickupId) => {
    try {
      await axios.put(`${BASE_URI}/pickup/${pickupId}/complete`);
      setAssignedPickups((prev) =>
        prev.map((pickup) =>
          pickup._id === pickupId ? { ...pickup, status: "Completed" } : pickup
        )
      );
      toast.success("Pickup marked as completed!");
    } catch (error) {
      console.error("Error marking pickup complete:", error);
      toast.error("Failed to mark as completed.");
    }
  };

  return (
    <div> <Navbar/>
<div className="p-6 min-h-screen bg-gray-100">
 
      <h2 className="text-3xl font-bold mb-6 text-green-700">My Assigned Pickups</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading pickups...</div>
      ) : assignedPickups.length === 0 ? (
        <div className="text-gray-600 text-center text-lg">
          No pickups assigned yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {assignedPickups.map((pickup) => (
            <div
              key={pickup._id}
              className="border rounded-xl shadow-md p-5 bg-white hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    🗑️ {pickup.wasteType}
                  </p>
                  <p className="text-sm text-gray-500">📍 {pickup.address}</p>
                  <p className="text-sm text-gray-500">
                    📅 {new Date(pickup.date).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-sm mt-2 font-medium ${
                      pickup.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {pickup.status}
                  </p>
                </div>

                {pickup.status !== "Completed" && (
                  <button
                    onClick={() => completePickup(pickup._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    Mark Completed ✅
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
     <div><Footer/></div>
    </div>
  )
}

export default AgentDashboard
