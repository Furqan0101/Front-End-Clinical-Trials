import { useState } from "react";
import { motion } from "framer-motion";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "../api/api";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [trialIdAdd, setTrialIdAdd] = useState("");
  const [trialIdRemove, setTrialIdRemove] = useState("");
  const [messageAdd, setMessageAdd] = useState("");
  const [messageRemove, setMessageRemove] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get token saved after login
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // -----------------------------
  // FETCH BOOKMARKS
  // -----------------------------
  const fetchBookmarks = async () => {
    setLoading(true);

    try {
      const token = getToken();

      if (!token) {
        setBookmarks([]);
        setMessageRemove("Please login first.");
        setLoading(false);
        return;
      }

      const data = await getBookmarks(token);

      console.log("Bookmarks response:", data);

      // Backend may return an array directly
      if (Array.isArray(data)) {
        setBookmarks(data.filter((b) => b.trial));
      }

      // In case backend returns { bookmarks: [...] }
      else if (Array.isArray(data.bookmarks)) {
        setBookmarks(data.bookmarks.filter((b) => b.trial));
      }

      else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setBookmarks([]);
      setMessageRemove("❌ Server error while loading bookmarks.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // ADD BOOKMARK
  // -----------------------------
  const handleAddBookmark = async () => {
    setMessageAdd("");

    const id = parseInt(trialIdAdd, 10);

    if (!id) {
      setMessageAdd("❌ Invalid Trial ID");
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        setMessageAdd("❌ Please login first.");
        return;
      }

      const data = await addBookmark(token, id);

      console.log("Add bookmark response:", data);

      setMessageAdd(`✅ Bookmark added for trial ID ${id}`);
      setTrialIdAdd("");

      // Refresh bookmarks if they are currently visible
      if (showBookmarks) {
        await fetchBookmarks();
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      setMessageAdd("❌ Server error while adding bookmark.");
    }
  };

  // -----------------------------
  // REMOVE BOOKMARK
  // -----------------------------
  const handleRemoveBookmark = async () => {
    setMessageRemove("");

    const id = parseInt(trialIdRemove, 10);

    if (!id) {
      setMessageRemove("❌ Invalid Trial ID");
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        setMessageRemove("❌ Please login first.");
        return;
      }

      const data = await removeBookmark(token, id);

      console.log("Remove bookmark response:", data);

      setMessageRemove(`✅ Bookmark removed for trial ID ${id}`);
      setTrialIdRemove("");

      // Refresh displayed bookmarks
      if (showBookmarks) {
        await fetchBookmarks();
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      setMessageRemove("❌ Server error while removing bookmark.");
    }
  };

  // -----------------------------
  // SHOW BOOKMARKS
  // -----------------------------
  const handleShowBookmarks = async () => {
    setShowBookmarks(true);
    await fetchBookmarks();
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-4 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* PAGE TITLE */}
      <h2 className="text-2xl font-bold text-pink-700 dark:text-pink-300 mb-8 text-center">
        Bookmarks
      </h2>

      {/* ----------------------------- */}
      {/* ADD BOOKMARK */}
      {/* ----------------------------- */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-300 mb-2">
          ➕ Add Bookmark
        </h3>

        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Trial ID"
            value={trialIdAdd}
            onChange={(e) => setTrialIdAdd(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-3 py-2 w-48"
          />

          <button
            onClick={handleAddBookmark}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
          >
            Add
          </button>
        </div>

        {messageAdd && (
          <p className="text-sm mt-2 text-red-500 dark:text-red-400">
            {messageAdd}
          </p>
        )}
      </div>

      {/* ----------------------------- */}
      {/* REMOVE BOOKMARK */}
      {/* ----------------------------- */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-300 mb-2">
          ❌ Remove Bookmark
        </h3>

        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Trial ID"
            value={trialIdRemove}
            onChange={(e) => setTrialIdRemove(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-3 py-2 w-48"
          />

          <button
            onClick={handleRemoveBookmark}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Remove
          </button>
        </div>

        {messageRemove && (
          <p className="text-sm mt-2 text-red-500 dark:text-red-400">
            {messageRemove}
          </p>
        )}
      </div>

      {/* ----------------------------- */}
      {/* SHOW BOOKMARKS */}
      {/* ----------------------------- */}
      <div className="text-center mb-6">
        <button
          onClick={handleShowBookmarks}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? "Loading..." : "Show Bookmarks"}
        </button>
      </div>

      {/* ----------------------------- */}
      {/* NO BOOKMARKS */}
      {/* ----------------------------- */}
      {showBookmarks && !loading && bookmarks.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No bookmarks found.
        </p>
      )}

      {/* ----------------------------- */}
      {/* BOOKMARK LIST */}
      {/* ----------------------------- */}
      {showBookmarks && bookmarks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map((bookmark) => {
            const trial = bookmark.trial;

            if (!trial) return null;

            return (
              <div
                key={trial.id}
                className="bg-white dark:bg-gray-800 text-black dark:text-white shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-300">
                  {trial.title}
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  📍 Location: {trial.location}
                </p>

                <p className="text-sm mt-2">
                  <span className="font-semibold">
                    ✅ Inclusion:
                  </span>{" "}
                  {trial.inclusion_criteria}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">
                    ❌ Exclusion:
                  </span>{" "}
                  {trial.exclusion_criteria}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Trial ID: {trial.id}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export default Bookmarks;
