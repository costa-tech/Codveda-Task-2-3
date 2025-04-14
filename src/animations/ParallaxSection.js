import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReducedMotion from './useReducedMotion';

/**
 * ParallaxSection - Creates a parallax effect where elements move at different speeds when scrolling
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to apply parallax effect to
 * @param {number} props.strength - Strength of the parallax effect (1-10)
 * @param {string} props.direction - Direction of parallax effect ('up', 'down')
 */
const ParallaxSection = ({ 
  children, 
  strength = 3, 
  direction = 'up',
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate movement range based on strength and direction
  const factor = direction === 'up' ? -strength * 10 : strength * 10;
  
  // Always call useTransform, but conditionally set the values
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReducedMotion ? [0, 0] : [0, factor]
  );
  
  return (
    <motion.div ref={ref} style={{ y }} {...props}>
      {children}
    </motion.div>
  );
};

export default ParallaxSection;