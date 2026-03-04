import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import FooterSection from './components/FooterSection';
import CustomCursor from './designs/CustomCursor';
import Home from './pages/Home';
import Works from './pages/Works';

// Optional: If you create a separate page for project details later
// import ProjectDetail from './pages/ProjectDetail'; 

const App = () => {
  const location = useLocation();

  return (
    <div className="bg-[oklch(97.466%_0.011_259.822)] min-h-screen selection:bg-primary selection:text-white">
      <Navigation />
      <CustomCursor />

      <main className="relative z-10">
        <Routes location={location} key={location.pathname}>
          <Route path="home" element={<Home />} />
          <Route path="works" element={<Works />} />
        </Routes>
      </main>

      <FooterSection />
    </div>
  );
};

export default App;