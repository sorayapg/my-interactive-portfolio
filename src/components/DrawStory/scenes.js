/**
 * Definición de escenas mejoradas con efecto acuarela y doodle
 * Estructura:
 * - outlinePaths: contornos tipo rotulador (se dibujan primero)
 * - fillShapes: formas con relleno acuarela pastel (aparecen después)
 * - stickers: elementos decorativos flotantes
 */

export const scenes = [
  {
    id: 0,
    title: "Mi Viaje Profesional",
    description: "Bienvenido a mi historia profesional. A través de esta experiencia interactiva, te contaré cómo he evolucionado en el mundo del desarrollo.",
    icon: "SparklesIcon",
    outlinePaths: [
      { d: "M 50 140 Q 100 60 150 140 Q 200 60 250 140", strokeClass: "stroke-indigo-500" },
      { d: "M 150 50 L 158 76 L 186 84 L 166 103 L 172 130 L 150 118 L 128 130 L 134 103 L 114 84 L 142 76 Z", strokeClass: "stroke-yellow-500" },
      { d: "M 150 185 Q 125 160 125 140 Q 125 120 145 120 Q 160 120 172 132 Q 184 120 204 120 Q 224 120 224 140 Q 224 160 199 185 L 172 215 Z", strokeClass: "stroke-pink-500" },
    ],
    fillShapes: [
      { d: "M 50 140 Q 100 60 150 140 Q 200 60 250 140 L 250 200 L 50 200 Z", gradientId: "gradient-intro-1", maskId: "mask-intro-1" },
      { d: "M 150 50 L 158 76 L 186 84 L 166 103 L 172 130 L 150 118 L 128 130 L 134 103 L 114 84 L 142 76 Z", gradientId: "gradient-intro-2", maskId: "mask-intro-2" },
      { d: "M 150 185 Q 125 160 125 140 Q 125 120 145 120 Q 160 120 172 132 Q 184 120 204 120 Q 224 120 224 140 Q 224 160 199 185 L 172 215 Z", gradientId: "gradient-intro-3", maskId: "mask-intro-3" },
    ],
    stickers: [
      { label: "✨", x: 40, y: 60, delay: 0.5, className: "text-2xl" },
      { label: "💫", x: 260, y: 70, delay: 0.8, className: "text-xl" },
      { label: "🌟", x: 30, y: 200, delay: 1.1, className: "text-xl" },
    ]
  },
  {
    id: 1,
    title: "Telefónica Tech",
    description: "En Telefónica Tech trabajé como desarrolladora, donde aprendí a manejar proyectos grandes y colaborar en equipos multidisciplinares.",
    icon: "BuildingOfficeIcon",
    outlinePaths: [
      { d: "M 50 200 L 50 78 L 150 80 L 150 200", strokeClass: "stroke-blue-600" },
      { d: "M 68 100 L 68 120 L 92 120 L 92 100 Z", strokeClass: "stroke-sky-400" },
      { d: "M 108 100 L 108 120 L 132 120 L 132 100 Z", strokeClass: "stroke-sky-400" },
      { d: "M 68 142 L 68 160 L 92 160 L 92 142 Z", strokeClass: "stroke-sky-400" },
      { d: "M 108 142 L 108 160 L 132 160 L 132 142 Z", strokeClass: "stroke-sky-400" },
      { d: "M 83 178 L 83 200 L 117 200 L 117 178 Z", strokeClass: "stroke-blue-500" },
      { d: "M 150 80 L 182 58 L 182 200 L 150 200", strokeClass: "stroke-indigo-600" },
    ],
    fillShapes: [
      { d: "M 50 200 L 50 78 L 150 80 L 150 200 Z", gradientId: "gradient-telefonica-1", maskId: "mask-telefonica-1" },
      { d: "M 150 80 L 182 58 L 182 200 L 150 200 Z", gradientId: "gradient-telefonica-2", maskId: "mask-telefonica-2" },
    ],
    stickers: [
      { label: "💼", x: 35, y: 65, delay: 0.6, className: "text-2xl" },
      { label: "React", x: 190, y: 100, delay: 0.9, className: "text-xs font-bold text-blue-600 bg-white/80 px-2 py-1 rounded" },
      { label: "JS", x: 200, y: 140, delay: 1.2, className: "text-xs font-bold text-yellow-600 bg-white/80 px-2 py-1 rounded" },
    ]
  },
  {
    id: 2,
    title: "CaixaBank Tech",
    description: "En CaixaBank Tech me especialicé en el desarrollo de soluciones financieras, trabajando con arquitecturas complejas.",
    icon: "BuildingLibraryIcon",
    outlinePaths: [
      { d: "M 98 52 L 202 50 L 222 72 L 78 70 Z", strokeClass: "stroke-emerald-700" },
      { d: "M 93 70 L 93 182 L 207 180 L 207 70", strokeClass: "stroke-emerald-600" },
      { d: "M 108 78 L 108 172", strokeClass: "stroke-emerald-500" },
      { d: "M 133 78 L 133 172", strokeClass: "stroke-emerald-500" },
      { d: "M 163 78 L 163 172", strokeClass: "stroke-emerald-500" },
      { d: "M 188 78 L 188 172", strokeClass: "stroke-emerald-500" },
      { d: "M 78 180 L 222 180", strokeClass: "stroke-emerald-800" },
    ],
    fillShapes: [
      { d: "M 98 52 L 202 50 L 222 72 L 78 70 Z", gradientId: "gradient-caixa-1", maskId: "mask-caixa-1" },
      { d: "M 93 70 L 93 182 L 207 180 L 207 70 Z", gradientId: "gradient-caixa-2", maskId: "mask-caixa-2" },
    ],
    stickers: [
      { label: "🏦", x: 40, y: 45, delay: 0.7, className: "text-3xl" },
      { label: "🔐", x: 230, y: 90, delay: 1.0, className: "text-xl" },
      { label: "API", x: 220, y: 140, delay: 1.3, className: "text-xs font-bold text-emerald-700 bg-white/80 px-2 py-1 rounded" },
    ]
  },
  {
    id: 3,
    title: "CalendarApp",
    description: "Desarrollé CalendarApp, una aplicación completa de gestión de eventos con React, Redux y Node.js.",
    icon: "CalendarDaysIcon",
    outlinePaths: [
      { d: "M 68 58 L 68 192 L 232 190 L 232 60 Z", strokeClass: "stroke-purple-600" },
      { d: "M 68 92 L 232 90", strokeClass: "stroke-purple-500" },
      { d: "M 88 58 L 88 76", strokeClass: "stroke-purple-400" },
      { d: "M 148 58 L 148 76", strokeClass: "stroke-purple-400" },
      { d: "M 208 58 L 208 76", strokeClass: "stroke-purple-400" },
      { d: "M 98 118 L 132 120 L 132 147 L 98 145 Z", strokeClass: "stroke-pink-500" },
      { d: "M 158 108 L 212 110 L 212 162 L 158 160 Z", strokeClass: "stroke-rose-500" },
    ],
    fillShapes: [
      { d: "M 68 58 L 68 92 L 232 90 L 232 60 Z", gradientId: "gradient-calendar-1", maskId: "mask-calendar-1" },
      { d: "M 98 118 L 132 120 L 132 147 L 98 145 Z", gradientId: "gradient-calendar-2", maskId: "mask-calendar-2" },
      { d: "M 158 108 L 212 110 L 212 162 L 158 160 Z", gradientId: "gradient-calendar-3", maskId: "mask-calendar-3" },
    ],
    stickers: [
      { label: "📅", x: 35, y: 50, delay: 0.5, className: "text-3xl" },
      { label: "Redux", x: 240, y: 100, delay: 0.8, className: "text-xs font-bold text-purple-700 bg-white/80 px-2 py-1 rounded" },
      { label: "Node", x: 245, y: 140, delay: 1.1, className: "text-xs font-bold text-green-700 bg-white/80 px-2 py-1 rounded" },
      { label: "💜", x: 30, y: 170, delay: 1.4, className: "text-xl" },
    ]
  },
  {
    id: 4,
    title: "Siguiente Capítulo",
    description: "Estoy lista para el siguiente desafío. Mi objetivo es seguir creciendo como desarrolladora y formar parte de un equipo innovador.",
    icon: "RocketLaunchIcon",
    outlinePaths: [
      { d: "M 148 48 L 172 102 L 128 100 Z", strokeClass: "stroke-orange-500" },
      { d: "M 128 100 L 128 172 L 172 170 L 172 100", strokeClass: "stroke-red-500" },
      { d: "M 113 148 L 128 172 L 128 192 Z", strokeClass: "stroke-orange-400" },
      { d: "M 172 170 L 187 148 L 172 192 Z", strokeClass: "stroke-orange-400" },
      { d: "M 143 118 L 143 137 L 157 135 L 157 120 Z", strokeClass: "stroke-cyan-400" },
      { d: "M 138 178 Q 150 197 162 180", strokeClass: "stroke-yellow-500" },
      { d: "M 133 188 Q 150 212 167 190", strokeClass: "stroke-amber-500" },
    ],
    fillShapes: [
      { d: "M 148 48 L 172 102 L 128 100 Z", gradientId: "gradient-rocket-1", maskId: "mask-rocket-1" },
      { d: "M 128 100 L 128 172 L 172 170 L 172 100 Z", gradientId: "gradient-rocket-2", maskId: "mask-rocket-2" },
      { d: "M 143 118 L 143 137 L 157 135 L 157 120 Z", gradientId: "gradient-rocket-3", maskId: "mask-rocket-3" },
    ],
    stickers: [
      { label: "🚀", x: 190, y: 60, delay: 0.6, className: "text-3xl" },
      { label: "✨", x: 100, y: 80, delay: 0.9, className: "text-2xl" },
      { label: "UX", x: 90, y: 140, delay: 1.2, className: "text-xs font-bold text-pink-600 bg-white/80 px-2 py-1 rounded" },
      { label: "⭐", x: 200, y: 180, delay: 1.5, className: "text-2xl" },
    ]
  }
];
