import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import useReducedMotion from './useReducedMotion';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: none;
  mix-blend-mode: difference;
  background: ${({ theme }) => theme.colors.primary};
`;

const CursorRing = styled(motion.div)`
  position: fixed;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  transform: translate(-50%, -50%);
  z-index: 9998;
  pointer-events: none;
`;

/**
 * CustomCursor - Creates an interactive custom cursor effect
 * 
 * @param {Object} props
 * @param {Object} props.theme - Current theme from ThemeContext
 */
const CustomCursor = ({ theme }) => {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    // Skip effect execution if reduced motion is preferred
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Add listeners for mouse cursor events
    window.addEventListener('mousemove', handleMouseMove);
    
    // Set up listeners for hover states
    const linkElements = document.querySelectorAll('a, button, [role="button"]');
    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');
    
    linkElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      linkElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [prefersReducedMotion]);
  
  // Don't render the custom cursor if reduced motion is preferred
  if (prefersReducedMotion) {
    return null;
  }
  
  // Cursor animation variants
  const dotVariants = {
    default: {
      height: 8,
      width: 8,
      backgroundColor: theme.colors.primary,
    },
    hover: {
      height: 16,
      width: 16,
      backgroundColor: theme.colors.secondary,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 28
      }
    }
  };
  
  const ringVariants = {
    default: {
      height: 40,
      width: 40,
      borderColor: theme.colors.primary,
      opacity: 0.5,
      borderWidth: '2px',
    },
    hover: {
      height: 60,
      width: 60,
      borderColor: theme.colors.secondary,
      opacity: 1,
      borderWidth: '3px',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 28
      }
    }
  };
  
  // Spring transition for smooth following
  const spring = {
    type: 'spring',
    damping: 25,
    stiffness: 700,
    mass: 0.5
  };
  
  return (
    <CursorWrapper>
      <CursorDot
        theme={theme}
        variants={dotVariants}
        animate={cursorVariant}
        transition={spring}
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />
      <CursorRing
        theme={theme}
        variants={ringVariants}
        animate={cursorVariant}
        transition={{
          ...spring,
          delay: 0.05 // Slight delay for trailing effect
        }}
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />
    </CursorWrapper>
  );
};

export default CustomCursor;