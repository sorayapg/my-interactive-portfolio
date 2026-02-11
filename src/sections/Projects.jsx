import { useState, useEffect } from 'react';
import { listProjects } from '../services/contentService';

// Datos de fallback (contenido actual hardcodeado)
const fallbackProjects = [
  {
    id: 'fallback-1',
    name: 'CalendarApp',
    description: 'Una aplicación completa tipo calendario desarrollada para gestionar eventos. Permite a los usuarios crear, visualizar, editar y eliminar eventos de forma sencilla.',
    stack: ['React', 'Node.js', 'MongoDB', 'Redux Toolkit', 'Express'],
    liveUrl: 'https://calendar-app-backend-pro.up.railway.app/auth/login',
    frontendRepo: 'https://github.com/sorayapg/calendarApp',
    backendRepo: 'https://github.com/sorayapg/calendarApp_Backend',
  },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const { data } = await listProjects();
    
    // Si Firestore tiene proyectos, usarlos; si no, usar fallback
    if (data && data.length > 0 && !data[0].id?.startsWith('temp-')) {
      setProjects(data.filter(p => p.visible !== false));
    } else {
      setProjects(fallbackProjects);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="projects" className="py-16 bg-gray-200 text-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Mis Proyectos Destacados</h2>
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-lg bg-gray-300 h-64 w-96"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 bg-gray-200 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="-mx-4">
          <h2 className="text-4xl font-bold text-center mb-12">Mis Proyectos Destacados</h2>
        </div>

        <div className="flex flex-wrap -mx-4">
          {projects.map((project) => (
            <div key={project.id} className="w-full px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{project.name || project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Tecnologías:</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.stack?.map((tech, idx) => (
                        <span key={idx} className="bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {tech}
                        </span>
                      )) || project.technologies?.map((tech, idx) => (
                        <span key={idx} className="bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 items-center flex-wrap gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Ver Aplicación
                      </a>
                    )}
                    {project.frontendRepo && (
                      <a
                        href={project.frontendRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Frontend Repo
                      </a>
                    )}
                    {project.backendRepo && (
                      <a
                        href={project.backendRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Backend Repo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
