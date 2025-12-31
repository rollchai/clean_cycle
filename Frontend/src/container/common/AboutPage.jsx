import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function AboutPage() {
  return (
    <div> <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
     
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-700">
          About <span className="text-green-500">CleanCycle</span>
        </h1>
        <p className="mt-6 text-lg text-center text-gray-600 max-w-2xl mx-auto">
          CleanCycle is a smart waste management platform that empowers citizens
          to schedule pickups, track waste segregation, and earn rewards while
          helping the planet.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            🌍 Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To revolutionize waste management by making it simple, efficient, and
            rewarding for everyone. We aim to reduce landfill waste, promote
            recycling, and encourage sustainable living practices.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            🚀 Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            A cleaner, greener future where every household actively participates
            in recycling and waste segregation, contributing to a healthier planet
            for generations to come.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Team Member */}
          {[
            { name: "Akshit Dhiman", role: "Founder & Developer" },
            { name: "Riya Sharma", role: "UI/UX Designer" },
            { name: "Raj Patel", role: "Operations Manager" },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-green-200 flex items-center justify-center text-3xl font-bold text-green-800 mb-4">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="bg-green-700 text-white py-10 text-center">
        <p className="text-lg italic max-w-3xl mx-auto">
          "Small actions, when multiplied by millions of people, can transform
          the world."
        </p>
      </div>
    </div>
     <div><Footer/></div>
    </div>
  );
}

export default AboutPage;
