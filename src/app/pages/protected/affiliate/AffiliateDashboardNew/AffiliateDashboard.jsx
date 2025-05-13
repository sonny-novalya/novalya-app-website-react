import { useEffect, useState } from 'react';
import Layout from '../../Layout';
import AffiliateLinkSection from './AffiliateLinkSection';
import AffiliateTableSection from './AffiliateTableSection';
import EarningAndPromotion from './openDashboardComponents/EarningAndPromotion';
import TopBanner from './openDashboardComponents/TopBanner';
import PaymentTableSection from './tablesComponents/PaymentTableSection';
import UpgradeToProModal from './UpgradeToProModal';
import useLoginUserDataStore from '../../../../../store/loginuser/loginuserdata';
import { Spin } from 'antd';

const AffiliateDashboard = () => {
    const [isPro, setIsPro] = useState(false);
    const { loginUserData, fetchLoginUserData, loading } = useLoginUserDataStore();

    useEffect(() => {
        fetchLoginUserData({});
    }, []);

    useEffect(() => {
        console.log(loginUserData?.randomcode)
        if (loginUserData?.user_type?.toLowerCase() !== "distributor") {
            setIsPro(true);
        } else {
            setIsPro(false);
        }
    }, [loginUserData]);


    if (!loginUserData) return null;

    return (
        <Layout>
            <div className="relative">
                {loading && (
                    <div
                        className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-80 z-50 rounded-lg h-screen"
                    >
                        <Spin size="large" />
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-medium text-[#000407]">Affiliate</h2>
                    <div></div>
                </div>

                {isPro && <TopBanner />}
                <EarningAndPromotion isPro={isPro} />
                <AffiliateLinkSection isPro={isPro} randomCode={loginUserData?.randomcode} />
                <AffiliateTableSection isPro={isPro} />
                <PaymentTableSection isPro={isPro} />
                <UpgradeToProModal />
            </div>
        </Layout>
    );
};

export default AffiliateDashboard;
