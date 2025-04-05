import { create } from 'zustand';
import apiCall from '../../services/api';

export const useSocialAccountsStore = create((set) => ({
    loading: false,
    error: null,
    socialAccountsData: [],

    fetchSocialAccounts: async () => {
        set({ loading: true, error: null });
        try {
            const res = await apiCall({
                method: 'POST',
                url: '/api/facebook/dashboard-social-accounts-data'
            });

            set({ socialAccountsData: res?.data?.data || [], loading: false });
        } catch (error) {
            set({
                loading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },
}));
