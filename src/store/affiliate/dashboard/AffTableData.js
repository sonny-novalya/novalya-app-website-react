import { create } from "zustand";
import apiCall from '../../../services/api';

const useAffTableDataStore = create((set) => ({
    activityLogsData: false,

    fetchActivityLogs: async () => {
        try {
            const res = await apiCall({
                method: 'POST',
                url: '/user/api/affiliate-activity-logs',
                data: {
                    search: "",
                    page: 1
                }
            });

            const result = res?.data;
            if (!result) {
                console.log("Cant fetch Logs");
                return;
            }

            console.log("activity logs", result)


        } catch (error) {
            console.log("error", error);
        }
    },
    fetchAffiliateCustomers: async () => {
        try {
            const res = await apiCall({
                method: 'POST',
                url: '/user/api/affiliate-customers',
                data: {
                    month:null,
                    year:2025
                }
            });

            const result = res?.data;

            console.log("aff cusomters", result)


        } catch (error) {
            console.log("error", error);
        }
    },
}));

export default useAffTableDataStore;
