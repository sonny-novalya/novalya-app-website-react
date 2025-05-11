import { create } from "zustand";
import apiCall from '../../../services/api';

const useAffMemberStore = create((set, get) => ({
    earningsData: {
        pending: 0,
        thisMonth: 0,
        lastMonth: 0,
        lifeTime: 0,
        cSymbol: "$"
    },
    payoutData: {},
    updateLoading: false,

    fetchPayout: async () => {
        try {
            const res = await apiCall({
                method: 'POST',
                url: '/user/api/payout',
            });

            const result = res?.data?.data;
            set({ payoutData: result });

        } catch (error) {
            console.log("error", error);
        }
    },

    fetchDashboardData: async () => {
        try {
            const res = await apiCall({
                method: 'POST',
                url: '/user/api/dashboarddata',
            });

            const result = res?.data?.data;
            if (!result) {
                console.warn("Dashboard data response was empty or invalid");
                return;
            }

            const last_month_payout = result?.lastMonthPayout || 0;
            const pending_payment = result?.totalPayment || 0;
            const lifetime_earning = result?.lifeTimeEarning || 0;
            const current_month = result?.currentMonthEarning || 0;
            const c_symbol = result?.cSymbol || get().earningsData.cSymbol || "$";

            set({
                earningsData: {
                    ...get().earningsData,
                    lastMonth: last_month_payout,
                    pending: pending_payment,
                    lifeTime: lifetime_earning,
                    thisMonth: current_month,
                    cSymbol: c_symbol,
                }
            });

        } catch (error) {
            console.log("error", error);
        }
    },
    updateAffiliateId: async (data) => {
        try {
            set({ updateLoading: true });
            const res = await apiCall({
                method: 'POST',
                url: '/user/api/updateaffiliatecode',
                data
            });

            if (res?.data?.status === 'error') {
                return { success: false, message: res.data.message || 'Failed to update affiliate ID' };
            }

            return { success: true, message: res.data.message || 'Affiliate ID updated successfully' };

        } catch (error) {
            console.log("error", error);
            return { success: false, message: 'Something went wrong. Please try again.' };
        } finally {
            set({ updateLoading: false }); 
        }
    }, fetchActivityLogs: async () => {
        try {
            const res = await apiCall({
                method: 'GET',
                url: '/affiliate-activity-logs',
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

            console.log("acct", result)


        } catch (error) {
            console.log("error", error);
        }
    },
}));

export default useAffMemberStore;
