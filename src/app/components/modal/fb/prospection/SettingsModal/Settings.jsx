import { useState } from "react";
import { TickFillIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";

const Settings = () => {
    const [strategy, setStrategy] = useState(0);
    const [requests, setRequests] = useState(10);
    const [interval, setInterval] = useState(t("prospecting.Fast"));

    const strategies = [
        { value: 0, label: "Follow + Message" },
        { value: 1, label:  t("prospecting.Message Only") }
    ];

    const requestOptions = [5, 10, 20, 30, 50, "Custom"];
    const intervalOptions = [
        { label: t("prospecting.Fast"), value: t("prospecting.Fast"), time: t("prospecting.2 to 4 minutes") },
        { label: t("prospecting.Medium"), value: t("prospecting.Medium"), time: t("prospecting.4 to 6 minutes") },
        { label: t("prospecting.Slow"), value: t("prospecting.Slow"), time: t("prospecting.6 to 10 minutes") },
        { label: t("prospecting.Very Slow"), value: "very_slow", time: t("prospecting.10 to 15 minutes") }
    ];

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Strategy Section */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <p className="font-medium mb-2 text-gray-800 flex items-center">{ t("prospecting.Strategy")}</p>
                    <div className="grid grid-cols-1 gap-2">
                        {strategies.map((option) => (
                            <button
                                key={option.value}
                                className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${strategy === option.value
                                        ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                        : "bg-white border-[#0087FF]"
                                    }`}
                                onClick={() => setStrategy(option.value)}
                            >
                                {option.label}
                                {strategy === option.value && (
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
                    <p className="font-medium mb-2 text-gray-800">{ t("prospecting.How many Requests")}</p>
                    <div className="grid grid-cols-3 gap-2">
                        {requestOptions.map((option) => (
                            <button
                                key={option}
                                className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${requests === option
                                        ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                        : "bg-white border-[#0087FF]"
                                    }`}
                                onClick={() => setRequests(option)}
                            >
                                {option}
                                {requests === option && (
                                    <span className="absolute -right-2 -top-2">
                                        <TickFillIcon />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interval Section */}
            <div className="border border-gray-300 p-4 rounded-lg mt-4">
                <p className="font-medium mb-2 text-gray-800">{t("prospecting.Interval")}</p>
                <div className="grid grid-cols-4 gap-3">
                    {intervalOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`relative`}
                            onClick={() => setInterval(option.value)}
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

export default Settings;