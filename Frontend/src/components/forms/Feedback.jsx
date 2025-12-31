import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  // ✅ Use environment variable for backend URL
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const BASE_URI="https://clean-cycle-po6i.onrender.com"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch(`${BASE_URI}/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus({ type: "success", message: data.message });
      setFormData({ name: "", email: "", rating: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div>
      <Navbar />
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
          <form
            onSubmit={handleSubmit}
            className="bg-white mt-10 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-yellow-600 mb-6">
              Share Your Experience
            </h2>

            {status.message && (
              <p
                className={`mb-4 p-3 rounded-lg text-sm ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.message}
              </p>
            )}

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            {/* Rating */}
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
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
              name="message"
              placeholder="Your Feedback"
              value={formData.message}
              onChange={handleChange}
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
      <Footer />
    </div>
  );
}

export default FeedbackPage;
