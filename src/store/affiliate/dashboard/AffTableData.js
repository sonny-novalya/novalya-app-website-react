import { create } from "zustand";
import apiCall from '../../../services/api';

const useAffTableDataStore = create((set, get) => ({
    activityLogsData: null,
    affiliateCustomersData: {},
    isAffiliateLoading: false,
    logsLoading: false,

    // Add logsFilter state
    logsFilter: {
        search: "",
        page: 1,
        limit: 100
    },

    // Method to update logsFilter object
    updateLogsFilter: (newFilter) =>
        set((state) => ({
            logsFilter: {
                ...state.logsFilter,
                ...newFilter
            }
        })),

    // Updated fetchActivityLogs to use logsFilter from state
    fetchActivityLogs: async () => {
        set({ logsLoading: true });

        const { logsFilter } = get();

        try {
            const res = await apiCall({
                method: 'POST',
                url: '/user/api/affiliate-activity-logs',
                data: {
                    search: logsFilter.search,
                    page: logsFilter.page,
                    limit: logsFilter.limit
                }
            });

            const result = res?.data;
            if (!result) {
                console.log("Can't fetch Logs");
                return;
            }

            set({ activityLogsData: result?.data?.activity_logs });

        } catch (error) {
            console.log("Error fetching activity logs:", error);
        } finally {
            set({ logsLoading: false });
        }
    },

    fetchAffiliateCustomers: async () => {
        set({ isAffiliateLoading: true });
        try {
            const res = await apiCall({
                method: 'POST',
                url: '/user/api/affiliate-customers',
                data: {
                    month: null,
                    year: 2025
                }
            });

            const result = res?.data;
            set({ affiliateCustomersData: result });

        } catch (error) {
            console.log("Error fetching affiliate customers:", error);
        } finally {
            set({ isAffiliateLoading: false });
        }
    },
}));

export default useAffTableDataStore;
