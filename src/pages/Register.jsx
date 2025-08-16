import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // ✅ our axios instance
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();

  // form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register/", { username, email, password });

      if (res.status === 201) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("❌ Unexpected error occurred.");
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.detail || "Registration failed."));
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-16 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 text-black dark:text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4 text-center">
        Create Your Account
      </h2>

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
                     text-black dark:text-white rounded px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
                     text-black dark:text-white rounded px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
                     text-black dark:text-white rounded px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 dark:bg-purple-500 text-white py-2 rounded 
                     hover:bg-purple-700 dark:hover:bg-purple-600 transition"
        >
          Register
        </button>
      </form>

      {/* Response Message */}
      {message && (
        <p
          className={`mt-4 text-sm text-center ${
            message.startsWith("✅")
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </motion.div>
  );
}

export default Register;
