import { loginData, registerData } from "../lib/types";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const registerUser = async (data: registerData) => {
  try {
    const response = await axios.post(`${API_URL}auth/users/`, data);
    localStorage.setItem(
      "name",
      `${response?.data.first_name} ${response?.data.last_name}`
    );
    localStorage.setItem("username", response?.data.username);
    localStorage.setItem("email", response?.data.email);
    return response;
  } catch (error: any) {
    console.log(error.message || error);
  }
};

export const loginUser = async (data: loginData) => {
  try {
    const response = await axios.post(`${API_URL}auth/jwt/create/`, data);
    localStorage.setItem("token", response?.data.access);
    return response;
  } catch (error: any) {
    console.log(error.message || error);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  } catch (error: any) {
    console.log(error.message || error);
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return getToken() !== null;
};

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

axiosInstance.interceptors.response.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
