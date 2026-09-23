import { useState } from "react";
import {
  getProfile,
  addProfile,
  updateProfile,
} from "../api/api";
import { motion } from "framer-motion";

function Profile() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");
  const [medications, setMedications] = useState("");

  const [message, setMessage] = useState("");
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get token saved during login
  const token = localStorage.getItem("token");

  // ---------- LOAD PROFILE ----------

  const handleLoad = async () => {
    if (!token) {
      setMessage("❌ Please login first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = await getProfile(token);

      console.log("Profile response:", data);

      if (data && data.age !== null && data.age !== undefined) {
        setProfileExists(true);

        setAge(data.age || "");
        setGender(data.gender || "");
        setCondition(data.condition || "");
        setMedications(data.medications || "");

        setMessage("✅ Profile loaded successfully.");
      } else {
        setProfileExists(false);
        setMessage("No existing profile found.");
      }
    } catch (error) {
      console.error("Profile loading error:", error);
      setMessage("❌ Error loading profile.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- ADD PROFILE ----------

  const handleAdd = async () => {
    if (!token) {
      setMessage("❌ Please login first.");
      return;
    }

    if (!age || !gender || !condition) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = await addProfile(token, {
        age,
        gender,
        condition,
        medications,
      });

      console.log("Add profile response:", data);

      setProfileExists(true);
      setMessage("✅ Profile added successfully.");
    } catch (error) {
      console.error("Add profile error:", error);
      setMessage("❌ Failed to add profile.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- UPDATE PROFILE ----------

  const handleUpdate = async () => {
    if (!token) {
      setMessage("❌ Please login first.");
      return;
    }

    if (!age || !gender || !condition) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = await updateProfile(token, {
        age,
        gender,
        condition,
        medications,
      });

      console.log("Update profile response:", data);

      setProfileExists(true);
      setMessage("✅ Profile updated successfully.");
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-16 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">
        My Profile
      </h2>

      <div className="space-y-4">

        {/* Age */}
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border dark:bg-gray-800 dark:text-white rounded px-3 py-2"
        />

        {/* Gender */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border dark:bg-gray-800 dark:text-white rounded px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Condition */}
        <input
          type="text"
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full border dark:bg-gray-800 dark:text-white rounded px-3 py-2"
        />

        {/* Medications */}
        <input
          type="text"
          placeholder="Medications"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          className="w-full border dark:bg-gray-800 dark:text-white rounded px-3 py-2"
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">

          <button
            onClick={handleLoad}
            disabled={loading}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load Profile"}
          </button>

          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            Add Profile
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            Update Profile
          </button>

        </div>

        {/* Status message */}
        {message && (
          <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}

        {/* Profile status */}
        {profileExists && (
          <p className="text-sm text-center text-green-600 dark:text-green-400">
            Profile exists
          </p>
        )}

      </div>
    </motion.div>
  );
}

export default Profile;
