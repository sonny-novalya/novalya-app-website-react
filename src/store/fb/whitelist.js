import { create } from 'zustand';
import { API_BASE_URL, BASE_URL } from '../../services/ApiCalls';
import apiCall from '../../services/api';

export const useFbWhiteListStore = create((set) => ({
    whitelistedFriends: [],
    loading: false,
    error: null,
    totalRecords: 0,
    fetchFbWhitelistedFriends: async (page = 1, pageSize = 25, keyword = "") => {
        set({ loading: true, error: null, whitelistedFriends: [] });

        try {
            const res = await apiCall({ 
                method: 'GET',
                url: `/novadata/api/whitelist-all?page=${page}&limit=${pageSize}&search=${keyword}&sort=undefined&field=undefined`
            });

            set({ 
                whitelistedFriends: res?.data?.data || [], 
                totalRecords: res?.data?.totalCount, 
                loading: false 
            });
        } catch (error) {
            set({
                loading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },
    removeFbWhitelist: async (selectedIds) => {
        try {
            let payload = {
                ids: selectedIds
            }

            const res = await apiCall({
                method: 'POST',
                url: `/novadata/api/remove-whitelist`,
                data: JSON.stringify(payload)
            });

            return Promise.resolve();
        } catch (error) {
            set({
                error: error?.message || 'Something went wrong',
            });
        }
    }
}));