import { create } from 'zustand';
import { API_BASE_URL, BASE_URL } from '../../services/ApiCalls';
import apiCall from '../../services/api';

export const useFbDeactivateListStore = create((set) => ({
    deactivatedFriends: [],
    loading: false,
    error: null,
    totalRecords: 0,
    fetchFbDeactivatedFriends: async (page = 1, pageSize = 25, keyword = "") => {
        set({ loading: true, error: null, deactivatedFriends: [] });
        try {
            const res = await apiCall({ 
                method: 'GET',
                url: `/novadata/api/deactivated-all?page=${page}&limit=${pageSize}&search=${keyword}&sort=undefined&field=undefined`
            });

            set({ 
                deactivatedFriends: res?.data?.data || [], 
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
}));