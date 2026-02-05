import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Componente SvgDraw mejorado con efecto acuarela y doodle
 * - Contornos tipo rotulador que se dibujan (stroke-dasharray)
 * - Rellenos tipo acuarela con textura orgánica (SVG filters + masks)
 * - Stickers flotantes con animación
 * - Respeta prefers-reduced-motion
 */
function SvgDraw({ outlinePaths = [], fillShapes = [], stickers = [], animate = false, replayKey = 0 }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathRefs = useRef([]);
  const [pathLengths, setPathLengths] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Debug: detectar cambios en animate
  useEffect(() => {
    if (animate) {
      console.log('🎨 SvgDraw: Animation triggered', { replayKey, animate });
    }
  }, [animate, replayKey]);

  // Calcular longitudes de paths al montar o cambiar
  useEffect(() => {
    const lengths = pathRefs.current.map((pathEl) => {
      return pathEl ? pathEl.getTotalLength() : 0;
    });
    setPathLengths(lengths);
  }, [outlinePaths]);

  // Manejar animación
  useEffect(() => {
    if (animate && !prefersReducedMotion) {
      setIsAnimating(true);
      
      const baseDelay = 350; // Aumentado para más tiempo entre trazos
      const animationDuration = 2500; // Aumentado para animación más lenta
      const totalDuration = animationDuration + (baseDelay * (outlinePaths.length + fillShapes.length)) + 1500;

      const timer = setTimeout(() => {
        setIsAnimating(false);
        console.log('🎨 SvgDraw: Animation complete');
      }, totalDuration);

      return () => clearTimeout(timer);
    }
  }, [animate, prefersReducedMotion, outlinePaths.length, fillShapes.length]);

  // Paleta de gradientes pastel para acuarela
  const gradients = {
    'gradient-intro-1': { from: '#e0c3fc', to: '#8ec5fc' },
    'gradient-intro-2': { from: '#ffeaa7', to: '#fdcb6e' },
    'gradient-intro-3': { from: '#ffeef8', to: '#ffc8dd' },
    'gradient-telefonica-1': { from: '#a8dadc', to: '#457b9d' },
    'gradient-telefonica-2': { from: '#5e60ce', to: '#3a86ff' },
    'gradient-caixa-1': { from: '#d8f3dc', to: '#b7e4c7' },
    'gradient-caixa-2': { from: '#95d5b2', to: '#52b788' },
    'gradient-calendar-1': { from: '#e7c6ff', to: '#c8b6ff' },
    'gradient-calendar-2': { from: '#ffc2d1', to: '#ff9ebb' },
    'gradient-calendar-3': { from: '#ffb3c6', to: '#fb6f92' },
    'gradient-rocket-1': { from: '#ffcb77', to: '#ffa36c' },
    'gradient-rocket-2': { from: '#ff6b6b', to: '#ee5a6f' },
    'gradient-rocket-3': { from: '#a7e2ff', to: '#4ecdc4' },
  };

  return (
    <svg 
      viewBox="0 0 300 250" 
      className="w-full h-full"
      aria-label="Ilustración animada kawaii"
      role="img"
    >
      <defs>
        {/* FILTRO ACUARELA - Textura orgánica */}
        <filter id="watercolor" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.02" 
            numOctaves="3" 
            seed="1"
            result="turbulence"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="6" 
            xChannelSelector="R" 
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.8" />
        </filter>

        {/* FILTRO JITTER - Trazo imperfecto tipo rotulador */}
        <filter id="handdrawn" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="2" 
            seed="2"
            result="noise"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="0.8" 
            xChannelSelector="R" 
            yChannelSelector="G"
          />
        </filter>

        {/* GRADIENTES PASTEL para cada forma */}
        {Object.entries(gradients).map(([id, colors]) => (
          <linearGradient key={id} id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.from} stopOpacity="0.85" />
            <stop offset="100%" stopColor={colors.to} stopOpacity="0.75" />
          </linearGradient>
        ))}

        {/* MÁSCARAS ANIMADAS para simular pincel acuarela */}
        {fillShapes.map((shape, index) => (
          <mask key={shape.maskId} id={shape.maskId}>
            <rect 
              x="0" 
              y="0" 
              width="300" 
              height="250" 
              fill="white"
              style={{
                opacity: isAnimating && animate && !prefersReducedMotion ? 1 : (prefersReducedMotion || !animate ? 1 : 0),
                transition: isAnimating && !prefersReducedMotion 
                  ? `opacity 1.2s ease-in ${(index + outlinePaths.length) * 0.3 + 1}s`
                  : 'none',
              }}
            />
          </mask>
        ))}
      </defs>

      {/* ========== 1️⃣ CONTORNOS TIPO ROTULADOR (DOODLE) ========== */}
      {outlinePaths.map((pathData, index) => {
        const length = pathLengths[index] || 0;
        const shouldAnimate = animate && !prefersReducedMotion && isAnimating;
        const staggerDelay = index * 0.35; // Más espaciado entre trazos

        return (
          <path
            key={`outline-${index}`}
            ref={(el) => (pathRefs.current[index] = el)}
            d={pathData.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={pathData.strokeClass}
            filter="url(#handdrawn)"
            style={{
              strokeDasharray: length,
              strokeDashoffset: shouldAnimate ? 0 : (prefersReducedMotion ? 0 : length),
              transition: shouldAnimate 
                ? `stroke-dashoffset 2.2s ease-out ${staggerDelay}s, stroke-width 2.2s ease-in-out ${staggerDelay}s`
                : 'none',
              strokeWidth: shouldAnimate ? '3' : '2.5',
              animation: shouldAnimate && !prefersReducedMotion
                ? `pressureVariation 2.2s ease-in-out ${staggerDelay}s`
                : 'none',
            }}
          />
        );
      })}

      {/* ========== 2️⃣ RELLENOS ACUARELA PASTEL (Aparecen DESPUÉS de contornos) ========== */}
      {fillShapes.map((shape, index) => {
        // Delay aumentado para que aparezcan DESPUÉS de todos los contornos
        const fillDelay = (outlinePaths.length * 0.35) + (index * 0.4) + 2.0;
        
        // Determinar opacidad inicial y final
        let initialOpacity = 0;
        let finalOpacity = 1;
        
        if (prefersReducedMotion) {
          initialOpacity = 0.8;
          finalOpacity = 0.8;
        } else if (!animate) {
          // Si no hay animación, mostrar estado final
          initialOpacity = 1;
          finalOpacity = 1;
        } else if (animate && isAnimating) {
          // Durante animación: empezar invisible
          initialOpacity = 0;
          finalOpacity = 1;
        } else if (animate && !isAnimating) {
          // Después de animar: visible
          initialOpacity = 1;
          finalOpacity = 1;
        }
        
        return (
          <path
            key={`fill-${index}`}
            d={shape.d}
            fill={`url(#${shape.gradientId})`}
            filter="url(#watercolor)"
            mask={`url(#${shape.maskId})`}
            opacity={isAnimating ? finalOpacity : initialOpacity}
            style={{
              transition: !prefersReducedMotion && animate && isAnimating
                ? `opacity 1.5s ease-in ${fillDelay}s`
                : 'none',
            }}
          />
        );
      })}

      {/* ========== 3️⃣ STICKERS FLOTANTES (Aparecen al final y permanecen) ========== */}
      {stickers.map((sticker, index) => {
        const shouldShow = !animate || prefersReducedMotion || isAnimating;
        // Stickers aparecen después de todo (contornos + rellenos) y con más tiempo
        const stickerDelay = (outlinePaths.length * 0.35) + (fillShapes.length * 0.4) + sticker.delay + 3.5;
        
        return (
          <g
            key={`sticker-${index}`}
            transform={`translate(${sticker.x}, ${sticker.y})`}
          >
            <foreignObject 
              width="80" 
              height="40" 
              x="-40" 
              y="-20"
              style={{
                opacity: shouldShow ? 1 : 0,
                transform: shouldShow ? 'scale(1)' : 'scale(0.5)',
                transition: !prefersReducedMotion && isAnimating
                  ? `opacity 0.6s ease-out ${stickerDelay}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${stickerDelay}s`
                  : 'none',
              }}
            >
              <div 
                className={`flex items-center justify-center ${sticker.className}`}
                style={{
                  animation: !prefersReducedMotion && shouldShow 
                    ? `float 3s ease-in-out infinite ${sticker.delay}s`
                    : 'none',
                }}
              >
                {sticker.label}
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* Animación flotante para stickers + variación de presión */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pressureVariation {
          0% { stroke-width: 2.5; }
          20% { stroke-width: 3.2; }
          40% { stroke-width: 2.8; }
          60% { stroke-width: 3.5; }
          80% { stroke-width: 2.9; }
          100% { stroke-width: 3; }
        }
      `}</style>
    </svg>
  );
}

export default SvgDraw;
