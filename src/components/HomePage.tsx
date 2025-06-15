import React, { useEffect } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import PortfolioSection from '@/components/portfolio/Portfolio';
import ResumeSection from './ResumeSection';
import ContactSection from './ContactSection';
import { trackPageView, trackEvent } from '../lib/firebase';

const HomePage: React.FC = () => {
    useEffect(() => {
        // Track page view when component mounts
        trackPageView('3D Interactive Home Page');

        // Track additional events if needed
        trackEvent('3d_home_page_loaded', {
            timestamp: new Date().toISOString()
        });
    }, []);

    return (
        <div className="space-y-8 pb-16">
            <section id="hero">
                <HeroSection />
            </section>

                <div className="container mx-auto px-2 mt-2">
                    <PortfolioSection/>
                </div>


                <div className="container mx-auto px-2 mt-2">
                    <ResumeSection/>
                </div>

                <div className="container mx-auto px-2">
                    <ContactSection/>
                </div>
        </div>
    );
};

export default HomePage;