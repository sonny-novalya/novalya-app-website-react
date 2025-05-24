import { useEffect, useState } from "react";
import { Modal, Spin, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { t } from "i18next";
import { message as MessagePopup } from "antd"
import SelectMessage from "./SelectMessage";
import Settings from "./Settings";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";

import SettingStore from "../../../../../../store/prospection/settings-store";

const InstaSettingsModal = ({ visible, onClose, activeKey = 1, setActiveKey, groupId, tempMessageList, CRMList, needToFetchSettings, updateGroupSettingStatus }) => {
    const { instaProspection, updateInstaProspection, fetchProspectionData, createSocialTarget, loading: createSocialLoading, settingsAlreadyExists, settingLoading } = SettingStore();

    const { selectedMessage, postTarget } = instaProspection;
    
    const [visitedTabs, setVisitedTabs] = useState({
        1: true, // Select Message
        2: false, // Settings
        3: false, // Advanced Options
        4: false, // Add Tags
    });

    const [validatedTabs, setValidatedTabs] = useState({
        1: false, // Select Message
        2: true, // Settings
        3: true, // Advanced Options
        4: true, // Add Tags
    });   

    const updateTabStatus = (tab, status, type) => {
        tab = Number(tab);
        if(type == "visit"){
            setVisitedTabs(prev => ({
                ...prev,
                [tab]: status
            }));
        }else if(type == "validate"){
            setValidatedTabs(prev => ({
                ...prev,
                [tab]: status
            }));
        }
    }

    useEffect(() => {
        // tab 1 validations
        if(selectedMessage){
            updateTabStatus(1, true, "validate")
        }

    }, [selectedMessage])

    const tabItems = [
        {
            label: t("prospecting.Select Message"),
            key: 1,
            children: <SelectMessage
                tempMessageList={tempMessageList}
                setActiveKey={setActiveKey}
                updateTabStatus={updateTabStatus}
            />
        },
        {
            label: t("prospecting.Settings"),
            key: 2,
            children: <Settings/>
        },
        {
            label: t("prospecting.Advanced Options"),
            key: 3,
            children: <AdvOptions/>
        },
        {
            label: t("prospecting.Add Tags"),
            key: 4,
            children: <AddTags
                CRMList={CRMList}
            />
        },
    ];

    const handleUpdateGroupId = (groupId) => {
        updateInstaProspection({
            ...instaProspection,
            groupId: groupId
        });
    };
    
    const handleBack = () => {
        const prevKey = Number(activeKey) - 1;
        if (prevKey >= 1) setActiveKey(prevKey);
    };
    
    const handleTabClick = (key) => {
        
        // will look into this later on - by shiv
        // if(Number(key) > Number(activeKey)  && Number(key) != Number(activeKey) + 1){
        //     return false;
        // }

        // if user is in edit mode then he can switch to any tab
        if(settingsAlreadyExists){
            setActiveKey(key);
            return false;
        }
        
        let tabToCheck = parseInt(key, 10) - 1;
        if(key == 1){
            tabToCheck = key;
        }
        if(visitedTabs[tabToCheck] && validatedTabs[tabToCheck]){
            setActiveKey(key);
            updateTabStatus(key, true, "visit")
        }else{
            if(activeKey == "1"){
                MessagePopup.error("Please select a message");
            }
        }
    };

    const handleSave = async () => {
        if (isValidToSubmit()) {
            const prospectionData = {
                ...instaProspection,
                prospection_type: "instagram",
            };
            try {
                await createSocialTarget({ ...prospectionData });
                updateGroupSettingStatus(groupId);
                MessagePopup.success("Settings created successfully");
                onClose();
            } catch (error) {
                console.error("Error creating social target:", error);
                MessagePopup.error("Failed to create settings");
            }
        }else{
            MessagePopup.error("Select all required fields.");
        }
    };

    useEffect(() => {
        handleUpdateGroupId(groupId);
        if (groupId && needToFetchSettings) {
            fetchProspectionData("instagram", groupId);
        }
    }, [groupId]);      

    const handleCloseSettings = () => {
        onClose()
    }

    const checkIsCompleted = (tab) => {
        tab = Number(tab);
        return settingsAlreadyExists || visitedTabs[tab] && validatedTabs[tab] && tab != activeKey;
    }

    const isValidToSubmit = () => {
        return (
            (
                visitedTabs[1] &&
                visitedTabs[2] &&
                validatedTabs[1] &&
                validatedTabs[2]
            ) || settingsAlreadyExists
        );
    };

    return (
        <Modal className="pro-setting-modal" open={visible} onCancel={handleCloseSettings} footer={null} width={1225} centered>
            <div className="flex h-[calc(100vh-80px)] p-0 relative">
                {settingLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-10 z-50 rounded-lg h-full">
                        <Spin size="large" />
                    </div>
                )}
                <div className="w-1/4  rounded-[10px]  flex flex-col justify-between bg-white px-4 pt-10 pb-4 overflow-auto">
                    <ul className="flex flex-col gap-4">
                        {tabItems.map((tab, index) => {
                            const isActive = activeKey === tab.key;
                            const isCompleted = checkIsCompleted(tab.key);

                            return (
                                <li
                                    key={tab.key}
                                    className={`flex text-[16px] tracking-[0.02em] items-center cursor-pointer p-3 rounded-lg ${isActive ? "bg-[#E6F1FB]" : "hover:[#E6F1FB]"}`}
                                    onClick={() => handleTabClick(tab.key)}
                                >
                                    <span
                                        className={`w-6 h-6 flex items-center justify-center text-[16px]  rounded-[4px] cursor-pointer text-white mr-3  ${isActive
                                                ? "bg-[#0087FF]"
                                                : isCompleted
                                                    ? "bg-[#21BF7C]"
                                                    : "bg-[#8D8D8D]"
                                            }`}
                                    >
                                        {index + 1}
                                    </span>
                                    <span
                                        className={`${isActive
                                                ? "text-[#0087FF]"
                                                : isCompleted
                                                    ? "text-[#00C271]"
                                                    : "text-[#8D8D8D]"
                                            }`}
                                    >
                                        {tab.label}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <Tooltip
                        title={!isValidToSubmit() ? "Please complete all required fields before saving" : ""}
                        placement="top"
                    >
                        <button
                            className={`w-full py-3 rounded-lg bg-[#0087FF] text-white cursor-pointer ${!isValidToSubmit() ? "opacity-50" : ""}`}
                            onClick={handleSave}
                        >
                            {createSocialLoading ? t("prospecting.Saving") : t("prospecting.Save")}
                        </button>
                    </Tooltip>
                </div>

                {/* Divider */}
                <div className="h-full w-[20px] bg-[#878787]" />

                {/* Right panel - Content and Navigation */}
                <div className="w-3/4 overflow-auto px-5 py-4 flex flex-col gap-3 justify-between bg-white  rounded-[10px]">
                    <div className="h-[calc(100%-64px)]">
                        {tabItems.find((tab) => tab.key === activeKey)?.children}
                    </div>
                    <div className="flex justify-end space-x-5">
                        {activeKey != 1 && <button
                            className="px-12 min-h-[45px] py-2 rounded-lg border border-[#0087FF] text-[#0087FF] cursor-pointer"
                            onClick={handleBack}
                        >
                            {t("prospecting.Back")}
                        </button>}
                        {(activeKey < tabItems.length) && <button
                            className={`px-12 min-h-[45px]  py-2 rounded-lg bg-[#0087FF] text-white cursor-pointer ${activeKey === tabItems.length ? "opacity-50" : ""}`}
                            onClick={() => handleTabClick(Number(activeKey) + 1)} // +1 not create any issue on 4th tab because we will hide this button
                            // disabled={}
                        >
                            {t("prospecting.Next")}
                        </button>}

                        {(activeKey == tabItems.length) && <button
                            className={`px-12 min-h-[45px]  py-2 rounded-lg bg-[#0087FF] text-white cursor-pointer`}
                            onClick={handleSave} 
                        >
                            {createSocialLoading ? t("prospecting.Saving") : t("prospecting.Save")}
                        </button>}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

InstaSettingsModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    groupId: PropTypes.any,
    activeKey: PropTypes.number,
    setActiveKey: PropTypes.func,
    tempMessageList: PropTypes.array,
    keyWordList: PropTypes.array,
    CRMList: PropTypes.array,
};

export default InstaSettingsModal;