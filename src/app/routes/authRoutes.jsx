import { Route, Routes,Navigate } from "react-router-dom";
import Login from "../pages/auth/login/login";
import ForgetPassword from "../pages/auth/ForgetPassword/ForgetPassword";
import PlansIndex from "../pages/auth/plans/plansIndex";
import SignUp from "../pages/auth/signup/signup";
import CapturePage from "../pages/auth/capture/capture";
import ResetPassword from "../pages/auth/ForgetPassword/resetPassword";

const AuthRoutes = () => {
  const path = window.location.pathname
  const commonRoutes = ['/go-offer']
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/:token/:email" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/plans" element={<PlansIndex />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/capture" element={<CapturePage/>}/>
        <Route path="/reset-password/:token/:email" element={<ResetPassword/>}/>

      
        { !commonRoutes.includes(path) ? <Route path="*" element={<Navigate to="/login" replace />} />:null}
      </Routes>
    </>
  );
};

export default AuthRoutes;
