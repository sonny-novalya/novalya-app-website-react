import { create } from "zustand";
import { BASE_URL } from "../../services/ApiCalls";

const useGroupStore = create((set) => ({
    groups: [],
    fetchGroups: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}groups/api/get-group-by-folder`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch groups");
            }
            const data = await response.json();
            set({ groups: data.data });
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    },
}));

export default useGroupStore;
