import { create } from "zustand";
import { updateAuthorizationHeader } from "../../services/ApiCalls";
import apiCall from "../../services/api";


const useLoginUserDataStore = create((set) => ({
    loading: false,
    loginUserData: {},
    fetchLoginUserData: async (data) => {
        try {
            updateAuthorizationHeader();
            set({ loading: true });

            const response = await apiCall({
                method: 'POST',
                url: '/user/api/userdata',
                data,
            });
            console.log("resss", response?.data);

            if (response.status === 200) {  // check status code, not statusText
                set({ loading: false, loginUserData: response?.data?.data });
            } else {
                throw new Error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            set({ loading: false });
        }
    },

}));

export default useLoginUserDataStore;
