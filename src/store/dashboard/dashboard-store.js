import { create } from 'zustand';
import apiCall from '../../services/api';

export const useSocialAccountsStore = create((set) => ({
    loading: false,
    error: null,
    socialAccountsData: [],
    planLimit: {},
    instaPlanLimit: {},
    isFbConnected : false,
    isIgConnected: false,
    isDataFetched: false,
    setPlanLimit: (data) => set({ planLimit: data }),
    setInstaPlanLimit: (data) => set({ instaPlanLimit: data }),

    fetchSocialAccounts: async () => {
        set({ loading: true, error: null });
        try {
            const res = await apiCall({
                method: 'POST',
                url: '/api/facebook/dashboard-social-accounts-data'
            });

            const fetchedData = res?.data?.data || {};
            const { facebook_data, instagram_data } = fetchedData;

            localStorage.setItem("instagramData", JSON.stringify(instagram_data));
            localStorage.setItem("facebookData", JSON.stringify(facebook_data));

            set({
                socialAccountsData: fetchedData,
                isFbConnected: facebook_data !== null,
                isIgConnected: instagram_data !== null,
                loading: false,
                isDataFetched: true
            });

        } catch (error) {
            set({
                loading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    unlinkInstagramAccount: async (params, callback, errorCallback) => {
        set({ loading: true, error: null });
        try {
            const res = await apiCall({
                method: 'DELETE',
                url: '/api/instagram/delete',
                data: params
            });
            if (callback) callback(res);

            set((state) => ({
                socialAccountsData: {
                    ...state.socialAccountsData,
                    instagram_data: null,  // Set instagram_data to null
                },
            }));

            localStorage.removeItem("instagramData");
            set({ loading: false });

        } catch (error) {
            if (errorCallback) errorCallback(error);
            set({
                loading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    unlinkFacebookAccount: async (params, callback, errorCallback) => {
        set({ loading: true, error: null });
        try {
            const res = await apiCall({
                method: 'DELETE',
                url: '/api/facebook/delete',
                data: params
            });
            if (callback) callback(res);

            set((state) => ({
                socialAccountsData: {
                    ...state.socialAccountsData,
                    facebook_data: null,
                },
            }));

            localStorage.removeItem("facebookData");

        } catch (error) {
            if (errorCallback) errorCallback(error);

            // Set error state if API call fails
            set({
                loading: false,
                error: error?.message || 'Something went wrong',
            });
            return;
        }

        set({ loading: false });
    },

    fetchPlanLimitDetails: async (type = null) => {
        set({ loading: true, error: null });
        try {
            const res = await apiCall({
                method: 'GET',
                url: '/plan/plan-details',
                params: { type: type },
            });
            if (res?.data?.data) {
                if (type === "instagram") {
                    // Correct usage of setInstaPlanLimit inside the store
                    set({ instaPlanLimit: res?.data?.data });
                } else {
                    // Correct usage of setPlanLimit inside the store
                    set({ planLimit: res?.data?.data });
                }
            }
            set({ loading: false });
        } catch (error) {
            set({
                loading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

        getEncKey: async () => {
        try {
         const response = await apiCall({
             method: 'POST',
             url: `/user/api/get-enc-keys`
         });
        return response
         
        } catch (error) {
         console.error("Error getting response", error);
        }
     },
}));
