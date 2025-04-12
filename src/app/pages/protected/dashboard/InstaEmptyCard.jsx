import IgImg from "../../../../assets/img/ig-cover.png"
import { LinkRedIcon, SyncBlueIcon } from "../../common/icons/icons"
import UserImg from "../../../../assets/img/user-img.png"
import { t } from "i18next";

const InstaEmptyCard = () => {
    return (
        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-md relative">
            <div className="relative">
                <img src={IgImg} alt="Cover" className="w-full h-16" />
                <div className="absolute -bottom-14 left-4">
                    <img
                        src={UserImg}
                        alt="Profile"
                        className="w-20 h-24 object-cover border-4 border-white rounded-sm bg-white"
                    />
                </div>
            </div>

            <div className="mt-4 ml-28 flex justify-between items-center">
                <p className="font-medium">Temp User</p>
                <div className="flex gap-3 mr-3">
                    <button className="text-blue-600 cursor-pointer">
                        <SyncBlueIcon />
                    </button>
                    <button className="text-red-500 cursor-pointer">
                        <LinkRedIcon />
                    </button>
                </div>
            </div>

            <div className="mt-6 px-3">
                <p className="font-medium text-lg">Temp</p>
                <div className="flex justify-between mt-4 text-sm text-gray-700 pb-3">
                    <div className="flex-1 text-center">
                        <p className="font-bold">0</p>
                        <p>Followers</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]" />
                    <div className="flex-1 text-center">
                        <p className="font-bold">0</p>
                        <p>Posts</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]" />
                    <div className="flex-1 text-center">
                        <p className="font-bold">0</p>
                        <p>Following</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 top-0 right-0 left-0 transform backdrop-blur-md bg-[#00000020] w-full h-full flex items-center justify-center">
                <button id="instagram-sync" className="px-6 py-2 bg-gradient-to-r from-[#f56040] via-[#fd1d1d] to-[#833ab4] text-white font-medium rounded-full cursor-pointer instagram-sync">
                    {t("dashboard.Connect Instagram account")}
                </button>
            </div>
        </div>
    );
}

export default InstaEmptyCard;
