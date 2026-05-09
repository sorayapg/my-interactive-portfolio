import React, { useState, useEffect } from 'react';
import { listCoverLetterCards } from '../services/contentService';

// Fallback local — se usa solo si Firestore esta vacio o falla
const CARDS_FALLBACK = [
  {
    id: 'f0', type: 'text',
    title: 'PRESENTACION PERSONAL',
    text: 'Me llamo Soraya y soy desarrolladora Front-End. Pero mas alla del codigo, vivo el diseno como una forma de expresion. Me apasiona crear experiencias digitales que sean funcionales como hermosas, y cada interfaz que diseno lleva mi curiosidad, emocion y proposito.',
    bg: 'bg-white', hoverColor: 'hover:bg-pink-200', order: 0, visible: true,
  },
  {
    id: 'f1', type: 'text',
    title: 'SOBRE MIS PASIONES',
    text: 'He participado en el desarrollo del Cloud Portal corporativo de Telefonica, creando componentes frontend, y he trabajado en proyectos como una aplicacion de huella de carbono para CaixaBank y una aplicacion full-stack de gestion de eventos. Me apasiona combinar la logica tecnica con la sensibilidad del diseno para crear productos que la gente ame usar.',
    bg: 'bg-white', hoverColor: 'hover:bg-blue-100', order: 1, visible: true,
  },
  {
    id: 'f2', type: 'text',
    title: 'VALORES QUE DEFINEN MI TRABAJO',
    text: 'Trabajo en equipo, comunicacion clara y mejora continua son esenciales para mi. Me formo en entornos agiles, colaboro con profesionales diversos y siempre estoy buscando como mejorar el producto y a mi misma. Para mi, programar es pensar en las personas.',
    bg: 'bg-white', hoverColor: 'hover:bg-green-100', order: 2, visible: true,
  },
  {
    id: 'f3', type: 'text',
    title: 'MI UNIVERSO CREATIVO',
    text: 'Me inspiran los colores suaves, las formas que respiran y los disenos que cuentan historias. Utilizo Figma para dar vida a prototipos pensados desde la experiencia del usuario, y combino herramientas como HTML5, CSS3, React, Jest, Node.js y MongoDB para construir soluciones con estructura y sensibilidad visual.',
    bg: 'bg-white', hoverColor: 'hover:bg-purple-100', order: 3, visible: true,
  },
  {
    id: 'f4', type: 'image',
    title: 'Ilustracion kawaii',
    imageUrl: '/images/storyboard/carta-presentacion.png',
    imageAlt: 'Ilustracion de Soraya en estilo kawaii',
    bg: 'bg-pink-100', hoverColor: 'hover:bg-pink-200', order: 4, visible: true,
  },
  {
    id: 'f5', type: 'text',
    title: 'DISENO CON ALMA',
    text: 'El desarrollo web necesita funcionalidad, seguridad y belleza. Mi mision es crear interfaces que sean intuitivas, accesibles y que transmitan emociones. Cada linea de codigo que escribo lleva mi pasion por el diseno y la tecnologia.',
    bg: 'bg-white', hoverColor: 'hover:bg-rose-100', order: 5, visible: true,
  },
  {
    id: 'f6', type: 'contact',
    title: 'Contacto',
    lines: [
      'sorayapovedano@outlook.com',
      '+34 678678678',
      'LinkedIn: Soraya Povedano',
      'GitHub: https://github.com/sorayapg',
    ],
    bg: 'bg-white', hoverColor: 'hover:bg-indigo-100', order: 6, visible: true,
  },
];

// Safelist Tailwind — evita que el purge elimine clases dinamicas de Firestore
const _TAILWIND_SAFELIST = [
  'bg-white', 'bg-pink-50', 'bg-pink-100', 'bg-purple-50', 'bg-purple-100',
  'bg-blue-50', 'bg-blue-100', 'bg-green-50', 'bg-green-100',
  'bg-yellow-100', 'bg-rose-100', 'bg-indigo-100',
  'hover:bg-pink-100', 'hover:bg-pink-200',
  'hover:bg-blue-100', 'hover:bg-blue-200',
  'hover:bg-green-100', 'hover:bg-green-200',
  'hover:bg-purple-100', 'hover:bg-purple-200',
  'hover:bg-yellow-100', 'hover:bg-yellow-200',
  'hover:bg-rose-100', 'hover:bg-rose-200',
  'hover:bg-indigo-100', 'hover:bg-indigo-200',
];

const CoverLetter = () => {
  const [cards, setCards] = useState(CARDS_FALLBACK);

  useEffect(() => {
    listCoverLetterCards().then(({ data }) => {
      if (data && data.length > 0) {
        const visible = data
          .filter((c) => c.visible !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setCards(visible);
      }
    });
  }, []);

  const topRow = cards.slice(0, 3);
  const midRow = cards.slice(3, 6);
  const bottomCards = cards.slice(6);

  const cardClass = (card) =>
    'flex flex-col items-center rounded-2xl border border-gray-300 shadow-md overflow-hidden ' +
    'transition-all duration-300 ease-in-out transform hover:scale-[1.03] ' +
    (card.type === 'image' ? '' : 'p-6 ') +
    'w-full ' + (card.bg || 'bg-white') + ' ' + (card.hoverColor || '');

  const renderContent = (card) => {
    if (card.type === 'image') {
      return (
        <div className="w-full aspect-square rounded-2xl overflow-hidden">
          <img
            src={card.imageUrl}
            alt={card.imageAlt || 'Ilustracion'}
            className="w-full h-full object-contain transition-all duration-300 ease-in-out hover:scale-105"
            style={{ display: 'block' }}
          />
        </div>
      );
    }

    if (card.type === 'contact') {
      return (
        <div className="flex flex-col justify-between h-full w-full text-left">
          <h3 className="text-lg font-bold mb-3 text-pink-600">{card.title}</h3>
          {(card.lines || []).map((line, i) => (
            <React.Fragment key={i}>
              {line.startsWith('GitHub:') ? (
                <a
                  href={line.replace('GitHub: ', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline focus:outline focus:outline-blue-500"
                >
                  {line}
                </a>
              ) : (
                <p className="text-gray-700 mb-1">{line}</p>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-between h-full w-full text-left">
        <h3 className="text-lg font-bold mb-3 text-pink-600">{card.title}</h3>
        <p className="text-gray-700 leading-relaxed">{card.text}</p>
      </div>
    );
  };

  return (
    <section id="cover-letter" className="py-14 bg-pink-50 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="portfolio-title-gradient mb-3 text-center">Mi Carta de Presentación Kawaii</h2>
        <p className="portfolio-subtitle text-center mb-12">Aquí vivo, diseño y creo ✨</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center">
          {[...topRow, ...midRow].map((card) => (
            <div key={card.id} className={cardClass(card)}>
              {renderContent(card)}
            </div>
          ))}
        </div>

        {bottomCards.length > 0 && (
          <div className="grid grid-cols-1 gap-6 mt-6">
            {bottomCards.map((card) => (
              <div key={card.id} className={cardClass(card) + ' mx-auto w-full md:w-1/3'}>
                {renderContent(card)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoverLetter;