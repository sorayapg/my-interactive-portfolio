import React from 'react';

function Projects() {
  return (
    <section id="projects" className="py-16 bg-gray-200 text-gray-800"> {/* Padding vertical, fondo gris pastel */}
      <div className="container mx-auto px-4"> {/* Contenedor principal de la sección */}
        {/* Contenedor del título con margen negativo para alineación */}
        <div className="-mx-4"> {/* Margen negativo para alinear con los proyectos */}
          <h2 className="text-4xl font-bold text-center mb-12">Mis Proyectos Destacados</h2> {/* Título centrado */}
        </div>


        {/* Contenedor de los proyectos */}
        <div className="flex flex-wrap -mx-4"> {/* Flexbox para proyectos, margen negativo para alinear las columnas */}

          {/* Bloque del Proyecto: CalendarApp */}
          <div className="w-full px-4 mb-8"> {/* Columna para el proyecto, ancho responsivo, padding horizontal, margen inferior */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full"> {/* Contenedor del proyecto: fondo blanco, sombra, esquinas redondeadas, altura completa */}
              {/* Aquí puedes añadir una imagen del proyecto si tienes una */}
              {/* <img src="/images/calendarapp-screenshot.png" alt="CalendarApp Screenshot" className="w-full h-48 object-cover" /> */}

              <div className="p-6 text-center"> {/* Padding interno, ¡Añadido text-center aquí! */}
                <h3 className="text-2xl font-bold mb-2">CalendarApp</h3> {/* Título del proyecto */}
                <p className="text-gray-700 mb-4">
                  Una aplicación completa tipo calendario desarrollada para gestionar eventos. Permite a los usuarios crear, visualizar, editar y eliminar eventos de forma sencilla.
                </p>

                <div className="mb-4"> {/* Tecnologías */}
                  <h4 className="text-xl font-semibold mb-2">Tecnologías:</h4>
                  <div className="flex flex-wrap justify-center gap-2"> {/* Centramos las badges de tecnologías */}
                    <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">React</span>
                    <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Node.js</span>
                    <span className="bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">MongoDB</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Redux Toolkit</span>
                    <span className="bg-purple-200 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Express</span>
                    {/* Añadir más tecnologías si es necesario */}
                  </div>
                </div>

                <div className="flex justify-center space-x-4 items-center"> {/* Centramos los enlaces y añadimos espacio */}
                  <a
                    href="https://calendar-app-backend-pro.up.railway.app/auth/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Ver Aplicación
                  </a>
                  <a
                    href="https://github.com/sorayapg/calendarApp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Frontend Repo
                  </a>
                   <a
                    href="https://github.com/sorayapg/calendarApp_Backend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Backend Repo
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Puedes añadir más bloques de proyecto aquí si tienes otros proyectos */}
          {/*
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              ... otro proyecto ...
            </div>
          </div>
          */}

        </div>
      </div>
    </section>
  );
}

export default Projects;
