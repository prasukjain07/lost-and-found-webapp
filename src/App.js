import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import HelpUs from "./help-us-find-page/HelpUs";
import AboutUs from "./About/AboutUs";
import Home from "./home-page/Home";
import GoToTop from "./go-to-top/GoToTop";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LostUpload from './lost-details-upload-page/LostUpload';
import FoundUpload from './found-item-details-page/FoundUpload';

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = (theme) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log(theme);
  };

  const [showConfirmPage, setShowConfirmPage] = useState(false);

  const showConfirm = (value) => {
    setShowConfirmPage(value);
  };

  return (
    <Router>
      {showConfirmPage ? (
        <Confirm func={showConfirm} />
      ) : (
        <>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <Routes>
            {/* Define the default route */}
            <Route path="/" element={<Navigate to="/home" />} />
            
            {/* Public routes */}
            <Route path="/home" element={<Home theme={theme} />} />
            <Route path="/about" element={<AboutUs theme={theme} />} />
            <Route path="/lost" element={<LostUpload theme={theme} />} />
            <Route path="/found" element={<FoundUpload theme={theme} />} />
            <Route path="/helpusfind" element={<HelpUs theme={theme} />} />
          </Routes>
          <GoToTop />
        </>
      )}
    </Router>
  );
};

export default App;
