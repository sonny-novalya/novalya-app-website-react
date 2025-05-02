import { create } from "zustand";
import apiCall from "../../services/api";

const useLoginUserDataStore = create((set) => ({
    loading: false,
    loginUserData: {},
    fetchLoginUserData: async (data) => {
        try {
            set({ loading: true });

            const response = await apiCall({
                method: 'POST',
                url: '/user/api/userdata',
                data,
            });

            const result = response?.data?.data;
            const userData = {
                name: `${result.firstname} ${result.lastname}`,
                url: result.profilepictureurl,
                plan: result.plan_pkg === "Unlimited_new" ? "Unlimited" : result?.plan_pkg === null ? "No Plan" : result?.plan_pkg
            };

            if (response.status === 200) {
                set({ loading: false, loginUserData: result });
                localStorage.setItem("loginUserData", JSON.stringify(userData));
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
