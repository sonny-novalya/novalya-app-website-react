import { create } from 'zustand';
import { API_BASE_URL, BASE_URL } from '../../services/ApiCalls';

export const useFbFriendListStore = create((set) => ({
    friends: [],
    loading: false,
    error: null,
    totalRecords: 0,
    groups: [],
    groupsLoading: false,
    fetchFbFriends: async (page = 1, pageSize = 25, keyword = "") => {
        set({ loading: true, error: null, friends: []});
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/novadata/api/get-fb-friends-with-tags?page=${page}&limit=${pageSize}&search=${keyword}&sort=undefined&field=undefined`, {
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
            set({ friends: data.data, totalRecords: data.totalCount, loading: false });
        } catch (err) {
            set({
                error: err.message || 'Failed to fetch friends',
                loading: false,
            });
        }
    },

    fetchGroups: async () => {
        set({ groupsLoading: true, groups: []});
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/user/api/group`, {
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
            set({ groups: data, groupsLoading: false });
        } catch (err) {
            set({
                error: err.message || 'Failed to fetch groups',
                groupsLoading: false,
            });
        }
    },

    fbAddToWhitelist: async (selectedIds) => {
        // set({ successMsg: null, whitelistLoading: true});
        try {
            let payload = {
                ids: selectedIds
            }
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/novadata/api/save-whitelist`, {
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
            // set({ groups: data, groupsLoading: false });
        } catch (err) {
            set({
                error: err.message || 'Failed to move to whitelist',
                groupsLoading: false,
            });
        }
    },
}));