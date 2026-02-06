import { useState, useEffect } from 'react';

const ExperienceForm = ({ experience, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    period: '',
    description: '',
    order: 0,
  });

  useEffect(() => {
    if (experience) {
      setFormData(experience);
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border-2 border-purple-200 rounded-lg bg-purple-50">
      <h2 className="text-xl font-bold text-gray-900">
        {experience ? 'Editar Experiencia' : 'Nueva Experiencia'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Empresa / Institución
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rol / Título
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Período
        </label>
        <input
          type="text"
          name="period"
          value={formData.period}
          onChange={handleChange}
          placeholder="Ej: 2022 - 2024"
          className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
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
          className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          min="0"
        />
        <p className="text-xs text-gray-500 mt-1">
          Número menor = aparece primero
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
        >
          {experience ? 'Actualizar' : 'Añadir'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
