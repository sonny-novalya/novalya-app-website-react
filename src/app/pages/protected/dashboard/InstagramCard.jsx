import { t } from "i18next";
import { Modal } from "antd";
import { useState } from "react";
import IgImg from "../../../../assets/img/ig-cover.png"
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import { LinkRedIcon, SyncBlueIcon } from "../../common/icons/icons"
import PropTypes from "prop-types";
import UserImg from "../../../../assets/img/user-img.png";

const InstagramCard = ({ data }) => {
    // const { insta_user_id, total_followers, insta_user_name, following, profile_image, posts } = data

    const {
        insta_user_id = "Instagram",
        total_followers = 0,
        insta_user_name = "Instagram",
        following = 0,
        profile_image = UserImg,
        posts = 0,
      } = data || {};

    const { unlinkInstagramAccount, fetchPlanLimitDetails } = useSocialAccountsStore();

    const [unlinkModal, setUnlinkModal] = useState(false);

    const handleInstaUnlinkClick = () => {
        setUnlinkModal(false);
        unlinkInstagramAccount(
            {}, 
            (resp) => {
                if (resp) fetchPlanLimitDetails("instagram")
            },
            () => {}
        );
    };


    return (
        <>
        <div className="flex-1 bg-white rounded-[16px] overflow-hidden relative dashboard-ig-card">
            <div className="relative">
                <div className="flex items-center h-15 justify-end items-center h-15 p-2 bg-[linear-gradient(90deg,_#3a0ca3_0%,_#b5179e_25%,_#f72585_45%,_#fb5607_70%,_#ffbe0b_100%)]">
                    <img src={IgImg} alt="Cover" className="w-full max-w-[120px]" />
                </div>

                <div className="absolute -bottom-11 left-4">
                    <img
                        src={profile_image}
                        alt="Profile"
                        className="w-22.5 h-22.5 object-cover border-4 border-white rounded-sm d-ig-card-photo"
                    />
                </div>
            </div>

            <div className="mt-4 ml-30 flex justify-between items-center  ">
                <p className="font-medium d-ig-card-uname">@{insta_user_name}</p>
                <div className="flex gap-3 mr-5">
                    <button className="text-blue-600 cursor-pointer instagram-sync">
                        <SyncBlueIcon />
                    </button>
                    <button className="text-red-500 cursor-pointer" onClick={() => setUnlinkModal(true)}>
                        <LinkRedIcon  />
                    </button>
                </div>
            </div>

            <div className="mt-3 px-5 mb-4">
                <p className="font-[500] d-ig-card-name">{insta_user_id}</p>
                <div className="flex justify-between mt-4 text-sm text-gray-700">
                    <div className="flex-1 text-center">
                        <p className="font-[500] text-[18px] d-ig-card-followers">{total_followers}</p>
                        <p className="text-[color:#0f1b4db3] text-[13px]">{t("dashboard.Followers")}</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]" />
                    <div className="flex-1 text-center">
                        <p className="font-[500] text-[18px] d-ig-card-posts">{posts}</p>
                        <p className="text-[color:#0f1b4db3] text-[13px]">{t("dashboard.Posts")}</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]" />
                    <div className="flex-1 text-center">
                        <p className="font-[500] text-[18px] d-ig-card-followings">{following}</p>
                        <p className="text-[color:#0f1b4db3] text-[13px]">{t("dashboard.Following")}</p>
                    </div>
                </div>
            </div>

            <div id="nova-ig-status" className={`absolute bottom-0 top-0 right-0 left-0 transform backdrop-blur-md bg-[#00000020] w-full h-full flex items-center justify-center ${data ? "nova-ig-connected" : ""}`}>
                <button id="instagram-sync" action="card"
                    className="xl:px-6 xl:py-2 lg:px-3 lg:py-1 px-4 py-1.5 bg-gradient-to-r from-[#f56040] via-[#fd1d1d] to-[#833ab4] text-white font-medium rounded-full cursor-pointer">
                    {t("dashboard.Connect Instagram account")}
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
                <h2 className="text-xl font-medium text-gray-700">Unlink Instagram Account</h2>
            </div>

            <div className="mt-8 mb-8 text-base">
                If you unlink the Instagram account, then your data will be permanently deleted.
            </div>
            
            <div className="bg-gray-50 mt-2 rounded-b-lg flex justify-end space-x-4">
                <button className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6" onClick={() => setUnlinkModal(false)}>
                    Cancel
                </button>
                <button className="bg-[#fa2c2c] w-32 text-white rounded-lg py-2 px-6 instaConfirmUnlink" onClick={handleInstaUnlinkClick}>
                    Unlink
                </button>
            </div>
        </Modal>
        </>
    )
}

// InstagramCard.propTypes = {
//     data: PropTypes.shape({
//         insta_user_name: PropTypes.string,
//         insta_user_id: PropTypes.string,
//         posts: PropTypes.string,
//         following: PropTypes.string,
//         total_followers: PropTypes.string,
//         profile_image: PropTypes.string,
//     }),
// };

export default InstagramCard
