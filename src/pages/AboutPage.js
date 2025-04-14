import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import ScrollReveal from '../animations/ScrollReveal';
import ParallaxSection from '../animations/ParallaxSection';
import StaggeredReveal from '../animations/StaggeredReveal';
import useReducedMotion from '../animations/useReducedMotion';

const AboutWrapper = styled.div`
  padding: 2rem 0;
  overflow-x: hidden; /* Prevent horizontal overflow from animations */
`;

const AboutSection = styled.section`
  padding: 4rem 0;
  position: relative;
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const AboutText = styled.div`
  flex: 1;
`;

const AboutImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  @media (max-width: 767px) {
    margin-top: 2rem;
  }
`;

const StyledImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const TeamSection = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.surface};
  position: relative;
  overflow: hidden;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background-color: ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(30, 30, 30, 0.5)' 
      : 'rgba(255, 255, 255, 0.5)'
  };
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.5)'
  };
  transition: all 0.3s ease;
`;

const MemberAvatar = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  filter: grayscale(20%);
  transition: all 0.5s ease;

  ${TeamMember}:hover & {
    filter: grayscale(0%);
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const MemberName = styled.h3`
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-style: italic;
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 0;
`;

const SkillsSection = styled.section`
  padding: 6rem 0;
  background: ${({ theme }) => 
    theme.isDarkTheme 
      ? 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)' 
      : 'linear-gradient(135deg, #f0f4ff 0%, #e6efff 100%)'
  };
`;

const SkillBar = styled(motion.div)`
  height: 40px;
  background: ${({ theme }) => 
    theme.isDarkTheme 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.6)'
  };
  border-radius: 20px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SkillFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.secondary} 100%
  );
  border-radius: 20px;
  position: relative;
  box-shadow: 0 0 10px rgba(74, 108, 247, 0.5);
`;

const SkillLabel = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => 
    theme.isDarkTheme ? 'white' : 'rgba(0, 0, 0, 0.7)'
  };
  font-weight: 500;
  z-index: 1;
`;

const SkillPercent = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => 
    theme.isDarkTheme ? 'white' : 'rgba(0, 0, 0, 0.7)'
  };
  font-weight: 700;
  z-index: 1;
`;

const AboutPage = () => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  
  // Animation variants for the team members
  const memberVariants = {
    hover: {
      y: -10,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };
  
  // Skills data
  const skills = [
    { name: "React & React Hooks", level: 95 },
    { name: "CSS & Styled Components", level: 90 },
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Performance Optimization", level: 75 }
  ];

  return (
    <Layout 
      title="About Us" 
      description="Learn more about the ReactSPA team and our mission."
    >
      <AboutWrapper>
        {/* Background decorative elements */}
        <BackgroundShape 
          theme={theme}
          style={{
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <AboutSection>
          <div className="container">
            <ScrollReveal>
              <h1>About Us</h1>
            </ScrollReveal>
            
            <AboutContent>
              <AboutText>
                <StaggeredReveal staggerDelay={0.1} initialDelay={0.2}>
                  <ScrollReveal direction="left">
                    <p>Welcome to ReactSPA, a modern React-based Single Page Application that showcases the power of React alongside the latest web technologies. We believe in creating seamless user experiences with smooth transitions and responsive designs.</p>
                  </ScrollReveal>
                  
                  <ScrollReveal direction="left" delay={0.1}>
                    <p>Our mission is to demonstrate best practices in React development, including:</p>
                  </ScrollReveal>
                  
                  <ScrollReveal direction="left" delay={0.2}>
                    <ul>
                      <StaggeredReveal staggerDelay={0.05}>
                        <li>Modern React hooks and patterns</li>
                        <li>Client-side routing with React Router</li>
                        <li>State management with Context API</li>
                        <li>Responsive design principles</li>
                        <li>Accessibility (a11y) compliance</li>
                      </StaggeredReveal>
                    </ul>
                  </ScrollReveal>
                  
                  <ScrollReveal direction="left" delay={0.3}>
                    <p>This project was built using React {React.version} with a focus on performance, maintainability, and developer experience.</p>
                  </ScrollReveal>
                </StaggeredReveal>
              </AboutText>
              
              <AboutImage>
                <ScrollReveal direction="right">
                  <ParallaxSection strength={2} direction="up">
                    <StyledImage 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Our team collaborating on a project"
                      loading="lazy"
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" 
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300 
                      }}
                    />
                  </ParallaxSection>
                </ScrollReveal>
              </AboutImage>
            </AboutContent>
          </div>
        </AboutSection>
        
        {/* New Skills Section */}
        <SkillsSection theme={theme}>
          <div className="container">
            <ScrollReveal>
              <h2>Our Expertise</h2>
            </ScrollReveal>
            
            {skills.map((skill, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SkillBar theme={theme}>
                  <SkillLabel theme={theme}>{skill.name}</SkillLabel>
                  <SkillFill 
                    theme={theme}
                    initial={{ width: 0 }}
                    whileInView={{ 
                      width: `${prefersReducedMotion ? skill.level : 0}%`,
                      transition: {
                        duration: prefersReducedMotion ? 0.1 : 1.5,
                        ease: "easeOut",
                        delay: prefersReducedMotion ? 0 : 0.2
                      }
                    }}
                    animate={{ 
                      width: `${skill.level}%` 
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 0.2
                    }}
                  />
                  <SkillPercent theme={theme}>{skill.level}%</SkillPercent>
                </SkillBar>
              </ScrollReveal>
            ))}
          </div>
        </SkillsSection>
        
        <TeamSection theme={theme}>
          {/* Background decorations */}
          <BackgroundShape 
            theme={theme}
            style={{
              bottom: '10%',
              left: '5%',
              width: '250px',
              height: '250px',
            }}
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          <div className="container">
            <ScrollReveal>
              <h2>Our Team</h2>
            </ScrollReveal>
            
            <TeamGrid>
              <ScrollReveal direction="up" delay={0.1}>
                <TeamMember
                  theme={theme}
                  variants={memberVariants}
                  whileHover="hover"
                >
                  <MemberAvatar 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Team member - Jane Doe"
                    theme={theme}
                    loading="lazy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <MemberName>Jane Doe</MemberName>
                  <MemberRole theme={theme}>Frontend Developer</MemberRole>
                  <p>Jane specializes in creating beautiful user interfaces with React and modern CSS techniques.</p>
                </TeamMember>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.2}>
                <TeamMember
                  theme={theme}
                  variants={memberVariants}
                  whileHover="hover"
                >
                  <MemberAvatar 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Team member - John Smith"
                    theme={theme}
                    loading="lazy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />
                  <MemberName>John Smith</MemberName>
                  <MemberRole theme={theme}>UX Designer</MemberRole>
                  <p>John focuses on user experience, ensuring that our applications are intuitive and accessible.</p>
                </TeamMember>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.3}>
                <TeamMember
                  theme={theme}
                  variants={memberVariants}
                  whileHover="hover"
                >
                  <MemberAvatar 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Team member - Alex Chen"
                    theme={theme}
                    loading="lazy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  <MemberName>Alex Chen</MemberName>
                  <MemberRole theme={theme}>Full Stack Developer</MemberRole>
                  <p>Alex brings expertise in both frontend and backend technologies, ensuring seamless integration.</p>
                </TeamMember>
              </ScrollReveal>
            </TeamGrid>
          </div>
        </TeamSection>
      </AboutWrapper>
    </Layout>
  );
};

export default AboutPage;