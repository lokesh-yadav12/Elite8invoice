import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position and determine if scrolled past a certain point
 * @param threshold - The scroll threshold in pixels (default: 50)
 * @returns Object containing scroll position and if scrolled past threshold
 */
const useScrollPosition = (threshold: number = 50) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
      setIsScrolled(currentPosition > threshold);
    };

    // Set initial position
    updatePosition();

    // Add event listener
    window.addEventListener('scroll', updatePosition);

    // Clean up
    return () => window.removeEventListener('scroll', updatePosition);
  }, [threshold]);

  return { scrollPosition, isScrolled };
};

export default useScrollPosition;
