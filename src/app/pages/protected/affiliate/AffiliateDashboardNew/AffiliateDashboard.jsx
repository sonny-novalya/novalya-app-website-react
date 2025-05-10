import Layout from '../../Layout';
import AffiliateLinkSection from './AffiliateLinkSection';
import AffiliateTableSection from './AffiliateTableSection';
import EarningAndPromotion from './openDashboardComponents/EarningAndPromotion';
import TopBanner from './openDashboardComponents/TopBanner';
import PaymentTableSection from './tablesComponents/PaymentTableSection';


const AffiliateDashboard = () => {

    const isPro = false

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

                <TopBanner />
                <EarningAndPromotion />
                <AffiliateLinkSection isPro={isPro} />
                <AffiliateTableSection isPro={isPro} />
                <PaymentTableSection isPro={isPro} />

            </div>
        </Layout>
    );
};

export default AffiliateDashboard;