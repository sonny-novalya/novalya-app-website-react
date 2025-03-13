import { Route, Routes,Navigate } from "react-router-dom";
import Login from "../pages/auth/login/login";
import ForgetPassword from "../pages/auth/ForgetPassword/ForgetPassword";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/:token/:email" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
