import React, { useState } from 'react';
import ROUTES from '../../navigation/Routes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function LoginPage() {

  const [form, setForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  // const BASE_URI="https://clean-cycle-backend.onrender.com"
  const BASE_URI="http://localhost:5000";
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function userLogin() {
      debugger
  try {
    const { data } = await axios.post(`${BASE_URI}/login`, form);

    localStorage.setItem('token',data.token);
    // save  user object
  localStorage.setItem("user", JSON.stringify({  _id: data.id,role: data.role}));   
  localStorage.setItem("userId", data.id)    
    toast.success('Login successful! Redirecting...', { autoClose: 1500 });
console.log(data)
    setTimeout(() => {
      if (data.role === 'admin') navigate(ROUTES.Home.name);
      else if (data.role === 'agent') navigate(ROUTES.Home.name);
      else if (data.role === 'citizen') navigate(ROUTES.Home.name);
      else{
        toast.error("check your credentials")
      }
    }, 1500);

  } catch (error) {
    toast.error('Login failed. Please check credentials.');
  }
}


  function onLogin() {
    let hasError = false;
    let errors = { email: '', password: '' };

    if (form.email.trim() === '') {
      hasError = true;
      errors.email = 'Email is required';
    }
    if (form.password.trim() === '') {
      hasError = true;
      errors.password = 'Password is required';
    }

    setFormError(errors);

    if (!hasError) {
      userLogin();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
     
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-700">Login to Your Account</h2>

        <div className="space-y-1">
          <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
            <FaEnvelope /> Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={changeHandler}
            value={form.email}
          />
          {formError.email && (
            <p className="text-red-500 text-sm animate-pulse">{formError.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
            <FaLock /> Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={changeHandler}
            value={form.password}
          />
          {formError.password && (
            <p className="text-red-500 text-sm animate-pulse">{formError.password}</p>
          )}
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
        >
          Login
        </button>
     <div>
  Don't Have an account?{" "}
  <Link
    to={ROUTES.Registeration.name}
    className="text-green-600 font-semibold hover:underline"
  >
    Sign Up
  </Link>
</div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default LoginPage;
