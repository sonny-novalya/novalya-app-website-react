import { Route, Routes,Navigate } from "react-router-dom";
// import { AffiliatePage, DashboardPage ,AffiliateLinksPage,LevelCommissionPage,AffiliateSettingsPage} from "../pages/protected";
import { AffiliatePage, DashboardPage, ProspectingPage, CrmPage, BirthdayPage, FriendsPage, RequestPage, MessageIndexPage, AffiliateLinksPage, LevelCommissionPage, AffiliateSettingsPage, IgProspectingPage } from "../pages/protected";


const AuthentictedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/fb/prospecting" element={<ProspectingPage />} />
        <Route path="/fb/birthday" element={<BirthdayPage />} />
        <Route path="/fb/crm" element={<CrmPage />} />
        <Route path="/fb/friends" element={<FriendsPage />} />
        <Route path="/fb/request" element={<RequestPage />} />
        <Route path="/ig/prospecting" element={<IgProspectingPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/library/messages" element={<MessageIndexPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/affiliate/links" element={<AffiliateLinksPage />} />
        <Route path="/affiliate/level-commission" element={<LevelCommissionPage />} />
        <Route path="/affiliate/settings" element={<AffiliateSettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AuthentictedRoutes;
