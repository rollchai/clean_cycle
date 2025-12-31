// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">CleanCycle</h2>
          <p className="text-sm leading-6">
            Making waste management smarter, greener, and rewarding for
            everyone. Join us in creating a sustainable future 🌍.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-green-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-green-400">FAQ</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-green-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-green-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-green-400"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} CleanCycle. All rights reserved.
      </div>
    </footer>
  );
}
