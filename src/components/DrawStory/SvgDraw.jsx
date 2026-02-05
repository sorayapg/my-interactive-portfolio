import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// ============ CONSTANTES DE TIMING CONFIGURABLES ============
const OUTLINE_DRAW_SEC = 3.2;       // Duración de dibujo por path (lento, con alma)
const OUTLINE_STAGGER_SEC = 0.55;   // Stagger entre paths de contorno
const EMOTIONAL_PAUSE_SEC = 0.8;    // Pausa emocional: "terminé de dibujar → ahora pinto"
const FILL_WASH_SEC = 5.6;          // Duración del relleno acuarela con pigmento irregular
const STICKERS_DELAY_SEC = 1.8;     // Delay tras completar rellenos

/**
 * Componente SvgDraw con efecto acuarela y doodle
 * ORDEN GARANTIZADO: CONTORNOS → RELLENO → STICKERS
 * - Contornos tipo rotulador con presión y jitter (stroke-dasharray)
 * - Rellenos tipo acuarela con máscara animada (wipe con textura)
 * - Stickers flotantes con animación
 * - Respeta prefers-reduced-motion
 */
function SvgDraw({ outlinePaths = [], fillShapes = [], stickers = [], animate = false, replayKey = 0 }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathRefs = useRef([]);
  const [pathLengths, setPathLengths] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stickersVisible, setStickersVisible] = useState(false);

  // Calcular longitudes de paths al montar o cambiar
  useEffect(() => {
    const lengths = pathRefs.current.map((pathEl) => {
      return pathEl ? pathEl.getTotalLength() : 0;
    });
    setPathLengths(lengths);
  }, [outlinePaths]);

  // Calcular timing total de la secuencia
  const totalOutlineTime = outlinePaths.length > 0 
    ? OUTLINE_DRAW_SEC + (outlinePaths.length - 1) * OUTLINE_STAGGER_SEC
    : 0;
  const fillStartTime = totalOutlineTime + EMOTIONAL_PAUSE_SEC;  // Pausa emocional perceptible
  const stickersStartTime = fillStartTime + FILL_WASH_SEC + STICKERS_DELAY_SEC;
  const totalAnimationTime = stickersStartTime + 2.5; // +2.5s para stickers

  // Manejar animación con timing calculado
  useEffect(() => {
    if (animate && !prefersReducedMotion) {
      setIsAnimating(true);
      setStickersVisible(false); // Reset stickers al inicio

      // Timer para finalizar animación principal
      const animTimer = setTimeout(() => {
        setIsAnimating(false);
      }, totalAnimationTime * 1000);

      // Timer para mostrar stickers (y mantenerlos visibles)
      const stickersTimer = setTimeout(() => {
        setStickersVisible(true);
      }, stickersStartTime * 1000);

      return () => {
        clearTimeout(animTimer);
        clearTimeout(stickersTimer);
      };
    } else if (animate && prefersReducedMotion) {
      // Si hay reduced motion, mostrar todo inmediatamente
      setIsAnimating(false);
      setStickersVisible(true);
    }
  }, [animate, prefersReducedMotion, totalAnimationTime, stickersStartTime, replayKey]);

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
        {/* FILTRO TEXTURA ACUARELA - Para wipe effect */}
        <filter id="watercolorTexture" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.04 0.03" 
            numOctaves="4" 
            seed="5"
            result="turbulence"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="15" 
            xChannelSelector="R" 
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="1.2" />
        </filter>

        {/* FILTRO ACUARELA - Textura orgánica para fills */}
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

        {/* MÁSCARAS ANIMADAS para wipe effect acuarela (pincel pintando) */}
        {fillShapes.map((shape, index) => {
          const maskDelay = fillStartTime + (index * 0.5);
          return (
            <mask key={shape.maskId} id={shape.maskId}>
              <rect 
                x="-50" 
                y="-50" 
                width="400" 
                height="350" 
                fill="white"
                filter="url(#watercolorTexture)"
                style={{
                  transformOrigin: 'center',
                  transform: isAnimating && animate && !prefersReducedMotion 
                    ? 'scale(1)' 
                    : (prefersReducedMotion || !animate ? 'scale(1)' : 'scale(0)'),
                  transition: !prefersReducedMotion && animate && isAnimating
                    ? `transform ${FILL_WASH_SEC}s cubic-bezier(0.25, 0.1, 0.25, 1) ${maskDelay}s`
                    : 'none',
                }}
              />
            </mask>
          );
        })}
      </defs>

      {/* ========== 1️⃣ CONTORNOS TIPO ROTULADOR (DOODLE) ========== */}
      {outlinePaths.map((pathData, index) => {
        const length = pathLengths[index] || 0;
        const shouldAnimate = animate && !prefersReducedMotion && isAnimating;
        const staggerDelay = index * OUTLINE_STAGGER_SEC;

        return (
          <path
            key={`outline-${index}-${replayKey}`}
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
                ? `stroke-dashoffset ${OUTLINE_DRAW_SEC}s cubic-bezier(0.4, 0, 0.2, 1) ${staggerDelay}s`
                : 'none',
              animation: shouldAnimate
                ? `pressureVariation ${OUTLINE_DRAW_SEC}s ease-in-out ${staggerDelay}s`
                : 'none',
            }}
          />
        );
      })}

      {/* ========== 2️⃣ RELLENOS ACUARELA PASTEL (Aparecen DESPUÉS de contornos) ========== */}
      {fillShapes.map((shape, index) => {
        const fillDelay = fillStartTime + (index * 0.5);
        const fillAnimName = `watercolorWash-${replayKey}-${index}`;
        
        // Opacidad: invisible hasta fillStart, luego animación orgánica
        const shouldAnimate = !prefersReducedMotion && animate && isAnimating;
        
        return (
          <path
            key={`fill-${index}-${replayKey}`}
            d={shape.d}
            fill={`url(#${shape.gradientId})`}
            filter="url(#watercolor)"
            mask={`url(#${shape.maskId})`}
            style={{
              opacity: shouldAnimate ? 0 : 0.9,
              animation: shouldAnimate
                ? `${fillAnimName} ${FILL_WASH_SEC}s ease-in-out ${fillDelay}s forwards`
                : 'none',
            }}
          />
        );
      })}

      {/* ========== 3️⃣ STICKERS FLOTANTES (Aparecen al final y permanecen) ========== */}
      {stickers.map((sticker, index) => {
        // Stickers con estado separado para evitar resets
        const shouldShowSticker = stickersVisible || prefersReducedMotion || !animate;
        const stickerAnimDelay = (sticker.delay || 0);
        
        return (
          <g
            key={`sticker-${index}-${replayKey}`}
            transform={`translate(${sticker.x}, ${sticker.y})`}
            style={{
              opacity: shouldShowSticker ? 1 : 0,
              pointerEvents: shouldShowSticker ? 'auto' : 'none',
              transition: shouldShowSticker
                ? `opacity 0.7s ease-out`
                : 'none',
            }}
          >
            <foreignObject 
              width="80" 
              height="40" 
              x="-40" 
              y="-20"
              style={{
                transform: shouldShowSticker ? 'scale(1)' : 'scale(0.5)',
                transition: shouldShowSticker
                  ? `transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)`
                  : 'none',
              }}
            >
              <div 
                className={`flex items-center justify-center ${sticker.className}`}
                style={{
                  animation: !prefersReducedMotion && shouldShowSticker
                    ? `float 3s ease-in-out infinite ${stickerAnimDelay}s`
                    : 'none',
                }}
              >
                {sticker.label}
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* Keyframes: Float, Presión, y Acuarela orgánica con pigmento irregular */}
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
        
        /* EFECTO PIGMENTO IRREGULAR: no fade lineal, sino fluctuaciones naturales de acuarela real */
        ${fillShapes.map((_, index) => `
          @keyframes watercolorWash-${replayKey}-${index} {
            0% { opacity: 0; }
            10% { opacity: 0.2; }
            25% { opacity: 0.45; }
            40% { opacity: 0.6; }
            55% { opacity: 0.48; }
            70% { opacity: 0.65; }
            85% { opacity: 0.78; }
            100% { opacity: 0.9; }
          }
        `).join('')}
      `}</style>
    </svg>
  );
}

export default SvgDraw;
