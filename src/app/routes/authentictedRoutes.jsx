import { Route, Routes,Navigate } from "react-router-dom";
// import { AffiliatePage, DashboardPage ,AffiliateLinksPage,LevelCommissionPage,AffiliateSettingsPage} from "../pages/protected";

import { AffiliatePage, DashboardPage, CrmPage, BirthdayPage, FriendsPage, RequestPage, MessageIndexPage, AffiliateLinksPage, LevelCommissionPage, AffiliateSettingsPage, FbGroupsTablePage, FbPostTablePage, IgFollowersPage, IgPostsPage, IgHashtagPage, UnfriendedPage, DeactivatedPage, WhitelistPage, IgCrmPage, AiCommentsPage } from "../pages/protected";
import MessageTempIndex from "../components/messageTemp/messageTempIndex";
import useMessageSteps from "../../store/messageTemp/MessageTemp";



const AuthentictedRoutes = () => {
  const {isMessage,step,selectedPlatform} = useMessageSteps();

  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/fb/prospecting/groups" element={<FbGroupsTablePage />} />
        <Route path="/fb/prospecting/posts" element={<FbPostTablePage />} />
        <Route path="/fb/birthday" element={<BirthdayPage />} />
        <Route path="/fb/crm" element={<CrmPage />} />
        <Route path="/fb/friends" element={<FriendsPage />} />
        <Route path="/fb/request" element={<RequestPage />} />
        <Route path="/ig/prospecting/followers" element={<IgFollowersPage />} />
        <Route path="/ig/prospecting/posts" element={<IgPostsPage />} />
        <Route path="/ig/prospecting/hashtags" element={<IgHashtagPage />} />
        <Route path="/ig/crm" element={<IgCrmPage />} />
        <Route path="/ai-comments" element={<AiCommentsPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/library/messages" element={<MessageIndexPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/affiliate/links" element={<AffiliateLinksPage />} />
        <Route path="/affiliate/level-commission" element={<LevelCommissionPage />} />
        <Route path="/affiliate/settings" element={<AffiliateSettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/fb/unfriended" element={<UnfriendedPage />} />
        <Route path="/fb/deactivated" element={<DeactivatedPage />} />
        <Route path="/fb/whitelist" element={<WhitelistPage />} />
      </Routes>
    {isMessage ? <MessageTempIndex step={step} selectedPlatform={selectedPlatform}/>:""}

    </>
  );
};

export default AuthentictedRoutes;
