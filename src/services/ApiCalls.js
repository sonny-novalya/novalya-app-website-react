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
    const hostname = window.location.hostname;
    const domainParts = window.location.hostname.split(".");
    let domain = domainParts.length > 1 ? domainParts[0] : "";
    domain= domain==="wcy-nuskin"?"nuskin":domain
  
    if(!(hostname.includes("app.novalya.com") || hostname === "localhost")) {jwtAuthAxios.defaults.headers.common["Website"] = domain} 
  }

  export const loginUser = async (loginCreds) => {
     
        try {
            const response =  await axios.post(API_BASE_URL+'/login/', loginCreds);
            return response
        } catch (e) {
            return e.response;
        }
  
}


export const manualSignIn = async (accesstoken) => {
  try {
     const response=  await axios.post(API_BASE_URL+'/manualsignin', {accesstoken});
     return response;
  } catch (e) {
      return e.response;
  }

};

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
  

export const  fetchCrmGroups= async (params) =>{
  updateAuthorizationHeader();
  const url =
    params?.media === "Instagram"
      ? "/instagram/group"
      : "/group";
      try {
        updateAuthorizationHeader();
        const response = await axios.get(API_BASE_URL + url, params);
        return response;
      } catch (error) {
        return error; 
      }
}

export const getAllMessagesList = async(params) => {
  try {
    updateAuthorizationHeader();
    const response =  axios
    .post(BASE_URL + `all/messages/api/messages`, {
      visibility_type: params
    })
    return response;
  } catch (error) {
    return error; 
  }
  
};

export const createRequest = async (params) => {
  try {
    updateAuthorizationHeader();
    const response = await axios.post(BASE_URL + "request/message/api/create", params)
    return response;
  } catch (error) {
    return error; 
  }
}

export const fetchRequestSettings = async () => {
  try {
    updateAuthorizationHeader();
    const response = await axios.get(BASE_URL + "request/message/api/all")
    return response;
  } catch (error) {
    return error; 
  }
}
