import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/login";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
