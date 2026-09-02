import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyMobileCTA from './components/StickyMobileCTA';

// Pages
import Home from './pages/Home';
import PuneToMumbai from './pages/PuneToMumbai';
import MumbaiToPune from './pages/MumbaiToPune';
import Fleet from './pages/Fleet';
import AboutUs from './pages/AboutUs';
import ContactBooking from './pages/ContactBooking';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <CMSProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pune-to-mumbai-cab" element={<PuneToMumbai />} />
              <Route path="/mumbai-to-pune-cab" element={<MumbaiToPune />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-booking" element={<ContactBooking />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <StickyMobileCTA />
        </div>
      </Router>
    </CMSProvider>
  );
}

export default App;
