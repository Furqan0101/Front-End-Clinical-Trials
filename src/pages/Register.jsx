import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const result = await registerUser({
        username,
        email,
        password,
      });

      console.log("Registration response:", result);

      // Successful registration
      if (result && !result.detail && !result.error) {
        setMessage(
          "✅ Registration successful! Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(
          "❌ " +
            (result?.detail ||
              result?.error ||
              "Registration failed.")
        );
      }
    } catch (err) {
      console.error("Registration error:", err);

      setMessage(
        "❌ Registration failed. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-16 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 text-black dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4 text-center">
        Create Your Account
      </h2>

      <form onSubmit={handleRegister} className="space-y-4">

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
          required
        />

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 dark:bg-purple-500 text-white py-2 rounded hover:bg-purple-700 dark:hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-sm text-center text-red-600 dark:text-red-400">
          {message}
        </p>
      )}
    </motion.div>
  );
}

export default Register;
