import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const signUpUser = async (userData) => {
  try {
    const response = await api.post("/auth/sign-up", userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
        success: false, 
        error: error.response?.data || "Unknown error" 
    };
  }
};
