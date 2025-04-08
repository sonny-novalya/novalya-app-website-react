import { create } from 'zustand';
import { API_BASE_URL, BASE_URL } from '../../services/ApiCalls';

export const useFbUnfriendListStore = create((set) => ({
    unfriends: [],
    loading: false,
    error: null,
    totalRecords: 0,
    fetchFbUnfriends: async (page = 1, pageSize = 25, keyword = "") => {
        set({ loading: true, error: null, unfriends: [] });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/novadata/api/unfriend-all?page=${page}&limit=${pageSize}&search=${keyword}&sort=undefined&field=undefined`, {
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
            set({ unfriends: data.data, totalRecords: data.totalCount, loading: false });
        } catch (err) {
            set({
                error: err.message || 'Failed to fetch unfriends',
                loading: false,
            });
        }
    },
}));