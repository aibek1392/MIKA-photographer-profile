import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import InstagramFeed from './components/InstagramFeed';
import ContactMenu from './components/ContactMenu';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        {/* Opaque layer above the fixed hero background so these sections
            cover the image as they scroll over it. */}
        <div className="relative z-10 bg-white dark:bg-gray-900">
          <About />
          <Pricing />
          <Portfolio />
          <InstagramFeed />

          {/* Footer */}
          <Footer />
        </div>
      </main>

      {/* Floating contact menu (replaces the old Get In Touch section) */}
      <ContactMenu />
    </div>
  );
}

export default App;
