import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSwiperProps {
  images: string;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export const ImageSwiper: React.FC<ImageSwiperProps> = ({
  images,
  cardWidth = 256,  // 16rem = 256px
  cardHeight = 352, // 22rem = 352px
  className = ''
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const imageList = images.split(',').map(img => img.trim()).filter(img => img);
  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: imageList.length }, (_, i) => i)
  );
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const getDurationFromCSS = useCallback((
    variableName: string,
    element?: HTMLElement | null
  ): number => {
    const targetElement = element || document.documentElement;
    const value = getComputedStyle(targetElement)
      ?.getPropertyValue(variableName)
      ?.trim();
    if (!value) return 0;
    if (value.endsWith("ms")) return parseFloat(value);
    if (value.endsWith("s")) return parseFloat(value) * 1000;
    return parseFloat(value) || 0;
  }, []);

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    return Array.from(cardStackRef.current.querySelectorAll('.image-card')) as HTMLElement[];
  }, []);

  const getActiveCard = useCallback((): HTMLElement | null => {
    const cards = getCards();
    return cards[0] || null;
  }, [getCards]);

  const updatePositions = useCallback(() => {
    const cards = getCards();
    cards.forEach((card, i) => {
      card.style.setProperty('--i', (i + 1).toString());
      card.style.setProperty('--swipe-x', '0px');
      card.style.setProperty('--swipe-rotate', '0deg');
      card.style.opacity = '1';
    });
  }, [getCards]);

  const applySwipeStyles = useCallback((deltaX: number) => {
    const card = getActiveCard();
    if (!card) return;
    card.style.setProperty('--swipe-x', `${deltaX}px`);
    card.style.setProperty('--swipe-rotate', `${deltaX * 0.2}deg`);
    card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.75).toString();
  }, [getActiveCard]);

  const handleImageClick = useCallback((imageSrc: string, e: React.MouseEvent | React.TouchEvent) => {
    // Only open fullscreen if we're not in the middle of a swipe
    if (!isSwiping.current) {
      e.preventDefault();
      e.stopPropagation();
      setFullscreenImage(imageSrc);
    }
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenImage(null);
  }, []);

  const handleStart = useCallback((clientX: number) => {
    if (isSwiping.current) return;
    isSwiping.current = true;
    startX.current = clientX;
    currentX.current = clientX;
    const card = getActiveCard();
    if (card) card.style.transition = 'none';
  }, [getActiveCard]);

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const deltaX = currentX.current - startX.current;
    const threshold = 50;
    const duration = getDurationFromCSS('--card-swap-duration', cardStackRef.current);
    const card = getActiveCard();

    if (card) {
      card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

      if (Math.abs(deltaX) > threshold) {
        const direction = Math.sign(deltaX);
        card.style.setProperty('--swipe-x', `${direction * 300}px`);
        card.style.setProperty('--swipe-rotate', `${direction * 20}deg`);

        setTimeout(() => {
          if (getActiveCard() === card) {
            card.style.setProperty('--swipe-rotate', `${-direction * 20}deg`);
          }
        }, duration * 0.5);

        setTimeout(() => {
          setCardOrder(prev => {
            if (prev.length === 0) return [];
            return [...prev.slice(1), prev[0]];
          });
        }, duration);
      } else {
        applySwipeStyles(0);
      }
    }

    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getDurationFromCSS, getActiveCard, applySwipeStyles]);

  const handleMove = useCallback((clientX: number) => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(() => {
      currentX.current = clientX;
      const deltaX = currentX.current - startX.current;
      applySwipeStyles(deltaX);

      if (Math.abs(deltaX) > 50) {
        handleEnd();
      }
    });
  }, [applySwipeStyles, handleEnd]);

  useEffect(() => {
    const cardStackElement = cardStackRef.current;
    if (!cardStackElement) return;

    const handlePointerDown = (e: PointerEvent) => {
      handleStart(e.clientX);
    };
    const handlePointerMove = (e: PointerEvent) => {
      handleMove(e.clientX);
    };
    const handlePointerUp = (e: PointerEvent) => {
      handleEnd();
    };

    cardStackElement.addEventListener('pointerdown', handlePointerDown);
    cardStackElement.addEventListener('pointermove', handlePointerMove);
    cardStackElement.addEventListener('pointerup', handlePointerUp);

    return () => {
      cardStackElement.removeEventListener('pointerdown', handlePointerDown);
      cardStackElement.removeEventListener('pointermove', handlePointerMove);
      cardStackElement.removeEventListener('pointerup', handlePointerUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  // Handle ESC key for closing fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenImage) {
        closeFullscreen();
      }
    };

    if (fullscreenImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [fullscreenImage, closeFullscreen]);

  return (
    <>
      <section
        className={`relative grid place-content-center select-none ${className}`}
        ref={cardStackRef}
        style={{
          width: cardWidth + 32,
          height: cardHeight + 32,
          touchAction: 'none',
          transformStyle: 'preserve-3d',
          '--card-perspective': '700px',
          '--card-z-offset': '12px',
          '--card-y-offset': '7px',
          '--card-max-z-index': imageList.length.toString(),
          '--card-swap-duration': '0.3s',
        } as React.CSSProperties}
      >
        {cardOrder.map((originalIndex, displayIndex) => (
          <article
            key={`${imageList[originalIndex]}-${originalIndex}`}
            className="image-card absolute cursor-grab active:cursor-grabbing
                       place-self-center border border-slate-400 rounded-xl
                       shadow-md overflow-hidden will-change-transform"
            style={{
              '--i': (displayIndex + 1).toString(),
              zIndex: imageList.length - displayIndex,
              width: cardWidth,
              height: cardHeight,
              transform: `perspective(var(--card-perspective))
                         translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                         translateY(calc(var(--card-y-offset) * var(--i)))
                         translateX(var(--swipe-x, 0px))
                         rotateY(var(--swipe-rotate, 0deg))`
            } as React.CSSProperties}
          >
            <img
              src={imageList[originalIndex]}
              alt={`Editorial photo ${originalIndex + 1}`}
              className="w-full h-full object-cover select-none cursor-pointer"
              draggable={false}
              onClick={(e) => handleImageClick(imageList[originalIndex], e)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleImageClick(imageList[originalIndex], e);
              }}
              style={{ pointerEvents: 'auto', WebkitTapHighlightColor: 'transparent' }}
            />
          </article>
        ))}
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
            onTouchEnd={(e) => {
              if (e.target === e.currentTarget) {
                e.preventDefault();
                closeFullscreen();
              }
            }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreen();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                closeFullscreen();
              }}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={fullscreenImage}
              alt="Editorial fashion session"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Wrapper component for the About section
export default function AboutImageGallery() {
  const imageUrls = "/IMG_7199.JPG, /IMG_7293.JPG, /IMG_7294.JPG, /IMG_7295.JPG, /IMG_7297.JPG, /IMG_7298.JPG, /IMG_7299.JPG, /IMG_7300.JPG";
  
  return (
    <div className='flex items-center justify-center w-full py-4'>
      <div className='text-center'>
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
          Harper's BAZAAR magazine work
          </h3>
        </div>

        <ImageSwiper 
          images={imageUrls} 
          cardWidth={280} 
          cardHeight={380} 
          className="mx-auto"
        />

        {/* Swipe indicators */}
        <div className="flex items-center justify-center gap-4 mt-2 text-white/60">
          <div className="flex items-center gap-2">
            <ChevronLeft size={18} />
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}


