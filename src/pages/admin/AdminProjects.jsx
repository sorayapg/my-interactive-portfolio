import { useState, useEffect } from 'react';
import { useService } from '../../context/ServiceContext';
import ProjectForm from '../../components/admin/forms/ProjectForm';
import { PencilIcon, TrashIcon, PlusIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const AdminProjects = () => {
  const { listProjects, addProject, updateProject, deleteProject, isDemo } = useService();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const { data } = await listProjects();
    if (data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleSave = async (projectData) => {
    let error;
    
    if (editingProject) {
      ({ error } = await updateProject(editingProject.id, projectData));
    } else {
      ({ error } = await addProject(projectData));
    }

    if (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
      return;
    }

    setMessage({
      type: 'success',
      text: editingProject
        ? (isDemo ? '🎭 Proyecto actualizado en modo demo' : '✅ Proyecto actualizado')
        : (isDemo ? '🎭 Proyecto añadido en modo demo' : '✅ Proyecto añadido'),
    });

    setShowForm(false);
    setEditingProject(null);
    loadProjects();
    
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este proyecto?')) return;

    const { error } = await deleteProject(id);
    
    if (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
    } else {
      setMessage({ type: 'success', text: isDemo ? '🎭 Proyecto eliminado en modo demo' : '✅ Proyecto eliminado' });
      loadProjects();
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <RocketLaunchIcon className="w-6 h-6 text-purple-400 shrink-0" />
            Proyectos
          </h1>
          <p className="text-gray-600">
            Administra tu portfolio de proyectos
          </p>
        </div>
        
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nuevo Proyecto</span>
          </button>
        )}
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border-2 border-green-200'
              : 'bg-red-50 text-red-800 border-2 border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {showForm ? (
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-500">
              No hay proyectos aún. ¡Añade el primero!
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="cms-action-btn p-2"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                
                <p className="text-gray-700 text-sm mb-3">
                  {project.description}
                </p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-indigo-200 text-indigo-800 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
