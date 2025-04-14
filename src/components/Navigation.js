import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import useReducedMotion from '../animations/useReducedMotion';

const NavBar = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
`;

const Logo = styled(motion(NavLink))`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const MenuItems = styled(motion.ul)`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    right: 0;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.surface};
    width: 100%;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    transition: all 0.3s ease-in-out;
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  }
`;

const MenuItem = styled(motion.li)`
  margin: 0 1rem;
  
  @media (max-width: 768px) {
    margin: 1rem 2rem;
  }
`;

const StyledNavLink = styled(motion(NavLink))`
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover, &.active {
    color: ${({ theme }) => theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MenuToggle = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
    z-index: 20;
  }
`;

const Bar = styled(motion.span)`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: ${({ theme }) => theme.colors.text};
`;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  
  // Check if we're on mobile on initial render and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check once on component mount
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Menu items animation variants
  const menuVariants = {
    hidden: { 
      opacity: 0,
      x: prefersReducedMotion ? 0 : '100%',
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };
  
  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20
    },
    visible: { 
      opacity: 1,
      y: 0
    }
  };
  
  // Hamburger menu animation variants
  const barVariants = {
    closed: {},
    open: {}
  };
  
  const topBarVariants = {
    closed: { 
      rotate: 0,
      translateY: 0 
    },
    open: { 
      rotate: 45,
      translateY: 8
    }
  };
  
  const middleBarVariants = {
    closed: { 
      opacity: 1 
    },
    open: { 
      opacity: 0 
    }
  };
  
  const bottomBarVariants = {
    closed: { 
      rotate: 0,
      translateY: 0 
    },
    open: { 
      rotate: -45,
      translateY: -8
    }
  };
  
  // Logo animation
  const logoVariants = {
    hover: {
      scale: 1.05,
      color: theme.colors.secondary,
    }
  };
  
  // Theme toggle animation
  const themeToggleVariants = {
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 500
      }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    <NavBar 
      theme={theme}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Logo 
        to="/" 
        theme={theme} 
        onClick={closeMenu}
        variants={logoVariants}
        whileHover="hover"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        ReactSPA
      </Logo>
      
      <MenuToggle 
        onClick={toggleMenu} 
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        whileTap={{ scale: 0.9 }}
      >
        <Bar 
          theme={theme} 
          variants={topBarVariants}
          animate={isMenuOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
        <Bar 
          theme={theme} 
          variants={middleBarVariants}
          animate={isMenuOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
        <Bar 
          theme={theme} 
          variants={bottomBarVariants}
          animate={isMenuOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
      </MenuToggle>
      
      <AnimatePresence>
        <MenuItems 
          isOpen={isMenuOpen || !isMobile} 
          theme={theme}
          variants={menuVariants}
          initial={isMobile ? "hidden" : "visible"}
          animate={isMobile && !isMenuOpen ? "hidden" : "visible"}
        >
          <MenuItem variants={menuItemVariants}>
            <StyledNavLink 
              to="/" 
              onClick={closeMenu} 
              theme={theme}
              end
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Home
            </StyledNavLink>
          </MenuItem>
          <MenuItem variants={menuItemVariants}>
            <StyledNavLink 
              to="/about" 
              onClick={closeMenu} 
              theme={theme}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              About
            </StyledNavLink>
          </MenuItem>
          <MenuItem variants={menuItemVariants}>
            <StyledNavLink 
              to="/contact" 
              onClick={closeMenu} 
              theme={theme}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Contact
            </StyledNavLink>
          </MenuItem>
          <MenuItem variants={menuItemVariants}>
            <ThemeToggle 
              onClick={theme.toggleTheme} 
              aria-label={theme.isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
              theme={theme}
              variants={themeToggleVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {theme.isDarkTheme ? '☀️' : '🌙'}
            </ThemeToggle>
          </MenuItem>
        </MenuItems>
      </AnimatePresence>
    </NavBar>
  );
};

export default Navigation;