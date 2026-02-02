import React from 'react';

function About() {
  return (
    <section className="py-16 bg-white text-gray-800"> {/* Padding vertical, fondo blanco, texto oscuro */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Sobre Mí</h2>

        {/* Contenedor de la imagen (arriba) */}
        <div className="text-center mb-8"> {/* Centramos la imagen y añadimos margen inferior */}
          <img src="/images/Soraya.png" alt="Soraya Povedano" className="mx-auto rounded-full w-40 h-40 object-cover" />
        </div>

        {/* Contenedor del texto (abajo) */}
        <div className="text-left"> {/* Eliminamos max-w-md y mx-auto, mantenemos text-left */}
          <p className="text-lg mb-4">
            Soy Desarrolladora Front-End especializada en React y JavaScript, enfocada en crear interfaces funcionales, intuitivas y visualmente cuidadas.
          </p>
          <p className="text-lg mb-4">
            He participado en el desarrollo del Cloud Portal corporativo de Telefónica, creando componentes frontend dentro de una arquitectura híbrida PHP (Joomla) y JavaScript, así como en proyectos reales como una aplicación de huella de carbono para CaixaBank y una aplicación full-stack de gestión de eventos (CalendarApp) con autenticación de usuarios.
          </p>
          <p className="text-lg">
            Me caracterizo por combinar lógica técnica con sensibilidad de diseño, cuidando la experiencia de usuario, el detalle visual pixel-perfect y la integración eficiente con backend.
          </p>
          {/* Botón para descargar el CV */}
          <a
            href="/documents/Curriculum Vitae Soraya Povedano Gardo.pdf"
            download="Curriculum Vitae Soraya Povedano Gardo.pdf"
            className="mt-4 inline-block bg-pink-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-pink-600 transition duration-300"
          >
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
