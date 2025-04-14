import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useReducedMotion from './useReducedMotion';

const LoaderContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: ${({ fullScreen }) => (fullScreen ? '100vh' : '200px')};
  position: ${({ fullScreen }) => (fullScreen ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  z-index: ${({ fullScreen }) => (fullScreen ? 1000 : 1)};
  background: ${({ fullScreen, theme }) => 
    fullScreen 
      ? theme.isDarkTheme 
        ? 'rgba(0, 0, 0, 0.85)' 
        : 'rgba(255, 255, 255, 0.85)' 
      : 'transparent'
  };
  backdrop-filter: ${({ fullScreen }) => (fullScreen ? 'blur(5px)' : 'none')};
`;

const LoaderText = styled(motion.div)`
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

// Different loader types
const CircleLoader = styled(motion.div)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-top-color: transparent;
`;

const DotContainer = styled(motion.div)`
  display: flex;
  gap: 8px;
`;

const Dot = styled(motion.div)`
  width: ${({ size }) => size / 3}px;
  height: ${({ size }) => size / 3}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const PulseCircle = styled(motion.div)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

/**
 * Loader - Creates various loading animations
 * 
 * @param {Object} props
 * @param {string} props.type - Type of loader ('circle', 'dots', 'pulse')
 * @param {number} props.size - Size of the loader in pixels
 * @param {string} props.text - Optional text to display below the loader
 * @param {boolean} props.fullScreen - Whether the loader should be displayed fullscreen
 * @param {Object} props.theme - Current theme from ThemeContext
 */
const Loader = ({ 
  type = 'circle', 
  size = 50, 
  text = 'Loading...', 
  fullScreen = false,
  theme,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Simplified animations for reduced motion preference
  if (prefersReducedMotion) {
    return (
      <LoaderContainer 
        fullScreen={fullScreen} 
        theme={theme}
        initial={fullScreen ? { opacity: 0 } : false}
        animate={fullScreen ? { opacity: 1 } : {}}
        exit={fullScreen ? { opacity: 0 } : {}}
        {...props}
      >
        <Dot 
          size={size} 
          theme={theme} 
          animate={{ opacity: 0.7 }}
          transition={{ 
            opacity: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
          }}
        />
        {text && (
          <LoaderText theme={theme}>
            {text}
          </LoaderText>
        )}
      </LoaderContainer>
    );
  }
  
  // Render different loader types based on the prop
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <DotContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <Dot 
                key={i} 
                size={size} 
                theme={theme}
                // Use separate animate properties for y and scale to avoid arrays
                // with 3 keyframes when using spring transitions
                animate={{ 
                  y: -5,
                  scale: 1.1
                }}
                transition={{ 
                  y: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.2
                  },
                  scale: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.2
                  }
                }}
              />
            ))}
          </DotContainer>
        );
      
      case 'pulse':
        return (
          <PulseCircle 
            size={size} 
            theme={theme}
            // Use separate animate properties for scale and opacity
            animate={{ 
              scale: 1.2,
              opacity: 1
            }}
            transition={{ 
              scale: {
                duration: 0.75, 
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.75, 
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
              }
            }}
            style={{ opacity: 0.6, scale: 0.8 }}
          />
        );
      
      case 'circle':
      default:
        return (
          <CircleLoader 
            size={size} 
            theme={theme}
            animate={{ 
              rotate: 360 
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
    }
  };
  
  return (
    <LoaderContainer 
      fullScreen={fullScreen} 
      theme={theme}
      initial={fullScreen ? { opacity: 0 } : false}
      animate={fullScreen ? { opacity: 1 } : {}}
      exit={fullScreen ? { opacity: 0 } : {}}
      {...props}
    >
      {renderLoader()}
      
      {text && (
        <LoaderText 
          theme={theme}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </LoaderText>
      )}
    </LoaderContainer>
  );
};

export default Loader;