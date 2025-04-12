import { Spin } from 'antd'
import MonthlyUsage from './MonthlyUsage'
import TargetedPromotion from './TargetPromotion'
import FollowUpPanel from './FollowUpPanel'
import PropTypes from 'prop-types'

const SocialStatsPage = ({ isLoading, limit_data }) => {
    return (
        <div className="mt-10 relative">
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg">
                    <Spin size="large" />
                </div>
            )}

            <div className="grid grid-cols-7 gap-5">
                <div className="col-span-5 ">
                    <MonthlyUsage data={limit_data} />
                    <TargetedPromotion />
                </div>
                <div className="col-span-2 h-full">
                    <FollowUpPanel />
                </div>
            </div>
        </div>
    );
};

SocialStatsPage.propTypes ={
    limit_data: PropTypes.object,
    isLoading: PropTypes.bool,
}
export default SocialStatsPage