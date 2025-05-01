// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for the backend API
const API_URL = "http://localhost:5000/api/auth";

// Initial State
const initialState = {
  user: null,
  role: null,
  region: null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("healthpulse_auth"), // Check if user is authenticated
};

// Async Thunk for Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async Thunk for Signup
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Logout Action
    logout: (state) => {
      localStorage.removeItem("healthpulse_auth"); // Clear stored auth data
      localStorage.removeItem("healthpulse_token"); // Clear stored token
      state.user = null;
      state.role = null;
      state.region = null;
      state.isAuthenticated = false;
    },
    // Reset Error State
    resetAuthState: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login Pending
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Login Fulfilled
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.region = action.payload.region;

      // Store auth data and token in localStorage
      localStorage.setItem(
        "healthpulse_auth",
        JSON.stringify({
          user: action.payload.user,
          role: action.payload.role,
          region: action.payload.region,
          isAuthenticated: true,
        })
      );
      localStorage.setItem("healthpulse_token", action.payload.token); // Store JWT token
    });
    // Login Rejected
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Register Pending
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Register Fulfilled
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    // Register Rejected
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export Actions
export const { logout, resetAuthState } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;
