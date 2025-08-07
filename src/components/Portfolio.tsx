import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');

  const images = [
    { id: 1, src: '/photo_2025-07-25 13.56.42.jpeg', alt: 'Portrait of beautiful woman', category: 'portraits', title: 'Graceful Portrait' },
    { id: 2, src: '/photo_2025-07-25 13.56.39.jpeg', alt: 'Corporate event celebration', category: 'events', title: 'Corporate Celebration' },
    { id: 3, src: '/photo_2025-07-25 13.56.32.jpeg', alt: 'Professional headshot', category: 'portraits', title: 'Professional Headshot' },
    { id: 4, src: '/photo_2025-07-25 13.56.25.jpeg', alt: 'Birthday party celebration', category: 'events', title: 'Birthday Joy' },
    { id: 5, src: '/photo_2025-07-25 13.56.17.jpeg', alt: 'Family portrait session', category: 'portraits', title: 'Family Moments' },
    { id: 6, src: '/photo_2025-07-25 13.56.13.jpeg', alt: 'Special event coverage', category: 'events', title: 'Special Event' },
    { id: 7, src: '/photo_2025-07-25 14.35.41.jpeg', alt: 'Event photography', category: 'events', title: 'Event Photography' },
    { id: 8, src: '/photo_2025-07-25 14.35.38.jpeg', alt: 'Portrait photography', category: 'portraits', title: 'Portrait Photography' },
    // New photos added
    { id: 9, src: '/IMG_7152.JPG', alt: 'Professional portrait photography', category: 'portraits', title: 'Professional Portrait' },
    { id: 10, src: '/IMG_7151.JPG', alt: 'Creative portrait session', category: 'portraits', title: 'Creative Portrait' },
    { id: 11, src: '/IMG_7149.JPG', alt: 'Event photography coverage', category: 'events', title: 'Event Coverage' },
    { id: 12, src: '/IMG_7148.JPG', alt: 'Portrait photography session', category: 'portraits', title: 'Portrait Session' },
    { id: 13, src: '/IMG_7145.JPG', alt: 'Corporate event photography', category: 'events', title: 'Corporate Event' },
    { id: 14, src: '/IMG_7143.JPG', alt: 'Professional headshot photography', category: 'portraits', title: 'Professional Headshot' },
    { id: 15, src: '/IMG_7142.JPG', alt: 'Event celebration photography', category: 'events', title: 'Event Celebration' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <section id="portfolio" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            Portfolio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore my collection of captured moments, from intimate weddings to professional portraits. 
            Each image tells a unique story and reflects my passion for photography.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12"
        >
          <ToggleGroup
            type="single"
            value={selectedCategory}
            onValueChange={handleCategoryChange}
          >
            <ToggleGroupItem value="all">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="portraits">
              Portraits
            </ToggleGroupItem>
            <ToggleGroupItem value="events">
              Events
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>

        {/* Flip Reveal Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.2
            }}
            className="w-full"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square bg-gray-100 dark:bg-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', image.src);
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={() => console.log('Image loaded:', image.src)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-end justify-start p-4">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                      <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                      <p className="text-white/80 text-sm capitalize">{image.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio; 