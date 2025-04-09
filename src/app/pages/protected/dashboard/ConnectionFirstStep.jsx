import { useState } from 'react'
import { GreenCheckRoundedIcon, TickIconFilledWhite } from '../../common/icons/icons'
import { detectExtension } from '../../../../helpers/helper';

const ConnectionFirstStep = () => {
    const [isExtensionInstalled, setIsExtensionInstalled] = useState(false);
    detectExtension((extensionStatus) => {
        setIsExtensionInstalled(extensionStatus);
    });

    return (
        <div className="flex flex-col w-full gap-4 border border-[#DADADA] rounded-md p-5 ">
            <div className="flex items-center space-x-2 ">
                {
                    isExtensionInstalled
                        ? <GreenCheckRoundedIcon />
                        : <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-white" />
                }
                <h2 className="font-medium text-lg">Step 1: Install Chrome Extension</h2>
            </div>
            <p className='text-[#000407]'>
                Connect your Instagram account to manage direct messages, comments, and follower insights.
            </p>
            
            <div className='w-full flex justify-center'>
                <button
                    className={`flex justify-center items-center w-84 mx-auto py-1.5 rounded-md focus:outline-none text-center nova-prospecting cursor-pointer install-extension-btn inactive-tag inactive-ext ${isExtensionInstalled ? 'bg-[#21BF7C] text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    onClick={() => {
                        if (!isExtensionInstalled) {
                            window.open(
                                "https://chromewebstore.google.com/detail/novalya/iemhbpcnoehagepnbflncegkcgpphmpc?authuser=0&hl=en",
                                "_blank"
                            );
                        }
                    }}
                >
                    <span className={isExtensionInstalled && 'mr-2'}>
                    {isExtensionInstalled ? 'Extension Installed' : 'Install Extension'}</span>
                    {isExtensionInstalled && <TickIconFilledWhite />}
                </button>

            </div>
        </div>
    )
}

export default ConnectionFirstStep