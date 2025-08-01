import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [text] = useTypewriter({
    words: [
      'Capturing Life\'s Beautiful Moments',
      'Professional Wedding Photography',
      'Portrait & Event Photography',
      'Creating Timeless Memories'
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports parallax (not mobile)
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
    if (isMobile || !backgroundRef.current) return;

    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset;
        const heroHeight = window.innerHeight;
        
        // Only apply parallax when in the hero section
        if (scrolled < heroHeight) {
          const rate = scrolled * 0.5; // Background moves slower than scroll
          backgroundRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
          backgroundRef.current.style.opacity = '1';
        } else {
          // Hide background when scrolled past hero
          backgroundRef.current.style.opacity = '0';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        ref={backgroundRef}
        className="parallax-bg absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/photo_2025-07-25 13.56.46.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          willChange: 'transform',
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
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
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
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
            className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
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