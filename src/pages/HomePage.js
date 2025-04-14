import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import ScrollReveal from '../animations/ScrollReveal';
import StaggeredReveal from '../animations/StaggeredReveal';
import ParallaxSection from '../animations/ParallaxSection';
import useReducedMotion from '../animations/useReducedMotion';
import AnimatedText from '../animations/AnimatedText';
import Loader from '../animations/Loader';

// Styled components
const HomeWrapper = styled.div`
  padding: 2rem 0;
  overflow-x: hidden; /* Prevent horizontal overflow from animations */
`;

const HeroSection = styled.section`
  background: ${({ theme }) => 
    theme.isDarkTheme 
      ? 'linear-gradient(135deg, #1e1e1e 0%, #121212 100%)' 
      : 'linear-gradient(135deg, #f5f8ff 0%, #e6efff 100%)'
  };
  padding: 4rem 0;
  transition: background 0.3s ease;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const HeroText = styled.div`
  flex: 1;
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const H1 = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Lead = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Enhanced button with hover effects
const Button = styled(motion.a)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 108, 247, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(74, 108, 247, 0.6);
    
    &::before {
      transform: translateX(0);
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  transform-origin: center;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

// New component for decorative background elements
const BackgroundDecoration = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 0;
`;

// New section with parallax images
const ParallaxGallery = styled.section`
  padding: 6rem 0;
  background: ${({ theme }) => 
    theme.isDarkTheme 
      ? '#0a0a0a' 
      : '#f0f4ff'
  };
  overflow: hidden;
  position: relative;
`;

const GalleryTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const GalleryOverlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
  color: white;
`;

const FeatureText = styled(motion.p)`
  margin-top: 1rem;
`;

const LoaderSection = styled.section`
  padding: 6rem 0;
  text-align: center;
  position: relative;
`;

const LoaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LoaderCard = styled(motion.div)`
  padding: 2rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// New component for testimonials with images
const TestimonialsSection = styled.section`
  padding: 6rem 0;
  background: ${({ theme }) => 
    theme.isDarkTheme 
      ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)' 
      : 'linear-gradient(135deg, #e6efff 0%, #f5f8ff 100%)'
  };
  position: relative;
  overflow: hidden;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TestimonialCard = styled(motion.div)`
  background: ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(30, 30, 30, 0.7)' 
      : 'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: center;
  border: 1px solid ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.5)'
  };
`;

const TestimonialImage = styled(motion.img)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const TestimonialContent = styled.div``;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
  position: relative;
  
  &::before {
    content: '"';
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.2;
    position: absolute;
    top: -2rem;
    left: -1rem;
  }
`;

const TestimonialAuthor = styled.p`
  font-weight: 700;
`;

const TestimonialRole = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

// New component for team section with photos
const TeamShowcaseSection = styled.section`
  padding: 6rem 0;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

const TeamMemberCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  margin: 1rem;
  width: 280px; /* Fixed width to prevent excessive sizing */
  flex: 0 0 auto; /* Don't allow cards to grow or shrink */
  height: 400px;
`;

const TeamMemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const TeamMemberInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  color: white;
`;

