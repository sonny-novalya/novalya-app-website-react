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

    tableFilters: {
        search: "",
        month: null,
        year: new Date().getFullYear()
    },

    // Method to update logsFilter object
    updateLogsFilter: (newFilter) =>
        set((state) => ({
            logsFilter: {
                ...state.logsFilter,
                ...newFilter
            }
        })),
    updateTableFilters: (newFilters) =>
        set((state) => ({
            tableFilters: {
                ...state.tableFilters,
                ...newFilters
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
        const { tableFilters } = get();
        try {
            const res = await apiCall({
                method: 'POST',
                url: '/user/api/affiliate-customers',
                data: {
                    search: tableFilters.search,
                    month: tableFilters.month,
                    year: tableFilters.year
                }
            });

            const result = res?.data;
            set({ affiliateCustomersData: result?.data });

        } catch (error) {
            console.log("Error fetching affiliate customers:", error);
        } finally {
            set({ isAffiliateLoading: false });
        }
    },
}));

export default useAffTableDataStore;
