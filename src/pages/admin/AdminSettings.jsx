import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../services/contentService';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    showStoryboard: true,
    showProjects: true,
    maintenanceMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const { data } = await getSettings();
    if (data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await updateSettings(settings);

    if (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
    } else {
      setMessage({ type: 'success', text: '✅ Ajustes guardados' });
    }

    setSaving(false);
    setTimeout(() => setMessage(null), 3000);
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ⚙️ Ajustes
        </h1>
        <p className="text-gray-600">
          Configuración general del portfolio
        </p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
            <div>
              <h3 className="font-bold text-gray-900">Mostrar Storyboard</h3>
              <p className="text-sm text-gray-600">
                Sección de viñetas kawaii
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('showStoryboard')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showStoryboard ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showStoryboard ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
            <div>
              <h3 className="font-bold text-gray-900">Mostrar Proyectos</h3>
              <p className="text-sm text-gray-600">
                Sección de portfolio de proyectos
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('showProjects')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showProjects ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showProjects ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border-2 border-red-200 rounded-lg bg-red-50">
            <div>
              <h3 className="font-bold text-gray-900">Modo Mantenimiento</h3>
              <p className="text-sm text-gray-600">
                Mostrar mensaje de mantenimiento
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('maintenanceMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
