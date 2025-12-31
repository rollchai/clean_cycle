import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="https://clean-cycle-po6i.onrender.com"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post(`${BASE_URI}/email`, formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div> <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-6">
     
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 text-center">
          Get in <span className="text-green-500">Touch</span>
        </h1>
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          Have a question, feedback, or just want to say hi? We’d love to hear from you.
        </p>

        {/* Contact Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">📍 Our Office</h2>
            <p className="text-gray-700 mb-6">
              CleanCycle HQ <br />
              123 Eco Street, Green City, India
            </p>

            <h2 className="text-2xl font-semibold text-green-600 mb-4">📞 Call Us</h2>
            <p className="text-gray-700 mb-6">+91 82197 31543</p>

            <h2 className="text-2xl font-semibold text-green-600 mb-4">📧 Email</h2>
            <p className="text-gray-700">dhimanakshu870@gmail.com</p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-green-600 mb-6">Send Us a Message</h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && <p className="mt-4 text-center">{status}</p>}
          </form>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} CleanCycle. All rights reserved.
      </div>
    </div>
     <div><Footer/></div>
    </div>
  );
}

export default ContactPage;
