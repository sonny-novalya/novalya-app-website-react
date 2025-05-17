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
        <div className={`flex flex-col w-full gap-6.5 border rounded-[10px] px-5 py-6.5 ${isExtConnected ? 'border-[#21BF7C] ' : 'border-[#DADADA]'}`}>
            <div className="flex items-center space-x-[18px]">
                {
                    isExtConnected
                        ? <GreenCheckRoundedIcon />
                        : <div className="w-5 h-5 rounded-full border-2 border-red-500 bg-white" />
                }
                {/* <h2 className="font-[500] text-[24px] ">{t("dashboard.Step-1-Install Chrome Extension")}</h2> */}
                <h2 className="font-[500] text-[24px] ">Step-1: <span className='pl-4'>Install Chrome Extension</span></h2>
            </div>
            <p className='text-[#000407] text-[14px] tracking-[0.02em]'>
                {t("dashboard.Connect your Instagram account to manage direct messages, comments, and follower insights.")}
            </p>

            <div className='w-full flex justify-center'>
                <button
                    className={`flex justify-center items-center w-full mx-auto py-3 rounded-md focus:outline-none text-center nova-prospecting cursor-pointer install-extension-btn inactive-tag inactive-ext ${isExtConnected ? 'bg-[#21BF7C] text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
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