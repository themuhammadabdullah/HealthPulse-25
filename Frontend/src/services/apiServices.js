// src/api/authAPI.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/auth";

// Axios instance with credentials
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
});

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await apiClient.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
