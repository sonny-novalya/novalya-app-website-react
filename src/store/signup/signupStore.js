import { create } from "zustand";
import apiCall from "../../services/api";

export const signupStore = create((set)=>({
    registerUser: async (data) => {
        try {
         const response = await apiCall({
             method: 'POST',
             url: `/user/api/register`,
             data:data
         });
        return response
         
        } catch (error) {
         console.error("Error getting response", error);
        }
     },

    getUserByRef: async (data) => {
       try {
        const response = await apiCall({
            method: 'POST',
            url: `/user/api/singleuserdata`,
            data:{randomcode:data}
        });
       return response
        
       } catch (error) {
        console.error("Error getting response", error);
       }
    },
    getEncKey: async () => {
        try {
         const response = await apiCall({
             method: 'POST',
             url: `/user/api/get-enc-keys`
         });
        return response
         
        } catch (error) {
         console.error("Error getting response", error);
        }
     },
     saveUTM: async (data) => {
        try {
         const response = await apiCall({
             method: 'POST',
             url: `/user/api/save-utm-data`,
             data
         });
        return response
         
        } catch (error) {
         console.error("Error getting response", error);
        }
     },
     saveCaptureData: async (data) => {
        try {
         const response = await apiCall({
             method: 'POST',
             url: `/user/api/update-capture-page`,
             data
         });
        return response
         
        } catch (error) {
         console.error("Error getting response", error);
        }
     }
}))