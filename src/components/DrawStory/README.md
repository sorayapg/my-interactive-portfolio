# 🎨 DrawStory Component - Acuarela Kawaii

## Descripción

Componente interactivo que narra tu historia profesional con un estilo visual único:
- **Contornos tipo rotulador/doodle** que se dibujan progresivamente
- **Rellenos acuarela pastel** con textura orgánica (SVG filters)
- **Stickers flotantes** animados
- **Navegación por scroll** con IntersectionObserver
- **Completamente accesible** (prefers-reduced-motion)

## Arquitectura

```
DrawStory/
├── DrawStory.jsx          → Componente principal (scroll + navigation)
├── SvgDraw.jsx            → Renderizado SVG con efectos acuarela
├── scenes.js              → Datos de las 5 escenas
├── usePrefersReducedMotion.js → Hook de accesibilidad
└── index.js               → Export
```

## Tecnología Visual

### 1️⃣ Contornos Doodle con Efecto Rotulador Real
- **`stroke-dasharray` + `stroke-dashoffset`**: Animación de trazo dibujándose
- **Stroke ancho (3px)** con caps redondeados
- **Colores vibrantes** personalizados por escena
- **Stagger delay**: 350ms entre paths para efecto secuencial
- **⭐ Variación de presión**: Keyframe que fluctúa el grosor (2.5 → 3.5)
- **⭐ Jitter sutil**: Filtro SVG `#handdrawn` para líneas imperfectas

### 2️⃣ Acuarela Pastel
- **feTurbulence**: Genera ruido fractal orgánico
- **feDisplacementMap**: Crea bordes irregulares
- **feGaussianBlur**: Suaviza el efecto
- **Gradientes pastel**: 13 combinaciones de colores
- **Máscaras animadas**: Simula pincel pintando

### 3️⃣ Stickers Flotantes
- Emojis y badges tech
- Animación `float` con CSS keyframes
- Fade + scale con spring easing
- Delays escalonados

## Estructura de Escena

```javascript
{
  id: 0,
  title: "Mi Viaje Profesional",
  description: "Texto descriptivo...",
  icon: "SparklesIcon", // Heroicon
  
  outlinePaths: [
    { 
      d: "M 50 140 Q 100 60...", // Path SVG
      strokeClass: "stroke-indigo-500" // Tailwind class
    }
  ],
  
  fillShapes: [
    {
      d: "M 50 140 Q 100 60...",
      gradientId: "gradient-intro-1",
      maskId: "mask-intro-1"
    }
  ],
  
  stickers: [
    {
      label: "✨",
      x: 40, y: 60,
      delay: 0.5,
      className: "text-2xl"
    }
  ]
}
```

## Interacción

### Scroll Navigation
- 5 sentinels (IntersectionObserver)
- `rootMargin: '-40% 0px -40% 0px'` → activa cuando está centrado
- Anima solo en primera visualización

### Replay Animation
- Botón ↻ en controles fijos
- Reinicia `replayKey` para forzar re-render
- Funciona sin scroll

### Progress Dots
- 5 dots que indican escena activa
- Click → scroll suave a escena
- Active dot se expande (w-8)

## Accesibilidad

✅ `prefers-reduced-motion`: Sin animaciones
✅ `aria-label` en elementos clave
✅ Navegación por teclado (botones)
✅ Alto contraste de colores
✅ Estado final visible sin JS

## Paleta de Colores

| Escena | Gradiente 1 | Gradiente 2 | Tema |
|--------|-------------|-------------|------|
| Intro | `#e0c3fc → #8ec5fc` | `#ffeaa7 → #fdcb6e` | Mágico |
| Telefónica | `#a8dadc → #457b9d` | `#5e60ce → #3a86ff` | Azul Tech |
| CaixaBank | `#d8f3dc → #b7e4c7` | `#95d5b2 → #52b788` | Verde Fintech |
| Calendar | `#e7c6ff → #c8b6ff` | `#ffc2d1 → #ff9ebb` | Púrpura App |
| Rocket | `#ffcb77 → #ffa36c` | `#ff6b6b → #ee5a6f` | Naranja Futuro |

## Debugging

El componente incluye `console.log` para debugging:
- `📍 DrawStory: Active index changed`
- `🔄 DrawStory: Replay animation`
- `🎨 SvgDraw: Animation triggered`
- `🎨 SvgDraw: Animation complete`

## Performance

- ✅ **Sin librerías externas pesadas** (0 KB extra)
- ✅ **CSS transitions nativas** (GPU accelerated)
- ✅ **SVG optimizado** (viewBox 300x250)
- ✅ **Lazy animation** (solo escena activa)
- ✅ **Memoización** con useCallback
- ✅ **Auto-hide** reduce paint operations

---

## Personalización

Para añadir una nueva escena:
1. Edita `scenes.js` y agrega un nuevo objeto
2. Crea paths en editor SVG (Figma, Illustrator, Inkscape)
3. Define nuevos gradientes si necesitas colores personalizados
4. Ajusta timings si es necesario

---

## 📝 Nota Final

Este componente fue diseñado para transmitir **personalidad, creatividad y alma visual**, alejándose del diseño corporativo perfecto.

**Objetivo**: Que el usuario sienta que está viendo la historia profesional pintándose en un cuaderno kawaii con acuarela pastel.

¡Disfruta de tu portfolio kawaii! ✨🎨💖

**Creado por Soraya** - Desarrolladora Front-End apasionada por crear experiencias digitales mágicas
