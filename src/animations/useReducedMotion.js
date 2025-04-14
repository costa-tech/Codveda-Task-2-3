import { useEffect, useState } from 'react';

// Custom hook to detect if the user prefers reduced motion
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Define a callback function to handle changes to the media query
    const handleMediaChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    // Add event listener for changes
    mediaQuery.addEventListener('change', handleMediaChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);
  
  return prefersReducedMotion;
};

export default useReducedMotion;