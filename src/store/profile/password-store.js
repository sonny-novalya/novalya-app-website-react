import { create } from "zustand";
import apiCall from "../../services/api";

const usePasswordStore = create((set) => ({
    loading: false,

    updatePassword: async (data) => {
        try {
            set({ loading: true})
            const response = await apiCall({
                method: 'POST',
                url: '/user/api/updatepassword',
                data,
            });

            if (response.statusText === "OK") {
                console.log("Password changed succesfully")
            } else {
                throw new Error("Failed to update password");
            }
            set({ loading: false })

        } catch (error) {
            console.error("Error updating password:", error);
            set({ loading: false })
        }
    },
}));

export default usePasswordStore;
