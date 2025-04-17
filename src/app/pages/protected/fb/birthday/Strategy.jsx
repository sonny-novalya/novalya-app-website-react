import { TickFillIcon } from "../../../common/icons/icons";

const Strategy = ({selectedStrategy, setSelectedStrategy}) => {


    const strategyOptions = {
        Past: [{label:"Yesterday",value:"yesterday"},{label:"2 days ago",value:"2dayago"} ],
        Present: [ {label:"Today",value:"today"}],
        Future: [{label:"In 1 day",value:"in1days"},{label:"In 2 days",value:"in2days"} ,{label: "In 3 days",value:"in3days"}, {label:"In 4 days",value:"in4days"},{label:"In 5 days",value:"in5days"} , {label:"In 6 days",value:"in6days"}],
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
                                key={option.value}
                                type="default"
                                className={`relative flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedStrategy === option.value ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
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

                <div className="flex  ">
                    <p className="font-medium w-40 mt-3">Present :</p>
                    <div className="w-full grid grid-cols-3 gap-2">
                        <button
                            className={`relative flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedStrategy === "today" ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
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
                    <div className="w-full grid grid-cols-3 gap-2">
                        {strategyOptions.Future.map((option) => (
                            <button
                                key={option.value}
                                type="default"
                                className={`relative flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedStrategy === option.value ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
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
