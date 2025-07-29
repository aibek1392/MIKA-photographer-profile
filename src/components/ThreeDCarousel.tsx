import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Interface for individual carousel items
 */
export interface CarouselItem {
  id: string | number;
  imageUrl: string;
  alt: string;
  title?: string;
  description?: string;
}

/**
 * Props interface for the ThreeDCarousel component
 */
export interface ThreeDCarouselProps {
  /** Array of images to display in the carousel */
  items: CarouselItem[];
  /** Auto-play functionality (default: true) */
  autoPlay?: boolean;
  /** Auto-play interval in milliseconds (default: 3000) */
  autoPlayInterval?: number;
  /** Show navigation arrows (default: true) */
  showNavigation?: boolean;
  /** Show dot indicators (default: true) */
  showDots?: boolean;
  /** Show progress bar (default: true) */
  showProgressBar?: boolean;
  /** Carousel height in pixels (default: 450) */
  height?: number;
  /** Carousel width classes (default: 'max-w-7xl') */
  width?: string;
  /** Custom className for the container */
  className?: string;
  /** Callback when an item is clicked */
  onItemClick?: (item: CarouselItem, index: number) => void;
  /** Callback when carousel index changes */
  onIndexChange?: (index: number) => void;
}

/**
 * 3D Photo Carousel Component
 * 
 * A responsive 3D carousel that displays images in a circular layout with smooth animations.
 * Matches the design from https://21st.dev/cult-ui/3d-carousel/default
 * 
 * Features:
 * - 3D perspective transforms
 * - Auto-play with pause on hover
 * - Navigation arrows and dot indicators
 * - Responsive design
 * - TypeScript support
 * - Customizable props
 */
export const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 3000,
  showNavigation = true,
  showDots = true,
  showProgressBar = true,
  height = 450,
  width = 'max-w-7xl',
  className = '',
  onItemClick,
  onIndexChange,
}) => {
  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  
  // Ref for auto-play interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Start auto-play functionality
   */
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
  }, [autoPlayInterval, items.length]);

  /**
   * Stop auto-play functionality
   */
  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Effect to handle auto-play state changes
   */
  useEffect(() => {
    if (isAutoPlaying && !isHovered && autoPlay && items.length > 1) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isAutoPlaying, isHovered, autoPlay, items.length, startAutoPlay, stopAutoPlay]);

  /**
   * Effect to notify parent of index changes
   */
  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  /**
   * Navigate to next slide
   */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  /**
   * Navigate to previous slide
   */
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  /**
   * Navigate to specific slide
   */
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  /**
   * Toggle auto-play state
   */
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying);
  }, [isAutoPlaying]);

  /**
   * Handle item click
   */
  const handleItemClick = useCallback((item: CarouselItem, index: number) => {
    if (index === currentIndex) {
      onItemClick?.(item, index);
    } else {
      goToSlide(index);
    }
  }, [currentIndex, onItemClick, goToSlide]);

  /**
   * Calculate 3D transform styles for each carousel item
   */
  const getCardStyle = useCallback((index: number) => {
    const offset = (index - currentIndex + items.length) % items.length;
    
    let transform = '';
    let zIndex = 1;
    let opacity = 0.3;

    // Define positions for each offset
    const positions = {
      0: { // Center card
        transform: 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)',
        zIndex: 10,
        opacity: 1,
      },
      1: { // Right card
        transform: 'translateX(120px) translateZ(-80px) rotateY(-20deg) scale(0.85)',
        zIndex: 9,
        opacity: 0.8,
      },
      [items.length - 1]: { // Left card
        transform: 'translateX(-120px) translateZ(-80px) rotateY(20deg) scale(0.85)',
        zIndex: 9,
        opacity: 0.8,
      },
      2: { // Far right card
        transform: 'translateX(220px) translateZ(-160px) rotateY(-35deg) scale(0.7)',
        zIndex: 8,
        opacity: 0.6,
      },
      [items.length - 2]: { // Far left card
        transform: 'translateX(-220px) translateZ(-160px) rotateY(35deg) scale(0.7)',
        zIndex: 8,
        opacity: 0.6,
      },
      3: { // Very far right
        transform: 'translateX(320px) translateZ(-240px) rotateY(-50deg) scale(0.55)',
        zIndex: 7,
        opacity: 0.45,
      },
      [items.length - 3]: { // Very far left
        transform: 'translateX(-320px) translateZ(-240px) rotateY(50deg) scale(0.55)',
        zIndex: 7,
        opacity: 0.45,
      },
      4: { // Ultra far right
        transform: 'translateX(420px) translateZ(-320px) rotateY(-65deg) scale(0.4)',
        zIndex: 6,
        opacity: 0.3,
      },
      [items.length - 4]: { // Ultra far left
        transform: 'translateX(-420px) translateZ(-320px) rotateY(65deg) scale(0.4)',
        zIndex: 6,
        opacity: 0.3,
      },
    };

    // Get position or default for hidden cards
    const position = positions[offset] || {
      transform: 'translateX(0px) translateZ(-400px) rotateY(0deg) scale(0.2)',
      zIndex: 1,
      opacity: 0.1,
    };

    return position;
  }, [currentIndex, items.length]);

  // Early return if no items
  if (!items || items.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 text-gray-500 ${className}`}>
        No items to display
      </div>
    );
  }

  return (
    <div className={`relative w-full ${width} mx-auto ${className}`}>
      {/* Main Carousel Container */}
      <div 
        className="relative overflow-hidden"
        style={{
          height: `${height}px`,
          perspective: '1200px',
          perspectiveOrigin: 'center center'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 3D Carousel Items */}
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="absolute cursor-pointer w-56 h-72 sm:w-48 sm:h-64 md:w-56 md:h-72"
              style={getCardStyle(index)}
              initial={false}
              animate={getCardStyle(index)}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 25,
                duration: 0.6
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              onClick={() => handleItemClick(item, index)}
              aria-label={`Carousel item ${index + 1}: ${item.alt}`}
            >
              <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden group">
                {/* Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index <= 2 ? 'eager' : 'lazy'} // Optimize loading
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Optional Title/Description on Hover */}
                  {(item.title || item.description) && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {item.title && (
                        <h3 className="text-white font-semibold text-sm mb-1 truncate">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-white/80 text-xs truncate">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Hover Effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {showNavigation && items.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200" />
          </button>
        </>
      )}

      {/* Auto-play Toggle */}
      {autoPlay && items.length > 1 && (
        <button
          onClick={toggleAutoPlay}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 px-3 py-1 sm:px-4 sm:py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 shadow-lg"
          aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
      )}

      {/* Dot Indicators */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {showProgressBar && items.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  );
};

export default ThreeDCarousel; 