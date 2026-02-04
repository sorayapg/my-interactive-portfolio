 import {
  SparklesIcon,
  BuildingOfficeIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

export const scenes = [
  {
    icon: SparklesIcon,
    title: "Un lienzo digital",
    text: "Mi historia profesional contada a través de líneas de código y píxeles, donde cada proyecto es una oportunidad para crear algo memorable.",
    svgPaths: [
      "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80",
      "M50 50 Q 90 10, 130 50",
      "M90 40 Q 130 10, 170 40",
    ],
  },
  {
    icon: BuildingOfficeIcon,
    title: "Telefónica",
    text: "Aquí di mis primeros pasos en el mundo corporativo, desarrollando componentes clave para el Cloud Portal y aprendiendo el valor de un diseño escalable.",
    svgPaths: [
      "M 30 150 L 30 50 L 170 50 L 170 150 Z",
      "M 30 50 L 100 20 L 170 50",
      "M 70 150 L 70 90 L 130 90 L 130 150",
      "M 80 80 L 120 80",
    ],
  },
  {
    icon: HeartIcon,
    title: "CaixaBank",
    text: "Colaboré en una app de huella de carbono, un proyecto que me conectó con el desarrollo con propósito y el diseño centrado en el usuario.",
    svgPaths: [
      "M100,20 L120,40 L140,20 L150,50 L120,80 L90,50 Z",
      "M100,90 A40,40 0 1,1 100,170 A40,40 0 1,1 100,90",
      "M90,130 L110,130",
      "M100,120 L100,140",
    ],
  },
  {
    icon: CodeBracketSquareIcon,
    title: "Mi Portfolio",
    text: "Este espacio es mi laboratorio personal. Construido con React, Vite y Tailwind, es donde experimento, aprendo y comparto mi pasión por el frontend.",
    svgPaths: [
        "M 60 40 L 40 60 L 60 80",
        "M 140 40 L 160 60 L 140 80",
        "M 80 90 L 120 30"
    ],
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "¿Creamos algo juntos?",
    text: "Mi viaje hasta ahora ha sido increíble, pero lo mejor está por venir. Si tienes una idea o un proyecto en mente, me encantaría formar parte de él.",
    svgPaths: [
      "M 70 20 L 130 20 Q 140 20, 140 30 L 140 170 Q 140 180, 130 180 L 70 180 Q 60 180, 60 170 L 60 30 Q 60 20, 70 20 Z",
      "M 90 30 L 110 30",
      "M 100 170 L 100 170",
    ],
  },
];
