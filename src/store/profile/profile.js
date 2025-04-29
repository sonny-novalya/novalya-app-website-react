
import { create } from "zustand";
import apiCall from "../../services/api";

const useProfileStore = create((set) => ({
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
    updateUserProfile: async (data) => {
        try {
            set({ loading: true})
            const response = await apiCall({
                method: 'POST',
                url: '/user/api/update-user-profile',
                data,
            });

            if (response.statusText === "OK") {
                console.log("Updated succesfully")
            } else {
                throw new Error("Failed to update");
            }
            set({ loading: false })

        } catch (error) {
            console.error("Error updating:", error);
            set({ loading: false })
        }
    },
    updateProfilePicture: async (data) => {
        try {
            set({ loading: true });
            const response = await apiCall({
                method: 'POST',
                url: '/user/api/updateprofilepicture',
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.statusText === "OK") {
                console.log("Updated successfully");
                return response.data;
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            console.error("Error updating:", error);
            throw error; 
        } finally {
            set({ loading: false });
        }
    },

}));

export default useProfileStore;
