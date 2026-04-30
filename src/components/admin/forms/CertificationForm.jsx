import { useState, useEffect } from 'react';

const CertificationForm = ({ certification, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    issueDate: '',
    credentialUrl: '',
    imageUrl: '',
    description: '',
    skills: [],
    achievements: [],
    visible: true,
    order: 0,
  });
  const [skillInput, setSkillInput] = useState('');
  const [achievementInput, setAchievementInput] = useState('');

  useEffect(() => {
    if (certification) {
      setFormData((prev) => ({ ...prev, ...certification }));
    }
  }, [certification]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'order' ? parseInt(value) || 0 : value,
    }));
  };

  // --- Skills ---
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  // --- Achievements ---
  const handleAddAchievement = () => {
    const trimmed = achievementInput.trim();
    if (trimmed && !formData.achievements.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, trimmed],
      }));
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (achievement) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a !== achievement),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border-2 border-emerald-200 rounded-lg bg-emerald-50"
    >
      <h2 className="text-xl font-bold text-gray-900">
        {certification ? 'Editar Certificación' : 'Nueva Certificación'}
      </h2>

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: Google UX Design Certificate"
          className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      {/* Plataforma */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plataforma / Emisor <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          placeholder="Ej: Coursera, Udemy, Google, LinkedIn Learning..."
          className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      {/* Fecha de emisión */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fecha de emisión
        </label>
        <input
          type="month"
          name="issueDate"
          value={formData.issueDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* URL de verificación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL de verificación
        </label>
        <input
          type="url"
          name="credentialUrl"
          value={formData.credentialUrl}
          onChange={handleChange}
          placeholder="https://coursera.org/verify/..."
          className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Imagen / Badge */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen / Badge (URL o ruta)
        </label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="/images/certs/google-ux.png"
          className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Descripción (para modal) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Breve descripción del programa o lo que aprendiste..."
          className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Habilidades adquiridas
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            placeholder="Ej: Figma, UX Research..."
            className="flex-1 px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            Añadir
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full text-sm flex items-center space-x-1"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-emerald-600 hover:text-emerald-900 ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Logros */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logros destacados
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={achievementInput}
            onChange={(e) => setAchievementInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), handleAddAchievement())
            }
            placeholder="Ej: Proyecto capstone aprobado con distinción..."
            className="flex-1 px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddAchievement}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            Añadir
          </button>
        </div>
        <ul className="space-y-1">
          {formData.achievements.map((achievement) => (
            <li
              key={achievement}
              className="flex items-center justify-between px-3 py-1.5 bg-emerald-100 rounded-lg text-sm text-emerald-900"
            >
              <span>{achievement}</span>
              <button
                type="button"
                onClick={() => handleRemoveAchievement(achievement)}
                className="text-emerald-600 hover:text-emerald-900 ml-2"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Orden y visibilidad */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Orden
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Número menor = aparece primero</p>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            id="visible"
            name="visible"
            checked={formData.visible}
            onChange={handleChange}
            className="w-4 h-4 accent-emerald-500"
          />
          <label htmlFor="visible" className="text-sm font-medium text-gray-700">
            Visible en el portfolio
          </label>
        </div>
      </div>

      {/* Botones */}
      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition"
        >
          {certification ? 'Actualizar' : 'Añadir'}
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

export default CertificationForm;
