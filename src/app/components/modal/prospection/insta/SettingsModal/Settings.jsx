import { TickFillIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";
import SettingStore from "../../../../../../store/prospection/settings-store";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Settings = () => {
    const { instaProspection, updateInstaProspection } = SettingStore();

    const { selectedStrategy, selectedRequest, selectedInterval } = instaProspection;
    // const { pro_stratagy, norequest, interval } = prospection;
    const [customRequest, setCustomRequest] = useState(selectedRequest);

    // const strategies = [
    //     { value: 1, label: t("prospecting.Follow + Message") },
    //     { value: 0, label: t("prospecting.Message Only") },
    // ];

    const strategies = [
        { value: 1, label: t("prospecting.Message + Request") },
        { value: 0, label: t("prospecting.Message Only") },
    ];

    const requestOptions = ["5", "10", "20", "30", "50", "Custom"];

    const intervalOptions = [
        { label: t("prospecting.Medium"), value: "1-3", time: t("prospecting.1 to 3 minutes") },
        { label: t("prospecting.Slow"), value: "3-5", time: t("prospecting.3 to 5 minutes") },
        { label: t("prospecting.Very Slow"), value: "10-15", time: t("prospecting.10 to 15 minutes") },
    ];

    // const igIntervalOptions = [
    //     { label: t("prospecting.Fast"), value: "2-4", time: t("prospecting.2 to 4 minutes") },
    //     { label: t("prospecting.Medium"), value: "4-6", time: t("prospecting.4 to 6 minutes") },
    //     { label: t("prospecting.Slow"), value: "6-10", time: t("prospecting.6 to 10 minutes") },
    //     { label: t("prospecting.Very Slow"), value: "10-15", time: t("prospecting.10 to 15 minutes") },
    // ];

    // const intervalList = isInstagram ? igIntervalOptions : fbIntervalOptions;
    // const newStratagies = isInstagram ? strategies : FbStrategies;

    // useEffect(() => {
    //     if (
    //         !requestOptions.includes(String(norequest)) &&
    //         Number(norequest) >= 1 &&
    //         Number(norequest) <= 50
    //     ) {
    //         setCustomRequest(norequest);
    //     }
    // }, [norequest]);

    const handleUpdate = (field, value) => {
        if (field === "norequest" && value === "Custom") {
            updateInstaProspection({ ...instaProspection, selectedRequest: Number(customRequest) });
        } else {
            updateInstaProspection({ ...instaProspection, [field]: value });
        }
    };

    const displayCustomInput = !requestOptions
        .filter(option => option !== "Custom")
        .includes(String(selectedRequest));

    return (
        <div className="">
            <h2 className="text-2xl font-[500] mb-5">Settings</h2>

            <div className="grid grid-cols-2 gap-5">
                {/* Strategy Section */}
                <div className="border border-[#dadada] px-4 py-3 rounded-lg">
                    <p className="font-[500] text-xl mb-3 text-[#000407] flex items-center gap-[5px]">
                        {t("prospecting.Strategy")}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.0026 14.1666C11.4084 14.1666 14.1693 11.4057 14.1693 7.99992C14.1693 4.59416 11.4084 1.83325 8.0026 1.83325C4.59685 1.83325 1.83594 4.59416 1.83594 7.99992C1.83594 11.4057 4.59685 14.1666 8.0026 14.1666Z" stroke="black" strokeOpacity="0.75" strokeWidth="0.9"/>
                            <path d="M8 7.87524V11.2086" stroke="black" strokeOpacity="0.75" strokeLinecap="round"/>
                            <path d="M8.00521 6.45866C8.46545 6.45866 8.83854 6.08556 8.83854 5.62533C8.83854 5.16509 8.46545 4.79199 8.00521 4.79199C7.54497 4.79199 7.17188 5.16509 7.17188 5.62533C7.17188 6.08556 7.54497 6.45866 8.00521 6.45866Z" fill="black" fillOpacity="0.75"/>
                        </svg>
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        {strategies.map((option) => (
                            <button
                                key={option.value}
                                className={`relative flex items-center justify-center px-4 py-3 min-h-[52px] rounded-[10px] border text-[#0087FF] cursor-pointer ${selectedStrategy === option.value
                                    ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                    : "bg-white border-[#0087FF]"}`}
                                onClick={() => handleUpdate("selectedStrategy", option.value)}
                            >
                                {option.label}
                                {selectedStrategy === option.value && (
                                    <span className="absolute -right-2 -top-2">
                                        <TickFillIcon />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* How Many Requests Section */}
                <div className="border border-[#dadada] px-4 py-3 rounded-lg">
                    <p className="font-[500] text-xl mb-3 text-[#000407] flex items-center gap-[5px]">
                        {t("prospecting.How many Requests")} 
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.0026 14.1666C11.4084 14.1666 14.1693 11.4057 14.1693 7.99992C14.1693 4.59416 11.4084 1.83325 8.0026 1.83325C4.59685 1.83325 1.83594 4.59416 1.83594 7.99992C1.83594 11.4057 4.59685 14.1666 8.0026 14.1666Z" stroke="black" strokeOpacity="0.75" strokeWidth="0.9"/>
                            <path d="M8 7.87524V11.2086" stroke="black" strokeOpacity="0.75" strokeLinecap="round"/>
                            <path d="M8.00521 6.45866C8.46545 6.45866 8.83854 6.08556 8.83854 5.62533C8.83854 5.16509 8.46545 4.79199 8.00521 4.79199C7.54497 4.79199 7.17188 5.16509 7.17188 5.62533C7.17188 6.08556 7.54497 6.45866 8.00521 6.45866Z" fill="black" fillOpacity="0.75"/>
                        </svg>
                    </p>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                        {requestOptions.map((option) => {
                            const isCustom = option === "Custom";
                            const isSelected = isCustom
                                ? !requestOptions.includes(String(selectedRequest)) &&
                                Number(selectedRequest) >= 1 &&
                                Number(selectedRequest) <= 50
                                : Number(selectedRequest) === Number(option);

                            return (
                                <button
                                    key={option}
                                    className={`font-[500] relative flex items-center justify-center px-4 py-3 min-h-[52px] rounded-[10px] border text-[#0087FF] cursor-pointer ${isSelected ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"
                                        }`}
                                    onClick={() => handleUpdate("selectedRequest", isCustom ? "Custom" : Number(option))}
                                >
                                    {isCustom ? t("prospecting.Custom") : option}
                                    {isSelected && (
                                        <span className="absolute -right-2 -top-2">
                                            <TickFillIcon />
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                        {selectedRequest && displayCustomInput && (
                            <>
                                <p className="col-span-1 text-xs my-auto">({t("prospecting.Min-Max-50")})</p>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={customRequest}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === "" || (Number(val) >= 1 && Number(val) <= 50)) {
                                            setCustomRequest(val);
                                        }
                                    }}
                                    onBlur={() => {
                                        const parsed = Number(customRequest);
                                        if (parsed >= 1 && parsed <= 50) {
                                            updateInstaProspection({ ...instaProspection, selectedRequest: parsed });
                                        }
                                    }}
                                    placeholder="Enter value"
                                    className="col-span-2 h-13 border border-[#0087FF] rounded-md px-4 py-2 text-gray-800 focus:outline-none "
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Interval Section */}
            <div className="border border-[#dadada] px-4 pt-3 pb-7.5 rounded-lg mt-7">
                <p className="font-[500] text-xl mb-4 text-[#000407] flex items-center gap-[5px]">
                    {t("prospecting.Interval")}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.0026 14.1666C11.4084 14.1666 14.1693 11.4057 14.1693 7.99992C14.1693 4.59416 11.4084 1.83325 8.0026 1.83325C4.59685 1.83325 1.83594 4.59416 1.83594 7.99992C1.83594 11.4057 4.59685 14.1666 8.0026 14.1666Z" stroke="black" strokeOpacity="0.75" strokeWidth="0.9"/>
                        <path d="M8 7.87524V11.2086" stroke="black" strokeOpacity="0.75" strokeLinecap="round"/>
                        <path d="M8.00521 6.45866C8.46545 6.45866 8.83854 6.08556 8.83854 5.62533C8.83854 5.16509 8.46545 4.79199 8.00521 4.79199C7.54497 4.79199 7.17188 5.16509 7.17188 5.62533C7.17188 6.08556 7.54497 6.45866 8.00521 6.45866Z" fill="black" fillOpacity="0.75"/>
                    </svg>
                </p>
                <div className="grid grid-cols-4 gap-5">
                    {intervalOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`relative cursor-pointer text-left`}
                            onClick={() => handleUpdate("selectedInterval", option.value)}
                        >
                            <span className="block mb-[6px] text-[14px] text-[#000407] opacity-50 mr-12">{option.time}</span>
                            <div className={`min-h-[52px] justify-center items-center flex flex-col px-4 py-3 rounded-[10px] border transition ${selectedInterval === option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF] text-[#0087FF] shadow-sm"
                                : "bg-white border-[#dadada] text-gray-700"
                                }`}>
                                <span className="text-sm font-medium">{option.label}</span>
                            </div>
                            {selectedInterval === option.value && (
                                <span className="absolute -right-2 top-3">
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

Settings.propTypes = {
    // isInstagram: PropTypes.bool,
    // groupId: PropTypes.string,
};

export default Settings;