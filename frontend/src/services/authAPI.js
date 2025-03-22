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

export const logInUser = async (userData) => {
  try {
    const response = await api.post("/auth/log-in", userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
        success: false, 
        error: error.response?.data || "Unknown error" 
    };
  }
};

export const loginWithTwitter = () => {
  window.open("http://localhost:5000/api/auth/twitter", "_self");
};

export const getAuthenticatedUser = async () => {
  try {
    const response = await api.get("/auth/user", { withCredentials: true });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || "Unknown error" };
  }
};
