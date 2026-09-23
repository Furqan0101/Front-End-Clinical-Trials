import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        username,
        password,
      });

      if (res.access) {
        localStorage.setItem("token", res.access);

        if (res.refresh) {
          localStorage.setItem("refresh", res.refresh);
        }

        setMessage("✅ Login successful!");

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } else {
        setMessage("❌ Login failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Login failed.");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg rounded-xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 text-center">
        Welcome Back
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
        >
          Login
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-red-600 dark:text-red-400">
          {message}
        </p>
      )}
    </motion.div>
  );
}

export default Login;
