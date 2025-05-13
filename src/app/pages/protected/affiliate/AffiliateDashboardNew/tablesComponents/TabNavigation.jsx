import PropTypes from 'prop-types';

const TabNavigation = ({ activeTab, setActiveTab, isPro = true }) => {
    const tabs = [
        { id: 'new_trials', label: 'New Trials (30 days)' },
        { id: 'active_customers', label: 'Active Customers' },
        { id: 'trial_cancelled', label: 'Cancelled Trials' },
        { id: 'customer_cancelled', label: 'Cancelled Customers' },
        { id: 'all_customers', label: 'All Customers' },
    ];
    const activeLogsTab = { id: 'active-logs', label: 'Active Logs' }
    const newTabs = isPro ? [activeLogsTab, ...tabs] : tabs;

    return (
        <div className="flex space-x-2 ">
            {newTabs.map((tab) => (
                <div key={tab.id} className="flex flex-col items-center w-full">
                    <button
                        className={`w-full px-4 py-2 rounded-md font-medium cursor-pointer ${activeTab === tab.id
                            ? 'border border-[#21BF7C] border-b-0 rounded-b-none text-[#21BF7C]'
                            : 'bg-white border border-[#8D8D8D45]'
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>

                    <div
                        className={`h-5 w-full ${activeTab === tab.id ? 'bg-white border-x border-[#21BF7C]' : ''}`}
                    />
                </div>
            ))}
        </div>
    );
};

TabNavigation.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    isPro: PropTypes.bool
}

TabNavigation.defaultProps = {
    activeTab: 'new-trials'
};

export default TabNavigation;
