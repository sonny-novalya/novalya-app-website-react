import { TickFillIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";
import SettingStore from "../../../../../../store/prospection/settings-store";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Settings = ({ isInstagram}) => {
    const { prospection , updateProspection } = SettingStore();

    const { pro_stratagy, norequest, interval } = prospection 
    const [customRequest, setCustomRequest] = useState(interval);

    const strategies = [
        { value: 1, label: t("prospecting.Follow + Message") },
        { value: 0, label: t("prospecting.Message Only") },
    ];

    const FbStrategies = [
        { value: 1, label: t("prospecting.Message + Request") },
        { value: 0, label: t("prospecting.Message Only") },
    ];

    const requestOptions = ["5", "10", "20", "30", "50", "Custom"];
    
    const fbIntervalOptions = [
        { label: t("prospecting.Medium"), value: "1-3", time: t("prospecting.1 to 3 minutes") },
        { label: t("prospecting.Slow"), value: "3-5"},
        { label: t("prospecting.Very Slow"), value: "10-15", time: t("prospecting.10 to 15 minutes")},
    ];

    const igIntervalOptions = [
        { label: t("prospecting.Fast"), value: "2-4", time: t("prospecting.2 to 4 minutes") },
        { label: t("prospecting.Medium"), value: "4-6", time: t("prospecting.4 to 6 minutes") },
        { label: t("prospecting.Slow"), value: "6-10", time: t("prospecting.6 to 10 minutes") },
        { label: t("prospecting.Very Slow"), value: "10-15", time: t("prospecting.10 to 15 minutes") },
    ];

    const intervalList = isInstagram ? igIntervalOptions : fbIntervalOptions;

    const findInterval = () => {
        return !intervalList.some(option => option.value === interval);
    };

    const newStratagies = isInstagram ? strategies : FbStrategies

    useEffect(() => {
        if (findInterval()) {
            updateProspection({
                ...prospection,
                interval: intervalList[0].value,
            });
        }
    }, []);

    useEffect(() => {
        if (
            !requestOptions.includes(String(norequest)) &&
            Number(norequest) >= 1 &&
            Number(norequest) <= 50
        ) {
            setCustomRequest(norequest);
        }
    }, [norequest]);


    const handleUpdate = (field, value) => {
        if (field === "norequest") {
            if (value === "Custom") {
                updateProspection({ ...prospection, norequest: Number(customRequest) });
            } else {
                updateProspection({ ...prospection, norequest: value });
            }
        } else {
            updateProspection({ ...prospection, [field]: value });
        }
    };


    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Strategy Section */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <p className="font-medium mb-2 text-gray-800 flex items-center">{t("prospecting.Strategy")}</p>
                    <div className="grid grid-cols-1 gap-2">
                        {newStratagies.map((option) => (
                            <button
                                key={option.value}
                                className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${pro_stratagy === option.value
                                    ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                    : "bg-white border-[#0087FF]"}`}
                                onClick={() => handleUpdate("pro_stratagy",option.value)}
                            >
                                {option.label}
                                {pro_stratagy === option.value && (
                                    <span className="absolute -right-2 -top-2">
                                        <TickFillIcon />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* How Many Requests Section */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <p className="font-medium mb-2 text-gray-800">{t("prospecting.How many Requests")}</p>
                    <div className="grid grid-cols-3 gap-2">
                        {requestOptions.map((option) => {
                            const isCustom = option === "Custom";
                            const isSelected = isCustom
                                ? !requestOptions.includes(String(norequest)) &&
                                Number(norequest) >= 1 &&
                                Number(norequest) <= 50
                                : Number(norequest) === Number(option);


                            return (
                                <button
                                    key={option}
                                    className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${isSelected ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"
                                        }`}
                                    onClick={() => handleUpdate("norequest", isCustom ? "Custom" : Number(option))}
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
                        {norequest !== undefined && !requestOptions.includes(String(norequest)) && (
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
                                            updateProspection({ ...prospection, norequest: parsed });
                                        }
                                    }}
                                    placeholder="Enter value"
                                    className="col-span-2 border border-[#0087FF] rounded-md px-4 py-2 text-gray-800 focus:outline-none "
                                />
                            </>
                        )}


                    </div>
                </div>
            </div>

            {/* Interval Section */}
            <div className="border border-gray-300 p-4 rounded-lg mt-4">
                <p className="font-medium mb-2 text-gray-800">{t("prospecting.Interval")}</p>
                <div className="grid grid-cols-4 gap-3">
                    {intervalList.map((option) => (
                        <button
                            key={option.value}
                            className={`relative cursor-pointer`}
                            onClick={() => handleUpdate("interval", option.value)}
                        >
                            <span className="text-xs text-gray-500 text-left mr-12">{option.time}</span>
                            <div className={` flex flex-col items-start p-4 rounded-lg border transition ${interval === option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF] text-[#0087FF] shadow-sm"
                                : "bg-white border-gray-300 text-gray-700"
                                }`}>
                                <span className="text-sm font-medium">{option.label}</span>
                            </div>
                            {interval === option.value && (
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
    isInstagram: PropTypes.bool,

};
export default Settings;
