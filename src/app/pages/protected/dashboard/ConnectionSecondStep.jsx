import { FBLogo, IGLogo } from "../../common/icons/icons"

const ConnectionSecondStep = () => {

    return (

        <div className="space-y-4 border border-[#FF000033] p-5 flex flex-col gap-5">
            <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-white" />
                <h2 className="font-medium text-lg">Step 2: Connect Your Social Media Accounts</h2>
            </div>
            {/* Facebook */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <FBLogo />
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-medium">Connect Personal Facebook Account</span>
                        <p>
                            Connect your Facebook account to manage direct messages, comments, and follower insights.
                        </p>
                    </div>
                </div>
                <button className="flex items-center justify-center w-96 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                    Connect Now
                </button>
            </div>

            {/* Instagram */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <IGLogo />
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-medium">Connect Instagram account</span>
                        <p>
                            Connect your Instagram account to manage direct messages, comments, and follower insights.
                        </p>
                    </div>
                </div>
                <button className="flex items-center justify-center w-96 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                    Connect Now
                </button>
            </div>
        </div>
    )
}

export default ConnectionSecondStep