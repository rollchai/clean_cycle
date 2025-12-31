import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function FeedbackPage() {
  return (
    <div><Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-6">
     
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-700 text-center">
          We Value Your <span className="text-yellow-500">Feedback</span>
        </h1>
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          Your feedback helps us improve CleanCycle and make our community greener.
        </p>

        {/* Feedback Form */}
        <form className="bg-white mt-10 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-6">
            Share Your Experience
          </h2>

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Rating */}
          <select
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          >
            <option value="">Rate Your Experience</option>
            <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
            <option value="4">⭐⭐⭐⭐ - Good</option>
            <option value="3">⭐⭐⭐ - Average</option>
            <option value="2">⭐⭐ - Poor</option>
            <option value="1">⭐ - Very Bad</option>
          </select>

          {/* Message */}
          <textarea
            placeholder="Your Feedback"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition"
          >
            Submit Feedback
          </button>
        </form>

        {/* Thank you note */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          © {new Date().getFullYear()} CleanCycle. Together for a cleaner future.
        </div>
      </div>
    </div>
     <div><Footer/></div>
    </div>
  );
}

export default FeedbackPage;
