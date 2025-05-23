import { useEffect, useState } from "react";
import { Modal, Spin, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { t } from "i18next";
import { message as MessagePopup } from "antd"
import SelectMessage from "./SelectMessage";
import Settings from "./Settings";
import Filters from "./Filters";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";

import SettingStore from "../../../../../../store/prospection/settings-store";

const SettingsModal = ({ visible, onClose, activeKey = 1, setActiveKey, groupId, postType, tempMessageList, keyWordList, CRMList }) => {
    const { prospection, initialProspectionStates, fetchProspectionData, createSocialTarget, loading: createSocialLoading, updateProspection, settingLoading } = SettingStore();
    const location = useLocation();
    const isInstagram = location.pathname.split("/")[1] === "ig";

    const {
        message,  // using in SelectMessage component

        pro_stratagy, // using in Settings component
        norequest, // using in Settings component
        interval, // using in Settings component

        gender, // using in Filter component
        keyword, // using in Filter component
        post_target, // using in Filter component

        prospect, // using in AdvOptions component
        pro_convo, // using in AdvOptions component

        action, // using in AddTags component

    } = prospection

    const [sectionsCompleted, setSectionsCompleted] = useState({
        1: false, // Select Message
        2: false, // Settings
        3: isInstagram ? true : false, // Filters (only for Facebook)
        [isInstagram ? 3 : 4]: false, // Advanced Options
        [isInstagram ? 4 : 5]: false, // Add Tags
    });

    const allSectionsCompleted = Object.values(sectionsCompleted).every(isComplete => isComplete);

    const tabItems = [
        {
            label: t("prospecting.Select Message"),
            key: 1,
            children: <SelectMessage
                tempMessageList={tempMessageList}
                message={message}
            />
        },
        {
            label: t("prospecting.Settings"),
            key: 2,
            children: <Settings
                isInstagram={isInstagram}
            />
        },
        ...(isInstagram ? [] : [{
            label: t("prospecting.Filters"),
            key: 3,
            children: <Filters
                keyWordList={keyWordList}
                postType={postType}
            />
        }]),
        {
            label: t("prospecting.Advanced Options"),
            key: isInstagram ? 3 : 4,
            children: <AdvOptions
            />
        },
        {
            label: t("prospecting.Add Tags"),
            key: isInstagram ? 4 : 5,
            children: <AddTags
                CRMList={CRMList}
                groupId={groupId}
            />
        },
    ];

    const handleUpdateGroupId = () => {
        updateProspection({
            ...prospection,
            group_id: groupId
        });
    };

    const handleNext = () => {
        if (!validateCurrentTab(activeKey)) return;

        let nextKey = activeKey + 1;
        if (isInstagram && activeKey === 2) nextKey = 3;
        if (nextKey <= tabItems.length) setActiveKey(nextKey);
    };
    
    const handleBack = () => {
        const prevKey = activeKey - 1;
        if (prevKey >= 1) setActiveKey(prevKey);
    };

    const validateCurrentTab = (key) => {
        const errors = validateSections();

        if (errors[key]) {
            MessagePopup.error(errors[key]);
            return false;
        }

        return true;
    };

    
    const handleTabClick = (key) => {
        if (!validateCurrentTab(activeKey)) return;
        setActiveKey(key);
    };

    const validateSections = () => {
        const newValidationErrors = {};

        if (!message) {
            newValidationErrors[1] = "Please select a message";
        } else {
            newValidationErrors[1] = "";
        }

        if (pro_stratagy !== 0 && pro_stratagy !== 1) {
            newValidationErrors[2] = "Please select a strategy";
        } else if (!(Number(norequest) >= 1 && Number(norequest) <= 50)) {
            newValidationErrors[2] = "Please enter a valid number of requests (1-50)";
        } else if (!interval) {
            newValidationErrors[2] = "Please select an interval";
        } else {
            newValidationErrors[2] = "";
        }

        if (!isInstagram) {
            if (!gender) {
                newValidationErrors[3] = "Please select a gender";
            } else if (postType && !["post", "post-like"].includes(postType.toString().toLowerCase()) && keyword === undefined) {
                newValidationErrors[3] = "Please enter keywords";
            } else if (!post_target && ["post", "post-like"].includes(postType?.toString().toLowerCase())) {
                newValidationErrors[3] = "Please select a post target";
            } else {
                newValidationErrors[3] = "";
            }
        }

        const advOptionsKey = isInstagram ? 3 : 4;
        if (prospect === null) {
            newValidationErrors[advOptionsKey] = "Please select a prospect option";
        } else if (pro_convo !== 0 && pro_convo !== 1) {
            newValidationErrors[advOptionsKey] = "Please select a conversation option";
        } else {
            newValidationErrors[advOptionsKey] = "";
        }

        const tagsKey = isInstagram ? 4 : 5;
        if (!action) {
            newValidationErrors[tagsKey] = "Please select an action";
        } else {
            newValidationErrors[tagsKey] = "";
        }

        return newValidationErrors;
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
                MessagePopup.success("Settings created successfully");
                onClose();
            } catch (error) {
                console.error("Error creating social target:", error);
                MessagePopup.error("Failed to create settings");
            }
        } else {
            const errors = validateSections();

            const incompleteSection = Object.entries(sectionsCompleted)
                .find(([_, isComplete]) => !isComplete);

            if (incompleteSection) {
                const [incompleteKey] = incompleteSection;
                setActiveKey(Number(incompleteKey));

                if (errors[incompleteKey]) {
                    MessagePopup.error(errors[incompleteKey]);
                } else {
                    MessagePopup.warning("Please complete all sections before saving");
                }
            }
        }
    };

    const handleDisabledSaveClick = () => {
        const errors = validateSections();

        const incompleteSection = Object.entries(sectionsCompleted)
            .find(([_, isComplete]) => !isComplete);

        if (incompleteSection) {
            const [incompleteKey] = incompleteSection;
            setActiveKey(Number(incompleteKey));

            if (errors[incompleteKey]) {
                message.error(errors[incompleteKey]);
            } else {
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

    useEffect(() => {
        if (settingLoading) return;

        const newSectionsCompleted = {
            1: !!message,

            2: (pro_stratagy === 0 || pro_stratagy === 1) &&
                (Number(norequest) >= 1 && Number(norequest) <= 50) &&
                !!interval,

            3: isInstagram ? true : (
                !!gender &&
                (postType && !["post", "post-like"].includes(postType.toString().toLowerCase()) ? keyword !== undefined : !!post_target)
            ),

            [isInstagram ? 3 : 4]: prospect !== null && (pro_convo === 0 || pro_convo === 1),

            [isInstagram ? 4 : 5]: !!action && (() => {
                try {
                    if (!action) return false;

                    let actionObj = typeof action === 'string' ? JSON.parse(action) : action;
                    let actionType = actionObj?.moveGroupId ? "yes" : "no";

                    if (actionType === "no") return true;

                    return !!actionObj.moveGroupId &&
                        !!actionObj.moveStageId &&
                        (actionObj.stage_num !== null && actionObj.stage_num !== undefined);
                } catch (error) {
                    console.error("Error parsing action in completion check:", error);
                    return false;
                }
            })(),
        };

        const currentJSON = JSON.stringify(sectionsCompleted);
        const newJSON = JSON.stringify(newSectionsCompleted);

        if (currentJSON !== newJSON) {
            setSectionsCompleted(newSectionsCompleted);
        }
    }, [
        message, pro_stratagy, norequest, interval,
        gender, keyword, post_target,
        prospect, pro_convo, action,
        isInstagram, settingLoading
    ]);

    const handleCloseSettings = () => {
        updateProspection({
            ...initialProspectionStates
        });
        onClose()
    }

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
                            const isCompleted = sectionsCompleted[tab.key];

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
                        title={!allSectionsCompleted ? "Please complete all required fields before saving" : ""}
                        placement="top"
                    >
                        <button
                            className={`w-full py-3 rounded-lg bg-[#0087FF] text-white cursor-pointer ${!allSectionsCompleted ? "opacity-50" : ""}`}
                            onClick={allSectionsCompleted ? handleSave : handleDisabledSaveClick}
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
                        <button
                            className="px-12 min-h-[45px] py-2 rounded-lg border border-[#0087FF] text-[#0087FF] cursor-pointer"
                            onClick={handleBack}
                            disabled={activeKey === 1}
                        >
                            {t("prospecting.Back")}
                        </button>
                        <button
                            className={`px-12 min-h-[45px]  py-2 rounded-lg bg-[#0087FF] text-white cursor-pointer ${activeKey === tabItems.length ? "opacity-50" : ""}`}
                            onClick={handleNext}
                            disabled={!sectionsCompleted[activeKey] || activeKey === tabItems.length}
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