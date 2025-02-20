import { create } from "zustand";
// import { getCompanyLogo } from "backendServices/ApiCalls";
import axios from "axios";
import { API_BASE_URL } from "../../services/ApiCalls";

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,
    isDomainLoading: false,
    companyData: null,
    alertData: {
        show: false,
        message: "",
        variant: "",
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

            if (response?.data?.status === "success") {
                const { token, user } = response.data;
                set({ user, token, isLoading: false });
                localStorage.setItem("token", token);

                return { success: true };
            } else {
                set({ isLoading: false, error: "Invalid email or password" });
                return { success: false };
            }
        } catch (error) {
            console.log("error", error)
            set({ isLoading: false, error: "Login failed, try again" });
            return { success: false };
        }
    },

    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("token");
    },

    // getCompanyData: async (finalDomain) => {
    //     set({ isDomainLoading: true });
    //     try {
    //         const response = await getCompanyLogo({ domain: finalDomain });
    //         set({ companyData: response.data.data, isDomainLoading: false });

    //         const favicon = document.querySelector('link[rel="icon"]');
    //         if (favicon && response.data.data.logo_val) {
    //             favicon.href = response.data.data.fav_icon_val;
    //         }

    //         if (response.data.data.company) {
    //             document.title = response.data.data.company.charAt(0).toUpperCase() + response.data.data.company.slice(1);
    //         }
    //     } catch (error) {
    //         console.log("error", error)
    //         set({ isDomainLoading: false });
    //     }
    // },
}));

export default useAuthStore;
