import { create } from "zustand";
import { BASE_URL } from "../../services/ApiCalls";

const useGroupStore = create((set) => ({
    groups: [],
    initialGroups: [],
    loading:false,
    initialStoreFilters: {
        sort_by: 0,
        type: 'facebook',
        id: 0, // folder id
        search_grp: "",
        social_type: "",
        group_type: "",
        page: 1,
        limit: 25,
    },
    totalPages: 0,
    totalGrp: 0,
    storeFilters: {
        sort_by: 0,
        type: 'facebook',
        id: 0,
        search_grp: "",
        social_type: "",
        group_type: "",
        page: 1,
        limit: 25,
    },
    updateFilters: (newValues) => set(() => ({
        storeFilters: { ...newValues }
    })),

    fetchGroups: async ({ sort_by, type, id, search_grp, social_type, group_type, page, limit }) => {
        try {
            set({ loading : true })
            const token = localStorage.getItem("token");
            const payload = {
                sort_by,
                type: type,         
                id,
                search_grp,
                social_type,
                group_type,
                page,
                limit,
            };

            const endpoint = `${BASE_URL}groups/api/get-group-by-folder`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Failed to fetch groups");
            }

            const data = await response.json();
            set({ totalPages: data.totalPages });
            set({ totalGrp: data.totalGrp });
            set({ groups: data.data });
            set({ loading: false })
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    },

    fetchInitialGroups: async ({type = "facebook"}) => {
        try {
            const token = localStorage.getItem("token");
            const endpoint = `${BASE_URL}groups/api/get-group-by-folder`;

            const payload = {
                sort_by: 0,
                type: type,
                id: 0,
                search_grp :"",
                social_type: "",
                group_type:"",
                page: 1,
                limit: 25,
            }
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
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
