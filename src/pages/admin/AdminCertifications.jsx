import { useState, useEffect } from 'react';
import {
  listCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
} from '../../services/contentService';
import CertificationForm from '../../components/admin/forms/CertificationForm';
import { PencilIcon, TrashIcon, PlusIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const AdminCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    setLoading(true);
    const { data } = await listCertifications();
    if (data) {
      setCertifications(data);
    }
    setLoading(false);
  };

  const handleSave = async (certData) => {
    let error;

    if (editingCert) {
      ({ error } = await updateCertification(editingCert.id, certData));
    } else {
      ({ error } = await addCertification(certData));
    }

    if (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
      return;
    }

    setMessage({
      type: 'success',
      text: editingCert ? '✅ Certificación actualizada' : '✅ Certificación añadida',
    });

    setShowForm(false);
    setEditingCert(null);
    loadCertifications();

    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta certificación?')) return;

    const { error } = await deleteCertification(id);

    if (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
    } else {
      setMessage({ type: 'success', text: '✅ Certificación eliminada' });
      loadCertifications();
    }

    setTimeout(() => setMessage(null), 3000);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCert(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">🎓 Certificaciones</h1>
          <p className="text-gray-600">Gestiona tus certificados y cursos completados</p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nueva Certificación</span>
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
        <CertificationForm
          certification={editingCert}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="space-y-4">
          {certifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hay certificaciones aún. ¡Añade la primera!
            </div>
          ) : (
            certifications.map((cert) => (
              <div
                key={cert.id}
                className={`p-4 border-2 rounded-lg transition hover:shadow-md ${
                  cert.visible === false
                    ? 'border-gray-200 bg-gray-50 opacity-60'
                    : 'border-emerald-200 bg-emerald-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 flex-1 min-w-0">
                    {cert.imageUrl && (
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-14 h-14 object-contain rounded-lg flex-shrink-0 bg-white border border-emerald-100 p-1"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-gray-900">{cert.title}</h3>
                        {cert.visible === false && (
                          <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                            <EyeSlashIcon className="w-3 h-3" /> Oculta
                          </span>
                        )}
                      </div>
                      <p className="text-emerald-700 font-medium text-sm">{cert.platform}</p>
                      {cert.issueDate && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {cert.issueDate.replace('-', ' / ')}
                        </p>
                      )}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cert.skills.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 text-xs bg-emerald-200 text-emerald-800 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 4 && (
                            <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">
                              +{cert.skills.length - 4} más
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 flex-shrink-0 ml-4">
                    <button
                      onClick={() => handleEdit(cert)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                      title="Editar"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      title="Eliminar"
                    >
                      <TrashIcon className="w-4 h-4" />
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

export default AdminCertifications;
