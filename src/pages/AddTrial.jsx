import { useState } from "react";
import { addTrial } from "../api/api";
import { motion } from "framer-motion";

function AddTrial() {
  const [title, setTitle] = useState("");
  const [inclusion, setInclusion] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Get authentication token
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ You must be logged in as an admin.");
      return;
    }

    // Basic validation
    if (!title || !inclusion || !exclusion || !location) {
      setMessage("❌ Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const result = await addTrial(token, {
        title: title,
        inclusion_criteria: inclusion,
        exclusion_criteria: exclusion,
        location: location,
      });

      console.log("Add trial response:", result);

      // Successful response
      if (result) {
        setMessage("✅ Trial added successfully!");

        // Clear form
        setTitle("");
        setInclusion("");
        setExclusion("");
        setLocation("");
      }
    } catch (err) {
      console.error("Error adding trial:", err);

      setMessage("❌ Error adding trial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-16 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg rounded-xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6 text-center">
        Add Trial - Admin Panel
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Trial Title */}
        <input
          type="text"
          placeholder="Trial Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        {/* Inclusion Criteria */}
        <textarea
          placeholder="Inclusion Criteria"
          value={inclusion}
          onChange={(e) => setInclusion(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
          rows={3}
        />

        {/* Exclusion Criteria */}
        <textarea
          placeholder="Exclusion Criteria"
          value={exclusion}
          onChange={(e) => setExclusion(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
          rows={3}
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded transition"
        >
          {loading ? "Adding Trial..." : "Add Trial"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-sm mt-4 text-center">
            {message}
          </p>
        )}
      </form>
    </motion.div>
  );
}

export default AddTrial;
