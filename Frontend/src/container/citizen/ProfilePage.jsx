import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { UserCircle } from "lucide-react"; // 👤 Profile icon
import Footer from "../../components/layout/Footer";

function ProfilePage() {
  const [form, setForm] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
  });

  const [stats, setStats] = useState({
    points: 0,
    score: 0
  });

  const [loading, setLoading] = useState(true);
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="http://localhost:5000";
  // Fetch user info
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
        const id = localStorage.getItem("userId");
console.log(id); // This will print the logged-in user's _id

      const res = await axios.get(`${BASE_URI}/getprofile/${id}`);
console.log("Profile API Response:", res.data);
      setForm({
        _id: id,
        name: res.data.name || "",
        email: res.data.email || "",
        address: res.data.address || "",
        password: "",
        role: res.data.role || ""
      });

      setStats({
        points: res.data.points || 0,
        score: res.data.score || 0
      });

      setLoading(false);
    } catch (error) {
      alert("Error fetching profile.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async () => {
    try {
      await axios.put(`${BASE_URI}/updateprofile`, form);
      alert("Profile updated successfully!");
      getInfo();
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex gap-10 w-full max-w-6xl">
          
          {/* Left Side - Profile Form */}
          <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl text-center relative overflow-hidden">
            
            {/* Decorative background circles */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-200 rounded-full blur-2xl opacity-30"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-300 rounded-full blur-2xl opacity-30"></div>
            
            {/* Profile Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full shadow-md">
                <UserCircle size={80} className="text-blue-700" />
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold text-blue-800 mb-8">Edit Your Profile</h2>

            <div className="space-y-6 text-left">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none py-2 px-4 transition"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none py-2 px-4 transition"
                  placeholder="Enter your email"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none py-2 px-4 transition"
                  placeholder="Enter your address"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">New Password (optional)</label>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none py-2 px-4 transition"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={updateProfile}
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                💾 Update Profile
              </button>
            </div>
          </div>

          {/* Right Side - Readonly Points & Score */}
          <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 shadow-xl rounded-3xl p-8 w-96 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">🌟 Agent Performance</h3>
            <p className="text-lg font-semibold text-gray-700">Total Points</p>
            <p className="text-4xl font-extrabold text-yellow-900 mb-6">{stats.points}</p>
            <p className="text-lg font-semibold text-gray-700">Segregation Score</p>
            <p className="text-4xl font-extrabold text-yellow-900">{stats.score}%</p>
          </div>

        </div>
      </div>
       <div><Footer/></div>
    </div>
  );
}

export default ProfilePage;
