import { ArrowUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: '#215431',
        color: 'white',
        padding: '1rem',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 999,
      }}
    >
      <ArrowUp />
    </button>
  ) : null;
};
export default ScrollToTopButton;
