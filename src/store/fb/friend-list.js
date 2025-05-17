import { create } from 'zustand';
import { API_BASE_URL, BASE_URL } from '../../services/ApiCalls';
import apiCall from '../../services/api';

export const useFbFriendListStore = create((set) => ({
    friends: [],
    loading: false,
    error: null,
    totalRecords: 0,
    groups: [],
    groupsLoading: false,
    isPremium: false,
    fetchFbFriends: async (page = 1, pageSize = 25, keyword = "") => {
        set({ loading: true, error: null, friends: []});

        try {
            const res = await apiCall({
                method: 'GET',
                url: `/novadata/api/get-fb-friends-with-tags?page=${page}&limit=${pageSize}&search=${keyword}&sort=undefined&field=undefined`
            });

            const planPkg = res?.data?.data?.plan_pkg;
            const premiumUser = planPkg && planPkg.toLowerCase() !== 'basic';
            
            set({ 
                friends: res?.data?.data?.data || [], 
                totalRecords:  res?.data?.data?.totalCount || 0, 
                loading: false,
                isPremium: premiumUser
            });
        } catch (error) {
            set({
                loading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    fetchGroups: async () => {
        set({ groupsLoading: true, groups: []});

        try {
            const res = await apiCall({
                method: 'POST',
                url: `/user/api/facebook/get-all-groups`
            });

            set({ 
                groups: res?.data?.data || [], 
                groupsLoading: false 
            });
        } catch (error) {
            set({
                groupsLoading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    fbAddToWhitelist: async (selectedIds) => {

        try {
            let payload = {
                ids: selectedIds
            }

            const res = await apiCall({
                method: 'POST',
                url: `/novadata/api/save-whitelist`,
                data: JSON.stringify(payload)
            });

            return Promise.resolve();
        } catch (error) {
            set({
                error: error?.message || 'Something went wrong',
            });
        }
    },

    fbRemoveGroup: async (selectedIds) => {

        try {
            let payload = {
                ids: selectedIds
            }

            const res = await apiCall({
                method: 'POST',
                url: `/novadata/api/remove-fb-tagging`,
                data: JSON.stringify(payload)
            });

            return Promise.resolve();
        } catch (error) {
            set({
                error: error?.message || 'Something went wrong',
            });
        }
    },
}));