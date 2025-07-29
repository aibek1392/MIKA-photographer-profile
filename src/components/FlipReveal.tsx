import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipRevealProps {
  children: React.ReactNode;
  className?: string;
  keys: string[];
  showClass?: string;
  hideClass?: string;
}

interface FlipRevealItemProps {
  children: React.ReactNode;
  flipKey: string;
  className?: string;
  shouldShow?: boolean;
  showClass?: string;
  hideClass?: string;
  index?: number;
}

export const FlipReveal: React.FC<FlipRevealProps> = ({
  children,
  className = "",
  keys,
  showClass = "flex",
  hideClass = "hidden"
}) => {
  return (
    <motion.div 
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: 0.05
          }
        }
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === FlipRevealItem) {
          const itemKey = (child.props as FlipRevealItemProps).flipKey;
          const shouldShow = keys.includes("all") || keys.includes(itemKey);
          
          return React.cloneElement(child as React.ReactElement<FlipRevealItemProps>, {
            shouldShow,
            showClass,
            hideClass,
            index
          });
        }
        return child;
      })}
    </motion.div>
  );
};

export const FlipRevealItem: React.FC<FlipRevealItemProps> = ({ 
  children, 
  flipKey, 
  className = "", 
  shouldShow = true, 
  showClass = "flex", 
  hideClass = "hidden",
  index = 0
}) => {
  const [isVisible, setIsVisible] = useState(shouldShow);

  useEffect(() => {
    if (shouldShow !== isVisible) {
      setIsVisible(shouldShow);
    }
  }, [shouldShow, isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={flipKey}
          variants={{
            hidden: { 
              opacity: 0, 
              rotateY: -10,
              rotateX: -3,
              scale: 0.9,
              y: 10,
              filter: "blur(2px)"
            },
            visible: { 
              opacity: 1, 
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              y: 0,
              filter: "blur(0px)"
            }
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 0.6,
            duration: 0.3,
            delay: index * 0.02
          }}
          whileHover={{
            scale: 1.02,
            rotateY: 1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 15
            }
          }}
          className={`${showClass} ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 