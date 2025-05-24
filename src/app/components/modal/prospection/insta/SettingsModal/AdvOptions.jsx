import { TickFillIcon } from "../../../../../pages/common/icons/icons";
import SettingStore from "../../../../../../store/prospection/settings-store";
import { t } from "i18next";
import PropTypes from "prop-types";

const AdvOptions = () => {

    const { instaProspection, updateInstaProspection } = SettingStore();
    const { reTargetSameUser, existingConvo } = instaProspection;

    const reTargetOptions = [
        {
            label: t("prospecting.Yes"),
            value: "yes"
        },
        {
            label: t("prospecting.No"),
            value: "no"
        }
    ];

    const existingConversationOptions = [
        {
            label: t("prospecting.Yes"),
            value: 1
        },
        {
            label: t("prospecting.No"),
            value: 0
        }
    ];

    const handleSave = (field, value) => {
        // Update the prospection state in the store based on which option is clicked
        updateInstaProspection({
            ...instaProspection,
            [field]: value
        });
    };

    return (
        <div className="">
            <h2 className="text-[24px] font-[500] mb-5">{t("prospecting.Advance Options")}</h2>
            
            <div className="flex flex-col gap-6">

                {/* Retarget Same User Option */}
                <div className="border border-gray-300 p-4 rounded-lg w-full">
                    <p className="text-[20px] font-[500] text-gray-800 mb-4 flex items-center">
                        {t("prospecting.Retarget same user")}
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                        {reTargetOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${reTargetSameUser == option.value
                                    ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                    : "bg-white border-[#0087FF]"
                                    }`}
                                onClick={() => handleSave('reTargetSameUser', option.value)}
                            >
                                {option.label}
                                {reTargetSameUser === option.value && (
                                    <span className="absolute -right-2 -top-2">
                                        <TickFillIcon />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Existing Conversation Option */}
                <div className="border border-gray-300 p-4 rounded-lg w-full">
                    <p className="text-[20px] font-[500] text-gray-800 mb-4 flex items-center">
                        {t("prospecting.Existing conversation")}
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                        {existingConversationOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${existingConvo == option.value
                                    ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                    : "bg-white border-[#0087FF]"
                                    }`}
                                onClick={() => handleSave('existingConvo', option.value)}
                            >
                                {option.label}
                                {existingConvo === option.value && (
                                    <span className="absolute -right-2 -top-2">
                                        <TickFillIcon />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

AdvOptions.propTypes = {
    onComplete: PropTypes.func,
};

export default AdvOptions;