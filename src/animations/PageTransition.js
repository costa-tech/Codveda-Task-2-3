import React from 'react';
import { motion } from 'framer-motion';
import useReducedMotion from './useReducedMotion';

/**
 * PageTransition - Creates smooth transitions between pages/routes
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to be animated
 * @param {string} props.transitionType - Type of transition ('fade', 'slide', 'scale', 'flip')
 * @param {number} props.duration - Duration of the transition in seconds
 */
const PageTransition = ({ 
  children, 
  transitionType = 'fade',
  duration = 0.5,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // If user prefers reduced motion, use simple fade with shorter duration
  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  // Different transition variants based on transitionType
  const getVariants = () => {
    switch (transitionType) {
      case 'slide':
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 }
        };
      case 'scale':
        return {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.1, opacity: 0 }
        };
      case 'flip':
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 }
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };
  
  const variants = getVariants();
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ 
        duration, 
        type: transitionType === 'flip' ? 'spring' : 'tween',
        stiffness: transitionType === 'flip' ? 100 : undefined,
        damping: transitionType === 'flip' ? 15 : undefined
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;