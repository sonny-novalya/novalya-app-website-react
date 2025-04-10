import { create } from 'zustand';
import { API_BASE_URL, BASE_URL } from '../../services/ApiCalls';
import apiCall from '../../services/api';

export const useFbUnfriendListStore = create((set) => ({
    unfriends: [],
    loading: false,
    error: null,
    totalRecords: 0,
    fetchFbUnfriends: async (page = 1, pageSize = 25, keyword = "") => {

        set({ loading: true, error: null, unfriends: [] });
        try {
            const res = await apiCall({
                method: 'GET',
                url: `/novadata/api/unfriend-all?page=${page}&limit=${pageSize}&search=${keyword}&sort=undefined&field=undefined`
            });

            set({ 
                unfriends: res?.data?.data || [], 
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