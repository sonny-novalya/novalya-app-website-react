import Layout from '../../Layout';
import AffiliateLinkSection from './AffiliateLinkSection';
import AffiliateTableSection from './AffiliateTableSection';
import EarningAndPromotion from './openDashboardComponents/EarningAndPromotion';
import TopBanner from './openDashboardComponents/TopBanner';
import PaymentTableSection from './tablesComponents/PaymentTableSection';


const AffiliateDashboard = () => {
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
                <AffiliateLinkSection />
                <AffiliateTableSection />
                <PaymentTableSection />

            </div>
        </Layout>
    );
};

export default AffiliateDashboard;