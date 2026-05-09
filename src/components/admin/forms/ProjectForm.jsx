import { useState, useEffect } from 'react';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    image: '',
    liveUrl: '',
    frontendRepo: '',
    backendRepo: '',
    github: '',
    order: 0,
    longDescription: '',
    challenge: '',
    learned: '',
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project) {
      // Compatibilidad: si el documento en Firestore tiene 'demo' pero no 'liveUrl',
      // lo cargamos en liveUrl para que sea editable desde aquí.
      const mapped = { ...project };
      if (project.demo && !project.liveUrl) {
        mapped.liveUrl = project.demo;
      }
      setFormData((prev) => ({ ...prev, ...mapped }));
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border-2 border-indigo-200 rounded-lg bg-indigo-50">
      <h2 className="text-xl font-bold text-gray-900">
        {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="cms-field px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="cms-field px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tecnologías
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
            placeholder="Ej: React, Tailwind..."
            className="flex-1 px-4 py-2 border-2 border-violet-200 rounded-lg focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200/50 transition-all duration-200 text-slate-700 bg-white"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Añadir
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm flex items-center space-x-1"
            >
              <span>{tech}</span>
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen (URL)
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="/images/proyecto.png"
          className="cms-field px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Live / Demo
        </label>
        <input
          type="url"
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          placeholder="https://mi-app.com"
          className="cms-field px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          GitHub / Repo Frontend
        </label>
        <input
          type="url"
          name="frontendRepo"
          value={formData.frontendRepo}
          onChange={handleChange}
          placeholder="https://github.com/usuario/repo"
          className="cms-field px-4 py-2"
        />
        <p className="text-xs text-gray-500 mt-1">
          Si el proyecto tiene solo un repo, úsalo aquí.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Repo Backend (opcional)
        </label>
        <input
          type="url"
          name="backendRepo"
          value={formData.backendRepo}
          onChange={handleChange}
          placeholder="https://github.com/usuario/repo-backend"
          className="cms-field px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción ampliada — modal (opcional)
        </label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          rows="3"
          placeholder="Más contexto que se mostrará en el modal de detalle."
          className="cms-field px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Retos técnicos (opcional)
        </label>
        <textarea
          name="challenge"
          value={formData.challenge}
          onChange={handleChange}
          rows="3"
          placeholder="Qué problemas técnicos resolviste con este proyecto."
          className="cms-field px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qué aprendí (opcional)
        </label>
        <textarea
          name="learned"
          value={formData.learned}
          onChange={handleChange}
          rows="3"
          placeholder="Aprendizajes y habilidades que adquiriste."
          className="cms-field px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Orden
        </label>
        <input
          type="number"
          name="order"
          value={formData.order}
          onChange={handleChange}
          className="cms-field px-4 py-2"
          min="0"
        />
        <p className="text-xs text-gray-500 mt-1">
          Número menor = aparece primero
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition"
        >
          {project ? 'Actualizar' : 'Añadir'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cms-close-btn flex-1 py-3 px-6 font-bold"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
