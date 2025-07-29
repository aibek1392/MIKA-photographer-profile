import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';

interface InstagramPost {
  id: number;
  image: string;
  title: string;
  likes: number;
  comments: number;
  link: string;
}

const ThreeDPhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<InstagramPost | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const posts: InstagramPost[] = [
    {
      id: 1,
      image: '/photo_2025-07-25 13.56.46.jpeg',
      title: 'Elegant Wedding Moments',
      likes: 1247,
      comments: 89,
      link: 'https://instagram.com/mikavisionnyc'
    },
    {
      id: 2,
      image: '/photo_2025-07-25 13.56.42.jpeg',
      title: 'Portrait Perfection',
      likes: 892,
      comments: 56,
      link: 'https://instagram.com/mikavisionnyc'
    },
    {
      id: 3,
      image: '/photo_2025-07-25 13.56.39.jpeg',
      title: 'Corporate Events',
      likes: 654,
      comments: 34,
      link: 'https://instagram.com/mikavisionnyc'
    },
    {
      id: 4,
      image: '/photo_2025-07-25 13.56.36.jpeg',
      title: 'Wedding Ceremony',
      likes: 1567,
      comments: 123,
      link: 'https://instagram.com/mikavisionnyc'
    },
    {
      id: 5,
      image: '/photo_2025-07-25 13.56.32.jpeg',
      title: 'Professional Headshots',
      likes: 743,
      comments: 45,
      link: 'https://instagram.com/mikavisionnyc'
    },
    {
      id: 6,
      image: '/photo_2025-07-25 13.56.25.jpeg',
      title: 'Event Photography',
      likes: 567,
      comments: 28,
      link: 'https://instagram.com/mikavisionnyc'
    },
    {
      id: 7,
      image: '/photo_2025-07-25 13.56.22.jpeg',
      title: 'Reception Memories',
      likes: 1345,
      comments: 97,
      link: 'https://instagram.com/mikavisionnyc'
    },
    {
      id: 8,
      image: '/photo_2025-07-25 13.56.17.jpeg',
      title: 'Family Portraits',
      likes: 678,
      comments: 42,
      link: 'https://instagram.com/mikavisionnyc'
    }
  ];

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 3000);
  }, [posts.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying && !isHovered && !lightboxImage) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isAutoPlaying, isHovered, lightboxImage, startAutoPlay, stopAutoPlay]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = (post: InstagramPost) => {
    setLightboxImage(post);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextLightboxImage = () => {
    if (!lightboxImage) return;
    const currentLightboxIndex = posts.findIndex(post => post.id === lightboxImage.id);
    const nextIndex = (currentLightboxIndex + 1) % posts.length;
    setLightboxImage(posts[nextIndex]);
  };

  const prevLightboxImage = () => {
    if (!lightboxImage) return;
    const currentLightboxIndex = posts.findIndex(post => post.id === lightboxImage.id);
    const prevIndex = (currentLightboxIndex - 1 + posts.length) % posts.length;
    setLightboxImage(posts[prevIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevLightboxImage();
          break;
        case 'ArrowRight':
          nextLightboxImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  const getCardStyle = (index: number) => {
    const offset = (index - currentIndex + posts.length) % posts.length;
    
    let transform = '';
    let zIndex = 1;
    let opacity = 0.3;

    if (offset === 0) {
      // Center card
      transform = 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)';
      zIndex = 10;
      opacity = 1;
    } else if (offset === 1) {
      // Right card
      transform = 'translateX(120px) translateZ(-80px) rotateY(-20deg) scale(0.85)';
      zIndex = 9;
      opacity = 0.8;
    } else if (offset === posts.length - 1) {
      // Left card
      transform = 'translateX(-120px) translateZ(-80px) rotateY(20deg) scale(0.85)';
      zIndex = 9;
      opacity = 0.8;
    } else if (offset === 2) {
      // Far right card
      transform = 'translateX(220px) translateZ(-160px) rotateY(-35deg) scale(0.7)';
      zIndex = 8;
      opacity = 0.6;
    } else if (offset === posts.length - 2) {
      // Far left card
      transform = 'translateX(-220px) translateZ(-160px) rotateY(35deg) scale(0.7)';
      zIndex = 8;
      opacity = 0.6;
    } else if (offset === 3) {
      // Very far right
      transform = 'translateX(320px) translateZ(-240px) rotateY(-50deg) scale(0.55)';
      zIndex = 7;
      opacity = 0.45;
    } else if (offset === posts.length - 3) {
      // Very far left
      transform = 'translateX(-320px) translateZ(-240px) rotateY(50deg) scale(0.55)';
      zIndex = 7;
      opacity = 0.45;
    } else if (offset === 4) {
      // Ultra far right
      transform = 'translateX(420px) translateZ(-320px) rotateY(-65deg) scale(0.4)';
      zIndex = 6;
      opacity = 0.3;
    } else if (offset === posts.length - 4) {
      // Ultra far left
      transform = 'translateX(-420px) translateZ(-320px) rotateY(65deg) scale(0.4)';
      zIndex = 6;
      opacity = 0.3;
    } else {
      // Hidden cards
      transform = 'translateX(0px) translateZ(-400px) rotateY(0deg) scale(0.2)';
      zIndex = 1;
      opacity = 0.1;
    }

    return {
      transform,
      zIndex,
      opacity,
    };
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Instagram Feed
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Follow my latest work and behind-the-scenes moments on Instagram
            </p>
          </motion.div>

          <div 
            className="relative w-full max-w-7xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 3D Carousel Container */}
            <div 
              className="relative h-[450px] overflow-hidden"
              style={{
                perspective: '1200px',
                perspectiveOrigin: 'center center'
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="absolute w-56 h-72 cursor-pointer"
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
                    onClick={() => openLightbox(post)}
                  >
                    <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden group">
                      {/* Image Only */}
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200" />
              </button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200" />
              </button>
            </div>

            {/* Auto-play Toggle */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 shadow-lg"
              >
                {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-blue-500 scale-125'
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / posts.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Follow Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-12"
          >
            <a
              href="https://instagram.com/mikavisionnyc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">📸</span>
              Follow @mikavisionnyc
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {lightboxImage.title}
                </h3>
                <div className="flex items-center justify-between text-white/80">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <span className="text-red-500 mr-1">❤️</span>
                      {lightboxImage.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <span className="text-blue-500 mr-1">💬</span>
                      {lightboxImage.comments}
                    </span>
                  </div>
                  <a
                    href={lightboxImage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    View on Instagram
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThreeDPhotoCarousel; 