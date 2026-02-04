/**
 * Definición de escenas para el Draw Story
 * Cada escena contiene:
 * - id: identificador único
 * - title: título de la escena
 * - description: descripción del texto
 * - icon: nombre del icono de Heroicons a usar
 * - paths: array de strings con los paths SVG (atributo "d")
 */

export const scenes = [
  {
    id: 0,
    title: "Mi Viaje Profesional",
    description: "Bienvenido a mi historia profesional. A través de esta experiencia interactiva, te contaré cómo he evolucionado en el mundo del desarrollo.",
    icon: "SparklesIcon",
    // Paths simples para la intro: un camino, una estrella, un corazón
    paths: [
      "M 50 150 Q 100 50 150 150 T 250 150", // Camino curvo
      "M 150 50 L 160 80 L 190 90 L 170 110 L 180 140 L 150 125 L 120 140 L 130 110 L 110 90 L 140 80 Z", // Estrella
      "M 150 200 Q 120 170 120 145 Q 120 120 145 120 Q 165 120 180 135 Q 195 120 220 120 Q 245 120 245 145 Q 245 170 215 200 L 180 235 Z", // Corazón
      "M 30 180 L 270 180", // Línea base
    ]
  },
  {
    id: 1,
    title: "Telefónica Tech",
    description: "En Telefónica Tech trabajé como desarrolladora, donde aprendí a manejar proyectos grandes y colaborar en equipos multidisciplinares. Fue aquí donde consolidé mis bases en tecnologías modernas.",
    icon: "BuildingOfficeIcon",
    // Paths para edificio/empresa
    paths: [
      "M 50 200 L 50 80 L 150 80 L 150 200 Z", // Edificio principal
      "M 70 100 L 70 120 L 90 120 L 90 100 Z", // Ventana 1
      "M 110 100 L 110 120 L 130 120 L 130 100 Z", // Ventana 2
      "M 70 140 L 70 160 L 90 160 L 90 140 Z", // Ventana 3
      "M 110 140 L 110 160 L 130 160 L 130 140 Z", // Ventana 4
      "M 85 180 L 85 200 L 115 200 L 115 180 Z", // Puerta
      "M 150 80 L 180 60 L 180 200 L 150 200", // Torre lateral
    ]
  },
  {
    id: 2,
    title: "CaixaBank Tech",
    description: "En CaixaBank Tech me especialicé en el desarrollo de soluciones financieras, trabajando con arquitecturas complejas y aprendiendo sobre seguridad y escalabilidad en aplicaciones bancarias.",
    icon: "BuildingLibraryIcon",
    // Paths para banco/finanzas
    paths: [
      "M 100 50 L 200 50 L 220 70 L 80 70 Z", // Frontón del banco
      "M 95 70 L 95 180 L 205 180 L 205 70", // Estructura principal
      "M 110 80 L 110 170", // Columna 1
      "M 135 80 L 135 170", // Columna 2
      "M 165 80 L 165 170", // Columna 3
      "M 190 80 L 190 170", // Columna 4
      "M 80 180 L 220 180", // Base
    ]
  },
  {
    id: 3,
    title: "CalendarApp",
    description: "Desarrollé CalendarApp, una aplicación completa de gestión de eventos con React, Redux y Node.js. Este proyecto me permitió demostrar mis habilidades en desarrollo full-stack y gestión de estado complejo.",
    icon: "CalendarDaysIcon",
    // Paths para calendario/app
    paths: [
      "M 70 60 L 70 190 L 230 190 L 230 60 Z", // Marco del calendario
      "M 70 90 L 230 90", // Línea del encabezado
      "M 90 60 L 90 75", // Anilla 1
      "M 150 60 L 150 75", // Anilla 2
      "M 210 60 L 210 75", // Anilla 3
      "M 100 120 L 130 120 L 130 145 L 100 145 Z", // Evento 1
      "M 160 110 L 210 110 L 210 160 L 160 160 Z", // Evento 2
    ]
  },
  {
    id: 4,
    title: "Siguiente Capítulo",
    description: "Estoy lista para el siguiente desafío. Mi objetivo es seguir creciendo como desarrolladora, contribuir a proyectos innovadores y formar parte de un equipo que valore la calidad y la creatividad.",
    icon: "RocketLaunchIcon",
    // Paths para cohete/futuro
    paths: [
      "M 150 50 L 170 100 L 130 100 Z", // Punta del cohete
      "M 130 100 L 130 170 L 170 170 L 170 100", // Cuerpo del cohete
      "M 115 150 L 130 170 L 130 190 Z", // Aleta izquierda
      "M 170 170 L 185 150 L 170 190 Z", // Aleta derecha
      "M 145 120 L 145 135 L 155 135 L 155 120 Z", // Ventana
      "M 140 180 Q 150 195 160 180", // Llama 1
      "M 135 190 Q 150 210 165 190", // Llama 2
    ]
  }
];
