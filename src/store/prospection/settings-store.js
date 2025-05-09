import { create } from 'zustand';
import apiCall from '../../services/api';

const SettingStore = create((set) => ({
    // States
    loading: false,
    settingLoading: false,
    CRMList: [],
    // prospection: {
    //     step: 1,
    //     group: [],
    //     messageData: [],
    //     keywordData: [],
    //     crmGroupData: [],
    //     stratagy: 0, // 0 set for Follow + message
    //     norequest: 10, // How many Requests
    //     interval: "2-4", // make different interval for fb and ig
    //     selectedinterval: "1", // selected interval custom goes here
    //     gender: "female",
    //     keyword: null,
    //     prospect: "no", // retarget same user
    //     pro_convo: 0, // Existing conversation
    //     pro_stratagy: 0, // Request + Message
    //     action: "no", // it means "{\"moveStageId\":null,\"moveGroupId\":null,\"stage_num\":null}" otherwise pass all items into string  
    //     datevalue: null,
    //     group_id: null,
    //     message: null,
    //     post_target: "Like",
    //     newMessage: null, // New message data
    //     keywords: null, // Keywords data

    //     prospect_type: "facebook", // Default platform type (can be "facebook" or "instagram") || comes from api
    //     user_id: null, // User ID associated with the message || comes from api

    //     // Bottom values
    //     negative_keyword: null, // Negative keyword data
    //     resume: null, // Resume data
    //     search_index: 1, // Search index value
    //     status: null, // Status of the operation
    //     stratragy: false, // Strategy flag
    //     created_at: null, // Timestamp of creation
    // }, 
    prospection: {
        step: 1,
        group: [],
        messageData: [],
        keywordData: [],
        crmGroupData: [],
        stratagy: null, // 0 set for Follow + message
        norequest: null, // How many Requests
        interval: null, // make different interval for fb and ig
        selectedinterval: null, // selected interval custom goes here
        gender: null,
        keyword: null,
        prospect: null, // retarget same user
        pro_convo: null, // Existing conversation
        pro_stratagy: null, // Request + Message
        action: null, // it means "{\"moveStageId\":null,\"moveGroupId\":null,\"stage_num\":null}" otherwise pass all items into string  
        datevalue: null,
        group_id: null,
        message: null,
        post_target: null,
        newMessage: null, // New message data
        keywords: null, // Keywords data

        prospect_type: "facebook", // Default platform type (can be "facebook" or "instagram") || comes from api
        user_id: null, // User ID associated with the message || comes from api

        // Bottom values
        negative_keyword: null, // Negative keyword data
        resume: null, // Resume data
        search_index: 1, // Search index value
        status: null, // Status of the operation
        stratragy: false, // Strategy flag
        created_at: null, // Timestamp of creation
    }, 
    initialProspectionStates: {
        step: 1,
        group: [],
        messageData: [],
        keywordData: [],
        crmGroupData: [],
        stratagy: null, // 0 set for Follow + message
        norequest: null, // How many Requests
        interval: null, // make different interval for fb and ig
        selectedinterval: null, // selected interval custom goes here
        gender: null,
        keyword: null,
        prospect: null, // retarget same user
        pro_convo: null, // Existing conversation
        pro_stratagy: null, // Request + Message
        action: null, // it means "{\"moveStageId\":null,\"moveGroupId\":null,\"stage_num\":null}" otherwise pass all items into string  
        datevalue: null,
        group_id: null,
        message: null,
        post_target: null,
        newMessage: null, // New message data
        keywords: null, // Keywords data

        prospect_type: "facebook", // Default platform type (can be "facebook" or "instagram") || comes from api
        user_id: null, // User ID associated with the message || comes from api

        // Bottom values
        negative_keyword: null, // Negative keyword data
        resume: null, // Resume data
        search_index: 1, // Search index value
        status: null, // Status of the operation
        stratragy: false, // Strategy flag
        created_at: null, // Timestamp of creation
    }, 
    setStep: (value) => set(() => ({
        step: value
    })),
    updateProspection: (newValues) => set(() => ({
        prospection: { ...newValues }
    })),
    fetchProspectionData: async (prospectionType, groupId) => {
        set({ settingLoading: true });
        try {
            const response = await apiCall({
                method: 'GET',
                url: `/target/setting/api/all?prospection_type=${prospectionType}&grp_id=${groupId}`
            });

            if (response.statusText !== "OK") {
                throw new Error("Failed to fetch prospection data");
            }

            const data = response?.data;

            if (data.status === "success" && data?.data?.length > 0) {
                const responseData = data?.data[0];

                console.log("responseData", responseData)
                set({
                    prospection: {
                        group: responseData?.group || [],
                        messageData: responseData?.messages || [],
                        keywordData: responseData?.keywords || [],
                        crmGroupData: responseData?.groups || [],
                        stratagy: responseData?.stratagy || null,
                        norequest: responseData?.norequest || null,
                        interval: responseData?.interval || null,
                        selectedinterval: responseData?.selectedinterval || null,
                        gender: responseData?.gender || null,
                        keyword: responseData?.keyword || null,
                        prospect: responseData?.prospect || null,
                        pro_convo: responseData?.pro_convo ,
                        pro_stratagy: responseData?.pro_stratagy ,
                        action: responseData?.action || null,
                        datevalue: responseData?.datevalue || null,
                        group_id: responseData?.group_id || null,
                        message: responseData?.message || null,
                        post_target: responseData?.post_target || null,
                        newMessage: responseData?.newMessage || null,
                        keywords: responseData?.keywords || null,
                    },
                    settingLoading: false
                });
            } else {
                set({ settingLoading: false });
            }
        } catch (error) {
            console.error("Error fetching prospection data:", error);
            set({ settingLoading: false });
        }
    },
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
            
            const response = await apiCall({
                method: 'POST',
                url: "/target/setting/api/create",
                data: prospectionData
            });

            if (response.status === 200) {
                set({
                    prospection: {
                        ...response.data, // Assuming response data structure fits in the prospection state.
                    }
                });
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
