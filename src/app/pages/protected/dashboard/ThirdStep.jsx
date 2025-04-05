import PropTypes from "prop-types";
import FacebookCard from "./FacebookCard";
import FollowUpPanel from "./FollowUpPanel";
import InstagramCard from "./InstagramCard";
import MonthlyUsage from "./MonthlyUsage";
import TargetedPromotion from "./TargetPromotion";

const ThirdStep = ({ facebook_data, instagram_data, limit_data }) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col lg:flex-row gap-4">
                <FacebookCard data={facebook_data} />
                <InstagramCard data={instagram_data} />

                <div className="flex-1 bg-green-400 text-white rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Promote and get paid</h3>
                        <p className="mt-2 text-sm">
                            sharing_link_feature
                        </p>
                    </div>
                    <button className="mt-4 bg-white text-green-700 font-bold py-2 px-4 rounded shadow">
                        My Affiliate Links
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <div className="grid grid-cols-7 gap-5">
                    <div className="col-span-5 px-4">
                        <MonthlyUsage data={limit_data} />
                        <TargetedPromotion />
                    </div>
                    <div className="col-span-2 h-full">
                        <FollowUpPanel />
                    </div>
                </div>
            </div>
        </div>
    );
};

ThirdStep.propTypes = {
    facebook_data: PropTypes.object,
    instagram_data: PropTypes.object,
    limit_data: PropTypes.shape({
        fbMessageLimit: PropTypes.number,
        igMessageLimit: PropTypes.number,
        tagsLimit: PropTypes.number,
        ailimits: PropTypes.number,
        totalContactLimit: PropTypes.number,
    }),
};

export default ThirdStep;
