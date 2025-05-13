import { Spin } from 'antd'
import MonthlyUsage from './MonthlyUsage'
import TargetedPromotion from './TargetPromotion'
import PropTypes from 'prop-types'

const SocialStatsPage = ({ isLoading, limit_data }) => {
    return (
        <div className="relative w-full">
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg">
                    <Spin size="large" />
                </div>
            )}

            <div className='flex items-center justify-between mb-2'>
                <div></div>
                <div>
                    <h2 className="flex items-center text-black font-medium">
                        Software status
                        <span className="bg-[#00B150] rounded-2xl text-white px-4 ml-2 py-1 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            <span className='text-sm'>Active</span>
                        </span>
                    </h2>
                </div>
            </div>

            <MonthlyUsage data={limit_data} />
            <TargetedPromotion />
        </div>
    );
};

SocialStatsPage.propTypes = {
    limit_data: PropTypes.object,
    isLoading: PropTypes.bool,
}
export default SocialStatsPage