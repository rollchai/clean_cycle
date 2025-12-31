import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { motion } from "framer-motion";

import {
  CheckCircle,
  XCircle,
  Clock,
  Package,
  CalendarDays,
  Recycle,
  MapPin,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../navigation/Routes";

/**
 * Status helpers
 */
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="http://localhost:5000";
const statusStyles = {
  Completed: {
    chip: "bg-green-100 text-green-800 ring-1 ring-green-300",
    bar: "from-green-500 to-green-600",
  },
  Scheduled: {
    chip: "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300",
    bar: "from-yellow-500 to-amber-600",
  },
  Cancelled: {
    chip: "bg-red-100 text-red-800 ring-1 ring-red-300",
    bar: "from-red-500 to-rose-600",
  },
};

const StatCard = ({ title, value, gradient, Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.03 }}
    className={`relative overflow-hidden rounded-2xl shadow-lg p-5 text-white bg-gradient-to-br ${gradient}`}
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-sm/5 opacity-90">{title}</p>
        <p className="text-3xl font-extrabold">{value}</p>
      </div>
    </div>
    <motion.div
      className="absolute -bottom-6 -right-4 text-8xl select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15, x: [0, 16, 0] }}
      transition={{ repeat: Infinity, duration: 6 }}
    >
      ♻️
    </motion.div>
  </motion.div>
);

function CitizenDashboard() {
  const [pickup, setPickup] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate =useNavigate()
  // read user id from localStorage
  const userId = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw)?._id : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchPickups = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `${BASE_URI}/pickup/citizen/${userId}`
        );
        setPickup(res.data || []);
      } catch (e) {
        console.error("Failed to fetch pickups", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPickups();
  }, [userId]);

  // Stats (backend uses Scheduled, Completed, Cancelled)
  const total = pickup.length;
  const completed = pickup.filter((p) => p.status === "Completed").length;
  const pending = pickup.filter((p) => p.status === "Scheduled").length;
  const cancelled = pickup.filter((p) => p.status === "Cancelled").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex flex-col">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto flex-1 px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight">
            <span className="align-middle">🌍</span> Citizen Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Track your scheduled waste pickups and their status.
          </p>
          <div className="h-1.5 w-36 mx-auto mt-4 rounded-full bg-gradient-to-r from-green-400 via-emerald-600 to-green-400" />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Pickups"
            value={total}
            gradient="from-sky-500 to-blue-600"
            Icon={Package}
            delay={0}
          />
          <StatCard
            title="Completed"
            value={completed}
            gradient="from-emerald-500 to-green-600"
            Icon={CheckCircle}
            delay={0.05}
          />
          <StatCard
            title="Scheduled"
            value={pending}
            gradient="from-amber-400 to-yellow-600"
            Icon={Clock}
            delay={0.1}
          />
          <StatCard
            title="Cancelled"
            value={cancelled}
            gradient="from-rose-500 to-red-600"
            Icon={XCircle}
            delay={0.15}
          />
        </div>

        {/* Pickup History */}
        <div className="flex items-end justify-between mb-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-bold text-gray-800"
          >
            📋 Pickup History
          </motion.h2>
          <span className="text-sm text-gray-500">{total} record(s)</span>
        </div>

        {loading ? (
          <div className="h-40 grid place-items-center">
            <p className="text-gray-500 animate-pulse">
              Loading your pickups…
            </p>
          </div>
        ) : total === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-md p-10 text-center"
          >
            <div className="text-6xl mb-2">♻️</div>
            <p className="text-gray-600 mb-6">
              No pickups yet. Let’s schedule your first one!
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(ROUTES.SchedulePickupPage.name)}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow"
            >
              Schedule a Pickup
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {pickup.map((item, idx) => {
              const style = statusStyles[item.status] || statusStyles.Scheduled;
              return (
                <motion.div
                  key={item._id || idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  whileHover={{ scale: 1.015 }}
                  className="relative rounded-2xl shadow-xl bg-white border border-gray-100 overflow-hidden"
                >
                  {/* Colored header strip */}
                  <div
                    className={`h-2 w-full bg-gradient-to-r ${style.bar}`}
                  />

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-gray-800 font-semibold">
                        <Recycle className="w-5 h-5 text-green-600" />
                        Pickup #{idx + 1}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${style.chip}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="grid gap-3 text-gray-700">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-green-600" />
                        <span className="font-medium mr-1">Date:</span>
                        {new Date(item.date).toLocaleDateString()}
                      </div>

                      {item.timeslot && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          <span className="font-medium mr-1">Time:</span>
                          {item.timeslot}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Recycle className="w-5 h-5 text-green-600" />
                        <span className="font-medium mr-1">Waste Type:</span>
                        {item.wasteType}
                      </div>

                      {item.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-green-600" />
                          <span className="font-medium mr-1">Address:</span>
                          <span className="truncate">{item.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* footer */}
                  <div className="px-5 py-3 bg-gray-50 border-t text-sm text-gray-600 flex items-center justify-between">
                    <span>🚚 Waste Pickup Service</span>
                    <button
                      onClick={() =>
                        alert(
                          `Date: ${new Date(
                            item.date
                          ).toLocaleDateString()}\nType: ${
                            item.wasteType
                          }\nStatus: ${item.status}`
                        )
                      }
                      className="text-green-700 font-semibold hover:underline"
                    >
                      View details →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CitizenDashboard;
