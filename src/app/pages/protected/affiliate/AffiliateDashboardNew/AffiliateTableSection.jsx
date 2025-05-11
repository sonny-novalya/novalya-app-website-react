import { useEffect, useState } from "react";
import TabNavigation from "./tablesComponents/TabNavigation";
import PropTypes from 'prop-types';
import ActivityLogsTable from "./tablesComponents/ActiveLogsTable";
import useUpgradeModalStore from "../../../../../store/modals/UpgradeToPro";
import useAffTableDataStore from "../../../../../store/affiliate/dashboard/AffTableData";
import NewTrialsTable from "./tables/NewTrialsTable";
import ActiveCustomersTable from "./tables/ActiveCustomersTable";
import TrialCancelledTable from "./tables/TrialCancelledTable";
import CustomerCancelledTable from "./tables/CustomerCancelledTable";
import AllCustomersTable from "./tables/AllCustomersTable";
import useLoginUserDataStore from "../../../../../store/loginuser/loginuserdata";

const AffiliateTableSection = ({ isPro }) => {

    const [activeTab, setActiveTab] = useState(isPro ? 'active-logs' : 'new_trials');
    const { showModal } = useUpgradeModalStore();
    const { fetchAffiliateCustomers, isAffiliateLoading, affiliateCustomersData } = useAffTableDataStore()
    const { loginUserData, fetchLoginUserData } = useLoginUserDataStore();

    useEffect(() => {
        fetchLoginUserData()
        fetchAffiliateCustomers()
    }, []);

    const TableComponent = (currentTab) => {
        switch (currentTab) {
            case 'new_trials':
                return <NewTrialsTable refUsers={affiliateCustomersData} isAffiliateLoading={isAffiliateLoading} loginUserData={loginUserData} />;
            case 'active_customers':
                return <ActiveCustomersTable refUsers={affiliateCustomersData} isAffiliateLoading={isAffiliateLoading} loginUserData={loginUserData} />;
            case 'trial_cancelled':
                return <TrialCancelledTable refUsers={affiliateCustomersData} isAffiliateLoading={isAffiliateLoading} loginUserData={loginUserData} />;
            case 'customer_cancelled':
                return <CustomerCancelledTable refUsers={affiliateCustomersData} isAffiliateLoading={isAffiliateLoading} loginUserData={loginUserData} />;
            case 'all_customers':
                return <AllCustomersTable refUsers={affiliateCustomersData} isAffiliateLoading={isAffiliateLoading} loginUserData={loginUserData} />;
            default:
                return <></>;
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {
                activeTab === "active-logs"
                    ? <ActivityLogsTable />
                    : <div className="border border-[#21BF7C] p-4 relative">
                        {isPro && (
                            <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50 rounded-lg h-full">
                                <button className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded px-10 py-2 text-white shadow-md font-medium" onClick={showModal}>
                                    Unlock to Pro
                                </button>
                            </div>
                        )}

                        {TableComponent(activeTab)}
                    </div>
            }
        </div>
    );
};

AffiliateTableSection.propTypes = {
    isPro: PropTypes.bool
}


export default AffiliateTableSection;