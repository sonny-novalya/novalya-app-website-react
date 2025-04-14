import { GreenCheckRoundedIcon, TickIconFilledWhite } from '../../common/icons/icons'
import { useExtensionStore } from '../../../../store/extension/extension-store';
import { useEffect } from 'react';
import { t } from 'i18next';

const ConnectionFirstStep = () => {
    const { isExtConnected, fetchExtInstalledStatus } = useExtensionStore()

    useEffect(() => {
        fetchExtInstalledStatus()
    }, [])

    return (
        <div className={`flex flex-col w-full gap-4 border rounded-md p-5 ${isExtConnected ? 'border-[#21BF7C] ' : 'border-[#DADADA]'}`}>
            <div className="flex items-center space-x-2 ">
                {
                    isExtConnected
                        ? <GreenCheckRoundedIcon />
                        : <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-white" />
                }
                <h2 className="font-medium text-lg">{t("dashboard.Step-1-Install Chrome Extension")}</h2>
            </div>
            <p className='text-[#000407]'>
                {t("dashboard.Connect your Instagram account to manage direct messages, comments, and follower insights.")}
            </p>

            <div className='w-full flex justify-center'>
                <button
                    className={`flex justify-center items-center w-84 mx-auto py-1.5 rounded-md focus:outline-none text-center nova-prospecting cursor-pointer install-extension-btn inactive-tag inactive-ext ${isExtConnected ? 'bg-[#21BF7C] text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    onClick={() => {
                        if (!isExtConnected) {
                            window.open(
                                "https://chromewebstore.google.com/detail/novalya/iemhbpcnoehagepnbflncegkcgpphmpc?authuser=0&hl=en",
                                "_blank"
                            );
                        }
                    }}
                >
                    <span className={isExtConnected && 'mr-2'}>
                        {isExtConnected ? t("dashboard.Extension Installed") : t("dashboard.Install Extension")}</span>
                    {isExtConnected && <TickIconFilledWhite />}
                </button>

            </div>
        </div>
    )
}

export default ConnectionFirstStep