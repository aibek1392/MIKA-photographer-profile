import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface GalleryItem {
  id: number;
  image: string;
  text: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const calculatePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 350; // Increased radius to accommodate all images
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Apply bend effect
    const bendFactor = bend;
    const bentY = y * (1 + Math.abs(x) / 1000 * bendFactor);
    
    return { x: x, y: bentY };
  };

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Circular Gallery Items */}
        {items.map((item, index) => {
          const position = calculatePosition(index, items.length);
          
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                zIndex: index === 0 ? 10 : 1,
              }}
              whileHover={{ 
                scale: 1.15,
                zIndex: 20,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemClick(item)}
              className="cursor-pointer group"
            >
              {/* Image Container */}
              <div 
                className="relative overflow-hidden rounded-lg shadow-2xl"
                style={{
                  borderRadius: `${borderRadius * 100}%`,
                  width: '140px',
                  height: '105px',
                }}
              >
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 
                      className="text-sm font-semibold mb-1"
                      style={{ color: textColor }}
                    >
                      {item.text}
                    </h3>
                    <div className="text-xs opacity-80" style={{ color: textColor }}>
                      Click to view
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Modal for Selected Item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.text}
                className="w-full h-full object-contain"
              />
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 
                  className="text-2xl font-bold"
                  style={{ color: textColor }}
                >
                  {selectedItem.text}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircularGallery; 