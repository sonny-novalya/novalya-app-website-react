import { Route, Routes } from "react-router-dom";
import { AffiliatePage, DashboardPage } from "../pages/protected";

const AuthentictedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
      </Routes>
    </>
  );
};

export default AuthentictedRoutes;
