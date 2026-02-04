import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

function useStableCallback(callback) {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });
  return useCallback((...args) => callbackRef.current?.(...args), []);
}

function SvgDraw({ paths = [], animate = false, onAnimationComplete }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathRefs = useRef([]);
  const [pathLengths, setPathLengths] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const stableOnAnimationComplete = useStableCallback(onAnimationComplete);

  useLayoutEffect(() => {
    const newLengths = pathRefs.current.map((el) => (el ? el.getTotalLength() : 0));
    setPathLengths(newLengths);
  }, [JSON.stringify(paths)]);

  useEffect(() => {
    if (animate && !prefersReducedMotion) {
      const startTimer = setTimeout(() => setIsAnimating(true), 50);
      const endTimer = setTimeout(() => stableOnAnimationComplete?.(), 2000);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    } else {
      setIsAnimating(false);
    }
  }, [animate, prefersReducedMotion, stableOnAnimationComplete]);

  return (
    <svg
      viewBox="0 0 300 250"
      className="w-full h-full"
      aria-label="Ilustración animada de la escena"
      role="img"
    >
      {Array.isArray(paths) &&
        paths.map((pathData, index) => {
          const length = pathLengths[index] || 0;
          const staggerDelay = index * 0.2;

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
                strokeDashoffset: isAnimating ? 0 : length,
                transition: `stroke-dashoffset 1.5s ease-out ${staggerDelay}s`,
              }}
            />
          );
        })}
    </svg>
  );
}

export default SvgDraw;
