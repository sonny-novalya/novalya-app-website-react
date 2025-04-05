import IgImg from "../../../../assets/img/ig-cover.png"
import { LinkRedIcon, SyncBlueIcon } from "../../common/icons/icons"
import PropTypes from "prop-types";

const InstagramCard = ({data}) => {

    const { insta_user_id, total_followers, insta_user_name, following, profile_image, posts } = data

    return (
        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-md">
            <div className="relative">
                <img src={IgImg} alt="Cover" className="w-full h-16" />
                <div className="absolute -bottom-14 left-4">
                    <img
                        src={profile_image}
                        alt="Profile"
                        className="w-20 h-24 object-cover border-4 border-white rounded-sm"
                    />
                </div>
            </div>

            <div className="mt-4 ml-28 flex justify-between items-center ">
                <p className="font-medium">@{insta_user_name}</p>
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
                <p className="font0medium text-lg">{insta_user_id}</p>
                <div className="flex justify-between mt-4 text-sm text-gray-700 pb-3">
                    <div className="flex-1 text-center">
                        <p className="font-bold">{total_followers}</p>
                        <p>Followers</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]"/>
                    <div className="flex-1 text-center">
                        <p className="font-bold">{posts}</p>
                        <p>Posts</p>
                    </div>
                    <div className="bg-[#DADADA] w-[1px]"/>
                    <div className="flex-1 text-center">
                        <p className="font-bold">{following}</p>
                        <p>Following</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

InstagramCard.propTypes = {
    data: PropTypes.shape({
        insta_user_name: PropTypes.string,
        insta_user_id: PropTypes.string,
        posts: PropTypes.string,
        following: PropTypes.string,
        total_followers: PropTypes.string,
        profile_image: PropTypes.string,
    }),
};

export default InstagramCard
