import { useState } from "react";
import { TickFillIcon } from "../../../common/icons/icons";

const Strategy = () => {
    const [selectedStrategy, setSelectedStrategy] = useState("Today");

    const strategyOptions = {
        Past: ["Yesterday", "2 days ago"],
        Present: ["Today"],
        Future: ["In 1 day", "In 2 days", "In 3 days", "In 4 days", "In 5 days", "In 6 days"],
    };

    return (
        <div className="border border-[#DADADA] p-6 rounded-lg mb-4 mx-auto w-full">
            <p className="font-medium text-lg mb-4">Select the strategy</p>

            <div className="flex flex-col gap-5">
                <div className="flex">
                    <p className="font-medium w-40 mt-3">Past :</p>
                    <div className="w-full grid grid-cols-3 gap-2">
                        {strategyOptions.Past.map((option) => (
                            <button
                                key={option}
                                type="default"
                                className={`relative flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedStrategy === option ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                                onClick={() => setSelectedStrategy(option)}
                            >
                                <span className="flex items-center space-x-2 mx-auto">
                                    {option}
                                </span>
                                {selectedStrategy === option && (
                                    <span className=" absolute -top-1.5 -right-1.5">
                                        <TickFillIcon />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex  ">
                    <p className="font-medium w-40 mt-3">Present :</p>
                    <div className="w-full grid grid-cols-3 gap-2">
                        <button
                            className={`relative flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedStrategy === "Today" ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                            onClick={() => setSelectedStrategy("Today")}
                        >
                            <span className="flex items-center space-x-2 mx-auto">
                                Today
                            </span>
                            {selectedStrategy === 'Today' && (
                                <span className=" absolute -top-1.5 -right-1.5">
                                    <TickFillIcon />
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex ">
                    <p className="font-medium w-40 mt-3">Future :</p>
                    <div className="w-full grid grid-cols-3 gap-2">
                        {strategyOptions.Future.map((option) => (
                            <button
                                key={option}
                                type="default"
                                className={`relative flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedStrategy === option ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                                onClick={() => setSelectedStrategy(option)}
                            >
                                <span className="flex items-center space-x-2 mx-auto">
                                    {option}
                                </span>
                                {selectedStrategy === option && (
                                    <span className=" absolute -top-1.5 -right-1.5">
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

export default Strategy;
