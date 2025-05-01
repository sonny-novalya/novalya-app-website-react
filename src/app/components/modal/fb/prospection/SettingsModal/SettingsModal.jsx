import { useEffect } from "react";
import { message, Modal } from "antd";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { t } from "i18next";

import SelectMessage from "./SelectMessage";
import Settings from "./Settings";
import Filters from "./Filters";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";

import SettingStore from "../../../../../../store/prospection/settings-store";
import useKeyWordStore from "../../../../../../store/keyword/keywordStore";
import useMessageSteps from "../../../../../../store/messageTemp/MessageTemp";

const SettingsModal = ({ visible, onClose, activeKey = 1, setActiveKey, groupId, postType }) => {
    const { prospection, fetchProspectionData, createSocialTarget, loading, updateProspection, fetchCRMGroups, CRMList } = SettingStore();
    const { fetchKeywords, keyWordList } = useKeyWordStore();
    const { tempMessageList, fetchMessages } = useMessageSteps();
    const location = useLocation();
    const isInstagram = location.pathname.split("/")[1] === "ig";

    const tabItems = [
        { label: t("prospecting.Select Message"), key: 1, children: <SelectMessage tempMessageList={tempMessageList} /> },
        { label: t("prospecting.Settings"), key: 2, children: <Settings isInstagram={isInstagram} /> },
        ...(isInstagram ? [] : [{ label: t("prospecting.Filters"), key: 3, children: <Filters keyWordList={keyWordList} postType={postType} /> }]),
        { label: t("prospecting.Advanced Options"), key: isInstagram ? 3 : 4, children: <AdvOptions /> },
        { label: t("prospecting.Add Tags"), key: isInstagram ? 4 : 5, children: <AddTags CRMList={CRMList} groupId={groupId} /> },
    ];
    
    const handleUpdateGroupId = () => {
        updateProspection({
            ...prospection,
            group_id: groupId
        });
    };

    const handleNext = () => {
        let nextKey = activeKey + 1;
        if (isInstagram && activeKey === 3) nextKey = 4;
        if (nextKey <= tabItems.length) setActiveKey(nextKey);
    };

    const handleBack = () => {
        const prevKey = activeKey - 1;
        if (prevKey >= 1) setActiveKey(prevKey);
    };

    const handleSave = async () => {
        if (isInstagram || activeKey === 4 || activeKey === 5) {
            const type = isInstagram ? "instagram" : "facebook"
            const prospectionData = {
                ...prospection,
                prospection_type: type ,
            };
            try {
                await createSocialTarget({ ...prospectionData });
                message.success("Settings created successfully");
                onClose();
            } catch (error) {
                console.error("Error creating social target:", error);
            }
        }
    };

    useEffect(() => {
        handleUpdateGroupId()
        const type = isInstagram ? 'instagram' : 'facebook'
        fetchKeywords({ page: 1, limit: 100 });
        groupId && fetchProspectionData(type, groupId);
        fetchMessages({ page: 1, limit: 200 });
        fetchCRMGroups({ type });
    }, []);


    return (
        <Modal open={visible} onCancel={onClose} footer={null} width={1100} centered>
            <div className="flex h-[calc(100vh-200px)] p-0">
                {/* Left panel - Tabs */}
                <div className="w-1/4 rounded px-2 mt-7 flex flex-col justify-between">
                    <ul className="flex flex-col">
                        {tabItems.map((tab, index) => {
                            const isActive = activeKey === tab.key;
                            const isPrevious = Number(tab.key) < Number(activeKey);

                            return (
                                <li
                                    key={tab.key}
                                    className={`cursor-pointer p-3 rounded-lg ${isActive ? "bg-[#E6F1FB]" : "hover:bg-gray-100"}`}
                                >
                                    <span
                                        className={`cursor-pointer text-white p-1 px-2 text-xs mr-2 rounded ${isActive
                                                ? "bg-[#0087FF]"
                                                : isPrevious
                                                    ? "bg-[#21BF7C]"
                                                    : "bg-[#8D8D8D]"
                                            }`}
                                    >
                                        {index + 1}
                                    </span>
                                    <span
                                        className={`${isActive
                                                ? "text-[#0087FF]"
                                                : isPrevious
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
                        className={`w-full py-2 rounded-lg bg-[#0087FF] text-white cursor-pointer ${activeKey !== tabItems.length ? "opacity-50" : ""
                            }`}
                        disabled={activeKey !== tabItems.length}
                        onClick={handleSave}
                    >
                        {loading ? t("prospecting.Saving") : t("prospecting.Save")}
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
                        >
                            {t("prospecting.Back")}
                        </button>
                        <button
                            className={`px-12 py-2 rounded-lg bg-[#0087FF] text-white cursor-pointer ${activeKey === tabItems.length ? "opacity-50" : ""
                                }`}
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
};

export default SettingsModal;
