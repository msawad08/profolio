import React, { useEffect } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import PortfolioSection from '@/components/portfolio/Portfolio';
import ResumeSection from './ResumeSection';
import ContactSection from './ContactSection';
import { trackPageView, trackEvent } from '../lib/firebase';

const HomePage: React.FC = () => {
    useEffect(() => {
        // Track page view when component mounts
        trackPageView('Home Page');

        // Track additional events if needed
        trackEvent('home_page_loaded', {
            timestamp: new Date().toISOString()
        });

        // You could also set up intersection observers to track when sections become visible
        const observeSections = () => {
            const sections = document.querySelectorAll('section[id]');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        trackEvent('section_viewed', {
                            section_name: sectionId
                        });
                    }
                });
            }, { threshold: 0.5 });

            sections.forEach(section => {
                observer.observe(section);
            });

            // Cleanup function
            return () => {
                sections.forEach(section => {
                    observer.unobserve(section);
                });
            };
        };

        // Set up observers after a short delay to ensure DOM is ready
        const timer = setTimeout(observeSections, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="space-y-16 pb-16">
        <section id="hero">
            <HeroSection />
            </section>
            <section id="portfolio" className="container mx-auto px-2">
        <PortfolioSection/>
        </section>
        <section id="resume" className="container mx-auto px-2">
        <ResumeSection/>
        </section>
        <section id="contact" className="container mx-auto px-2">
        <ContactSection/>
        </section>
        </div>
);
};

export default HomePage;