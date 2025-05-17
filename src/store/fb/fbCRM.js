import { create } from "zustand";
import apiCall from '../../services/api';

const usefbCRM = create((set) => ({

    CRMList: [],
    fbCRMLoading: false,
    error: null,
    selectedGrpData: {},
    selectedGrpLoader: false,
    addGrpLoader: false,
    selectStage: {},
    selectedGrp:{},

    setSelectStage: (val) => set(() => ({ selectStage: val })),
    setSelectedGrp: (val) => set(() => ({ selectedGrp: val })), 

    fetchCRMGroups: async ({ data, type }) => {
        set({ fbCRMLoading: true });
        const SocialType = type === 'ig' ? "instagram" : "facebook"
        try {
            const res = await apiCall({
                method: 'POST',
                url: `/user/api/${SocialType}/get-all-groups`,
                data: data
            });

            set({ CRMList: res?.data?.data || [], fbCRMLoading: false });
        } catch (error) {
            set({
                fbCRMLoading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    reorderCRMGroups: async ({ data, type }) => {
        const url = type === 'ig' ? `/user/api/instagram/reorderGroup` : `/user/api/reorderGroup`
        try {
            await apiCall({
                method: 'POST',
                url: url,
                data: data
            });
        } catch (error) {
            set({
                fbCRMLoading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    getGroupById: async ({ id, type }) => {
        set({ selectedGrpLoader: true });
        const url = type === 'ig' ? `/user/api/instagram/group/${id}` : `/user/api/group/${id}`
        try {
            const res = await apiCall({
                method: 'GET',
                url: url
            });
            set({
                selectedGrpData: res?.data?.data || {},
                selectedGrpLoader: false,
            });
        } catch (error) {
            set({
                selectedGrpLoader: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },
    deleteGroupById: async ({ id, type }) => {
        set({ selectedGrpLoader: true });
        const url = type === 'ig' ? `/user/api/instagram/group/${id}` : `/user/api/group/${id}`
        try {
            const res = await apiCall({
                method: 'DELETE',
                url: url
            });
            return res;
        } catch (error) {
            set({
                selectedGrpLoader: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    moveTaggedUsers: async ({ data, type }) => {
        const url = type === 'ig'
            ? `/user/api/taggeduser/${data.id}?type=instagram`
            : `/user/api/taggeduser/${data.id}`;

        try {
            const res = await apiCall({
                method: 'PATCH',
                url,
                data: { stage_id: data.stage_id }
            });
            return res;
        } catch (error) {
            set({ error: error?.message || 'Something went wrong' });
        }
    },

    createCRMGroup: async ({ data, type }) => {
        set({ addGrpLoader: true });
        const url = type === 'ig' ? `/user/api/instagram/group` : `/user/api/group`
        try {
            const res = await apiCall({
                method: 'POST',
                url: url,
                data: data
            });
            set({ addGrpLoader: false });
            return res;
        } catch (error) {
            set({
                addGrpLoader: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },
    editCRMGroup: async ({ data, type, id }) => {
        set({ addGrpLoader: true });
        const url = type === 'ig' ? `/user/api/instagram/group/${id}` : `/user/api/group/${id}`
        try {
            const res = await apiCall({
                method: 'PATCH',
                url: url,
                data: data 
            });
            set({ addGrpLoader: false });
            return res;
        } catch (error) {
            set({
                addGrpLoader: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },
    createStage: async ({ data, type }) => {
        set({ addGrpLoader: true });
        const url = type === 'ig' ? `/instagram/stages/api/create` : `/stages/api/create`
        try {
            const res = await apiCall({
                method: 'POST',
                url: url,
                data: data
            });
            set({ addGrpLoader: false });
            return res;
        } catch (error) {
            set({
                addGrpLoader: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    deleteStage: async ({ id, type }) => {
        const url = type === 'ig' ? `/instagram/stages/api/delete/${id}` : `/stages/api/delete/${id}`
        try {
            const res = await apiCall({
                method: 'GET',
                url: url
            });
            return res;
        } catch (error) {
            set({ error: error?.message || 'Something went wrong' });
        }
    },

    editStage: async ({ data, type }) => {
        set({ addGrpLoader: true });
        const url = type === 'ig' ? `/instagram/stages/api/${data.id}` : `/stages/api/${data.id}`
        try {
            const res = await apiCall({
                method: 'PUT',
                url: url,
                data: { name: data.name }
            });
            set({ addGrpLoader: false });
            return res;
        } catch (error) {
            set({
                addGrpLoader: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    moveStage: async ({ data, type }) => {
        const url = type === 'ig'
            ? `/user/api/taggedusersmove?type=instagram`
            : `/user/api/taggedusersmove`;

        set({ addGrpLoader: true });
        try {
            const res = await apiCall({
                method: 'PATCH',
                url,
                data: data
            });
            set({ addGrpLoader: false });
            return res;
        } catch (error) {
            set({
                addGrpLoader: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },

    deleteTaggedUser: async ({ id, type }) => {
        const url = type === 'ig'
            ? `/user/api/taggeduser/${id}?type=instagram`
            : `/user/api/taggeduser/${id}`;

        set({ addGrpLoader: true });
        try {
            const res = await apiCall({
                method: 'DELETE',
                url
            });
            set({ addGrpLoader: false });
            return res;
        } catch (error) {
            set({
                addGrpLoader: false,
                error: error?.message || 'Something went wrong',
            });
        }
    }

}));

export default usefbCRM;
