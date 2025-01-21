import React from 'react';
import HeroSection from '@/components/hero/HeroSection';
import PortfolioSection from '@/components/portfolio/Portfolio';
import ResumeSection from './ResumeSection';
import ContactSection from './ContactSection';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <div className="container mx-auto px-2">
        <PortfolioSection/>
      </div>
      <div className="container mx-auto px-2">
        <ResumeSection/>
      </div>
      <div className="container mx-auto px-2">
        <ContactSection/>
      </div>
    </div>
  );
};

export default HomePage;