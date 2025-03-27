import { useState } from "react";
import { TickFillIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";

const AddTags = () => {
    const [addTag, setAddTag] = useState(1);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedStage, setSelectedStage] = useState(null);

    const groups = [
        { label: "Friends", value: "friends", color: "bg-red-500", initials: "FR" },
        { label: "Community", value: "community", color: "bg-black", initials: "CO" },
        { label: "Buyers", value: "buyers", color: "bg-green-500", initials: "BU" },
        { label: "Core Users", value: "core_users", color: "bg-purple-500", initials: "CU" },
    ];
    const toggleOption = (option, setter) => {
        setter(option);
    };
    const stages = [
        { label: "Stage 1", value: "stage_1" },
        { label: "Stage 2", value: "stage_2" },
        { label: "Stage 3", value: "stage_3" },
    ];

    const addTagsOptions = [
        {
            label: "Yes",
            value: 1
        },
        {
            label: "No",
            value: 0
        }
    ]

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">{ t("prospecting.Add Tags")}</h2>

            {/* Toggle Add Tag Option */}
            <div className="border border-gray-300 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-800 mb-2">{t("prospecting.Do you want to add a tag?")}</p>
                <div className="grid grid-cols-2 gap-3">
                    {addTagsOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${addTag === option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                : "bg-white border-[#0087FF]"
                                }`}
                            onClick={() => toggleOption(option.value, setAddTag)}
                        >
                            {option.label}
                            {addTag === option.value && (
                                <span className="absolute -right-2 -top-2">
                                    <TickFillIcon />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Group and Stage Selection */}
            <div className="grid grid-cols-2 gap-4">
                {/* Group Selection */}
                <div className="border border-gray-300 p-4 rounded-lg relative">
                    <p className="font-medium text-gray-800 mb-2">{t("prospecting.Select Group")}</p>
                    <select
                        className="w-full p-3 border rounded-lg"
                        value={selectedGroup || ""}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                        <option value="">{t("prospecting.Select Group")}</option>
                        {groups.map((group) => (
                            <option key={group.value} value={group.value}>
                                {group.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stage Selection */}
                <div className="border border-gray-300 p-4 rounded-lg relative">
                    <p className="font-medium text-gray-800 mb-2">{t("prospecting.Select Stage")}</p>
                    <select
                        className="w-full p-3 border rounded-lg"
                        value={selectedStage || ""}
                        onChange={(e) => setSelectedStage(e.target.value)}
                    >
                        <option value="">{t("prospecting.Select Stage")}</option>
                        {stages.map((stage) => (
                            <option key={stage.value} value={stage.value}>
                                {stage.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AddTags;
