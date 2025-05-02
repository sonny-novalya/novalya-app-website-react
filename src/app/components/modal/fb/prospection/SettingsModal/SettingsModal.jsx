import { useEffect, useState } from "react";
import { message, Modal, Spin } from "antd";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { t } from "i18next";

import SelectMessage from "./SelectMessage";
import Settings from "./Settings";
import Filters from "./Filters";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";

import SettingStore from "../../../../../../store/prospection/settings-store";

const SettingsModal = ({ visible, onClose, activeKey = 1, setActiveKey, groupId, postType, tempMessageList, keyWordList, CRMList }) => {
    const { prospection, fetchProspectionData, createSocialTarget, loading: createSocialLoading, updateProspection, settingLoading } = SettingStore();
    const location = useLocation();
    const isInstagram = location.pathname.split("/")[1] === "ig";

    // Track completion status for each section
    const [sectionsCompleted, setSectionsCompleted] = useState({
        1: false, // Select Message
        2: false, // Settings
        3: isInstagram ? true : false, // Filters (only for Facebook)
        [isInstagram ? 3 : 4]: false, // Advanced Options
        [isInstagram ? 4 : 5]: false, // Add Tags
    });

    // Check if all sections are completed
    const allSectionsCompleted = Object.values(sectionsCompleted).every(value => value === true);

    const tabItems = [
        {
            label: t("prospecting.Select Message"),
            key: 1,
            children: <SelectMessage
                tempMessageList={tempMessageList}
                onComplete={(isComplete) => handleSectionComplete(1, isComplete)}
            />
        },
        {
            label: t("prospecting.Settings"),
            key: 2,
            children: <Settings
                isInstagram={isInstagram}
                onComplete={(isComplete) => handleSectionComplete(2, isComplete)}
            />
        },
        ...(isInstagram ? [] : [{
            label: t("prospecting.Filters"),
            key: 3,
            children: <Filters
                keyWordList={keyWordList}
                postType={postType}
                onComplete={(isComplete) => handleSectionComplete(3, isComplete)}
            />
        }]),
        {
            label: t("prospecting.Advanced Options"),
            key: isInstagram ? 3 : 4,
            children: <AdvOptions
                onComplete={(isComplete) => handleSectionComplete(isInstagram ? 3 : 4, isComplete)}
            />
        },
        {
            label: t("prospecting.Add Tags"),
            key: isInstagram ? 4 : 5,
            children: <AddTags
                CRMList={CRMList}
                groupId={groupId}
                onComplete={(isComplete) => handleSectionComplete(isInstagram ? 4 : 5, isComplete)}
            />
        },
    ];

    // Function to handle section completion status
    const handleSectionComplete = (sectionKey, isComplete) => {
        setSectionsCompleted(prev => ({
            ...prev,
            [sectionKey]: isComplete
        }));
    };

    const handleUpdateGroupId = () => {
        updateProspection({
            ...prospection,
            group_id: groupId
        });
    };

    const handleNext = () => {
        let nextKey = activeKey + 1;
        if (isInstagram && activeKey === 2) nextKey = 3;
        if (nextKey <= tabItems.length) setActiveKey(nextKey);
    };

    const handleBack = () => {
        const prevKey = activeKey - 1;
        if (prevKey >= 1) setActiveKey(prevKey);
    };

    const handleTabClick = (key) => {
        setActiveKey(key);
    };

    const handleSave = async () => {
        if (allSectionsCompleted) {
            const type = isInstagram ? "instagram" : "facebook";
            const prospectionData = {
                ...prospection,
                prospection_type: type,
            };
            try {
                await createSocialTarget({ ...prospectionData });
                message.success("Settings created successfully");
                onClose();
            } catch (error) {
                console.error("Error creating social target:", error);
                message.error("Failed to create settings");
            }
        } else {
            // Find the first incomplete section
            const incompleteSection = Object.entries(sectionsCompleted)
                .find(([_, isComplete]) => !isComplete);

            if (incompleteSection) {
                const [incompleteKey] = incompleteSection;
                setActiveKey(Number(incompleteKey));
                message.warning("Please complete all sections before saving");
            }
        }
    };

    useEffect(() => {
        handleUpdateGroupId();
        const type = isInstagram ? 'instagram' : 'facebook';
        if (groupId) {
            fetchProspectionData(type, groupId);
        }
    }, [groupId]);

    return (
        <Modal open={visible} onCancel={onClose} footer={null} width={1100} centered>
            <div className="flex h-[calc(100vh-200px)] p-0 relative">
                {/* Left panel - Tabs */}
                {settingLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg h-full">
                        <Spin size="large" />
                    </div>
                )}
                <div className="w-1/4 rounded px-2 mt-7 flex flex-col justify-between">
                    <ul className="flex flex-col">
                        {tabItems.map((tab, index) => {
                            const isActive = activeKey === tab.key;
                            const isCompleted = sectionsCompleted[tab.key];

                            return (
                                <li
                                    key={tab.key}
                                    className={`cursor-pointer p-3 rounded-lg ${isActive ? "bg-[#E6F1FB]" : "hover:bg-gray-100"}`}
                                    onClick={() => handleTabClick(tab.key)}
                                >
                                    <span
                                        className={`cursor-pointer text-white p-1 px-2 text-xs mr-2 rounded ${isActive
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
                                                    : "text-black"
                                            }`}
                                    >
                                        {tab.label}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        className={`w-full py-2 rounded-lg bg-[#0087FF] text-white cursor-pointer ${!allSectionsCompleted ? "opacity-50" : ""}`}
                        disabled={!allSectionsCompleted}
                        onClick={handleSave}
                    >
                        {createSocialLoading ? t("prospecting.Saving") : t("prospecting.Save")}
                    </button>
                </div>

                {/* Divider */}
                <div className="h-full w-[1px] bg-[#DADADA] mx-4" />

                {/* Right panel - Content and Navigation */}
                <div className="w-3/4 overflow-auto px-4 flex flex-col justify-between">
                    <div className="h-[calc(100%-40px)]">
                        {tabItems.find((tab) => tab.key === activeKey)?.children}
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            className="px-12 py-2 rounded-lg border border-[#0087FF] text-[#0087FF] cursor-pointer"
                            onClick={handleBack}
                            disabled={activeKey === 1}
                        >
                            {t("prospecting.Back")}
                        </button>
                        <button
                            className={`px-12 py-2 rounded-lg bg-[#0087FF] text-white cursor-pointer ${activeKey === tabItems.length ? "opacity-50" : ""}`}
                            onClick={handleNext}
                            disabled={activeKey === tabItems.length}
                        >
                            {t("prospecting.Next")}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

SettingsModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    groupId: PropTypes.any,
    activeKey: PropTypes.number,
    setActiveKey: PropTypes.func,
    postType: PropTypes.string,
    tempMessageList: PropTypes.array,
    keyWordList: PropTypes.array,
    CRMList: PropTypes.array,
};

export default SettingsModal;