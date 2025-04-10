import FbImg from "../../../../assets/img/fb-cover.png"
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import { LinkRedIcon, SyncBlueIcon } from "../../common/icons/icons"
import PropTypes from "prop-types";

const FacebookCard = ({ data }) => {
    const { fb_user_name, total_friends, followers, following, profile_image } = data
    const { unlinkFacebookAccount , fetchPlanLimitDetails } = useSocialAccountsStore();

    const handleFbConfirmUnlink = () => {
        unlinkFacebookAccount(
            {},
            (resp) => {
                if (resp) fetchPlanLimitDetails()
            },
            () => {}
        );
    };
    return (
        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-md">
            <div className="relative">
                <img src={FbImg} alt="Cover" className="w-full h-16" />
                <div className="absolute -bottom-14 left-4">
                    <img
                        src={profile_image}
                        alt="Profile"
                        className="w-20 h-24 object-cover border-4 border-white rounded-sm"
                    />
                </div>
            </div>

            <div className="mt-4 ml-28 flex justify-between items-center ">
                <p className="font-medium">{fb_user_name}</p>
                <div className="flex gap-3 mr-3">
                    <button id="facebook-sync" className="text-blue-600 cursor-pointer facebook-sync">
                        <SyncBlueIcon />
                    </button>
                    <button id="instagram-sync" className="text-red-500 cursor-pointer fbConfirmUnlink" onClick={handleFbConfirmUnlink}>
                        <LinkRedIcon />
                    </button>
                </div>
            </div>

            <div className="mt-6 px-3">
                <p className="font0medium text-lg">{fb_user_name?.split(" ")[0]}</p>
                <div className="flex justify-between mt-4 text-sm text-gray-700 pb-3">
                    <div className="flex-1 text-center">
                        <p className="font-bold">{followers}</p>
                        <p>Followers</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]" />
                    <div className="flex-1 text-center">
                        <p className="font-bold">{total_friends}</p>
                        <p>Friends</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]" />
                    <div className="flex-1 text-center">
                        <p className="font-bold">{following}</p>
                        <p>Following</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

FacebookCard.propTypes = {
    data: PropTypes.shape({
        fb_user_name: PropTypes.string,
        followers: PropTypes.string,
        following: PropTypes.string,
        total_friends: PropTypes.string,
        profile_image: PropTypes.string,
    }),
};

export default FacebookCard
