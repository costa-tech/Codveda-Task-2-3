import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import useReducedMotion from './useReducedMotion';

// Animation variants for regular and reduced motion
const createVariants = (direction, reducedMotion) => {
  // If reduced motion is preferred, use subtle fade without translation
  if (reducedMotion) {
    return {
      hidden: { 
        opacity: 0.9
      },
      visible: { 
        opacity: 1,
        transition: { 
          duration: 0.3
        }
      }
    };
  }
  
  // Default animations with translation effects
  const directionToTranslation = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  };
  
  return {
    hidden: { 
      opacity: 0,
      ...directionToTranslation[direction]
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    }
  };
};

/**
 * ScrollReveal - A component that animates its children when they enter the viewport
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to be animated
 * @param {string} props.direction - Direction of animation ('up', 'down', 'left', 'right')
 * @param {number} props.delay - Delay before animation starts (in seconds)
 * @param {number} props.threshold - Visibility threshold to trigger animation (0-1)
 * @param {boolean} props.once - Whether animation should only trigger once
 */
const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  threshold = 0.1,
  once = true,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold, 
    once
  });
  
  // Start animation when element comes into view
  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={createVariants(direction, prefersReducedMotion)}
      transition={{ 
        delay: prefersReducedMotion ? 0 : delay
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;