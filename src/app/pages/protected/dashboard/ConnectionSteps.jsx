import { useState } from "react";
import { GreenCheckRoundedIcon } from "../../common/icons/icons";

const ConnectionSteps = () => {

    const [isExtInstalled, setIsExtInstalled] = useState(true)

    return (
        <div className="w-full">
            {/* Step 1 */}
            <div className="mb-6 flex flex-col justify-between">
                <div className="flex items-center space-x-2 mb-2">
                    {
                        isExtInstalled
                            ? <GreenCheckRoundedIcon />
                            : <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-white" />
                    }
                    <h2 className="font-medium text-lg">Step 1: Install Chrome Extension</h2>
                </div>
                <div className="flex justify-between items-center p-2 border border-[#DADADA] rounded-md">
                    <div>
                        <h2 className="">Install Chrome Extension</h2>
                    </div>
                    <button className="flex items-center px-10 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                        <span>Install Extension</span>
                    </button>
                </div>
            </div>

            {/* Step 2 */}
            <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-white" />
                    <h2 className="font-medium text-lg">Step 2: Connect Your Social Media Accounts</h2>
                </div>
                <div className="space-y-4 border border-[#FF000033] p-2">
                    {/* Facebook */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            
                            <span>Connect Facebook account</span>
                        </div>
                        <button className="flex items-center px-10 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                            Connect Now
                        </button>
                    </div>

                    {/* Instagram */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            
                            <span>Connect Instagram account</span>
                        </div>
                        <button className="flex items-center px-10 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                            Connect Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Button */}
            <div className="flex justify-end">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ConnectionSteps;
