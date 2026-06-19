import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [text] = useTypewriter({
    words: [
      'From women with love to women' ],
    loop: true,
    delaySpeed: 2000,
  });












  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!backgroundRef.current) return;

      // The image stays perfectly still (position: fixed, no transform).
      // Instead we clip it away from the bottom as the page scrolls, so the
      // next section is revealed exactly as the hero scrolls off — the same
      // clipping behaviour as background-attachment: fixed, but mobile-safe.
      const scrolled = window.scrollY;
      const heroHeight = window.innerHeight;
      const clip = Math.min(Math.max(scrolled, 0), heroHeight);
      backgroundRef.current.style.clipPath = `inset(0px 0px ${clip}px 0px)`;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Fixed hero background — stays still while content scrolls over it.
          position:fixed works on mobile (background-attachment:fixed does not);
          clip-path reveals the next section without overlap. */}
      <div
        ref={backgroundRef}
        className="hero-parallax-bg fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none"
        style={{ zIndex: 0, willChange: 'clip-path' }}
        aria-hidden="true"
      >
        <img
          src="/photo_2025-07-25 13.56.46.jpeg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight logo-font"
          >
            seraieledit
          </motion.h1>

          {/* Subtitle with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 min-h-[2rem]"
          >
            <span className="text-gray-200">
              {text}
            </span>
            <Cursor cursorColor="#ffffff" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed text-center"
          >
            Professional photographer specializing in weddings, portraits, and events. 
            Let me capture your special moments with creativity and passion.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              View Portfolio
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-300"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>


    </section>
  );
};

export default Hero; 