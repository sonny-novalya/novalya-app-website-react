import withSidebarLayout from "../common/sidebar/withSidebarLayout";
import Dashboard from "./dashboard/dashboard";
import AffiliateDashboard from "./affiliate/affiliateDashboard/AffiliateDashboard";
import AffiliateLinks from "./affiliate/affiliateLinks/affiliateLinks";
import AffiliateSettings from "./affiliate/settings/affiliateSettings";
import LevelCommission from "./affiliate/level-commissions/levelCommission";

const DashboardPage = withSidebarLayout(Dashboard);
const AffiliatePage = withSidebarLayout(AffiliateDashboard);
const AffiliateLinksPage= withSidebarLayout(AffiliateLinks);
const LevelCommissionPage = withSidebarLayout(LevelCommission);
const AffiliateSettingsPage = withSidebarLayout(AffiliateSettings);

export { DashboardPage , AffiliatePage,AffiliateLinksPage,LevelCommissionPage,AffiliateSettingsPage}