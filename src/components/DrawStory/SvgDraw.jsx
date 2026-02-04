import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Componente que renderiza y anima paths SVG
 * @param {Object} props
 * @param {string[]} props.paths - Array de strings con los paths SVG (atributo "d")
 * @param {boolean} props.animate - Si debe animar los paths
 * @param {Function} props.onAnimationComplete - Callback cuando termina la animación
 */
function SvgDraw({ paths = [], animate = false, onAnimationComplete }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathRefs = useRef([]);
  const [pathLengths, setPathLengths] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calcular longitudes de los paths al montar
  useEffect(() => {
    const lengths = pathRefs.current.map((pathEl) => {
      return pathEl ? pathEl.getTotalLength() : 0;
    });
    setPathLengths(lengths);
  }, [paths]);

  // Manejar la animación cuando cambia el prop animate
  useEffect(() => {
    if (animate && !prefersReducedMotion) {
      setIsAnimating(true);
      
      // Calcular duración total de la animación considerando el stagger
      const baseDelay = 200; // ms de delay entre paths
      const animationDuration = 1500; // ms por path
      const totalDuration = animationDuration + (baseDelay * paths.length);

      // Callback cuando termina la animación
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, totalDuration);

      return () => clearTimeout(timer);
    }
  }, [animate, prefersReducedMotion, paths.length, onAnimationComplete]);

  return (
    <svg 
      viewBox="0 0 300 250" 
      className="w-full h-full"
      aria-label="Ilustración animada de la escena"
      role="img"
    >
      {paths.map((pathData, index) => {
        const length = pathLengths[index] || 0;
        const shouldAnimate = animate && !prefersReducedMotion && isAnimating;
        
        // Calcular el delay incremental para cada path (stagger)
        const staggerDelay = index * 0.2; // segundos

        return (
          <path
            key={index}
            ref={(el) => (pathRefs.current[index] = el)}
            d={pathData}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-indigo-600"
            style={{
              strokeDasharray: length,
              strokeDashoffset: shouldAnimate ? 0 : (prefersReducedMotion ? 0 : length),
              transition: shouldAnimate 
                ? `stroke-dashoffset 1.5s ease-out ${staggerDelay}s`
                : 'none',
            }}
          />
        );
      })}
    </svg>
  );
}

export default SvgDraw;
