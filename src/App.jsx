import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import FooterSection from './components/FooterSection';
import CustomCursor from './designs/CustomCursor';
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';


const App = () => {
  const location = useLocation();

  return (
    <div className=" min-h-screen bg-primary overflow-x-hidden">
      <Navigation />
      <CustomCursor />

      <main className="relative z-10 bg-inherit">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="works" element={<Works />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </main>

      <FooterSection />
    </div>
  );
};

export default App;