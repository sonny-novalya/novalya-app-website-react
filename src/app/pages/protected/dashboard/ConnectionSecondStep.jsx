import { FBLogo, IGLogo } from "../../common/icons/icons"

const ConnectionSecondStep = () => {

    return (

        <div className="space-y-4 border border-[#FF000033] p-5 flex flex-col gap-5 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-white" />
                <h2 className="font-medium text-lg">Step 2: Connect Your Social Media Accounts</h2>
            </div>
            
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
                <button id="facebook-sync" className="px-6 py-2 bg-gradient-to-r w-96 from-blue-400 via-blue-500 to-blue-600 text-white font-semibold rounded-lg">
                    Connect Now
                </button>
            </div>

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
                <button id="instagram-sync" className="px-6 py-2 bg-gradient-to-r w-96 from-[#f56040] via-[#fd1d1d] to-[#833ab4] text-white font-medium rounded-lg">
                    Connect Now
                </button>
            </div>
        </div>
    )
}

export default ConnectionSecondStep