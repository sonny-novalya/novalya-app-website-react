import { create } from "zustand";
import apiCall from "../../services/api";

const useGroupStore = create((set) => ({
    groups: [],
    initialGroups: [],
    folderUpdateId: null,
    setFolderUpdateId: (val) => (set({ folderUpdateId: val})),
    loading:false,
    initialStoreFilters: {
        sort_by: 0,
        type: 'facebook',
        id: 0, // folder id,
        field:"",
        search_grp: "",
        social_type: "",
        group_type: "",
        page: 1,
        limit: 25,
    },
        initialStoreFiltersIG: {
        sort_by: 0,
        type: 'instagram',
        id: 0, // folder id,
        field:"",
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
        field:"",
        search_grp: "",
        social_type: "",
        group_type: "",
        page: 1,
        limit: 25,
    },
    updateFilters: (newValues) => set(() => ({
        storeFilters: { ...newValues }
    })),

    fetchGroups: async ({ sort_by, type, id, search_grp, social_type, group_type, page, limit, field }) => {
        try {
            set({ loading: true });

            const payload = {
                sort_by,
                type,
                id,
                search_grp,
                social_type,
                field,
                group_type,
                page,
                limit,
            };

            const response = await apiCall({
                method: 'POST',
                url: '/groups/api/get-group-by-folder',
                data: payload,
            });

            const result = response.data.data;

            set({
                totalPages: result.totalPages,
                totalGrp: result.totalGrp,
                groups: result.data,
                loading: false,
            });

        } catch (error) {
            console.error("Error fetching groups:", error);
            set({ loading: false });
        }
    },

    fetchInitialGroups: async (type) => {
        try {
            const payload = {
                sort_by: 0,
                type: type,
                id: 0,
                search_grp: "",
                social_type: "",
                group_type: "",
                page: 1,
                limit: 25,
            };

            const response = await apiCall({
                method: 'POST',
                url: '/groups/api/get-group-by-folder',
                data: payload,
            });

            if (response.statusText !== "OK") {
                throw new Error("Failed to fetch groups");
            }
            const result = response.data.data;
            set({ initialGroups: result.data });

        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    },

    deleteGroup: async ({ id }) => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/groups/api/delete/${id}`,
            });

            if (response.statusText !== "OK") {
                throw new Error("Failed to delete group");
            }
        } catch (error) {
            console.error("Error deleting group:", error);
        }
    }

}));

export default useGroupStore;
