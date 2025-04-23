import { useState } from "react";
import { TickFillIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";
import SettingStore from "../../../../../../store/prospection/settings-store";
import PropTypes from "prop-types";

const AddTags = ({ CRMList, groupId }) => {
    const { prospection, updateProspection } = SettingStore();
    let { action } = prospection;

    try {
        action = action ?? (action !== 'no' ? JSON.parse(action) : 'no');
    } catch (error) {
        console.error('Error parsing action:', error);
        action = 'no'; 
    }

    const [actionType, setActionType] = useState(action !== "no" ? "yes" : "no");

    const [selectedGroupId, setSelectedGroupId] = useState(action?.moveGroupId || null);
    const [selectedStageId, setSelectedStageId] = useState(action?.moveStageId || null);
    const [selectedStageNum, setSelectedStageNum] = useState(action?.stage_num || null);

    const handleSave = (moveGroupId, moveStageId, stage_num) => {
        updateProspection({
            ...prospection,
            group_id: groupId,
            action: JSON.stringify({
                moveGroupId: actionType !== "no" ? moveGroupId : null,
                moveStageId: actionType !== "no" ? moveStageId : null,
                stage_num: actionType !== "no" ? stage_num : null,
            }),
        });
    };


    const addTagsOptions = [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" }
    ];

    const selectedGroupData = CRMList.find((item) => item.id == selectedGroupId);
    const sortedStages = selectedGroupData?.stage?.sort((a, b) => a.stage_num - b.stage_num) || [];

    return (
        <div className="">
            <h2 className="text-xl font-semibold mb-4">{t("prospecting.Add Tags")}</h2>

            {/* Toggle Add Tag Option */}
            <div className="border border-gray-300 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-800 mb-2">{t("prospecting.Do you want to add a tag?")}</p>
                <div className="grid grid-cols-2 gap-3">
                    {addTagsOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${actionType === option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                : "bg-white border-[#0087FF]"}`}
                            onClick={() => {
                                setActionType(option.value);
                                handleSave();
                            }}
                        >
                            {option.label}
                            {actionType === option.value && (
                                <span className="absolute -right-2 -top-2">
                                    <TickFillIcon />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Group and Stage Selection */}
            {actionType !== "no" && (
                <div className="grid grid-cols-2 gap-4">
                    {/* Group Selection */}
                    <div className="border border-gray-300 p-4 rounded-lg relative">
                        <p className="font-medium text-gray-800 mb-2">{t("prospecting.Select Group")}</p>
                        <select
                            className="w-full p-3 border rounded-lg"
                            value={selectedGroupId || ""}
                            onChange={(e) => {
                                setSelectedGroupId(e.target.value);
                                handleSave(e.target.value, selectedStageId, selectedStageNum);
                            }}

                        >
                            <option value="">{t("prospecting.Select Group")}</option>
                            {CRMList?.map((group) => (
                                <option key={group.value} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Stage Selection */}
                    <div className="border border-gray-300 p-4 rounded-lg relative">
                        <p className="font-medium text-gray-800 mb-2">{t("prospecting.Select Stage")}</p>
                        <select
                            key={selectedStageId}
                            className="w-full p-3 border rounded-lg"
                            value={selectedStageId || ""}
                            onChange={(e) => {
                                const selectedStage = sortedStages.find((stage) => stage.id === parseInt(e.target.value));
                                if (selectedStage) {
                                    setSelectedStageId(selectedStage.id);
                                    setSelectedStageNum(selectedStage.stage_num);
                                    handleSave(selectedGroupId, selectedStage.id, selectedStage.stage_num);
                                }
                            }}

                        >
                            <option value="">{t("prospecting.Select Stage")}</option>
                            {sortedStages.map((stage) => (
                                <option key={stage.id} value={stage.id}>
                                    {stage.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

AddTags.propTypes = {
    CRMList: PropTypes.object,
    groupId: PropTypes.string,
};

export default AddTags;
