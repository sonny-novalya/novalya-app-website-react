import { Route, Routes } from "react-router-dom";
import GoPage from "../pages/common/go/goPage";

const CommonRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/go-offer" element={<GoPage />} />
      </Routes>
    </>
  );
};

export default CommonRoutes;
