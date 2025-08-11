import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const images = [
    // Latest editorial images first
    { id: 1, src: '/IMG_7300.JPG', alt: 'Latest editorial portrait', category: 'portraits', title: 'Latest Editorial' },
    { id: 2, src: '/IMG_7299.JPG', alt: 'Editorial fashion portrait', category: 'portraits', title: 'Fashion Editorial' },
    { id: 3, src: '/IMG_7298.JPG', alt: 'Professional editorial shot', category: 'portraits', title: 'Professional Editorial' },
    { id: 4, src: '/IMG_7297.JPG', alt: 'Elegant fashion portrait', category: 'portraits', title: 'Elegant Fashion' },
    { id: 5, src: '/IMG_7295.JPG', alt: 'Editorial beauty shot', category: 'portraits', title: 'Editorial Beauty' },
    { id: 6, src: '/IMG_7294.JPG', alt: 'Fashion photography', category: 'portraits', title: 'Fashion Photography' },
    { id: 7, src: '/IMG_7293.JPG', alt: 'Editorial portrait session', category: 'portraits', title: 'Editorial Session' },
    { id: 8, src: '/IMG_7199.JPG', alt: 'Professional fashion shot', category: 'portraits', title: 'Professional Fashion' },

    // Previously added editorial images
    { id: 9, src: '/IMG_7142.JPG', alt: 'Editorial portrait close-up', category: 'portraits', title: 'Editorial Portrait' },
    { id: 10, src: '/IMG_7143.JPG', alt: 'Editorial portrait street scene', category: 'portraits', title: 'Editorial Portrait II' },
    { id: 11, src: '/IMG_7145.JPG', alt: 'Flowing gown in motion', category: 'portraits', title: 'Fashion In Motion' },
    { id: 12, src: '/IMG_7148.JPG', alt: 'Elegant editorial portrait', category: 'portraits', title: 'Elegant Editorial' },
    { id: 13, src: '/IMG_7149.JPG', alt: 'City walk with dogs', category: 'events', title: 'City Walk' },
    { id: 14, src: '/IMG_7151.JPG', alt: 'Sunlit staircase portrait', category: 'portraits', title: 'Sunlit Steps' },
    { id: 15, src: '/IMG_7152.JPG', alt: 'Editorial portrait seated', category: 'portraits', title: 'Graceful Poise' },

    // Existing images
    { id: 16, src: '/photo_2025-07-25 13.56.42.jpeg', alt: 'Portrait of beautiful woman', category: 'portraits', title: 'Graceful Portrait' },
    { id: 17, src: '/photo_2025-07-25 13.56.39.jpeg', alt: 'Corporate event celebration', category: 'events', title: 'Corporate Celebration' },
    { id: 18, src: '/photo_2025-07-25 13.56.32.jpeg', alt: 'Professional headshot', category: 'portraits', title: 'Professional Headshot' },
    { id: 19, src: '/photo_2025-07-25 13.56.25.jpeg', alt: 'Birthday party celebration', category: 'events', title: 'Birthday Joy' },
    { id: 20, src: '/photo_2025-07-25 13.56.17.jpeg', alt: 'Family portrait session', category: 'portraits', title: 'Family Moments' },
    { id: 21, src: '/photo_2025-07-25 13.56.13.jpeg', alt: 'Special event coverage', category: 'events', title: 'Special Event' },
    { id: 22, src: '/photo_2025-07-25 14.35.41.jpeg', alt: 'Event photography', category: 'events', title: 'Event Photography' },
    { id: 23, src: '/photo_2025-07-25 14.35.38.jpeg', alt: 'Portrait photography', category: 'portraits', title: 'Portrait Photography' },
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

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const goToNext = () => {
    setActiveIndex(prev => (prev + 1) % filteredImages.length);
  };

  const goToPrevious = () => {
    setActiveIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') goToNext();
      if (event.key === 'ArrowLeft') goToPrevious();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, filteredImages.length]);

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
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
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
        
        {/* Lightbox Modal */}
        <AnimatePresence>
          {isLightboxOpen && filteredImages[activeIndex] && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                aria-label="Close"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous */}
              <button
                aria-label="Previous image"
                className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              {/* Next */}
              <button
                aria-label="Next image"
                className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              <motion.div
                className="max-w-6xl w-full px-4"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredImages[activeIndex].src}
                  alt={filteredImages[activeIndex].alt}
                  className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="mt-4 text-center text-white/90">
                  <h3 className="text-lg font-semibold">{filteredImages[activeIndex].title}</h3>
                  <p className="text-sm capitalize opacity-80">{filteredImages[activeIndex].category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio; 