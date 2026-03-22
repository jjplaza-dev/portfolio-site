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
    <div className=" min-h-screen bg-primary">
      <Navigation />
      <CustomCursor />

      <main className="relative z-10 bg-inherit">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="works" element={<Works />} />
        </Routes>
      </main>

      <FooterSection />
    </div>
  );
};

export default App;