import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign_Up from "../components/Authentication/Sign_Up"; 
import Log_In from "../components/Authentication/Log_In";
// import Home from "../pages/Home";
// import NotFound from "../pages/NotFound"; // 404 Page

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/login" element={<Log_In />} />
        {/* <Route path="*" element={<NotFound />} /> Catch-all 404 Route */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
