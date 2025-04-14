import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import { Helmet } from 'react-helmet';
import { useTheme } from '../context/ThemeContext';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Add this to prevent horizontal scrollbar */
`;

const Main = styled.main`
  flex: 1;
  padding-bottom: 2rem;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 1.5rem 0;
  text-align: center;
  transition: background-color 0.3s ease;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Layout = ({ children, title, description }) => {
  const theme = useTheme();
  
  return (
    <LayoutWrapper>
      <Helmet>
        <title>{title ? `${title} | ReactSPA` : 'ReactSPA'}</title>
        <meta name="description" content={description || 'A modern React SPA application'} />
        <meta name="theme-color" content={theme.isDarkTheme ? '#121212' : '#ffffff'} />
      </Helmet>

      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Navigation />
      
      <Main id="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Main>
      
      <Footer theme={theme}>
        <div className="container">
          <FooterContent>
            <p>&copy; {new Date().getFullYear()} ReactSPA. All rights reserved.</p>
            <p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                GitHub
              </a>
            </p>
          </FooterContent>
        </div>
      </Footer>
    </LayoutWrapper>
  );
};

export default Layout;