import axios from 'axios';
import { message } from 'antd';

// export const BASE_URL = "https://api-v2.novalya.com/user/api";
export const BASE_URL = "https://api-v2.novalya.com";


const getDynamicHeaders = () => {
  const token = localStorage.getItem("token");
  const locale = localStorage.getItem("selectedLocale");
  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");
  let domain = domainParts.length > 1 ? domainParts[0] : "";
  domain = domain === "wcy-nuskin" ? "nuskin" : domain;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  headers["locale"] = locale;

  if (!(hostname.includes("app.novalya.com") || hostname === "localhost")) {
    headers["Website"] = domain;
  }

  return headers;
};
const logoutUser = () => {
  localStorage.removeItem("token"); 
  message.error("Session expired. Please log in again.");
  window.location.reload()
};

const apiCall = async ({
  method = 'GET',
  url = '',
  data = {},
  params = {},
  headers = {},
  auth = true,
  showError = true,
}) => {
  try {
    const dynamicHeaders =  getDynamicHeaders();


    const config = {
      method,
      url: `${BASE_URL}${url}`,  // Ensure BASE_URL is correct
      headers: {
        ...dynamicHeaders,
        ...headers,
      },
      params,
      data
    };


    const response = await axios(config);
    return response; // Just return the data for convenience
  } catch (error) {
    const status = error?.response?.status;
    const errorMessage = error?.response?.data?.message || error.message;

    if (status === 401 && auth) {
      logoutUser(); // Handle 401 error (unauthorized)
    } else if (showError) {
      console.error("API Call Error:", errorMessage);
      message.error(errorMessage);
    }

    return error.response || error;; // Return null if error occurred
  }
};


export default apiCall;
