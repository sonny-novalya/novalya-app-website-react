import PropTypes from "prop-types";
import FacebookCard from "./FacebookCard";
import InstagramCard from "./InstagramCard";
import { Spin } from "antd";
import SocialStatsPage from "./SocialStatsPage";
import ReferAndEarn from "./ReferAndEarn";

const SocialDashboard = ({ facebook_data, instagram_data, limit_data, isLoading, handleShowConnection, loginUserData }) => {

    return (
        <div className="flex gap-5">
                <div className="flex flex-col w-full">
                    <h3 className="text-[24px] tracking-[0.02em] font-[500] mb-[-4px]">Hello {loginUserData?.firstname}</h3>
                    <SocialStatsPage limit_data={limit_data} isLoading={isLoading} />
                </div>
                <div className="flex flex-col gap-5 w-lg relative">
                        {isLoading && (
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg h-full pb-64">
                                <Spin size="large" />
                            </div>
                        )}
                        <FacebookCard data={facebook_data} />
                        <InstagramCard data={instagram_data} />
                        <ReferAndEarn code={loginUserData?.referrallink}/>
                </div>
        </div>
    );
};

SocialDashboard.propTypes = {
    facebook_data: PropTypes.object,
    instagram_data: PropTypes.object,
    loginUserData: PropTypes.object,
    isLoading: PropTypes.bool,
    handleShowConnection: PropTypes.func,
    limit_data: PropTypes.shape({
        fbMessageLimit: PropTypes.number,
        igMessageLimit: PropTypes.number,
        tagsLimit: PropTypes.number,
        ailimits: PropTypes.number,
        totalContactLimit: PropTypes.number,
    }),
};

export default SocialDashboard;