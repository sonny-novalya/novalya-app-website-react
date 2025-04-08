import { create } from 'zustand';
import { API_BASE_URL, BASE_URL } from '../../services/ApiCalls';

export const useFbWhiteListStore = create((set) => ({
    whitelistedFriends: [],
    loading: false,
    error: null,
    totalRecords: 0,
    fetchFbWhitelistedFriends: async (page = 1, pageSize = 25, keyword = "") => {
        set({ loading: true, error: null, whitelistedFriends: [] });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}novadata/api/whitelist-all?page=${page}&limit=${pageSize}&search=${keyword}&sort=undefined&field=undefined`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            set({ whitelistedFriends: data.data, totalRecords: data.totalCount, loading: false });
        } catch (err) {
            set({
                error: err.message || 'Failed to fetch friends',
                loading: false,
            });
        }
    },
    removeFbWhitelist: async (selectedIds) => {
        // set({ loading: true, error: null, whitelistedFriends: [] });
        try {
            let payload = {
                ids: selectedIds
            }
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}novadata/api/remove-whitelist`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                return Promise.reject(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return Promise.resolve();
            // useFbWhiteListStore.getState().fetchFbWhitelistedFriends();
            // set({ whitelistedFriends: data.data, loading: false });
        } catch (err) {
            console.log("--v", err)
            set({
                // error: err.message || 'Failed to fetch friends',
                // loading: false,
            });
        }
    }
}));