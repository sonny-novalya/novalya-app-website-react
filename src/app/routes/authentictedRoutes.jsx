import { Route, Routes } from "react-router-dom";
import { AffiliatePage, DashboardPage ,AffiliateLinksPage,LevelCommissionPage,AffiliateSettingsPage} from "../pages/protected";

const AuthentictedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/affiliate/links" element={<AffiliateLinksPage />} />
        <Route path="/affiliate/level-commission" element={<LevelCommissionPage />} />
        <Route path="/affiliate/settings" element={<AffiliateSettingsPage />} />
      </Routes>
    </>
  );
};

export default AuthentictedRoutes;
