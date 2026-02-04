import React from 'react';

function Storyboard() {
  return (
    <section className="py-16 bg-purple-100 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Storyboard Kawaii de Soraya: Una aventura front-end</h2>

        <div className="flex flex-wrap justify-center gap-4">

          {/* Viñeta 1 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center bg-white rounded-xl shadow-xl border-2 border-gray-400 overflow-hidden">
            <div className="w-full h-96">
              <img src="/images/soraya0.png" alt="Viñeta 1: ¡Hola mundo!" className="w-full h-full object-cover" />
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
              <img src="/images/soraya2.png" alt="Viñeta 2: Formación, el inicio" className="w-full h-full object-cover" />
            </div>
            <div className="w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left">🧁 Viñeta 2: Formación, el inicio</h3>
              <p className="text-gray-700 text-left">
                🎓 Me formé en Desarrollo de Aplicaciones Web en CIFP Avilés. Aquí aprendí JavaScript, React, HTML, CSS y Bootstrap. ¡Fue el inicio de mi hechizo tecnológico!
              </p>
            </div>
          </div>

          {/* ... y así con el resto de tus viñetas ... */}
          {/* (He omitido el resto para no hacer esto larguísimo, pero tú pega tu código original completo) */}

        </div>
      </div>
    </section>
  );
}

export default Storyboard;
