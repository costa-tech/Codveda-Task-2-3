import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import ScrollReveal from '../animations/ScrollReveal';
import StaggeredReveal from '../animations/StaggeredReveal';
import ParallaxSection from '../animations/ParallaxSection';
import useReducedMotion from '../animations/useReducedMotion';

const ContactWrapper = styled.div`
  padding: 2rem 0;
  overflow-x: hidden; /* Prevent horizontal overflow from animations */
`;

const ContactSection = styled.section`
  padding: 4rem 0;
  position: relative;
`;

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
`;

const ContactFormContainer = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
`;

const InfoItem = styled(motion.div)`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 8px;
  background: ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(30, 30, 30, 0.5)' 
      : 'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.5)'
  };
`;

const InfoIcon = styled(motion.div)`
  margin-right: 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Form = styled(motion.form)`
  background: ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(30, 30, 30, 0.7)' 
      : 'rgba(255, 255, 255, 0.8)'
  };
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.5)'
  };
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled(motion.label)`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ hasError, theme, isFocused }) => 
    hasError 
      ? 'red' 
      : isFocused 
        ? theme.colors.primary 
        : theme.isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${({ theme }) => (theme.isDarkTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)')};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ hasError, theme }) => (hasError ? 'red' : theme.colors.primary)};
    box-shadow: 0 0 0 3px ${({ hasError, theme }) => (hasError ? 'rgba(255, 0, 0, 0.2)' : 'rgba(74, 108, 247, 0.2)')};
  }
`;

const Textarea = styled(motion.textarea)`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ hasError, theme, isFocused }) => 
    hasError 
      ? 'red' 
      : isFocused 
        ? theme.colors.primary 
        : theme.isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  background-color: ${({ theme }) => (theme.isDarkTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)')};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ hasError, theme }) => (hasError ? 'red' : theme.colors.primary)};
    box-shadow: 0 0 0 3px ${({ hasError, theme }) => (hasError ? 'rgba(255, 0, 0, 0.2)' : 'rgba(74, 108, 247, 0.2)')};
  }
`;

const ErrorMessage = styled(motion.div)`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled(motion.button)`
  background: ${({ theme }) => 
    `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
  };
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(74, 108, 247, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::before {
      display: none;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.2rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: ${({ theme }) => (theme.isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')};
  border-radius: 50%;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: white;
    transform: translateY(-5px);
    
    &::before {
      transform: scale(1);
    }
  }
`;

const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => 
    `linear-gradient(135deg, ${theme.colors.primary}22, ${theme.colors.secondary}11)`
  };
  filter: blur(60px);
  z-index: 0;
`;

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  filter: ${({ theme }) => theme.isDarkTheme ? 'invert(1)' : 'none'};
`;

