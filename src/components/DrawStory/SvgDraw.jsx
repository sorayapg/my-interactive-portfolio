import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const SvgDraw = ({ paths }) => { 
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathRefs = useRef([]);

  useEffect(() => {
    pathRefs.current.forEach((path) => {
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      }
    });
  }, [paths]);

  const shouldAnimate = !prefersReducedMotion;

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          ref={(el) => (pathRefs.current[i] = el)}
          d={d}
          className="transition-all duration-[2000ms]"
          style={{
            strokeDashoffset: shouldAnimate ? 0 : pathRefs.current[i]?.getTotalLength(),
            transitionDelay: shouldAnimate ? `${i * 300}ms` : '0ms',
            transitionProperty: 'stroke-dashoffset',
          }}
        />
      ))}
    </svg>
  );
};

export default SvgDraw;
