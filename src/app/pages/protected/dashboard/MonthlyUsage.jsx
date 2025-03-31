import { BarChartOutlined, SendOutlined, RobotOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';

const usageData = [
    { icon: <SendOutlined />, label: 'Messages', current: 1400, total: 2000 },
    { icon: <RobotOutlined />, label: 'AI Credits', current: 1000, total: 2000 },
    { icon: <TagsOutlined />, label: 'Tag + Pipeline', current: 700, total: 2000 },
    { icon: <UserOutlined />, label: 'Contacts', current: 1900, total: '∞' },
];

const MonthlyUsage = () => {
    return (
        <div className="bg-white shadow-xl rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Monthly Usage</h3>
                <button className="bg-blue-500 text-white text-sm py-1 px-3 rounded flex items-center">
                    <BarChartOutlined className="mr-1" /> Statistics
                </button>
            </div>
            {usageData.map((item, i) => (
                <div key={i} className="flex items-center space-x-4 mb-4 p-2 bg-gray-50 rounded">
                    <div className="text-xl text-blue-500">{item.icon}</div>
                    <div className="w-full">
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${(item.current / (item.total === '∞' ? 2000 : item.total)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="text-xs text-right text-gray-600">
                            {item.current}/{item.total}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MonthlyUsage;