const ContactPage = () => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleFocus = (e) => {
    const { name } = e.target;
    setFocused(prev => ({
      ...prev,
      [name]: true
    }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setFocused(prev => ({
      ...prev,
      [name]: false
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  // Button loading animation variants
  const loadingVariants = {
    loading: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  // Social link hover animation variants
  const socialLinkVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    <Layout 
      title="Contact Us" 
      description="Get in touch with the ReactSPA team. We'd love to hear from you!"
    >
      <ContactWrapper>
        <ContactSection>
          {/* Background decorative elements */}
          <BackgroundCircle 
            theme={theme}
            style={{
              top: '20%',
              left: '15%',
              width: '500px',
              height: '500px',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          <BackgroundCircle 
            theme={theme}
            style={{
              bottom: '10%',
              right: '10%',
              width: '400px',
              height: '400px',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          <div className="container">
            <ScrollReveal>
              <h1>Contact Us</h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p>We'd love to hear from you. Please fill out the form below or use one of our contact methods.</p>
            </ScrollReveal>
            
            <ContactContent>
              <ContactInfo>
                <ScrollReveal>
                  <h2>Get In Touch</h2>
                </ScrollReveal>
                
                <StaggeredReveal staggerDelay={0.1} initialDelay={0.2}>
                  <ScrollReveal direction="left">
                    <InfoItem theme={theme}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <InfoIcon 
                        theme={theme}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        📍
                      </InfoIcon>
                      <div>
                        <h3>Our Location</h3>
                        <p>123 React Avenue, Component City, 10001</p>
                      </div>
                    </InfoItem>
                  </ScrollReveal>
                  
                  <ScrollReveal direction="left" delay={0.1}>
                    <InfoItem theme={theme}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <InfoIcon 
                        theme={theme}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        📧
                      </InfoIcon>
                      <div>
                        <h3>Email Us</h3>
                        <p>info@reactspa.example</p>
                      </div>
                    </InfoItem>
                  </ScrollReveal>
                  
                  <ScrollReveal direction="left" delay={0.2}>
                    <InfoItem theme={theme}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <InfoIcon 
                        theme={theme}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        📞
                      </InfoIcon>
                      <div>
                        <h3>Call Us</h3>
                        <p>+1 (234) 567-8901</p>
                      </div>
                    </InfoItem>
                  </ScrollReveal>
                  
                  <ScrollReveal direction="left" delay={0.3}>
                    <SocialLinks
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <SocialLink 
                        href="#" 
                        aria-label="Visit our Facebook" 
                        theme={theme}
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <SocialIcon 
                          src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/facebook.svg" 
                          alt="Facebook"
                          theme={theme}
                        />
                      </SocialLink>
                      <SocialLink 
                        href="#" 
                        aria-label="Visit our Twitter" 
                        theme={theme}
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <SocialIcon 
                          src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/twitter.svg" 
                          alt="Twitter"
                          theme={theme}
                        />
                      </SocialLink>
                      <SocialLink 
                        href="#" 
                        aria-label="Visit our LinkedIn" 
                        theme={theme}
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <SocialIcon 
                          src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg" 
                          alt="LinkedIn"
                          theme={theme}
                        />
                      </SocialLink>
                      <SocialLink 
                        href="#" 
                        aria-label="Visit our Instagram" 
                        theme={theme}
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <SocialIcon 
                          src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg" 
                          alt="Instagram"
                          theme={theme}
                        />
                      </SocialLink>
                    </SocialLinks>
                  </ScrollReveal>
                </StaggeredReveal>
              </ContactInfo>
              
              <ContactFormContainer>
                <ScrollReveal direction="right">
                  <Form 
                    onSubmit={handleSubmit} 
                    theme={theme}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AnimatePresence>
                      {isSubmitted && (
                        <SuccessMessage
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            transition: { 
                              type: "spring", 
                              stiffness: 300, 
                              damping: 15 
                            } 
                          }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          Thanks for your message! We'll get back to you soon.
                        </SuccessMessage>
                      )}
                    </AnimatePresence>
                    
                    <StaggeredReveal staggerDelay={0.1} initialDelay={0.2}>
                      <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          hasError={!!errors.name}
                          isFocused={focused.name}
                          theme={theme}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          whileFocus={{ scale: 1.01 }}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <ErrorMessage 
                              id="name-error"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {errors.name}
                            </ErrorMessage>
                          )}
                        </AnimatePresence>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          hasError={!!errors.email}
                          isFocused={focused.email}
                          theme={theme}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          whileFocus={{ scale: 1.01 }}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <ErrorMessage 
                              id="email-error"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {errors.email}
                            </ErrorMessage>
                          )}
                        </AnimatePresence>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="subject">Subject (Optional)</Label>
                        <Input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          isFocused={focused.subject}
                          theme={theme}
                          whileFocus={{ scale: 1.01 }}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          hasError={!!errors.message}
                          isFocused={focused.message}
                          theme={theme}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          whileFocus={{ scale: 1.01 }}
                        />
                        <AnimatePresence>
                          {errors.message && (
                            <ErrorMessage 
                              id="message-error"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {errors.message}
                            </ErrorMessage>
                          )}
                        </AnimatePresence>
                      </FormGroup>
                      
                      <SubmitButton
                        type="submit"
                        disabled={isSubmitting}
                        theme={theme}
                        whileHover={!isSubmitting ? { y: -5, boxShadow: "0 15px 30px rgba(74, 108, 247, 0.6)" } : {}}
                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                        variants={loadingVariants}
                        animate={isSubmitting ? "loading" : ""}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </SubmitButton>
                    </StaggeredReveal>
                  </Form>
                </ScrollReveal>
              </ContactFormContainer>
            </ContactContent>
          </div>
        </ContactSection>
      </ContactWrapper>
    </Layout>
  );
};

export default ContactPage;