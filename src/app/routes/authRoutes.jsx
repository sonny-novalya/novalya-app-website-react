import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/login";
import { AffiliatePage, DashboardPage, ProspectingPage, CrmPage, BirthdayPage, FriendsPage, RequestPage, MessageIndexPage } from "../pages/protected";
import ForgetPassword from "../pages/auth/ForgetPassword/ForgetPassword";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/fb/prospecting" element={<ProspectingPage />} />
        <Route path="/fb/birthday" element={<BirthdayPage />} />
        <Route path="/fb/crm" element={<CrmPage />} />
        <Route path="/fb/friends" element={<FriendsPage />} />
        <Route path="/fb/request" element={<RequestPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/library/messages" element={<MessageIndexPage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
