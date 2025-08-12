import React, { memo, useEffect, useLayoutEffect, useMemo, useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Move } from 'lucide-react';

// Hook that works on SSR/CSR
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (q: string): boolean => {
    if (IS_SERVER) return defaultValue;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => (initializeWithValue ? getMatches(query) : defaultValue));

  const handleChange = () => setMatches(getMatches(query));

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    matchMedia.addEventListener('change', handleChange);
    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

const duration = 0.15;
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: 'blur(4px)' } as const;
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] } as const;

type CarouselProps = {
  handleClick: (imgUrl: string, index: number) => void;
  controls: any;
  cards: string[];
  isCarouselActive: boolean;
};

const Carousel = memo(({ handleClick, controls, cards, isCarouselActive }: CarouselProps) => {
  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
  const cylinderWidth = isScreenSizeSm ? 1400 : 2200;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / Math.max(faceCount, 1);
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <motion.div
        drag={isCarouselActive ? 'x' : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: 'preserve-3d' }}
        onDrag={(_, info) => isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)}
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: 'spring', stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {cards.map((imgUrl, i) => (
          <motion.div
            key={`key-${imgUrl}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / Math.max(faceCount, 1))}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(imgUrl, i)}
          >
            <motion.img
              src={imgUrl}
              alt={`carousel_${i}`}
              layoutId={`img-${imgUrl}`}
              className="pointer-events-none w-full rounded-xl object-cover aspect-square"
              initial={{ filter: 'blur(4px)' }}
              layout="position"
              animate={{ filter: 'blur(0px)' }}
              transition={transition}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

type Instagram3DCarouselProps = {
  images: string[];
};

const Instagram3DCarousel: React.FC<Instagram3DCarouselProps> = ({ images }) => {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const controls = useAnimation();
  const hintControls = useAnimation();
  const arrowControls = useAnimation();
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const cards = useMemo(() => images, [images]);

  useEffect(() => {
    // no-op: useful for debugging
  }, [cards]);

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveImg(null);
    setIsCarouselActive(true);
  };

  // Hint animation functions
  const startHintAnimation = useCallback(async () => {
    if (!showHint || userInteracted) return;

    // Animate the carousel with subtle drag gesture
    await hintControls.start({
      x: [0, 20, -20, 0],
      transition: {
        duration: 3,
        times: [0, 0.3, 0.7, 1],
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    });

    // Animate arrows
    await arrowControls.start({
      opacity: [0, 0.8, 0.8, 0],
      x: [0, 8, -8, 0],
      transition: {
        duration: 3,
        times: [0, 0.3, 0.7, 1],
        ease: "easeInOut",
      }
    });
  }, [showHint, userInteracted, hintControls, arrowControls]);

  const stopHintAnimation = useCallback(() => {
    setUserInteracted(true);
    setShowHint(false);
    hintControls.stop();
    arrowControls.stop();
    hintControls.set({ x: 0 });
    arrowControls.set({ opacity: 0 });
  }, [hintControls, arrowControls]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    
    inactivityTimer.current = setTimeout(() => {
      if (userInteracted) {
        setShowHint(true);
        setUserInteracted(false);
      }
    }, 5000);
  }, [userInteracted]);

  const handleInteraction = useCallback(() => {
    stopHintAnimation();
    resetInactivityTimer();
  }, [stopHintAnimation, resetInactivityTimer]);

  // Start hint animation on mount and after inactivity
  useEffect(() => {
    if (showHint && !userInteracted) {
      const timer = setTimeout(() => {
        startHintAnimation();
      }, 2000); // Start after 2s on load

      return () => clearTimeout(timer);
    }
  }, [showHint, userInteracted, startHintAnimation]);

  // Loop hint animation
  useEffect(() => {
    if (!showHint || userInteracted) return;

    const interval = setInterval(() => {
      startHintAnimation();
    }, 8000); // Repeat every 8 seconds

    return () => clearInterval(interval);
  }, [showHint, userInteracted, startHintAnimation]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            style={{ willChange: 'opacity' }}
            transition={transitionOverlay}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-full max-h-full rounded-lg shadow-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        className="relative h-[550px] w-full overflow-hidden"
        animate={hintControls}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <Carousel handleClick={handleClick} controls={controls} cards={cards} isCarouselActive={isCarouselActive} />
        
        {/* Animated Hint Arrows */}
        <motion.div
          animate={arrowControls}
          className="absolute inset-0 flex items-center justify-between pointer-events-none z-10 px-8"
          style={{ opacity: 0 }}
        >
          {/* Left Arrow */}
          <motion.div
            className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-md rounded-full shadow-xl border border-white/20"
            style={{ marginLeft: '-30px' }}
          >
            <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
          </motion.div>
          
          {/* Swipe Icon Center */}
          <motion.div
            className="flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur-md rounded-full shadow-xl border border-white/20"
            animate={{
              scale: [1, 1.15, 1],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <Move className="w-8 h-8 text-white drop-shadow-lg" />
          </motion.div>
          
          {/* Right Arrow */}
          <motion.div
            className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-md rounded-full shadow-xl border border-white/20"
            style={{ marginRight: '-30px' }}
          >
            <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Instagram3DCarousel;


