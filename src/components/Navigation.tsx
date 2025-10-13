import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home', fallback: null },
    { href: '#portfolio-section', label: 'Portfolio', fallback: null },
    { href: '#experience', label: 'Experience', fallback: '#resume-heading' },
    { href: '#skills', label: 'Skills', fallback: '#resume-heading' },
    { href: '#achievements', label: 'Achievements', fallback: '#resume-heading' },
    { href: '#contact-heading', label: 'Contact', fallback: null },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, fallback: string | null = null) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const scrollToElement = (targetHref: string) => {
      const element = document.querySelector(targetHref);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    // Try to scroll to main target immediately
    if (!scrollToElement(href)) {
      // If element not found, wait for lazy-loaded content
      setTimeout(() => {
        if (!scrollToElement(href)) {
          // Try one more time after a longer delay
          setTimeout(() => {
            if (!scrollToElement(href) && fallback) {
              // If still not found and there's a fallback, scroll to fallback
              scrollToElement(fallback);
            }
          }, 500);
        }
      }, 100);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="text-xl font-bold text-gray-800 hover:text-primary transition-colors"
          >
            MS
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href, link.fallback)}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white/95 backdrop-blur-md rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href, link.fallback)}
                  className="text-gray-700 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-gray-100 rounded"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
