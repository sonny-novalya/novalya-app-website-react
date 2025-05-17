import { create } from 'zustand';
import { API_BASE_URL } from '../../services/ApiCalls';

export const useFbCrmGroupStore = create((set) => ({
    fbCrmGroups: [],
    loading: false,
    error: null,
    fetchGroups: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/group`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // ✅ extract JSON body
            set({ fbCrmGroups: data, loading: false });
        } catch (err) {
            set({
                error: err.message || 'Failed to fetch groups',
                loading: false,
            });
        }
    },
}));
