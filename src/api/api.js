const BASE_URL = "https://trialx.onrender.com"; // your backend URL

// ---------- AUTH ----------
export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ---------- PROFILE ----------
export async function getProfile(token) {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ---------- TRIALS ----------
export async function getAllTrials() {
  const res = await fetch(`${BASE_URL}/trials`);
  return res.json();
}

export async function getMatchedTrials(token) {
  const res = await fetch(`${BASE_URL}/matched-trials`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ---------- BOOKMARKS ----------
export async function getBookmarks(token) {
  const res = await fetch(`${BASE_URL}/bookmarks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addBookmark(token, trialId) {
  const res = await fetch(`${BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ trialId }),
  });
  return res.json();
}

export async function removeBookmark(token, trialId) {
  const res = await fetch(`${BASE_URL}/bookmarks/${trialId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ---------- ADMIN ----------
export async function addTrial(token, trialData) {
  const res = await fetch(`${BASE_URL}/trials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // only admins can add
    },
    body: JSON.stringify(trialData),
  });
  return res.json();
}
