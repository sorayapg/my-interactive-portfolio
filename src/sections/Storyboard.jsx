import React from 'react';

function Storyboard() {
  return (
    <section className="py-16 min-h-screen bg-purple-100 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Storyboard Kawaii de Soraya: Una aventura front-end</h2>

        <div className="flex flex-wrap justify-center gap-4">

          {/* Viñeta 1 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-white rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/hola-mundo.png" alt="Viñeta 1: ¡Hola mundo!" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">🎀 Viñeta 1: ¡Hola mundo!</h3>
              <p className="text-gray-700 text-left">
                ¡Soy Soraya! Desarrolladora Front-End apasionada por crear experiencias digitales mágicas. 📍 Desde Luanco, creando interfaces con alegría y mucho código.
              </p>
            </div>
          </div>

          {/* Viñeta 2 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-pink-100 rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/formacion-daw.png" alt="Viñeta 2: Formación, el inicio" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">🧁 Viñeta 2: Formación, el inicio</h3>
              <p className="text-gray-700 text-left">
                🎓 Me formé en Desarrollo de Aplicaciones Web en CIFP Avilés. Aquí aprendí JavaScript, React, HTML, CSS y Bootstrap. ¡Fue el inicio de mi hechizo tecnológico!
              </p>
            </div>
          </div>

          {/* Viñeta 3 - NUEVA: Cloud Portal Telefónica */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-indigo-100 rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/cloud-telefonica.png" alt="Viñeta 3: Cloud Portal Telefónica" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">☁️ Viñeta 3: Cloud Portal Telefónica</h3>
              <p className="text-gray-700 text-left">
                💻 Trabajé en el desarrollo frontend del Cloud Portal corporativo de Telefónica, creando componentes reutilizables dentro de una arquitectura híbrida Joomla (PHP) + JavaScript. ⚙️ Aquí trabajé con integración real con backend, lógica de negocio y entorno enterprise, mejorando rendimiento, estructura y experiencia de usuario. 🚀 Fue el paso donde mis habilidades pasaron de aprendizaje a experiencia profesional real en producto corporativo.
              </p>
            </div>
          </div>

          {/* Viñeta 4 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-blue-100 rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/visualia-practicas.png" alt="Viñeta 4: Primeras prácticas" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">🍡 Viñeta 4: Primeras prácticas</h3>
              <p className="text-gray-700 text-left">
                🔰 En Visualia 360 me enfrenté a APIs, traducciones dinámicas y WordPress. ¡Mis poderes crecían entre idiomas y plugins!
              </p>
            </div>
          </div>

          {/* Viñeta 5 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-green-100 rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/dxc-experiencia.png" alt="Viñeta 5: Misiones en DXC Technology" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">🌟 Viñeta 5: Misiones en DXC Technology</h3>
              <p className="text-gray-700 text-left">
                👩‍💻 Desde febrero a mayo 2024, desarrollé apps con React, pruebas automatizadas con Selenium y Jest, y trabajé con equipos ágiles (Scrum y Waterfall). 💚 ¡Incluso participé en un proyecto premiado de huella de carbono!
              </p>
            </div>
          </div>

          {/* Viñeta 6 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-yellow-100 rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/stack-tecnologico.png" alt="Viñeta 6: Mi stack kawaii" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">🛠️ Viñeta 6: Mi stack kawaii</h3>
              <p className="text-gray-700 text-left">
                🧠 Mi arsenal: JavaScript (ES6+), React, Figma, GitHub, Jenkins, Selenium, pruebas unitarias y diseño UX/UI. 📈 ¡Siempre aprendiendo para subir de nivel!
              </p>
            </div>
          </div>

          {/* Viñeta 7 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-purple-100 rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/calendar-app.png" alt="Viñeta 7: Proyecto con superpoderes" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">🧑‍🚀 Viñeta 7: Proyecto con superpoderes</h3>
              <p className="text-gray-700 text-left">
                🗓️ App de calendario con React, Node.js, MongoDB: 🔗 Frontend / Backend 👾 Tecnologías utilizadas: React, Redux Toolkit, Node, Express, MongoDB Compass.
              </p>
            </div>
          </div>

          {/* Viñeta 8 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-blue-100 rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/certificaciones.png" alt="Viñeta 8: Certificaciones mágicas" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">📚 Viñeta 8: Certificaciones mágicas</h3>
              <p className="text-gray-700 text-left mb-4">
                🎓 Cursos que me han dado +100 puntos de experiencia: ✔️ Generative AI (AWS) ✔️ JavaScript, diseño web, IA aplicada ✔️ ¡Y muchos más!
              </p>
            </div>
          </div>

          {/* Viñeta 9 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-pink-100 rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/storyboard/busqueda-actual.png" alt="Viñeta 9: ¿Qué busco ahora?" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">🎯 Viñeta 9: ¿Qué busco ahora?</h3>
              <p className="text-gray-700 text-left">
                ✨ Busco nuevos desafíos donde pueda crear interfaces adorables, eficientes y llenas de UX/UI kawaii. 🫶 Si tu equipo cree en la magia de la tecnología, ¡conectemos!
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Storyboard;
