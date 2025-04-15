import { create } from 'zustand';

const SettingStore = create((set) => ({
    // States
    prospection: {
        step: 0,
        group: [],
        messageData: [],
        keywordData: [],
        crmGroupData: [],
        stratagy: 0, // 0 set for Follow + message
        norequest: "10", // How many Requests
        interval: "2-4", // make different interval for fb and ig
        selectedinterval: "90", // selected interval custom goes here
        gender: "female",
        keyword: 1,
        prospect: "no", // retarget same user
        pro_convo: 0, // Existing conversation
        action: "no", // it means "{\"moveStageId\":null,\"moveGroupId\":null,\"stage_num\":null}" otherwise pass all items into string  
        datevalue: null,
        group_id: null,
        message: null,
        post_target: "Like",
    },
    updateProspection: (newValues) => set(() => ({
        prospection: { ...newValues }
    }))
}));

export default SettingStore;
