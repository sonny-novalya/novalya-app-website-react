import { useState } from "react";
import { detectExtension } from "../../../../helpers/helper";
import { FBLogo, GreenCheckRoundedIcon } from "../../common/icons/icons"
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import IGIcon from "../../../../assets/img/ig_icon.png";
import { t } from "i18next";

const ConnectionSecondStep = () => {
    const { socialAccountsData } = useSocialAccountsStore();
    const { facebook_data, instagram_data } = socialAccountsData || []

    const [isExtensionInstalled, setIsExtensionInstalled] = useState(false);
    detectExtension((extensionStatus) => {
        setIsExtensionInstalled(extensionStatus);
    });

    return (

        <div className={`space-y-4 border px-10 py-12 flex flex-col gap-6 rounded-md ${!isExtensionInstalled && "opacity-60"} ${facebook_data || instagram_data ? 'border-[#21BF7C] ' : 'border-[#FF000033]'}`}>
            <div className="flex items-center space-x-2 mb-2">
                {
                    facebook_data || instagram_data
                        ? <GreenCheckRoundedIcon />
                        : <div className="w-5 h-5 rounded-full border-2 border-red-500 bg-white" />
                }
                <h2 className="font-medium text-[24px]">{t("dashboard.Step-2-Connect Your Social Media Accounts")}</h2>
            </div>

            <div className="flex justify-between items-center gap-6">
                <div className="flex items-center gap-5">
                    <div className="w-[75px] h-[75px]">
                        <FBLogo />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[24px] font-medium">{t("dashboard.Connect Personal Facebook Account")}</span>
                        <p className="text-[14px] pr-10">
                            {t("dashboard.Connect your Facebook account to manage direct messages, comments, and follower insights.")}
                        </p>
                    </div>
                </div>
                <button id={facebook_data === null ? "facebook-sync" : undefined} action="button" className="px-6 py-3 bg-gradient-to-r w-96 from-blue-400 via-blue-500 to-blue-600 text-white font-semibold rounded-lg cursor-pointer dashboard-fb-btn">
                    {
                        facebook_data === null
                            ? t("dashboard.Connect Now")
                            : t("dashboard.Connected")
                    }
                </button>
            </div>

            <div className="flex justify-between items-center gap-6">
                <div className="flex items-center gap-5">
                    <img src={IGIcon} alt="" className="h-[76px] w-[76px]" />
                    <div className="flex flex-col gap-1">
                        <span className="text-[24px] font-medium">
                            {t("dashboard.Connect Instagram account")}
                        </span>
                        <p className="text-[14px] pr-10">
                            {t("dashboard.Connect your Instagram account to manage direct messages, comments, and follower insights.")}
                        </p>
                    </div>
                </div>
                <button id={instagram_data === null ? "instagram-sync" : undefined} action="button" className="px-6 py-3 bg-gradient-to-r w-96 from-[#f56040] via-[#fd1d1d] to-[#833ab4] text-white font-medium rounded-lg cursor-pointer dashboard-ig-btn">
                    {
                        instagram_data === null
                            ? t("dashboard.Connect Now")
                            : t("dashboard.Connected")
                    }
                </button>
            </div>
        </div>
    )
}

export default ConnectionSecondStep