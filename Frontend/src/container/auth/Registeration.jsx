import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../navigation/Routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../../components/layout/Navbar';

function Registeration() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
    name: '',
    address: '',
    points: '',
    score: '',
  });
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
   const BASE_URI="http://localhost:5000";
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  // ✅ Use environment variable for API base URL


  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const userSave = async () => {
    try {
 await axios.post(`${BASE_URI}/registration`, form);
      toast.success('✅ Registration successful!');
      navigate(ROUTES.LoginPage.name );
    } catch (error) {
      toast.error('❌ Failed to submit data');
    }
  };

  const validateForm = () => {
    let error = {};
    let hasErrors = false;

    if (!form.email.trim()) {
      error.email = 'Email is required';
      hasErrors = true;
    }
    if (!form.password.trim()) {
      error.password = 'Password is required';
      hasErrors = true;
    }
    if (!form.name.trim()) {
      error.name = 'Name is required';
      hasErrors = true;
    }
    if (!form.address.trim()) {
      error.address = 'Address is required';
      hasErrors = true;
    }
  
    setFormError(error);
    return !hasErrors;
  };

  const submitData = () => {
    if (validateForm()) {
      userSave();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      // style={{
      //   backgroundImage: `linear-gradient(to bottom right, rgba(99, 253, 208, 0.3), rgba(130, 190, 255, 0.3)), url('Frontend/wasteImage.jpg')`,
      // }}
    >
      <div className="backdrop-blur-lg bg-white/80 shadow-2xl rounded-3xl p-8 w-full max-w-lg animate-fade-in-up space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Create an Account</h2>

        {/* Input Fields */}
        {[
          { icon: <FaEnvelope />, label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
          { icon: <FaLock />, label: "Password", name: "password", type: "password", placeholder: "Enter a strong password" },
          { icon: <FaUser />, label: "Name", name: "name", type: "text", placeholder: "John Doe" },
          { icon: <FaMapMarkerAlt />, label: "Address", name: "address", type: "text", placeholder: "Your location" },
        ].map(({ icon, label, name, type, placeholder }) => (
          <div key={name} className="relative group">
            <label className="text-gray-700 text-sm font-medium flex items-center gap-2 mb-1 transition-all group-focus-within:text-blue-600">
              {icon} {label}
            </label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
              onChange={changeHandler}
              value={form[name]}
            />
            {formError[name] && (
              <p className="text-red-500 text-xs mt-1 animate-pulse">{formError[name]}</p>
            )}
          </div>
        ))}

        {/* Role Dropdown */}
        <div className="space-y-1">
          <label className="text-gray-700 text-sm font-medium">Role</label>
          <select
            name="role"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={changeHandler}
            value={form.role}
          >
            <option value="">Select a role</option>
            {/* <option value="admin">Admin</option> */}
            <option value="agent">Agent</option>
            <option value="citizen">Citizen</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={submitData}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          Register
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Registeration;
