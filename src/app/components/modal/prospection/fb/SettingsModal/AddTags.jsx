import { useEffect, useRef, useState } from "react";
import { TickFillIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";
import SettingStore from "../../../../../../store/prospection/settings-store";
import PropTypes from "prop-types";

const AddTags = ({ CRMList }) => {

    const { fbProspection, updateFbProspection } = SettingStore();
    const { action } = fbProspection;
  
    let parsedAction;
    try {
        parsedAction = action !== 'no' ? JSON.parse(action) : 'no';
    } catch (error) {
        console.error('Error parsing action:', error);
        parsedAction = 'no';
    }

    const isNoAction =
        parsedAction === "no" ||
        (parsedAction &&
            parsedAction.moveGroupId === null &&
            parsedAction.moveStageId === null &&
            parsedAction.stage_num === null);

    const [actionType, setActionType] = useState(isNoAction ? "no" : "yes");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showStageDropdown, setShowStageDropdown] = useState(false);
    const groupDropdownRef = useRef(null);
    const stageDropdownRef = useRef(null);
    const [selectedGroupId, setSelectedGroupId] = useState(parsedAction?.moveGroupId || null);
    const [selectedStageId, setSelectedStageId] = useState(parsedAction?.moveStageId || null);
    const [selectedStageNum, setSelectedStageNum] = useState(parsedAction?.stage_num || null);

    const handleSave = (moveGroupId, moveStageId, stage_num) => {
        updateFbProspection({
            ...fbProspection,
            action: JSON.stringify({
                moveGroupId: actionType !== "no" ? moveGroupId : null,
                moveStageId: actionType !== "no" ? moveStageId : null,
                stage_num: actionType !== "no" ? stage_num : null,
            }),
        });
    }; 

    const addTagsOptions = [
        { label: t("prospecting.No"), value: "no" },
        { label: t("prospecting.Yes"), value: "yes" }
    ];

    const selectedGroupData = CRMList?.find((item) => item.id == selectedGroupId);
    const sortedStages = selectedGroupData?.stage?.sort((a, b) => a.stage_num - b.stage_num) || [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
            if (
                stageDropdownRef.current && !stageDropdownRef.current.contains(event.target)
            ) {
                setShowStageDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleGroupSelection = (id) => {

        const selectedGroupDataTemp = CRMList?.find((item) => item.id == id);
        const sortedStagesTemp = selectedGroupDataTemp?.stage?.sort((a, b) => a.stage_num - b.stage_num) || [];

        setSelectedGroupId(id);
        if(sortedStagesTemp.length > 0){
            setSelectedStageId(sortedStagesTemp[0]?.id);
            setSelectedStageNum(sortedStagesTemp[0]?.stage_num);
            handleSave(id, sortedStagesTemp[0]?.id, sortedStagesTemp[0]?.stage_num);
        }else{
            setSelectedStageId(null);
            setSelectedStageNum(null);
            handleSave(id, null, null);       
        }
        setShowDropdown(false);
    }
      
    
      
    return (
        <div className="">
            <h2 className="text-[24px] font-[500] mb-5">{t("prospecting.Add Tags")}</h2>

            {/* Toggle Add Tag Option */}
            <div className="border border-gray-300 p-4 rounded-lg mb-5">
                <p className="text-[20px] text-gray-800 mb-2">{t("prospecting.Do you want to add a tag?")}</p>
                <div className="grid grid-cols-2 gap-5">
                    {addTagsOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`min-h-[52px] relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${actionType === option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                : "bg-white border-[#0087FF]"}`}
                            onClick={() => {
                                setActionType(option.value);
                                if (option.value === "no") {
                                    handleSave(null, null, null);
                                } else {
                                    handleSave(selectedGroupId, selectedStageId, selectedStageNum);
                                }
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
                <div className="grid grid-cols-2 gap-5">
                    {/* Group Selection */}
                    <div className="border border-gray-300 p-4 rounded-lg relative" ref={groupDropdownRef}>
                        <p className="text-[20px] text-[#000407] mb-2">{t("prospecting.Select Group")}</p>
                        <div className="relative">
                            <div className="min-h-[52px] border border-[#F0F0F0] px-5 py-3 rounded-[10px] cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                                {selectedGroupData ? (
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-8 h-8 rounded-md text-white flex items-center justify-center font-semibold"
                                            style={{ backgroundColor: selectedGroupData.custom_color || "#000" }}
                                        >
                                            {selectedGroupData.name?.slice(0, 2).toUpperCase()}
                                        </span>
                                        <span className="text-gray-800">{selectedGroupData.name}</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500">{t("prospecting.Select Group")}</span>
                                )}
                            </div>

                            {showDropdown && (
                                <div className="absolute z-10 bg-white w-full mt-1 max-h-60 overflow-y-auto shadow-[-2px_4px_7px_rgb(0_0_0_/_25%)] rounded-[10px] pt-[15px]">
                                    {CRMList?.map((group) => {
                                        const isSelected = group.id === selectedGroupId;
                                        return (
                                            <div
                                                key={group.id}
                                                className={`flex items-center gap-5 p-3 cursor-pointer  ${isSelected ? "bg-blue-100" : "hover:bg-[#D6E6F4]"
                                                    }`}
                                                onClick={() => {
                                                    handleGroupSelection(group.id)
                                                }}
                                            >
                                                <span
                                                    className="w-8 h-8 rounded-md text-white flex items-center justify-center font-semibold text-sm"
                                                    style={{ backgroundColor: group.custom_color || "#000" }}
                                                >
                                                    {group.name?.slice(0, 2).toUpperCase()}
                                                </span>
                                                <span className="flex-1 text-[16px] leading-[1]">{group.name}</span>

                                                {isSelected && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-blue-600"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        );
                                    })}

                                </div>
                            )}
                        </div>

                    </div>

                    {/* Stage Selection */}
                    <div className="border border-gray-300 p-4 rounded-lg relative" ref={stageDropdownRef}>
                        <p className="text-[20px] text-[#000407] mb-2">{t("prospecting.Select Stage")}</p>
                        <div className="relative">
                            <div
                                className="border border-[#F0F0F0] px-5 py-3 rounded-[10px] cursor-pointer"
                                onClick={() => setShowStageDropdown(prev => !prev)}
                            >
                                {selectedStageId ? (
                                    <div className="flex items-center gap-2 h-8">
                                        <span className="text-gray-800">
                                            {sortedStages.find(stage => stage.id === selectedStageId)?.name}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500">{t("prospecting.Select Stage")}</span>
                                )}
                            </div>

                            {showStageDropdown && (
                                <div className="absolute z-10 bg-white w-full mt-1 max-h-60 overflow-y-auto shadow-[-2px_4px_7px_rgb(0_0_0_/_25%)] rounded-[10px] pt-[15px]">
                                    {sortedStages.map((stage) => {
                                        const isSelected = stage.id === selectedStageId;
                                        return (
                                            <div
                                                key={stage.id}
                                                className={`min-h-[45px] flex items-center gap-2 px-4 py-[6px] cursor-pointer  ${isSelected ? "bg-blue-100 " : "hover:bg-[#D6E6F4]"
                                                    }`}
                                                onClick={() => {
                                                    setSelectedStageId(stage.id);
                                                    setSelectedStageNum(stage.stage_num);
                                                    handleSave(selectedGroupId, stage.id, stage.stage_num);
                                                    setShowStageDropdown(false);
                                                }}
                                            >
                                                <span className="flex-1 text-[16px] leading-[1]">{stage.name}</span>

                                                {isSelected && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-blue-600"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

AddTags.propTypes = {
    CRMList: PropTypes.array,
    onComplete: PropTypes.func,
};

export default AddTags;