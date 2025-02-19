import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/protected/dashboard/dashboard";

const AuthentictedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default AuthentictedRoutes;
