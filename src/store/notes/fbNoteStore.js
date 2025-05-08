import { create } from "zustand";
import apiCall from "../../services/api";

const useFbNoteStore = create((set) => ({
    loading: false,
    error: null,
    noteResponse: null,
    fetchedNotes: [],
    createFbNote: async ({ data }) => {
        try {
            set({ loading: true, error: null });

            const response = await apiCall({
                method: "POST",
                url: "/user/api/create-note",
                data,
            });

            set({
                noteResponse: response.data,
                loading: false,
            });

            return response.data;
        } catch (error) {
            console.error("Error creating note:", error);
            set({
                error: error.response?.data?.message || "Failed to create note",
                loading: false,
            });
            return null;
        }
    },

    getFbNotes: async (fb_user_id) => {
        try {
            set({ loading: true, error: null });

            const response = await apiCall({
                method: "POST",
                url: "/user/api/get-user-note",
                data: { fb_user_id },
            });

            const notes = response.data?.data[0] || [];
            set({ fetchedNotes: notes, loading: false });
            return notes;
        } catch (error) {
            console.error("Error fetching notes:", error);
            set({
                error: error.response?.data?.message || "Failed to fetch notes",
                loading: false,
            });
            return [];
        }
    },
    editUserNote: async ({ note_id, description, id }) => {
        try {
            set({ loading: true, error: null });

            const response = await apiCall({
                method: "POST",
                url: "/user/api/edit-user-note",
                data: {
                    note_id,
                    discription: description, // spelling is as per API
                    id,
                },
            });

            set({ loading: false });
            return response.data;
        } catch (error) {
            console.error("Error editing note:", error);
            set({
                error: error.response?.data?.message || "Failed to edit note",
                loading: false,
            });
            return null;
        }
    },

    deleteUserNote: async ({ notes_id, id }) => {
        try {
            set({ loading: true, error: null });

            const response = await apiCall({
                method: "POST",
                url: `/user/api/delete-user-note?id=${id}&note_id=${notes_id}`,
            });

            set({ loading: false });
            return response.data;
        } catch (error) {
            console.error("Error deleting note:", error);
            set({
                error: error.response?.data?.message || "Failed to delete note",
                loading: false,
            });
            return null;
        }
    },
    clearNoteState: () =>
        set({
            loading: false,
            error: null,
            noteResponse: null,
        }),
}));

export default useFbNoteStore;
