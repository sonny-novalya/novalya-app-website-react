import { useState } from "react";
import { TickFillIcon } from "../../../../../pages/common/icons/icons";

const AdvOptions = () => {
    const [retargetUser, setRetargetUser] = useState(1);
    const [existingConversation, setExistingConversation] = useState(1);

    const toggleOption = (option, setter) => {
        setter(option);
    };

    const reTargetUserData = [
        {
            label: "Yes",
            value: 1
        },
        {
            label: "No",
            value: 0
        }
    ]

    const existingConversationData = [
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
        <div className="">
            <h2 className="text-xl font-semibold mb-4">Advance Options</h2>

            {/* Retarget Same User Option */}
            <div className="border border-gray-300 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-800 mb-2 flex items-center">
                    Retarget same user
                </p>
                <div className="grid grid-cols-1 gap-3">
                    {reTargetUserData.map((option) => (
                        <button
                            key={option.value}
                            className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${retargetUser === option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                : "bg-white border-[#0087FF]"
                                }`}
                            onClick={() => toggleOption(option.value, setRetargetUser)}
                        >
                            {option.label}
                            {retargetUser === option.value && (
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
                    Existing conversation
                </p>
                <div className="grid grid-cols-1 gap-3">
                    {existingConversationData.map((option) => (
                        <button
                            key={option.value}
                            className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${existingConversation === option.value
                                ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                : "bg-white border-[#0087FF]"
                                }`}
                            onClick={() => toggleOption(option.value, setExistingConversation)}
                        >
                            {option.label}
                            {existingConversation === option.value && (
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

export default AdvOptions;