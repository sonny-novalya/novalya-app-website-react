import { Route, Routes,Navigate } from "react-router-dom";
// import { AffiliatePage, DashboardPage ,AffiliateLinksPage,LevelCommissionPage,AffiliateSettingsPage} from "../pages/protected";

import { AffiliatePage, DashboardPage, CrmPage, BirthdayPage, FriendsPage, RequestPage, MessageIndexPage, AffiliateLinksPage, LevelCommissionPage, AffiliateSettingsPage, UnfriendedPage, DeactivatedPage, WhitelistPage, IgCrmPage, AiCommentsPage, KeywordsPage, ConnectionDashboardPage, FbProspectingPage, IgProspectingPage } from "../pages/protected";
import MessageTempIndex from "../components/messageTemp/messageTempIndex";
import useMessageSteps from "../../store/messageTemp/MessageTemp";



const AuthentictedRoutes = () => {
  const {isMessage,step,selectedPlatform,setIsMessage} = useMessageSteps();

  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/connection" element={<ConnectionDashboardPage />} />
        <Route path="/fb/prospecting" element={<FbProspectingPage />} />
        <Route path="/ig/prospecting" element={<IgProspectingPage />} />
        <Route path="/fb/birthday" element={<BirthdayPage />} />
        <Route path="/fb/crm" element={<CrmPage />} />
        <Route path="/fb/request" element={<RequestPage />} />
        <Route path="/ig/crm" element={<IgCrmPage />} />
        <Route path="/ai-comments" element={<AiCommentsPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/library/messages" element={<MessageIndexPage />} />
        <Route path="/library/keywords" element={<KeywordsPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/affiliate/links" element={<AffiliateLinksPage />} />
        <Route path="/affiliate/level-commission" element={<LevelCommissionPage />} />
        <Route path="/affiliate/settings" element={<AffiliateSettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/friendlist/friends" element={<FriendsPage />} />
        <Route path="/friendlist/unfriend" element={<UnfriendedPage />} />
        <Route path="/friendlist/deactivated" element={<DeactivatedPage />} />
        <Route path="/friendlist/whitelist" element={<WhitelistPage />} /> 
      </Routes>
    {isMessage ? <MessageTempIndex step={step} selectedPlatform={selectedPlatform} setIsMessage={setIsMessage}/>:""}

    </>
  );
};

export default AuthentictedRoutes;
