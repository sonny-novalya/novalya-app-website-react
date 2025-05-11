import { useEffect, useState } from 'react';
import Layout from '../../Layout';
import AffiliateLinkSection from './AffiliateLinkSection';
import AffiliateTableSection from './AffiliateTableSection';
import EarningAndPromotion from './openDashboardComponents/EarningAndPromotion';
import TopBanner from './openDashboardComponents/TopBanner';
import PaymentTableSection from './tablesComponents/PaymentTableSection';
import UpgradeToProModal from './UpgradeToProModal';
import useLoginUserDataStore from '../../../../../store/loginuser/loginuserdata';

const AffiliateDashboard = () => {
    const [isPro, setIsPro] = useState(false)
    const { loginUserData, fetchLoginUserData } = useLoginUserDataStore();

    useEffect(() => {
        fetchLoginUserData({})
        loginUserData && setIsPro(loginUserData?.user_type?.toLowerCase() === "distributor" ? true: false)
    }, [])
    
    if (!loginUserData) return 
    return (
        <Layout>
            <div className="">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-medium text-[#000407]">Affiliate</h2>
                    <button className="bg-[#0087FF] hover:bg-[#005199] text-white px-4 py-2 rounded-md transition-colors">
                        My Stats
                    </button>
                </div>

                {
                    isPro && <TopBanner />
                }
                <EarningAndPromotion />
                <AffiliateLinkSection isPro={isPro} randomCode={loginUserData?.randomcode} />
                <AffiliateTableSection isPro={isPro} />
                <PaymentTableSection isPro={isPro} />
                <UpgradeToProModal  />
            </div>
        </Layout>
    );
};

export default AffiliateDashboard;