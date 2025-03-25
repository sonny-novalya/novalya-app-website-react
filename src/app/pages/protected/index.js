import withSidebarLayout from "../common/sidebar/withSidebarLayout";
import Dashboard from "./dashboard/dashboard";
import AffiliateDashboard from "./affiliate/affiliateDashboard/AffiliateDashboard";
import AffiliateLinks from "./affiliate/affiliateLinks/affiliateLinks";
import AffiliateSettings from "./affiliate/settings/affiliateSettings";
import LevelCommission from "./affiliate/level-commissions/levelCommission";
import Crm from "./fb/crm/Crm";
import Birthday from "./fb/birthday/Birthday";
import FriendsList from "./fb/friends-list/FriendsList";
import Request from "./fb/request/Request";
import MessageIndex from "./library/message/messageIndex";
import IgFollowers from "./ig/prospecting/FollowersTable";
import IgHashtags from "./ig/prospecting/HashtagsTable";
import IgPost from "./ig/prospecting/PostsTable";
import GroupsTable from "./fb/prospecting/GroupsTable";
import PostsTable from "./fb/prospecting/PostTable";

const DashboardPage = withSidebarLayout(Dashboard);
const AffiliatePage = withSidebarLayout(AffiliateDashboard);
const AffiliateLinksPage= withSidebarLayout(AffiliateLinks);
const LevelCommissionPage = withSidebarLayout(LevelCommission);
const AffiliateSettingsPage = withSidebarLayout(AffiliateSettings);
const FbGroupsTablePage = withSidebarLayout(GroupsTable);
const FbPostTablePage = withSidebarLayout(PostsTable);
const CrmPage = withSidebarLayout(Crm);
const BirthdayPage = withSidebarLayout(Birthday);
const FriendsPage = withSidebarLayout(FriendsList);
const RequestPage = withSidebarLayout(Request);
const MessageIndexPage = withSidebarLayout(MessageIndex);
const IgFollowersPage = withSidebarLayout(IgFollowers);
const IgPostsPage = withSidebarLayout(IgPost);
const IgHashtagPage = withSidebarLayout(IgHashtags);

export { DashboardPage, AffiliatePage, AffiliateLinksPage, LevelCommissionPage, AffiliateSettingsPage, CrmPage, BirthdayPage, FriendsPage, RequestPage, MessageIndexPage,  FbGroupsTablePage, FbPostTablePage, IgFollowersPage, IgPostsPage, IgHashtagPage }