const TeamSlider = styled(motion.div)`
  display: flex;
  overflow-x: auto;
  padding: 2rem 0;
  margin: 0 -1rem; /* Negative margin to offset the card margins */
  max-width: 100%; /* Ensure content doesn't exceed viewport width */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const HomePage = () => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  
  // Button hover animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 20px rgba(74, 108, 247, 0.6)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };
  
  // Feature card hover animation variants
  const featureCardVariants = {
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };
  
  // Gallery overlay animation variants
  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Team member data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Michael Rodriguez",
      role: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Emily Chen",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "David Wilson",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Jessica Park",
      role: "Marketing Specialist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      text: "The animations and user experience in this React SPA are outstanding. The attention to detail makes browsing a pleasure.",
      author: "Amanda Lewis",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      text: "I'm impressed by the smooth transitions and responsive design. It works perfectly on all my devices without any lag.",
      author: "Jason Torres",
      role: "UX Engineer",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      text: "The dark mode implementation is seamless, and the animations respect my reduced motion preferences. Great accessibility!",
      author: "Sophia Wang",
      role: "Accessibility Advocate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      text: "This is a perfect example of how to use animations to enhance UX without compromising on performance or accessibility.",
      author: "Robert Green",
      role: "Senior Frontend Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <Layout 
      title="Home" 
      description="Welcome to ReactSPA - A modern React single page application."
    >
      <HomeWrapper>
        {/* Background decorations */}
        <BackgroundDecoration 
          theme={theme}
          style={{
            top: '15%',
            left: '5%',
            width: '300px',
            height: '300px',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <BackgroundDecoration 
          theme={theme}
          style={{
            bottom: '10%',
            right: '5%',
            width: '250px',
            height: '250px',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Hero Section with Staggered Timeline Animation */}
        <HeroSection theme={theme}>
          <div className="container">
            <StaggeredReveal initialDelay={0.2} staggerDelay={0.15}>
              <HeroContent>
                <HeroText>
                  <H1>
                    <AnimatedText
                      text="Welcome to ReactSPA"
                      effect="reveal"
                      theme={theme}
                      element="span"
                    />
                  </H1>
                  <Lead theme={theme}>
                    <AnimatedText
                      text="A modern React single page application with smooth transitions and responsive design."
                      effect="typewriter"
                      theme={theme}
                      element="span"
                    />
                  </Lead>
                  <Button 
                    href="#features" 
                    theme={theme}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Explore Features
                  </Button>
                </HeroText>
                <HeroImage>
                  <StyledImage 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80" 
                    alt="Modern workspace with computer"
                    loading="lazy"
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </HeroImage>
              </HeroContent>
            </StaggeredReveal>
          </div>
        </HeroSection>

        {/* Features Section with Scroll Reveal Animations */}
        <FeaturesSection id="features">
          <div className="container">
            <ScrollReveal>
              <AnimatedText
                text="Key Features"
                effect="wave"
                theme={theme}
                element="h2"
              />
            </ScrollReveal>
            
            <FeatureGrid>
              <ScrollReveal direction="up" delay={0.1}>
                <FeatureCard 
                  theme={theme}
                  variants={featureCardVariants}
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FeatureIcon theme={theme}>🚀</FeatureIcon>
                  <h3>Modern React</h3>
                  <FeatureText>Built with the latest React features and best practices.</FeatureText>
                </FeatureCard>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.2}>
                <FeatureCard 
                  theme={theme}
                  variants={featureCardVariants}
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FeatureIcon theme={theme}>🎨</FeatureIcon>
                  <h3>Styled Components</h3>
                  <FeatureText>Beautiful, maintainable styling with styled-components.</FeatureText>
                </FeatureCard>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.3}>
                <FeatureCard 
                  theme={theme}
                  variants={featureCardVariants}
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FeatureIcon theme={theme}>🌗</FeatureIcon>
                  <h3>Theme Support</h3>
                  <FeatureText>Light and dark theme support with Context API.</FeatureText>
                </FeatureCard>
              </ScrollReveal>
            </FeatureGrid>
          </div>
        </FeaturesSection>
        
        {/* New Team Members Horizontal Slider */}
        <TeamShowcaseSection theme={theme}>
          <div className="container">
            <ScrollReveal>
              <AnimatedText
                text="Meet Our Team"
                effect="bounce"
                theme={theme}
                element="h2"
              />
              <p>The talented people behind this project</p>
            </ScrollReveal>
            
            <TeamSlider
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {teamMembers.map((member, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <TeamMemberCard 
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TeamMemberImage 
                      src={member.image} 
                      alt={`${member.name} - ${member.role}`}
                      loading="lazy"
                    />
                    <TeamMemberInfo
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                    >
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </TeamMemberInfo>
                  </TeamMemberCard>
                </ScrollReveal>
              ))}
            </TeamSlider>
          </div>
        </TeamShowcaseSection>
        
        {/* Loader Section */}
        <LoaderSection>
          <div className="container">
            <ScrollReveal>
              <AnimatedText
                text="Animated Loaders"
                effect="bounce"
                theme={theme}
                element="h2"
              />
              <p>Versatile loading animations for various use cases</p>
            </ScrollReveal>
            
            <LoaderGrid>
              <ScrollReveal direction="up" delay={0.1}>
                <LoaderCard theme={theme} whileHover={{ y: -10 }}>
                  <h3>Circular Loader</h3>
                  <Loader type="circle" theme={theme} />
                  <p>Perfect for form submissions and data fetching</p>
                </LoaderCard>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.2}>
                <LoaderCard theme={theme} whileHover={{ y: -10 }}>
                  <h3>Dots Loader</h3>
                  <Loader type="dots" theme={theme} />
                  <p>Ideal for page transitions and content loading</p>
                </LoaderCard>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.3}>
                <LoaderCard theme={theme} whileHover={{ y: -10 }}>
                  <h3>Pulse Loader</h3>
                  <Loader type="pulse" theme={theme} />
                  <p>Subtle animation for background processes</p>
                </LoaderCard>
              </ScrollReveal>
            </LoaderGrid>
          </div>
        </LoaderSection>
        
        {/* New Testimonials Section with Images */}
        <TestimonialsSection theme={theme}>
          <div className="container">
            <ScrollReveal>
              <AnimatedText
                text="What People Say"
                effect="wave"
                theme={theme}
                element="h2"
              />
              <p>Feedback from our users and clients</p>
            </ScrollReveal>
            
            <TestimonialGrid>
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.1}>
                  <TestimonialCard 
                    theme={theme}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TestimonialImage 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      theme={theme}
                      loading="lazy"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    />
                    <TestimonialContent>
                      <TestimonialText theme={theme}>
                        {testimonial.text}
                      </TestimonialText>
                      <TestimonialAuthor>
                        {testimonial.author}
                      </TestimonialAuthor>
                      <TestimonialRole theme={theme}>
                        {testimonial.role}
                      </TestimonialRole>
                    </TestimonialContent>
                  </TestimonialCard>
                </ScrollReveal>
              ))}
            </TestimonialGrid>
          </div>
        </TestimonialsSection>
        
        {/* Parallax Gallery Section */}
        <ParallaxGallery theme={theme}>
          <div className="container">
            <ScrollReveal>
              <AnimatedText
                text="Parallax Gallery"
                effect="color"
                theme={theme}
                element="h2"
              />
            </ScrollReveal>
            
            <GalleryGrid>
              <ScrollReveal direction="left">
                <ParallaxSection strength={3} direction="up">
                  <GalleryItem>
                    <GalleryImage 
                      src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1345&q=80" 
                      alt="Workspace with laptop and plants"
                      loading="lazy"
                    />
                    <GalleryOverlay
                      initial="hidden"
                      whileHover="visible"
                      variants={overlayVariants}
                    >
                      <h3>Modern Workspace</h3>
                      <p>Beautiful parallax scrolling effect</p>
                    </GalleryOverlay>
                  </GalleryItem>
                </ParallaxSection>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <ParallaxSection strength={2} direction="down">
                  <GalleryItem>
                    <GalleryImage 
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Code on a screen"
                      loading="lazy"
                    />
                    <GalleryOverlay
                      initial="hidden"
                      whileHover="visible"
                      variants={overlayVariants}
                    >
                      <h3>Clean Code</h3>
                      <p>Elegant implementation</p>
                    </GalleryOverlay>
                  </GalleryItem>
                </ParallaxSection>
              </ScrollReveal>
              
              <ScrollReveal direction="left">
                <ParallaxSection strength={4} direction="up">
                  <GalleryItem>
                    <GalleryImage 
                      src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="UI/UX design elements"
                      loading="lazy"
                    />
                    <GalleryOverlay
                      initial="hidden"
                      whileHover="visible"
                      variants={overlayVariants}
                    >
                      <h3>Beautiful UI</h3>
                      <p>Thoughtful user experience</p>
                    </GalleryOverlay>
                  </GalleryItem>
                </ParallaxSection>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <ParallaxSection strength={3} direction="down">
                  <GalleryItem>
                    <GalleryImage 
                      src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Brainstorming session"
                      loading="lazy"
                    />
                    <GalleryOverlay
                      initial="hidden"
                      whileHover="visible"
                      variants={overlayVariants}
                    >
                      <h3>Collaborative</h3>
                      <p>Team-focused development</p>
                    </GalleryOverlay>
                  </GalleryItem>
                </ParallaxSection>
              </ScrollReveal>
              
              <ScrollReveal direction="left">
                <ParallaxSection strength={2} direction="up">
                  <GalleryItem>
                    <GalleryImage 
                      src="https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Mobile device with responsive design"
                      loading="lazy"
                    />
                    <GalleryOverlay
                      initial="hidden"
                      whileHover="visible"
                      variants={overlayVariants}
                    >
                      <h3>Responsive</h3>
                      <p>Works on all devices</p>
                    </GalleryOverlay>
                  </GalleryItem>
                </ParallaxSection>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <ParallaxSection strength={4} direction="down">
                  <GalleryItem>
                    <GalleryImage 
                      src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="React code on a screen"
                      loading="lazy"
                    />
                    <GalleryOverlay
                      initial="hidden"
                      whileHover="visible"
                      variants={overlayVariants}
                    >
                      <h3>React Powered</h3>
                      <p>Built with modern libraries</p>
                    </GalleryOverlay>
                  </GalleryItem>
                </ParallaxSection>
              </ScrollReveal>
            </GalleryGrid>
          </div>
        </ParallaxGallery>
      </HomeWrapper>
    </Layout>
  );
};

export default HomePage;