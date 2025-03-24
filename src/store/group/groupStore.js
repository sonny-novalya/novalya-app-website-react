import { create } from "zustand";
import { BASE_URL } from "../../services/ApiCalls";

const useGroupStore = create((set) => ({
    groups: [],
    initialGroups: [],
    fetchGroups: async (folderId = null) => {
        try {
            const token = localStorage.getItem("token");
            // const endpoint = `${BASE_URL}groups/api/get-group-by-folder`;

            const endpoint = folderId
                ? `${BASE_URL}groups/api/get-group-by-folder?id=${folderId}`
                : `${BASE_URL}groups/api/get-group-by-folder`;

            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch groups");
            }

            const data = await response.json();
            set({ groups: data.data });
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    },
    fetchInitialGroups: async () => {
        try {
            const token = localStorage.getItem("token");
            const endpoint = `${BASE_URL}groups/api/get-group-by-folder`;

            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch groups");
            }

            const data = await response.json();
            set({ initialGroups: data.data });
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    },
}));

export default useGroupStore;
