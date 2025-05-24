import { create } from 'zustand';
import apiCall from '../../services/api';

const SettingStore = create((set) => ({
    // States
    loading: false,
    settingLoading: false,
    CRMList: [],
    settingsAlreadyExists: false,
    fbProspection: {
        groupId:null,
        selectedMessage: null,
        selectedStrategy: null,
        selectedRequest: null,
        selectedInterval: null,
        selectedGender: null,
        selectedKeyword: null,
        postTarget: null,
        reTargetSameUser: null, 
        existingConvo: null,
        action: null
    },
    defaultFbProspection: {
        selectedMessage: null,
        selectedStrategy: 1,
        selectedRequest: 5,
        selectedInterval: "3-5",
        selectedGender: "both",
        selectedKeyword: null,
        postTarget: null,
        reTargetSameUser: "no", 
        existingConvo: 0,
        action: "{\"moveGroupId\":null,\"moveStageId\":null,\"stage_num\":null}"
    },
    instaProspection: {
        groupId:null,
        selectedMessage: null,
        selectedStrategy: null,
        selectedRequest: null,
        selectedInterval: null,
        selectedGender: null,
        selectedKeyword: null,
        postTarget: null,
        reTargetSameUser: null, 
        existingConvo: null,
        action: null
    },
    defaultInstaProspection: {
        selectedMessage: null,
        selectedStrategy: 1,
        selectedRequest: 5,
        selectedInterval: "3-5",
        selectedGender: "both",
        selectedKeyword: null,
        postTarget: null,
        reTargetSameUser: "no", 
        existingConvo: 0,
        action: "{\"moveGroupId\":null,\"moveStageId\":null,\"stage_num\":null}"
    },
    updateFbProspection: (newValues) => set(() => ({
        fbProspection: { ...newValues }
    })),
    updateInstaProspection: (newValues) => set(() => ({
        instaProspection: { ...newValues }
    })),

    fetchProspectionData: async (prospectionType, groupId) => {
        set({ settingLoading: true, settingsAlreadyExists: false });
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/target/setting/api/all?prospection_type=${prospectionType}&grp_id=${groupId}`
            });

            if (response.statusText !== "OK") {
                throw new Error("Failed to fetch prospection data");
            }

            const data = response?.data;

            if (data.status === "success" && Array.isArray(data?.data) && typeof data.data[0] === "object" && data.data[0] !== null) {
                const responseData = data.data[0];

                if(prospectionType == "facebook"){
                    set({
                        fbProspection: {
                            groupId: responseData?.group_id ?? null,
                            selectedMessage: responseData?.message ?? null,
                            selectedStrategy: responseData?.pro_stratagy ?? null,
                            selectedRequest: responseData?.norequest ?? null,
                            selectedInterval: responseData?.interval ?? null,
                            selectedGender: responseData?.gender ?? null,
                            selectedKeyword: responseData?.keyword ?? null,
                            postTarget: responseData?.post_target ?? null,
                            reTargetSameUser: responseData?.prospect ?? "no", 
                            existingConvo: responseData?.pro_convo ?? 0,
                            action: responseData?.action ?? "no"
                        },
                        settingLoading: false,
                        settingsAlreadyExists: true,
                    });
                }
                else if(prospectionType == "instagram"){
                    set({
                        instaProspection: {
                            groupId: responseData?.group_id ?? null,
                            selectedMessage: responseData?.message ?? null,
                            selectedStrategy: responseData?.pro_stratagy ?? null,
                            selectedRequest: responseData?.norequest ?? null,
                            selectedInterval: responseData?.interval ?? null,
                            selectedGender: responseData?.gender ?? null,
                            selectedKeyword: responseData?.keyword ?? null,
                            postTarget: responseData?.post_target ?? null,
                            reTargetSameUser: responseData?.prospect ?? "no", 
                            existingConvo: responseData?.pro_convo ?? 0,
                            action: responseData?.action ?? "no"
                        },
                        settingLoading: false,
                        settingsAlreadyExists: true,
                    });
                }
                
            } else {

                if(prospectionType == "facebook"){
                    set({
                        fbProspection: {
                            ...SettingStore.getState().fbProspection, // preserve existing keys like groupId
                            ...SettingStore.getState().defaultFbProspection // override with defaults
                        },
                        settingLoading: false
                    });
                }
                else if(prospectionType == "instagram"){
                    set({
                        instaProspection: {
                            ...SettingStore.getState().instaProspection, // preserve existing keys like groupId
                            ...SettingStore.getState().defaultInstaProspection // override with defaults
                        },
                        settingLoading: false
                    });
                }
            }   
        } catch (error) {
            console.error("Error fetching prospection data:", error);
            set({ settingLoading: false });
        }
    },
    setStep: (value) => set(() => ({
        step: value
    })),
    fetchKeywordsList: async (type = 'facebook') => {
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/keywords/api/all?type=${type}`
            });
            
            let keywordsResponse = response?.data?.data ?? [];
            keywordsResponse.push({ id: 0, name: "none" });
            const sortedArray = keywordsResponse.sort((a, b) => a.id - b.id);
            set({
                    prospection: {
                        keywordData: sortedArray 
                    }
                });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    createSocialTarget: async (prospectionData) => {
        try {
            set({ loading : true})
            let params = {
                group_id: prospectionData?.groupId,
                message: prospectionData?.selectedMessage,
                norequest: prospectionData?.selectedRequest,
                interval: prospectionData?.selectedInterval,
                gender: prospectionData?.selectedGender,
                prospect: prospectionData?.reTargetSameUser,
                keyword: prospectionData?.selectedKeyword,
                action: prospectionData?.action,
                prospection_type: prospectionData?.prospection_type,
                pro_stratagy: prospectionData?.selectedStrategy,
                pro_convo: prospectionData?.existingConvo,
                post_target: prospectionData?.postTarget,
            }
    
            const response = await apiCall({
                method: 'POST',
                url: "/target/setting/api/create",
                data: params
            });

            if (response.status === 200) {
                // set({
                //     prospection: {
                //         ...response.data, // Assuming response data structure fits in the prospection state.
                //     }
                // });
            }
            set({ loading: false })
        } catch (error) {
            console.error("Error creating social target:", error);
        }
    },
    fetchCRMGroups: async ({ data, type }) => {
        try {
            const res = await apiCall({
                method: 'POST',
                url: `/user/api/${type}/get-all-groups`,
                data: data,
            });

            set({
                CRMList: res?.data?.data || [],
                fbCRMLoading: false
            });
        } catch (error) {
            console.error("Error getting response", error);
        }
    },

}));

export default SettingStore;
