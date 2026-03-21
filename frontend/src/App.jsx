import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
// import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
