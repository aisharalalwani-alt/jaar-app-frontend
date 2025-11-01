// src/services/api.js
import axios from "axios";

//   Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

//   Attach the access token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ============================================================
// 🧍‍♀️ AUTH (Signup, Login, Logout)
// ============================================================

// 
export const signupUser = async (username, email, password) => {
  const res = await api.post("signup/", { username, email, password });
  return res.data;
};

//  
export const loginUser = async (username, password) => {
  const res = await api.post("token/", { username, password });
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  return res.data;
};

// 
export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};


// ============================================================
// 📰 POSTS
// ============================================================

export const getPosts = async () => {
  const res = await api.get("posts/");
  return res.data;
};

export const createPost = async (data) => {
  const res = await api.post("posts/", data);
  return res.data;
};


// ============================================================
// 🎉 EVENTS
// ============================================================

export const getEvents = async () => {
  const res = await api.get("events/");
  return res.data;
};

export const createEvent = async (data) => {
  const res = await api.post("events/", data);
  return res.data;
};


// ============================================================
// 🙋‍♀️ VOLUNTEERS
// ============================================================

export const getVolunteers = async () => {
  const res = await api.get("volunteers/");
  return res.data;
};

export const createVolunteer = async (data) => {
  const res = await api.post("volunteers/", data);
  return res.data;
};


// ============================================================
// 🏠 NEIGHBORS
// ============================================================

export const getNeighbors = async () => {
  const res = await api.get("neighbors/");
  return res.data;
};

export const createNeighbor = async (data) => {
  const res = await api.post("neighbors/", data);
  return res.data;
};

export default api;
