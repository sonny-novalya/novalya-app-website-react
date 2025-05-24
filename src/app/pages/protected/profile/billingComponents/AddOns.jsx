import { useState } from "react";
import tagIcon from "../../../../../assets/img/tag-add-on-icon.png";
import msgIcon from "../../../../../assets/img/msg-add-on-icon.png";

const AddOns = () => {
    const [crmTagCount, setCrmTagCount] = useState(5);

    const addOns = [
        {
            id: "crm-tags",
            icon: tagIcon,
            title: "Extra CRM Tags",
            price: "5",
            billing: "Billed monthly",
            isAdjustable: true,
            count: crmTagCount,
            onIncrement: () => setCrmTagCount(prev => prev + 5),
            onDecrement: () => setCrmTagCount(prev => (prev > 5 ? prev - 5 : 5)),
        },
        // {
        //     id: "ai-messages",
        //     icon: msgIcon,
        //     title: "Unlimited AI Messages",
        //     price: "05",
        //     billing: "Billed monthly",
        //     isAdjustable: false,
        //     included: true,
        // },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-[20px] font-medium text-[#000000BF]">Add-ons</h2>
            {addOns.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-3 justify-between items-center border border-[#0087FF33] rounded-md p-6 shadow-sm bg-white h-24"
                >
                    <div className="flex gap-3 items-center">
                        <img src={item.icon} alt="addon icon" className="w-12 h-12 border border-[#0087FF33] p-1 rounded" />
                        <h3 className="text-[20px] font-medium">{item.title}</h3>
                    </div>
                    <div className="flex gap-3 items-center justify-between">
                        <div className="flex gap-1 items-center">
                            <div className="text-4xl font-semibold">${item.price}</div>
                            <div className="text-sm">{item.billing}</div>
                        </div>
                        <div></div>
                    </div>
                    <div className="ml-auto">
                        {item.isAdjustable ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={item.onDecrement}
                                    className="bg-[#D9EDFF] w-11 h-10 rounded-md text-2xl font-semibold text-[#000000BF] flex items-center justify-center"
                                >
                                    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </button>
                                <div className="h-10 w-14 text-center font-medium text-xl border border-[#0087FF33] rounded flex items-center justify-center">
                                    {item.count}
                                </div>
                                <button
                                    onClick={item.onIncrement}
                                    className="bg-[#D9EDFF] w-11 h-10 rounded-md text-2xl font-semibold text-[#000000BF] flex items-center justify-center"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 8H15M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </button>
                            </div>
                        ) : (
                            item.included && (
                                    <div className="bg-[#0087FF5C] px-7 py-3  text-white rounded-md font-medium text-sm">
                                    Included in pack
                                </div>
                            )
                        )}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default AddOns;
