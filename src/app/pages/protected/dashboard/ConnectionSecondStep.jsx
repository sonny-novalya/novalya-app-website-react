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

        <div className={`space-y-4 border  p-5 flex flex-col gap-5 rounded-md ${!isExtensionInstalled && "opacity-60"} ${facebook_data || instagram_data ? 'border-[#21BF7C] ' : 'border-[#FF000033]'}`}>
            <div className="flex items-center space-x-2 mb-2">
                {
                    facebook_data || instagram_data
                        ? <GreenCheckRoundedIcon />
                        : <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-white" />
                }
                <h2 className="font-medium text-lg">{t("dashboard.Step-2-Connect Your Social Media Accounts")}</h2>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <FBLogo />
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-medium">{t("dashboard.Connect Personal Facebook Account")}</span>
                        <p>
                            {t("dashboard.Connect your Facebook account to manage direct messages, comments, and follower insights.")}
                        </p>
                    </div>
                </div>
                <button id="facebook-sync" className="px-6 py-2 bg-gradient-to-r w-96 from-blue-400 via-blue-500 to-blue-600 text-white font-semibold rounded-lg cursor-pointer facebook-sync">
                    {
                        facebook_data === null
                            ? t("dashboard.Connect Now")
                            : t("dashboard.Connected")
                    }
                </button>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <img src={IGIcon} alt="" className="h-[76px] w-[76px]" />
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-medium">
                            {t("dashboard.Connect Instagram account")}
                        </span>
                        <p>
                            {t("dashboard.Connect your Instagram account to manage direct messages, comments, and follower insights.")}
                        </p>
                    </div>
                </div>
                <button id="instagram-sync" className="px-6 py-2 bg-gradient-to-r w-96 from-[#f56040] via-[#fd1d1d] to-[#833ab4] text-white font-medium rounded-lg cursor-pointer instagram-sync">
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