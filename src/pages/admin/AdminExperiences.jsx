import { useState, useEffect } from 'react';
import {
  listExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from '../../services/contentService';
import ExperienceForm from '../../components/admin/forms/ExperienceForm';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    setLoading(true);
    const { data } = await listExperiences();
    if (data) {
      setExperiences(data);
    }
    setLoading(false);
  };

  const handleSave = async (experienceData) => {
    let error;
    
    if (editingExp) {
      ({ error } = await updateExperience(editingExp.id, experienceData));
    } else {
      ({ error } = await addExperience(experienceData));
    }

    if (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
      return;
    }

    setMessage({
      type: 'success',
      text: editingExp ? '✅ Experiencia actualizada' : '✅ Experiencia añadida',
    });

    setShowForm(false);
    setEditingExp(null);
    loadExperiences();
    
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta experiencia?')) return;

    const { error } = await deleteExperience(id);
    
    if (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
    } else {
      setMessage({ type: 'success', text: '✅ Experiencia eliminada' });
      loadExperiences();
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExp(null);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            💼 Experiencias
          </h1>
          <p className="text-gray-600">
            Gestiona tu experiencia laboral y educativa
          </p>
        </div>
        
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nueva Experiencia</span>
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
        <ExperienceForm
          experience={editingExp}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="space-y-4">
          {experiences.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hay experiencias aún. ¡Añade la primera!
            </div>
          ) : (
            experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {exp.role}
                    </h3>
                    <p className="text-purple-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 mt-1">{exp.period}</p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminExperiences;
