import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useReducedMotion from './useReducedMotion';

const TextWrapper = styled(motion.div)`
  display: inline-block;
  overflow: hidden;
`;

const WordWrapper = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const CharWrapper = styled(motion.span)`
  display: inline-block;
  position: relative;
`;

/**
 * AnimatedText - Creates text animation effects
 * 
 * @param {Object} props
 * @param {string} props.text - The text to animate
 * @param {string} props.effect - Animation effect ('wave', 'typewriter', 'reveal', 'bounce', 'color')
 * @param {Object} props.theme - Current theme from ThemeContext
 * @param {string} props.className - Optional class name for styling
 * @param {string} props.element - HTML element to render ('h1', 'h2', 'p', etc.)
 */
const AnimatedText = ({
  text = '',
  effect = 'wave',
  theme,
  className,
  element = 'div',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const Element = element;
  
  // For users who prefer reduced motion, render text normally
  if (prefersReducedMotion) {
    return <Element className={className} {...props}>{text}</Element>;
  }
  
  // Split text into words and characters
  const words = text.split(' ');
  
  // Character animation variants
  const getCharVariants = () => {
    switch (effect) {
      case 'wave':
        return {
          hidden: { y: 0 },
          visible: (i) => ({
            y: [0, -15, 0],
            transition: {
              delay: i * 0.05,
              repeat: 0,
              duration: 0.6,
              ease: "easeInOut"
            }
          })
        };
        
      case 'typewriter':
        return {
          hidden: { opacity: 0 },
          visible: (i) => ({
            opacity: 1,
            transition: {
              delay: i * 0.03,
              duration: 0.1
            }
          })
        };
        
      case 'reveal':
        return {
          hidden: { 
            y: 50, 
            opacity: 0,
            rotateX: 90
          },
          visible: (i) => ({
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
              delay: i * 0.04,
              type: "spring",
              damping: 12,
              stiffness: 200
            }
          })
        };
        
      case 'bounce':
        return {
          hidden: { scale: 0 },
          visible: (i) => ({
            // Fix: Instead of using 3 keyframes with spring, use 2 keyframes
            // and set appropriate spring properties to create the bounce effect
            scale: 1,
            transition: {
              delay: i * 0.05,
              type: "spring",
              damping: 4,       // Lower damping for more bounce
              stiffness: 200,
              velocity: 2       // Initial velocity for the bounce effect
            }
          })
        };
        
      case 'color':
        return {
          hidden: { 
            opacity: 0,
            color: theme.isDarkTheme ? '#222' : '#eee',
          },
          visible: (i) => ({
            opacity: 1,
            color: theme.colors.primary,
            transition: {
              delay: i * 0.03,
              duration: 0.5
            }
          })
        };
        
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };
  
  const charVariants = getCharVariants();
  
  return (
    <Element className={className} {...props}>
      <TextWrapper>
        {words.map((word, wordIndex) => (
          <WordWrapper key={wordIndex}>
            {Array.from(word).map((char, charIndex) => (
              <CharWrapper
                key={charIndex}
                custom={(wordIndex * 5) + charIndex}
                variants={charVariants}
                initial="hidden"
                animate="visible"
              >
                {char}
              </CharWrapper>
            ))}
          </WordWrapper>
        ))}
      </TextWrapper>
    </Element>
  );
};

export default AnimatedText;