import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CircularGalleryProps {
  images: string[];
  radius?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  images,
  radius = 200,
  autoRotate = true,
  autoRotateSpeed = 0.5
}) => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoRotation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentAngle((prev) => prev + autoRotateSpeed);
    }, 50);
  }, [autoRotateSpeed]);

  const stopAutoRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAutoRotating && !isHovered) {
      startAutoRotation();
    } else {
      stopAutoRotation();
    }

    return () => stopAutoRotation();
  }, [isAutoRotating, isHovered, startAutoRotation, stopAutoRotation]);

  const nextImage = () => {
    setCurrentAngle((prev) => prev + (360 / images.length));
  };

  const prevImage = () => {
    setCurrentAngle((prev) => prev - (360 / images.length));
  };

  const getImagePosition = (index: number) => {
    const angle = (360 / images.length) * index + currentAngle;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    const z = Math.cos(radian) * radius * 0.5;
    
    return { x, y, z, angle };
  };

  const openLightbox = (image: string) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Circular Gallery Container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Center Point */}
        <div className="absolute w-4 h-4 bg-white rounded-full shadow-lg z-10" />
        
        {/* Images */}
        {images.map((image, index) => {
          const position = getImagePosition(index);
          const isFront = Math.abs(position.angle % 360) < 90 || Math.abs(position.angle % 360) > 270;
          
          return (
            <motion.div
              key={index}
              className="absolute cursor-pointer"
              style={{
                x: position.x,
                y: position.y,
                z: position.z,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                x: position.x,
                y: position.y,
                z: position.z,
                scale: isFront ? 1 : 0.8,
                opacity: isFront ? 1 : 0.6,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
              }}
              whileHover={{
                scale: 1.1,
                z: position.z + 50,
                transition: { duration: 0.2 }
              }}
              onClick={() => openLightbox(image)}
            >
              <div className="relative group">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-lg border-2 border-white/20"
                  style={{
                    transform: `rotateY(${position.angle}deg)`,
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <motion.button
          onClick={prevImage}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={20} />
        </motion.button>
        
        <motion.button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isAutoRotating 
              ? 'bg-white/20 text-white' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoRotating ? 'Pause' : 'Play'}
        </motion.button>
        
        <motion.button
          onClick={nextImage}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <X size={20} />
              </button>
              <img
                src={selectedImage}
                alt="Selected image"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircularGallery; 