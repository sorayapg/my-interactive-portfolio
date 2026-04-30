import { useState } from 'react';
import StoryboardModal from '../components/StoryboardModal';

// Todo el contenido original preservado — las cards muestran solo imagen + título
const vinetas = [
  {
    id: 1,
    title: '🎀 Viñeta 1: ¡Hola mundo!',
    text: '¡Soy Soraya! Desarrolladora Front-End apasionada por crear experiencias digitales mágicas. 📍 Desde Luanco, creando interfaces con alegría y mucho código.',
    img: '/images/storyboard/hola-mundo.png',
    alt: 'Viñeta 1: ¡Hola mundo!',
    bg: 'bg-white',
  },
  {
    id: 2,
    title: '🧁 Viñeta 2: Formación, el inicio',
    text: '🎓 Me formé en Desarrollo de Aplicaciones Web en CIFP Avilés. Aquí aprendí JavaScript, React, HTML, CSS y Bootstrap. ¡Fue el inicio de mi hechizo tecnológico!',
    img: '/images/storyboard/formacion-daw.png',
    alt: 'Viñeta 2: Formación, el inicio',
    bg: 'bg-pink-100',
  },
  {
    id: 3,
    title: '☁️ Viñeta 3: Cloud Portal Telefónica',
    text: '💻 Trabajé en el desarrollo frontend del Cloud Portal corporativo de Telefónica, creando componentes reutilizables dentro de una arquitectura híbrida Joomla (PHP) + JavaScript. ⚙️ Aquí trabajé con integración real con backend, lógica de negocio y entorno enterprise, mejorando rendimiento, estructura y experiencia de usuario. 🚀 Fue el paso donde mis habilidades pasaron de aprendizaje a experiencia profesional real en producto corporativo.',
    img: '/images/storyboard/cloud-telefonica.png',
    alt: 'Viñeta 3: Cloud Portal Telefónica',
    bg: 'bg-indigo-100',
  },
  {
    id: 4,
    title: '🍡 Viñeta 4: Primeras prácticas',
    text: '🔰 En Visualia 360 me enfrenté a APIs, traducciones dinámicas y WordPress. ¡Mis poderes crecían entre idiomas y plugins!',
    img: '/images/storyboard/visualia-practicas.png',
    alt: 'Viñeta 4: Primeras prácticas',
    bg: 'bg-blue-100',
  },
  {
    id: 5,
    title: '🌟 Viñeta 5: Misiones en DXC Technology',
    text: '👩‍💻 Desde febrero a mayo 2024, desarrollé apps con React, pruebas automatizadas con Selenium y Jest, y trabajé con equipos ágiles (Scrum y Waterfall). 💚 ¡Incluso participé en un proyecto premiado de huella de carbono!',
    img: '/images/storyboard/dxc-experiencia.png',
    alt: 'Viñeta 5: Misiones en DXC Technology',
    bg: 'bg-green-100',
  },
  {
    id: 6,
    title: '🛠️ Viñeta 6: Mi stack kawaii',
    text: '🧠 Mi arsenal: JavaScript (ES6+), React, Figma, GitHub, Jenkins, Selenium, pruebas unitarias y diseño UX/UI. 📈 ¡Siempre aprendiendo para subir de nivel!',
    img: '/images/storyboard/stack-tecnologico.png',
    alt: 'Viñeta 6: Mi stack kawaii',
    bg: 'bg-yellow-100',
  },
  {
    id: 7,
    title: '🧑‍🚀 Viñeta 7: Proyecto con superpoderes',
    text: '🗓️ App de calendario con React, Node.js, MongoDB: 🔗 Frontend / Backend 👾 Tecnologías utilizadas: React, Redux Toolkit, Node, Express, MongoDB Compass.',
    img: '/images/storyboard/calendar-app.png',
    alt: 'Viñeta 7: Proyecto con superpoderes',
    bg: 'bg-purple-100',
  },
  {
    id: 8,
    title: '📚 Viñeta 8: Certificaciones mágicas',
    text: '🎓 Cursos que me han dado +100 puntos de experiencia: ✔️ Generative AI (AWS) ✔️ JavaScript, diseño web, IA aplicada ✔️ ¡Y muchos más!',
    img: '/images/storyboard/certificaciones.png',
    alt: 'Viñeta 8: Certificaciones mágicas',
    bg: 'bg-blue-100',
  },
  {
    id: 9,
    title: '🎯 Viñeta 9: ¿Qué busco ahora?',
    text: '✨ Busco nuevos desafíos donde pueda crear interfaces adorables, eficientes y llenas de UX/UI kawaii. 🫶 Si tu equipo cree en la magia de la tecnología, ¡conectemos!',
    img: '/images/storyboard/busqueda-actual.png',
    alt: 'Viñeta 9: ¿Qué busco ahora?',
    bg: 'bg-pink-100',
  },
];

function Storyboard() {
  const [selectedVineta, setSelectedVineta] = useState(null);

  return (
    <>
      <section id="storyboard" className="py-14 bg-purple-100 text-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-2">Storyboard Kawaii de Soraya</h2>
          <p className="text-purple-400 text-sm tracking-wide uppercase mb-10">Una aventura front-end</p>

          {/* Grid 2 cols en móvil, 3 en tablet/desktop — 9 cards = 3 filas perfectas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {vinetas.map((vineta) => (
              <div
                key={vineta.id}
                onClick={() => setSelectedVineta(vineta)}
                className={`group flex flex-col ${vineta.bg} rounded-xl shadow-md border-2 border-gray-300 overflow-hidden cursor-pointer
                  transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Imagen — h-56 con contain para no cortar la composición */}
                <div className="w-full h-56 overflow-hidden flex items-center justify-center bg-white/60">
                  <img
                    src={vineta.img}
                    alt={vineta.alt}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Título + CTA — sin texto largo */}
                <div className="w-full p-3 text-left">
                  <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2">{vineta.title}</h3>
                  <span className="text-xs text-purple-500 font-medium group-hover:underline">
                    Ver historia →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal con historia completa */}
      {selectedVineta && (
        <StoryboardModal
          vineta={selectedVineta}
          onClose={() => setSelectedVineta(null)}
        />
      )}
    </>
  );
}

export default Storyboard;
