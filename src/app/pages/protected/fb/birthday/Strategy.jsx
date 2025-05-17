import { TickFillIcon } from "../../../common/icons/icons";

const Strategy = ({selectedStrategy, setSelectedStrategy}) => {


    const strategyOptions = {
        Past: [{label:"Yesterday",value:"yesterday"},{label:"2 days ago",value:"2dayago"} ],
        Present: [ {label:"Today",value:"today"}],
        Future: [{label:"In 1 day",value:"in1days"},{label:"In 2 days",value:"in2days"} ,{label: "In 3 days",value:"in3days"}, {label:"In 4 days",value:"in4days"},{label:"In 5 days",value:"in5days"} , {label:"In 6 days",value:"in6days"}],
    };

    return (
        <div className="border border-[#DADADA] px-4 pt-4 pb-7.5 rounded-[6px] mb-5 mx-auto w-full">
            <div className="flex items-center gap-[6px] mb-4">
                <p className="text-xl mb-0 font-[500]">Select the strategy</p>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"/>
                    <path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"/>
                    <path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"/>
                </svg>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex">
                    <p className="font-medium w-40 mt-3">Past :</p>
                    <div className="w-full grid grid-cols-3 gap-y-5 gap-x-6">
                        {strategyOptions.Past.map((option) => (
                            <button
                                key={option.value}
                                type="default"
                                className={`min-h-13 relative flex items-center justify-between px-4 py-3 rounded-[10px] border text-[#0087FF] cursor-pointer ${selectedStrategy === option.value ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                                onClick={() => setSelectedStrategy(option.value)}
                            >
                                <span className="flex text-[14px] items-center space-x-2 mx-auto">
                                    {option.label}
                                </span>
                                {selectedStrategy === option.value && (
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
                    <div className="w-full grid grid-cols-3 gap-y-5 gap-x-6">
                        <button
                            className={`relative flex items-center justify-between px-4 py-3 rounded-[10px] border text-[#0087FF] cursor-pointer ${selectedStrategy === "today" ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                            onClick={() => setSelectedStrategy("today")}
                        >
                            <span className="flex items-center space-x-2 mx-auto">
                                Today
                            </span>
                            {selectedStrategy === 'today' && (
                                <span className=" absolute -top-1.5 -right-1.5">
                                    <TickFillIcon />
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex ">
                    <p className="font-medium w-40 mt-3">Future :</p>
                    <div className="w-full grid grid-cols-3 gap-y-5 gap-x-6">
                        {strategyOptions.Future.map((option) => (
                            <button
                                key={option.value}
                                type="default"
                                className={`relative flex items-center justify-between px-4 py-3 rounded-[10px] border text-[#0087FF] cursor-pointer ${selectedStrategy === option.value ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                                onClick={() => setSelectedStrategy(option.value)}
                            >
                                <span className="flex items-center space-x-2 mx-auto">
                                    {option.label}
                                </span>
                                {selectedStrategy === option.value && (
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
