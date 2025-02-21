import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/login";
import { AffiliatePage, DashboardPage } from "../pages/protected";
import ForgetPassword from "../pages/auth/ForgetPassword/ForgetPassword";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
