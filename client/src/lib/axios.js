"use client";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "http://localhost:3001",
  baseURL: "https://taskie-api.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
