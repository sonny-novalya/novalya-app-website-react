import PropTypes from "prop-types";
import FacebookCard from "./FacebookCard";
import InstagramCard from "./InstagramCard";
import FacebookEmptyCard from "./FacebookEmptyCard";
import InstaEmptyCard from "./InstaEmptyCard";
import { t } from "i18next";
import { Spin } from "antd";
import AffiliateCard from "./AffiliateCard";
import SocialStatsPage from "./SocialStatsPage";

const SocialDashboard = ({ facebook_data, instagram_data, limit_data, isLoading, handleShowConnection }) => {

    return (
        <div className="flex flex-col relative">
            <h3 className="text-lg font-bold mb-5">{t("dashboard.My Social Networks")}</h3>
            <div className="p-6 bg-white shadow-lg rounded-lg relative">
                <div className="grid lg:grid-cols-3 grid-cols-1  gap-4 h-60">
                    {isLoading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg h-80">
                            <Spin size="large" />
                        </div>
                    )}
                    {
                        facebook_data
                            ? <FacebookCard data={facebook_data} />
                            : <FacebookEmptyCard handleShowConnection={handleShowConnection} />
                    }

                    {
                        instagram_data
                            ? <InstagramCard data={instagram_data} />
                            : <InstaEmptyCard handleShowConnection={handleShowConnection} />
                    }

                    <AffiliateCard />
                </div>

                {/* Pass isLoading to SocialStatsPage for its own loader */}
                <SocialStatsPage limit_data={limit_data} isLoading={isLoading} />
            </div>
        </div>
    );
};

SocialDashboard.propTypes = {
    facebook_data: PropTypes.object,
    instagram_data: PropTypes.object,
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