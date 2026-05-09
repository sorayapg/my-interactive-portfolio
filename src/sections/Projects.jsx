import { useState, useEffect } from 'react';
import { listProjects } from '../services/contentService';
import ProjectModal from '../components/ProjectModal';

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
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const { data } = await listProjects();

    if (data && data.length > 0 && !data[0].id?.startsWith('temp-')) {
      setProjects(data.filter((p) => p.visible !== false));
    } else {
      setProjects(fallbackProjects);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-b from-white to-violet-50 text-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Mis Proyectos Destacados</h2>
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-2xl bg-violet-100 h-64 w-96"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white to-violet-50 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Mis Proyectos Destacados</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => {
            const title = project.name || project.title;
            const techs = project.technologies || project.stack || [];
            const visibleTechs = techs.slice(0, 4);
            const extraCount = techs.length - visibleTechs.length;

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md border border-violet-100 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {visibleTechs.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 bg-pink-100 text-pink-700 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {extraCount > 0 && (
                        <span className="px-2.5 py-0.5 bg-violet-100 text-violet-500 rounded-full text-xs font-medium">
                          +{extraCount} más
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex-1" />

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-violet-400 to-purple-500 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-purple-600 transition text-sm"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

export default Projects;
