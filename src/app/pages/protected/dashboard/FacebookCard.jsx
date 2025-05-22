import { t } from "i18next";
import { Button, Dropdown } from "antd";
import { useRef, useState } from "react";
import FbImg from "../../../../assets/img/fb-cover.png"
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import { LinkRedIcon, SyncBlueIcon } from "../../common/icons/icons"
import UserImg from "../../../../assets/img/user-img.png";
import { EllipsisOutlined } from "@ant-design/icons";

const FacebookCard = ({ data }) => {
    // const { fb_user_name, total_friends, followers, following, profile_image } = data;
    console.log("dataaa", data)
    const {
        fb_user_name = "Facebook",
        total_friends = 0,
        fb_user_id ,
        followers = 0,
        following = 0,
        profile_image = UserImg
    } = data || {};
    
    const { unlinkFacebookAccount , fetchPlanLimitDetails } = useSocialAccountsStore();

        const [dropdownVisible, setDropdownVisible] = useState(false);
        const [showConfirmUnlink, setShowConfirmUnlink] = useState(false);
        const timeoutRef = useRef(null);
    
        const handleUnlinkClick = () => {
            clearTimeout(timeoutRef.current);
            setShowConfirmUnlink(true);
            timeoutRef.current = setTimeout(() => setShowConfirmUnlink(false), 3000);
        };
    
        const confirmUnlink = () => {
            setShowConfirmUnlink(false);
            setDropdownVisible(false);
            unlinkFacebookAccount(
                {},
                (resp) => {
                    if (resp) fetchPlanLimitDetails();
                },
                () => { }
            );
        };
    
        const dropdownMenu = (
            <div className="bg-white flex items-centered rounded-md shadow-md px-3 py-2 space-x-3 ">
                <div
                    className="cursor-pointer facebook-sync"
                >
                    <SyncBlueIcon />
                </div>
                <div
                    onClick={showConfirmUnlink ? confirmUnlink : handleUnlinkClick}
                    className="cursor-pointer"
                >
                    {!showConfirmUnlink ? (
                        <>
                            <LinkRedIcon />
                        </>
                    ) : (
                        <span className="text-red-500 fbConfirmUnlink">Really?</span>
                    )}
                </div>
            </div>
        );
    
    return (
        <div className="bg-white rounded-[16px] overflow-hidden relative dashboard-fb-card shadow-lg">
            <div className="relative">
                <div className="flex items-center h-15 justify-end h-15 px-4 py-2 bg-[linear-gradient(90deg,_#089BED_0%,_#2861B9_100%)]">
                    <img src={FbImg} alt="Cover" className="w-full max-w-[120px]" />
                </div>
                <div className="absolute -bottom-12 left-4">
                    <img
                        src={profile_image}
                        alt="Profile"
                        className="w-23 h-23 object-cover border-4 border-white rounded-[7px] d-fb-card-photo"
                    />
                </div>
            </div>

            <div className="mt-4 ml-30 flex justify-between items-center ">
                <p className="font-medium cursor-pointer d-fb-card-uname" onClick={() => window.open(`https://www.facebook.com/${fb_user_id}`, '_blank')} >{fb_user_name}</p>
                    <Dropdown
                        trigger={["click"]}
                        placement="bottomRight"
                        open={dropdownVisible}
                        onOpenChange={(visible) => setDropdownVisible(visible)}
                        overlay={dropdownMenu}
                    >
                    <button className="mr-3 px-2 cursor-pointer">
                            <svg width="4" height="16" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 2C4 1.46957 3.78929 0.960859 3.41421 0.585786C3.03914 0.210713 2.53043 -6.42368e-08 2 -8.74228e-08C1.46957 -1.10609e-07 0.960859 0.210713 0.585786 0.585786C0.210713 0.960859 -6.42368e-08 1.46957 -8.74228e-08 2C-1.10609e-07 2.53043 0.210713 3.03914 0.585786 3.41421C0.960859 3.78929 1.46957 4 2 4C2.53043 4 3.03914 3.78929 3.41421 3.41421C3.78929 3.03914 4 2.53043 4 2ZM2 8C2.53043 8 3.03914 8.21071 3.41421 8.58579C3.78929 8.96086 4 9.46957 4 10C4 10.5304 3.78929 11.0391 3.41421 11.4142C3.03914 11.7893 2.53043 12 2 12C1.46957 12 0.960858 11.7893 0.585786 11.4142C0.210713 11.0391 -4.603e-07 10.5304 -4.37114e-07 10C-4.13928e-07 9.46957 0.210713 8.96086 0.585786 8.58579C0.960859 8.21071 1.46957 8 2 8ZM2 16C2.53043 16 3.03914 16.2107 3.41421 16.5858C3.78929 16.9609 4 17.4696 4 18C4 18.5304 3.78929 19.0391 3.41421 19.4142C3.03914 19.7893 2.53043 20 2 20C1.46957 20 0.960858 19.7893 0.585785 19.4142C0.210712 19.0391 -8.09991e-07 18.5304 -7.86805e-07 18C-7.63619e-07 17.4696 0.210713 16.9609 0.585785 16.5858C0.960858 16.2107 1.46957 16 2 16Z" fill="black" />
                            </svg>
                    </button>
                    </Dropdown>
            </div>

            <div className="mt-3 px-5 mb-4">
                <p className="font-[500] d-fb-card-name">{fb_user_name?.split(" ")[0]}</p>
                <div className="flex justify-between mt-4 text-sm text-gray-700">
                    <div className="flex-1 text-center">
                        <p className="font-[500] text-[18px] d-fb-card-followers">{followers}</p>
                        <p className="text-[color:#0f1b4db3] text-[13px]">{t("dashboard.Followers")}</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]" />
                    <div className="flex-1 text-center">
                        <p className="font-[500] text-[18px] d-fb-card-friends">{total_friends}</p>
                        <p className="text-[color:#0f1b4db3] text-[13px]">{t("dashboard.Friends")}</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]" />
                    <div className="flex-1 text-center">
                        <p className="font-[500] text-[18px] d-fb-card-followings">{following}</p>
                        <p className="text-[color:#0f1b4db3] text-[13px]">{t("dashboard.Following")}</p>
                    </div>
                </div>
            </div>

            <div id="nova-fb-status" className={`absolute bottom-0 top-0 right-0 left-0 transform backdrop-blur-md bg-[#00000020] w-full h-full flex items-center justify-center ${data ? "nova-fb-connected" : ""}`}>
                <button id="facebook-sync" action="card" className="xl:px-6 xl:py-2 lg:px-3 lg:py-1 px-4 py-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-semibold rounded-full cursor-pointer">
                    {t("dashboard.Connect Facebook Account")}
                </button>
            </div>
        </div>
    )
}

// FacebookCard.propTypes = {
//     data: PropTypes.shape({
//         fb_user_name: PropTypes.string,
//         followers: PropTypes.string,
//         following: PropTypes.string,
//         total_friends: PropTypes.string,
//         profile_image: PropTypes.string,
//     }),
// };

export default FacebookCard
