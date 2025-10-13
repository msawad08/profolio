import React, { useEffect, lazy, Suspense } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import Navigation from '@/components/Navigation';
import { trackPageView, trackEvent } from '../lib/firebase';

// Lazy load sections for better performance
const PortfolioSection = lazy(() => import('@/components/portfolio/Portfolio'));
const ResumeSection = lazy(() => import('./ResumeSection'));
const ContactSection = lazy(() => import('./ContactSection'));

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
        <>
            <Navigation />
            <div className="space-y-8 pb-16">
                <section id="hero">
                    <HeroSection />
                </section>

            <Suspense fallback={
                <div className="container mx-auto px-2 mt-2 flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Loading...</p>
                    </div>
                </div>
            }>
                <div className="container mx-auto px-2 mt-2">
                    <PortfolioSection/>
                </div>

                <div className="container mx-auto px-2 mt-2">
                    <ResumeSection/>
                </div>

                <div className="container mx-auto px-2">
                    <ContactSection/>
                </div>
            </Suspense>
            </div>
        </>
    );
};

export default HomePage;