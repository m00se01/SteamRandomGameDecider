import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/HomePage/Home";
import { StartingPage } from "./pages/StartPage/StartingPage";
import HelpPage from "./pages/HelpPage/HelpPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
