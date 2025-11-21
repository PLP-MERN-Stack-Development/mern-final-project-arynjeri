// src/pages/Register.jsx
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ 
    name: "",
    username: "",
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const navigate = useNavigate();

  // Load token if exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
  }, []);

  // ⭐ GOOGLE LOGIN - Initialize ONCE
  useEffect(() => {
    /* global google */
    if (!window.google) return;

    if (!window._googleInitDone) {
      window._googleInitDone = true; // prevent double init

      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await api.post("/api/auth/google", {
        credential: response.credential,
      });

      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Google signup failed");
    }
  };

  // Normal input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Normal email/password signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/api/auth/register", {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      //store token and attach to API
      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");

      //redirect to homepage/dashboard
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  // Google button → ONLY prompt
  const handleGoogleSignup = () => {
    if (!window.google) {
      alert("Google SDK not loaded yet. Try again.");
      return;
    }

    google.accounts.id.prompt();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join CraftPal and start crafting
        </p>

        {/* GOOGLE SIGNUP */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 py-3 border rounded-lg shadow-sm mb-6 hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700">Sign up with Google</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              required
              name="name"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Mary"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              required
              name="username"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="marycrafts"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              name="email"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              required
              name="password"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              required
              name="confirmPassword"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
