import { BarChartOutlined, SendOutlined, RobotOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import PropTypes from "prop-types";

const MonthlyUsage = ({ data }) => {
    const usageData = [
        {
            // icon: <SendOutlined />,
            icon: <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.7578 2.50012L2.75781 10.8335L14.7369 15.521M27.7578 2.50012L19.4244 27.5001L14.7369 15.521M27.7578 2.50012L14.7369 15.521" stroke="#0087FF" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>,
            label: t("dashboard.Messages"),
            current: (data?.fbMessageLimit || 0) + (data?.igMessageLimit || 0),
            total: 2000,
        },
        {
            icon: <RobotOutlined />,
            label: t("dashboard.AI Credits"),
            current: data?.aiLimits || 0,
            total: 2000,
        },
        {
            icon: <TagsOutlined />,
            label: t("dashboard.Tag + Pipeline"),
            current: data?.tagsLimit || 0,
            total: 2000,
        },
        {
            icon: <UserOutlined />,
            label: t("dashboard.Contacts"),
            current: data?.totalContactLimit || 0,
            total: '∞',
        },
    ];

    return (
        <div className="bg-white rounded-[10px] px-5 py-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-[500] text-[24px]">{t("dashboard.Monthly Usage")}</h3>
                <button className="bg-blue-500 text-white text-[20px] py-2 px-8 rounded-[10px] flex items-center">
                    <BarChartOutlined className="mr-1" /> {t("dashboard.Statistics")}
                </button>
            </div>

            {usageData.map((item, i) => (
                <div key={i} className="flex items-center space-x-4 mb-5 border border-[#0087FF33] p-4 rounded-[10px] bg-white gap-6">
                    <div className="text-xl text-blue-500 m-0 bg-[#0087FF33] w-[60px] h-[60px] flex items-center justify-center rounded-[6px]">
                        {item.icon}
                    </div>
                    <div className="w-full flex items-end gap-[20px]">
                        <div className='flex-1 mb-[10px]'>
                            <div className="text-[20px] text-[#000407] font-medium mb-[6px]">{item.label}</div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-blue-500 rounded-full"
                                    style={{ width: `${(item.current / (item.total === '∞' ? 2000 : item.total)) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-right text-[20px] text-[#0087FF] font-semibold w-[120px]">
                            {item.current}/{item.total}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

MonthlyUsage.propTypes = {
    data: PropTypes.shape({
        fbMessageLimit: PropTypes.number,
        igMessageLimit: PropTypes.number,
        tagsLimit: PropTypes.number,
        aiLimits: PropTypes.number,
        totalContactLimit: PropTypes.number,
    }),
};

export default MonthlyUsage;
