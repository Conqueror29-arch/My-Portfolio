
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CTA from './components/CTA';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import ProjectDetail from './pages/ProjectDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import NotFound from './pages/NotFound';
import Background from './components/Background';
import Preloader from './components/Preloader';
import BackgroundCurves from './components/BackgroundCurves';
import ShootingStars from './components/ShootingStars';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PageTitleUpdater = () => {
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    let title = 'My Portfolio | Harishama';

    if (path === '/') {
      title = 'My Portfolio | Harishama';
    } else if (path.includes('/about')) {
      title = 'About | Harishama';
    } else if (path.includes('/skills')) {
      title = 'Skills | Harishama';
    } else if (path.includes('/works')) {
      title = 'Works | Harishama';
    } else if (path.includes('/contact')) {
      title = 'Contact | Harishama';
    } else if (path.includes('/privacy-policy')) {
      title = 'Privacy Policy | Harishama';
    } else if (path.includes('/terms-of-use')) {
      title = 'Terms of Use | Harishama';
    }

    document.title = title;
  }, [location]);

  return null;
};

// Layout component
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <CTA />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Preloader />
      <ScrollToTop />
      <PageTitleUpdater />
      
      {/* 
         The Background component sits at z-[-1]
      */}
      <div className="min-h-screen text-textMain selection:bg-accent selection:text-white flex flex-col font-sans relative overflow-x-hidden">
        
        {/* Background Layer */}
        <Background />
        
        {/* Universal Shooting Stars */}
        <ShootingStars />
        
        {/* Cursor Overlay */}
        <BackgroundCurves />
        
        {/* Content Layer: Z-Index 10 ensures it's above the background canvas */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Routes>
            {/* Main Layout Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
            </Route>

            {/* Standalone Routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
      </div>
    </HashRouter>
  );
};

export default App;
