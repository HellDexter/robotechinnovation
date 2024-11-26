import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import LanguageSelector from './header/LanguageSelector';
import ProductsMenu from './header/ProductsMenu';
import MobileMenu from './header/MobileMenu';

export default function Header() {
  const { t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = async (e, sectionId) => {
    e.preventDefault();
    
    if (router.pathname !== '/') {
      await router.push('/');
    }
    
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const headerOffset = 96;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMenuOpen(false);
    }, router.pathname !== '/' ? 100 : 0);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-lg' : 'bg-primary'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logoRTI.jpg"
                alt="RTI Robotech Innovation Logo"
                width={200}
                height={80}
                className="h-20 w-auto my-2"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#about"
              className="text-secondary hover:text-white transition-colors whitespace-nowrap font-medium"
              onClick={(e) => handleSectionClick(e, 'about')}
            >
              {t('nav.about')}
            </Link>

            <ProductsMenu />

            <Link
              href="/#services"
              className="text-secondary hover:text-white transition-colors whitespace-nowrap font-medium"
              onClick={(e) => handleSectionClick(e, 'services')}
            >
              {t('nav.services')}
            </Link>

            <Link 
              href="/#contact" 
              className="text-secondary hover:text-white transition-colors whitespace-nowrap font-medium"
              onClick={(e) => handleSectionClick(e, 'contact')}
            >
              {t('nav.contact')}
            </Link>
            
            <LanguageSelector />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-secondary hover:text-white hover:bg-secondary/10"
            aria-label={isMenuOpen ? t('common.close') : t('nav.menu')}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSectionClick={handleSectionClick}
      />
    </motion.header>
  );
}
