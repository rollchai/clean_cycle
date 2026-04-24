import React, { useState,useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Route } from "lucide-react";
import ROUTES from "../../navigation/Routes";
import { Routes, useNavigate } from "react-router-dom";
import { getToken } from "firebase/messaging";
import { messaging } from "../../utils/firebaseUtils";
import axios from "axios";
import { Body } from "twilio/lib/twiml/MessagingResponse";
export default function HomePage() {
  const BASE_URI="https://clean-cycle-po6i.onrender.com"
  const navigate=useNavigate();
  const [fcnToken, setfcnToken] = useState(null)
  async function RequestPermission(){
    const permission=await Notification.requestPermission();
if(permission==="granted"){
  const fcmtoken=await getToken(messaging,{vapidKey:process.env.REACT_APP_VAPID_KEY});
  setfcnToken(fcmtoken);
  console.log("token",fcmtoken);
  localStorage.setItem("fcmToken",fcmtoken)
      await axios.post(
      `${BASE_URI}/save-fcm-token`,
      { fcmtoken: fcmtoken,
       userId: localStorage.getItem("userId")
       },
      {
        headers: {
          Authorization:` ${localStorage.getItem("token")}`,
        },
      
      }
    );


}
else if(permission==="denied"){
  alert("you denied for the notification")
}

    }
  useEffect(() => {
RequestPermission();
}, [])
  return (
    <div><Navbar/>
    <div className="font-sans text-gray-800 mt-0.5">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505839673365-e3971f8d9184')",
        }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            CleanCycle: Together for a Greener Future 🌍
          </h1>
          <p className="text-lg md:text-xl mt-4 text-gray-200 max-w-2xl">
            Join hands as Citizens, Agents, and Admins to make our cities
            cleaner and more sustainable.
          </p>
          <button onClick={()=>navigate(ROUTES.LoginPage.name)} className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg">
            Get Started
          </button>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Why Waste Management Matters ♻️
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          Proper waste management helps reduce pollution, conserves natural
          resources, and improves the quality of life for everyone. Every
          action counts, and together we can create a healthier environment for
          future generations.
        </p>
      </section>

      {/* Role Cards */}
      <section className="py-16 px-6 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            title: "Citizen",
            desc: "Schedule pickups, track your recycling score, and contribute to a cleaner community.",
            icon: "🧑‍🤝‍🧑",
          },
          {
            title: "Agent",
            desc: "Manage pickups efficiently, help citizens segregate waste, and earn rewards.",
            icon: "🚛",
          },
          {
            title: "Admin",
            desc: "Oversee operations, track environmental impact, and manage the platform.",
            icon: "📊",
          },
        ].map((role, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{role.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
            <p className="text-gray-600">{role.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-10">Our Impact So Far 🌟</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { number: "10,000+", label: "Pickups Completed" },
            { number: "500+", label: "Active Agents" },
            { number: "1,200+", label: "Tons Waste Recycled" },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className="text-4xl font-bold">{stat.number}</p>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">
          Ready to make a difference?
        </h2>
        <p className="text-lg mb-6">
          Sign up today and join the CleanCycle movement!
        </p>
        <button onClick={()=>
          navigate(ROUTES.Registeration.name)
        } className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg">
          Join Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        © {new Date().getFullYear()} CleanCycle. All rights reserved.
      </footer>
    </div>
     <div><Footer/></div>
    </div>
  );
}
