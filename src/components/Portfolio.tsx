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
    { id: 1, src: '/photo_2025-07-25 13.56.46.jpeg', alt: 'Wedding couple in elegant setting', category: 'weddings', title: 'Elegant Wedding' },
    { id: 2, src: '/photo_2025-07-25 13.56.42.jpeg', alt: 'Portrait of beautiful woman', category: 'portraits', title: 'Graceful Portrait' },
    { id: 3, src: '/photo_2025-07-25 13.56.39.jpeg', alt: 'Corporate event celebration', category: 'events', title: 'Corporate Celebration' },
    { id: 4, src: '/photo_2025-07-25 13.56.36.jpeg', alt: 'Intimate wedding ceremony', category: 'weddings', title: 'Intimate Ceremony' },
    { id: 5, src: '/photo_2025-07-25 13.56.32.jpeg', alt: 'Professional headshot', category: 'portraits', title: 'Professional Headshot' },
    { id: 6, src: '/photo_2025-07-25 13.56.25.jpeg', alt: 'Birthday party celebration', category: 'events', title: 'Birthday Joy' },
    { id: 7, src: '/photo_2025-07-25 13.56.22.jpeg', alt: 'Wedding reception moments', category: 'weddings', title: 'Reception Memories' },
    { id: 8, src: '/photo_2025-07-25 13.56.17.jpeg', alt: 'Family portrait session', category: 'portraits', title: 'Family Moments' },
    { id: 9, src: '/photo_2025-07-25 13.56.13.jpeg', alt: 'Special event coverage', category: 'events', title: 'Special Event' },
    { id: 10, src: '/photo_2025-07-25 13.56.11.jpeg', alt: 'Wedding details and decor', category: 'weddings', title: 'Wedding Details' },
    { id: 11, src: '/photo_2025-07-25 14.35.44.jpeg', alt: 'Wedding ceremony moments', category: 'weddings', title: 'Ceremony Moments' },
    { id: 12, src: '/photo_2025-07-25 14.35.41.jpeg', alt: 'Event photography', category: 'events', title: 'Event Photography' },
    { id: 13, src: '/photo_2025-07-25 14.35.38.jpeg', alt: 'Portrait photography', category: 'portraits', title: 'Portrait Photography' },
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
            <ToggleGroupItem value="all" className="sm:px-4">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="weddings" className="sm:px-4">
              Weddings
            </ToggleGroupItem>
            <ToggleGroupItem value="portraits" className="sm:px-4">
              Portraits
            </ToggleGroupItem>
            <ToggleGroupItem value="events" className="sm:px-4">
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