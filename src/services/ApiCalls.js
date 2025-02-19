import axios from "axios";

// development
// export const BASE_URL = "http://localhost:8000/";
// export const BASE_URL = "https://novalyabackend.novalya.com/";
export const BASE_URL = "https://stagingbackend.novalya.com/";
export const API_BASE_URL = BASE_URL + "user/api";
export const EXTENSION_BASE_URL = BASE_URL + "extension/api";
export const ADMIN_BASE_URL = BASE_URL + "admin/api";

export function updateAuthorizationHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["authorization"] = "Bearer " + token;
  }

  export const registerUser = async (params) => {
    try {
      updateAuthorizationHeader();
      const response = await axios.post(`${API_BASE_URL}/register`, params);
      return response.data; // Return the API response
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error; // Re-throw for handling in UI
    }
}
  