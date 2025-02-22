import withSidebarLayout from "../common/sidebar/withSidebarLayout";
import Dashboard from "./dashboard/dashboard";
import AffiliateDashboard from "./affiliate/affiliateDashboard/AffiliateDashboard";
import AffiliateLinks from "./affiliate/affiliateLinks/affiliateLinks";
import AffiliateSettings from "./affiliate/settings/affiliateSettings";
import LevelCommission from "./affiliate/level-commissions/levelCommission";
import Prospecting from "./fb/prospecting/Prospecting";
import Crm from "./fb/crm/Crm";
import Birthday from "./fb/birthday/Birthday";
import FriendsList from "./fb/friends-list/FriendsList";
import Request from "./fb/request/Request";

const DashboardPage = withSidebarLayout(Dashboard);
const AffiliatePage = withSidebarLayout(AffiliateDashboard);
const AffiliateLinksPage= withSidebarLayout(AffiliateLinks);
const LevelCommissionPage = withSidebarLayout(LevelCommission);
const AffiliateSettingsPage = withSidebarLayout(AffiliateSettings);
const ProspectingPage = withSidebarLayout(Prospecting);
const CrmPage = withSidebarLayout(Crm);
const BirthdayPage = withSidebarLayout(Birthday);
const FriendsPage = withSidebarLayout(FriendsList);
const RequestPage = withSidebarLayout(Request);

export { DashboardPage, AffiliatePage, AffiliateLinksPage, LevelCommissionPage, AffiliateSettingsPage, ProspectingPage, CrmPage, BirthdayPage, FriendsPage, RequestPage }