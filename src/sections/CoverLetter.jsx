import React from 'react';

const CoverLetter = () => {
  const sections = [
    {
      title: 'PRESENTACIÓN PERSONAL',
      text: 'Me llamo Soraya y soy desarrolladora Front-End. Pero más allá del código, vivo el diseño como una forma de expresión. Me apasiona crear experiencias digitales que sean funcionales como hermosas, y cada interfaz que diseño lleva mi curiosidad, emoción y propósito.'
    },
    {
      title: '💻 SOBRE MIS PASIONES',
      text: 'He participado en el desarrollo del Cloud Portal corporativo de Telefónica, creando componentes frontend, y he trabajado en proyectos como una aplicación de huella de carbono para CaixaBank y una aplicación full-stack de gestión de eventos. Me apasiona combinar la lógica técnica con la sensibilidad del diseño para crear productos que la gente ame usar.'
    },
    {
      title: '🌱 VALORES QUE DEFINEN MI TRABAJO',
      text: 'Trabajo en equipo, comunicación clara y mejora continua son esenciales para mí. Me formo en entornos ágiles, colaboro con profesionales diversos y siempre estoy buscando cómo mejorar el producto… y a mí misma. Para mí, programar es pensar en las personas.'
    },
    {
      title: '✨ MI UNIVERSO CREATIVO',
      text: 'Me inspiran los colores suaves, las formas que respiran y los diseños que cuentan historias. Utilizo Figma para dar vida a prototipos pensados desde la experiencia del usuario, y combino herramientas como HTML5, CSS3, React, Jest, Node.js y MongoDB para construir soluciones con estructura y sensibilidad visual.'
    },
    {
      title: '🌍 MI MISIÓN',
      text: 'Quiero que el desarrollo web tenga alma. Que cada proyecto sea una carta visual que diga “aquí hay alguien que se preocupa por los detalles”. Creo en la sostenibilidad, la empatía, el arte digital y en usar la tecnología para mejorar cómo vivimos y nos comunicamos.'
    },
    {
      title: '💖 DISEÑO CON ALMA',
      text: 'El desarrollo web necesita funcionalidad, seguridad y belleza. Mi misión es crear interfaces que sean intuitivas, accesibles y que transmitan emociones. Cada línea de código que escribo lleva mi pasión por el diseño y la tecnología.\n'
    },
    {
      title: '📬 Contacto',
      text: [
        '📧 sorayapovedano@outlook.com',
        '📞 +34 678678678',
        '🔗 LinkedIn: Soraya Povedano',
        '🐱 GitHub: https://github.com/sorayapg'
      ]
    }
  ];

  const imageIndex = 4;

  // Colores pastel diferentes para cada card (rotan con %)
  const hoverColors = [
    'hover:bg-pink-200',
    'hover:bg-blue-100',
    'hover:bg-green-100',
    'hover:bg-purple-100',
    'hover:bg-yellow-100',
    'hover:bg-rose-100',
    'hover:bg-indigo-100'
  ];

  // Separar las secciones según la posición deseada
  const topSections = sections.slice(0, 3);
  const middleSections = [sections[3], sections[imageIndex], sections[5]]; // Asumiendo que quieres las secciones 3, 4 (imagen) y 5 en la fila central
  const contactSection = sections[6]; // La sección de contacto

  return (
    <section id="cover-letter" className="py-20 bg-pink-50 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-pink-600">Mi Carta de Presentación Kawaii</h2>

        {/* Contenedor principal con Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center">

          {/* Tarjetas superiores */}
          {topSections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col items-center rounded-2xl border border-gray-300 shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.03] p-6
                w-full
                bg-white ${hoverColors[index % hoverColors.length]}
                md:col-span-1 // Ocupa 1 columna en pantallas medianas en adelante
                animate-fadeIn animation-delay-${index * 100}ms {/* Aplicar animación y retraso */}
              `}
            >
              <div className="flex flex-col justify-between h-full w-full text-left">
                <h3 className="text-lg font-bold mb-3 text-pink-600">{section.title}</h3>
                {Array.isArray(section.text) ? (
                  section.text.map((line, i) => (
                    <React.Fragment key={i}>
                      {line.startsWith('🐱 GitHub:') ? (
                        <a
                          href={line.replace('🐱 GitHub: ', '')}
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
                  ))
                ) : (
                  <p className="text-gray-700 leading-relaxed">{section.text}</p>
                )}
              </div>
            </div>
          ))}

          {/* Tarjeta a la izquierda de la imagen */}
          {middleSections[0] && ( // Renderiza solo si existe
            <div
              key={sections.indexOf(middleSections[0])} // Usar el índice original para la key
              className={`flex flex-col items-center rounded-2xl border border-gray-300 shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.03] p-6
                w-full
                bg-white ${hoverColors[sections.indexOf(middleSections[0]) % hoverColors.length]} // Usar el índice original para los colores
                md:col-span-1 // Ocupa 1 columna en pantallas medianas en adelante
                animate-fadeIn animation-delay-${sections.indexOf(middleSections[0]) * 100}ms {/* Aplicar animación y retraso */}
              `}
            >
              <div className="flex flex-col justify-between h-full w-full text-left">
                <h3 className="text-lg font-bold mb-3 text-pink-600">{middleSections[0].title}</h3>
                {Array.isArray(middleSections[0].text) ? (
                  middleSections[0].text.map((line, i) => (
                    <React.Fragment key={i}>
                      {line.startsWith('🐱 GitHub:') ? (
                        <a
                          href={line.replace('🐱 GitHub: ', '')}
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
                  ))
                ) : (
                  <p className="text-gray-700 leading-relaxed">{middleSections[0].text}</p>
                )}
              </div>
            </div>
          )}

          {/* Tarjeta de la imagen centrada */}
          <div
            key={imageIndex}
            className={`flex flex-col items-center rounded-2xl border border-gray-300 shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.03] p-6
              w-full
              bg-pink-100 hover:shadow-xl
              md:col-span-1 // Ocupa 1 columna en pantallas medianas en adelante
              animate-fadeIn animation-delay-${imageIndex * 100}ms {/* Aplicar animación y retraso */}
            `}
          >
            <div className="w-full h-64 flex items-center justify-center">
              <img
                src="/images/storyboard/transparent.png"
                alt="Ilustración de Soraya en estilo kawaii"
                className="rounded-full border-4 border-pink-200 shadow-lg hover:rotate-[-2deg] transition-all duration-300 ease-in-out max-h-full object-contain"
              />
            </div>
          </div>

          {/* Tarjeta a la derecha de la imagen */}
           {middleSections[2] && ( // Renderiza solo si existe
            <div
              key={sections.indexOf(middleSections[2])} // Usar el índice original para la key
              className={`flex flex-col items-center rounded-2xl border border-gray-300 shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.03] p-6
                w-full
                bg-white ${hoverColors[sections.indexOf(middleSections[2]) % hoverColors.length]} // Usar el índice original para los colores
                md:col-span-1 // Ocupa 1 columna en pantallas medianas en adelante
                animate-fadeIn animation-delay-${sections.indexOf(middleSections[2]) * 100}ms {/* Aplicar animación y retraso */}
              `}
            >
              <div className="flex flex-col justify-between h-full w-full text-left">
                <h3 className="text-lg font-bold mb-3 text-pink-600">{middleSections[2].title}</h3>
                {Array.isArray(middleSections[2].text) ? (
                  middleSections[2].text.map((line, i) => (
                    <React.Fragment key={i}>
                      {line.startsWith('🐱 GitHub:') ? (
                        <a
                          href={line.replace('🐱 GitHub: ', '')}
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
                  ))
                ) : (
                  <p className="text-gray-700 leading-relaxed">{middleSections[2].text}</p>
                )}
              </div>
            </div>
          )}

        </div> {/* Cierre del grid principal */}

        {/* Nueva fila para la tarjeta de contacto centrada */}
        {contactSection && (
          <div className="grid grid-cols-1 gap-6 mt-6"> {/* Nueva grid para centrar la tarjeta */}
            <div
              key={sections.indexOf(contactSection)} // Usar el índice original para la key
              className={`flex flex-col items-center rounded-2xl border border-gray-300 shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.03] p-6 mx-auto {/* Añadido mx-auto para centrar */}
                w-full md:w-1/3 {/* Ajusta el ancho para que no ocupe todo el ancho en md y más */}
                bg-white ${hoverColors[sections.indexOf(contactSection) % hoverColors.length]} // Usar el índice original para los colores
                animate-fadeIn animation-delay-${sections.indexOf(contactSection) * 100}ms {/* Aplicar animación y retraso */}
              `}
            >
              <div className="flex flex-col justify-between h-full w-full text-left">
                <h3 className="text-lg font-bold mb-3 text-pink-600">{contactSection.title}</h3>
                {Array.isArray(contactSection.text) ? (
                  contactSection.text.map((line, i) => (
                    <React.Fragment key={i}>
                      {line.startsWith('🐱 GitHub:') ? (
                        <a
                          href={line.replace('🐱 GitHub: ', '')}
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
                  ))
                ) : (
                  <p className="text-gray-700 leading-relaxed">{contactSection.text}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default CoverLetter;
