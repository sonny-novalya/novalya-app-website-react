import { useEffect } from "react";
import { TickFillIcon } from "../../../../../pages/common/icons/icons";
import SettingStore from "../../../../../../store/prospection/settings-store";
import { t } from "i18next";
import PropTypes from "prop-types";

const AdvOptions = ({ onComplete }) => {
    const { prospection, updateProspection } = SettingStore();
    const { prospect, pro_convo } = prospection;

    const reTargetUserData = [
        {
            label: t("prospecting.Yes"),
            value: "yes"
        },
        {
            label: t("prospecting.No"),
            value: "no"
        }
    ];

    const existingConversationData = [
        {
            label: t("prospecting.Yes"),
            value: 1
        },
        {
            label: t("prospecting.No"),
            value: 0
        }
    ];

    // Check if this section is complete
    useEffect(() => {
        // For this component to be complete, we need:
        // 1. A selection for retargeting (prospect should be "yes" or "no")
        // 2. A selection for existing conversations (pro_convo should be 0 or 1)
        const isComplete = (
            (prospect === "yes" || prospect === "no") &&
            (pro_convo === 0 || pro_convo === 1)
        );

        // Notify parent about completion status
        if (onComplete) {
            onComplete(isComplete);
        }
    }, [prospect, pro_convo, onComplete]);

    const handleSave = (field, value) => {
        // Update the prospection state in the store based on which option is clicked
        updateProspection({
            ...prospection,
            [field]: value
        });
    };

    return (
        <div className="">
            <h2 className="text-xl font-semibold mb-4">{t("prospecting.Advance Options")}</h2>

            {/* Retarget Same User Option */}
            <div className="border border-gray-300 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-800 mb-2 flex items-center">
                    {t("prospecting.Retarget same user")}
                </p>
                <div className="grid grid-cols-1 gap-3">
                    {reTargetUserData.map((option) => (
                        <button
                            key={option.value}
                            className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${prospect == option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                : "bg-white border-[#0087FF]"
                                }`}
                            onClick={() => handleSave('prospect', option.value)}
                        >
                            {option.label}
                            {prospect === option.value && (
                                <span className="absolute -right-2 -top-2">
                                    <TickFillIcon />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Existing Conversation Option */}
            <div className="border border-gray-300 p-4 rounded-lg">
                <p className="font-medium text-gray-800 mb-2 flex items-center">
                    {t("prospecting.Existing conversation")}
                </p>
                <div className="grid grid-cols-1 gap-3">
                    {existingConversationData.map((option) => (
                        <button
                            key={option.value}
                            className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${pro_convo == option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                : "bg-white border-[#0087FF]"
                                }`}
                            onClick={() => handleSave('pro_convo', option.value)}
                        >
                            {option.label}
                            {pro_convo === option.value && (
                                <span className="absolute -right-2 -top-2">
                                    <TickFillIcon />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

AdvOptions.propTypes = {
    onComplete: PropTypes.func,
};

export default AdvOptions;