import React from 'react';
import { motion } from 'framer-motion';
import useReducedMotion from './useReducedMotion';

/**
 * StaggeredReveal - Creates sequential/staggered animations for child elements
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to be animated in sequence
 * @param {number} props.staggerDelay - Delay between each child animation (in seconds)
 * @param {number} props.initialDelay - Delay before the first animation starts (in seconds)
 * @param {boolean} props.cascade - Whether to wait for previous animation to finish before starting next
 */
const StaggeredReveal = ({ 
  children, 
  staggerDelay = 0.1, 
  initialDelay = 0,
  cascade = false,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Create container variant
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        // Stagger children with delay
        staggerChildren: prefersReducedMotion ? 0.05 : staggerDelay,
        delayChildren: initialDelay,
        // If cascade is true, each child will wait for the previous one to finish
        when: cascade ? "beforeChildren" : "afterChildren"
      }
    }
  };
  
  // Create child variants with reduced motion considerations
  const childVariants = prefersReducedMotion 
    ? {
        hidden: { opacity: 0.9 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.2 }
        }
      }
    : {
        hidden: { 
          opacity: 0,
          y: 20
        },
        visible: { 
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 12,
            stiffness: 200
          }
        }
      };
  
  // Wrap each child in a motion.div with the child variant
  const wrappedChildren = React.Children.map(children, (child, index) => (
    <motion.div 
      key={index} 
      variants={childVariants}
    >
      {child}
    </motion.div>
  ));
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {wrappedChildren}
    </motion.div>
  );
};

export default StaggeredReveal;