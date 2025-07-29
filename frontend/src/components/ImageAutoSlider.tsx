import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageAutoSliderProps {
  images?: Array<{
    id: number;
    src: string;
    alt: string;
    title: string;
    category: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showDots?: boolean;
}

const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({
  images = [],
  autoPlay = true,
  interval = 3000,
  showControls = true,
  showDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Default images if none provided
  const defaultImages = [
    { id: 1, src: '/photo_2025-07-25 13.56.46.jpeg', alt: 'Elegant Wedding', title: 'Elegant Wedding', category: 'weddings' },
    { id: 2, src: '/photo_2025-07-25 13.56.42.jpeg', alt: 'Graceful Portrait', title: 'Graceful Portrait', category: 'portraits' },
    { id: 3, src: '/photo_2025-07-25 13.56.39.jpeg', alt: 'Corporate Celebration', title: 'Corporate Celebration', category: 'events' },
    { id: 4, src: '/photo_2025-07-25 13.56.36.jpeg', alt: 'Intimate Ceremony', title: 'Intimate Ceremony', category: 'weddings' },
    { id: 5, src: '/photo_2025-07-25 13.56.32.jpeg', alt: 'Professional Headshot', title: 'Professional Headshot', category: 'portraits' },
    { id: 6, src: '/photo_2025-07-25 13.56.25.jpeg', alt: 'Birthday Joy', title: 'Birthday Joy', category: 'events' },
    { id: 7, src: '/photo_2025-07-25 13.56.22.jpeg', alt: 'Reception Memories', title: 'Reception Memories', category: 'weddings' },
    { id: 8, src: '/photo_2025-07-25 13.56.17.jpeg', alt: 'Family Moments', title: 'Family Moments', category: 'portraits' },
    { id: 9, src: '/photo_2025-07-25 13.56.13.jpeg', alt: 'Special Event', title: 'Special Event', category: 'events' },
    { id: 10, src: '/photo_2025-07-25 13.56.11.jpeg', alt: 'Wedding Details', title: 'Wedding Details', category: 'weddings' },
    { id: 11, src: '/photo_2025-07-25 14.35.44.jpeg', alt: 'Ceremony Moments', title: 'Ceremony Moments', category: 'weddings' },
    { id: 12, src: '/photo_2025-07-25 14.35.41.jpeg', alt: 'Event Photography', title: 'Event Photography', category: 'events' },
    { id: 13, src: '/photo_2025-07-25 14.35.38.jpeg', alt: 'Portrait Photography', title: 'Portrait Photography', category: 'portraits' },
  ];

  const sliderImages = images.length > 0 ? images : defaultImages;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, interval);
  }, [interval, sliderImages.length]);

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying && autoPlay) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isPlaying, autoPlay, startAutoPlay]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Slider Container */}
      <div className="relative h-[600px] overflow-hidden rounded-2xl bg-black shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <img
              src={sliderImages[currentIndex].src}
              alt={sliderImages[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {sliderImages[currentIndex].title}
                </h3>
                <p className="text-white/80 text-lg">
                  {sliderImages[currentIndex].category.charAt(0).toUpperCase() + sliderImages[currentIndex].category.slice(1)} Photography
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {showControls && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Auto-play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300"
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {showDots && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
          {currentIndex + 1} / {sliderImages.length}
        </div>
      </div>

      {/* Thumbnail Preview */}
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {sliderImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-white scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageAutoSlider; 