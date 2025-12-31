import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Clock, CheckCircle, XCircle, Trash2 } from "lucide-react";

function PickupHistory() {
  const [pickups, setPickups] = useState([]);
  const [filteredPickups, setFilteredPickups] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const userId = user?._id;
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
 const BASE_URI="https://clean-cycle-po6i.onrender.com"
  const fetchPickups = async () => {
    try {
      const res = await axios.get(
        `${BASE_URI}/pickup/citizen/${userId}`
      );
      setPickups(res.data);
      setFilteredPickups(res.data);
    } catch (err) {
      alert("Failed to fetch pickup history");
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredPickups(pickups);
    } else {
      setFilteredPickups(
        pickups.filter(
          (p) =>
            p.status &&
            p.status.toLowerCase() === selectedStatus.toLowerCase()
        )
      );
      setCurrentPage(1);
    }
  }, [selectedStatus, pickups]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return (
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-yellow-700 font-medium bg-yellow-100/80 border border-yellow-300">
            <Clock size={16} /> Scheduled
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-green-700 font-medium bg-green-100/80 border border-green-300">
            <CheckCircle size={16} /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-red-700 font-medium bg-red-100/80 border border-red-300">
            <XCircle size={16} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
            {status}
          </span>
        );
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPickups = filteredPickups.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredPickups.length / itemsPerPage);

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-10 drop-shadow-lg">
            ♻️ My Pickup History
          </h2>

          {/* Filter */}
          <div className="flex justify-end mb-8">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-5 py-2.5 rounded-xl border border-gray-300 shadow-md bg-white/80 focus:ring-2 focus:ring-indigo-400 text-gray-700 font-medium"
            >
              <option>All</option>
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          {/* Cards Grid */}
          {paginatedPickups.length === 0 ? (
            <p className="text-center text-gray-600 italic">
              No pickups found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPickups.map((pickup) => (
                <div
                  key={pickup._id}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
                      <Trash2 size={20} className="text-indigo-500" />{" "}
                      {pickup.wasteType?.toUpperCase()}
                    </h3>
                    {getStatusBadge(pickup.status)}
                  </div>
                  <p className="text-gray-600">
                    <strong>📅 Date:</strong> {pickup.date}
                  </p>
                  <p className="text-gray-600">
                    <strong>⏰ Time Slot:</strong> {pickup.timeslot}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white shadow-lg scale-110"
                      : "bg-white/70 text-gray-700 border border-gray-300 hover:bg-indigo-100"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PickupHistory;
