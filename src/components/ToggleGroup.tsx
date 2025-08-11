import React from 'react';
import { motion } from 'framer-motion';

interface ToggleGroupProps {
  type?: 'single' | 'multiple';
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

interface ToggleGroupItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  type = 'single',
  className = "",
  value,
  onValueChange,
  children
}) => {
  return (
    <div className={`bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-1 flex flex-wrap justify-center ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ToggleGroupItem) {
          const isSelected = value === (child.props as ToggleGroupItemProps).value;
          
          return React.cloneElement(child as React.ReactElement<ToggleGroupItemProps>, {
            isSelected,
            onClick: () => onValueChange?.((child.props as ToggleGroupItemProps).value)
          });
        }
        return child;
      })}
    </div>
  );
};

export const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  value,
  className = "",
  children,
  isSelected = false,
  onClick
}) => {
  return (
    <motion.button
      onClick={onClick}
      onTouchEnd={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`px-2 sm:px-4 py-2 rounded-md font-medium transition-all duration-300 text-xs sm:text-sm md:text-base flex-shrink-0 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <motion.div
        className={`relative px-2 sm:px-3 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
          isSelected
            ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        layout
      >
        {children}
      </motion.div>
    </motion.button>
  );
}; 