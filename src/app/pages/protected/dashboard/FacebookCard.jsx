import { t } from "i18next";
import { Modal } from "antd";
import { useState } from "react";
import FbImg from "../../../../assets/img/fb-cover.png"
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import { LinkRedIcon, SyncBlueIcon } from "../../common/icons/icons"
import PropTypes from "prop-types";
import UserImg from "../../../../assets/img/user-img.png";

const FacebookCard = ({ data }) => {
    // const { fb_user_name, total_friends, followers, following, profile_image } = data;

    const {
        fb_user_name = "Facebook",
        total_friends = 0,
        followers = 0,
        following = 0,
        profile_image = UserImg
    } = data || {};
    
    const { unlinkFacebookAccount , fetchPlanLimitDetails } = useSocialAccountsStore();

    const [unlinkModal, setUnlinkModal] = useState(false);

    const handleFbConfirmUnlink = () => {
        setUnlinkModal(false);
        unlinkFacebookAccount(
            {},
            (resp) => {
                if (resp) fetchPlanLimitDetails()
            },
            () => {}
        );
    };
    return (
        <>
        <div className="flex-1 bg-white rounded-[16px] overflow-hidden relative dashboard-fb-card">
            <div className="relative">
                <div className="flex items-center h-15 justify-end items-center h-15 px-4 py-2 bg-[linear-gradient(90deg,_#089BED_0%,_#2861B9_100%)]">
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
                <p className="font-medium d-fb-card-uname">{fb_user_name}</p>
                <div className="flex gap-5 mr-4.5">
                    <button className="text-blue-600 cursor-pointer facebook-sync">
                        <SyncBlueIcon />
                    </button>
                    <button className="text-red-500 cursor-pointer" onClick={() => setUnlinkModal(true)}>
                        <LinkRedIcon />
                    </button>
                </div>
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

        <Modal
            open={unlinkModal}
            closable={false}
            onCancel={() => setUnlinkModal(false)}
            footer={null}
            width={600}
            className="custom-modal p-0"
        >
            <div className="bg-gray-50 rounded-t-lg">
                <h2 className="text-xl font-medium text-gray-700">Unlink Facebook Account</h2>
            </div>

            <div className="mt-8 mb-8 text-base">
                If you unlink the Facebook account, then your data will be permanently deleted.
            </div>

            <div className="bg-gray-50 mt-2 rounded-b-lg flex justify-end space-x-4">
                <button className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6" onClick={() => setUnlinkModal(false)}>
                    Cancel
                </button>
                <button className="bg-[#fa2c2c] w-32 text-white rounded-lg py-2 px-6 fbConfirmUnlink" onClick={handleFbConfirmUnlink}>
                    Unlink
                </button>
            </div>
        </Modal>
        </>
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
