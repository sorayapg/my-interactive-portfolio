// src/components/DrawStory/usePrefersReducedMotion.js

import React from 'react'; // <-- ESTA LÍNEA ES LA SOLUCIÓN

const QUERY = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
