import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CircularGallery from './CircularGallery';

const InstagramFeed: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const instagramItems = [
    {
      image: '/photo_2025-07-25 13.56.46.jpeg',
      text: 'Elegant Wedding'
    },
    {
      image: '/photo_2025-07-25 13.56.42.jpeg',
      text: 'Portrait Perfection'
    },
    {
      image: '/photo_2025-07-25 13.56.39.jpeg',
      text: 'Corporate Events'
    },
    {
      image: '/photo_2025-07-25 13.56.36.jpeg',
      text: 'Wedding Ceremony'
    },
    {
      image: '/photo_2025-07-25 13.56.32.jpeg',
      text: 'Professional Headshots'
    },
    {
      image: '/photo_2025-07-25 13.56.25.jpeg',
      text: 'Event Photography'
    },
    {
      image: '/photo_2025-07-25 13.56.22.jpeg',
      text: 'Reception Memories'
    },
    {
      image: '/photo_2025-07-25 13.56.17.jpeg',
      text: 'Family Portraits'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white"
          >
            Instagram Feed
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Follow my latest work and behind-the-scenes moments on Instagram. 
            Each image captures a unique story and showcases my passion for photography.
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full h-[600px]">
          <CircularGallery 
            items={instagramItems}
            bend={1.5}
            textColor="#ffffff"
            borderRadius={0.05}
            font="bold 30px Inter"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com/mikavisionnyc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @mikavisionnyc
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed; 