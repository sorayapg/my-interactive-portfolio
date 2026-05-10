import { useState, useEffect } from 'react';
import { getSettings, updateSettings, seedInitialData, checkExistingData } from '../../services/contentService';
import { initialSeedData } from '../../data/seedData';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    flags: {
      showStoryboard: true,
      showProjects: true,
      showCoverLetter: true,
      maintenanceMode: false,
    },
    sectionsOrder: ['hero', 'about', 'coverLetter', 'storyboard', 'professionalStory', 'projects'],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [dataStatus, setDataStatus] = useState({ isEmpty: true });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadSettings();
    checkData();
  }, []);

  const checkData = async () => {
    const status = await checkExistingData();
    setDataStatus(status);
  };

  const loadSettings = async () => {
    setLoading(true);
    const { data } = await getSettings();
    if (data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      flags: { ...prev.flags, [key]: !prev.flags[key] },
    }));
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

  const handleSeedData = async () => {
    if (!window.confirm('⚠️ ¿Seguro que quieres cargar los datos iniciales?\n\nEsto añadirá el contenido actual del portfolio a Firestore.')) {
      return;
    }

    setSeeding(true);
    setMessage(null);

    const { success, error } = await seedInitialData(initialSeedData);

    if (error) {
      setMessage({ type: 'error', text: `❌ Error: ${error}` });
    } else {
      setMessage({ type: 'success', text: '✅ Datos iniciales cargados correctamente' });
      await checkData();
    }

    setSeeding(false);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Cog6ToothIcon className="w-6 h-6 text-purple-400 shrink-0" />
          Ajustes
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

      {/* Seed Data Section */}
      <div className="mb-8 p-6 border-2 border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          🌱 Datos Iniciales
        </h2>
        
        <div className="space-y-3 mb-4">
          <p className="text-gray-700">
            {dataStatus.isEmpty ? (
              <>
                ⚠️ <strong>Firestore está vacío.</strong> Carga los datos iniciales del portfolio para empezar a gestionar contenido.
              </>
            ) : (
              <>
                ✅ <strong>Firestore tiene datos.</strong> Ya puedes gestionar contenido desde el panel admin.
              </>
            )}
          </p>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Perfil: {dataStatus.hasProfile ? '✅ Cargado' : '❌ Vacío'}</p>
            <p>• Proyectos: {dataStatus.hasProjects ? '✅ Cargados' : '❌ Vacío'}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSeedData}
          disabled={seeding}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            seeding
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg'
          }`}
        >
          {seeding ? '⏳ Cargando...' : '🚀 Cargar Datos Iniciales'}
        </button>
        
        <p className="text-xs text-gray-500 mt-3">
          💡 Esto cargará el contenido actual del portfolio en Firestore. Solo necesitas hacerlo una vez.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          🎛️ Configuración de Secciones
        </h2>
        
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
                settings.flags?.showStoryboard ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.flags?.showStoryboard ? 'translate-x-6' : 'translate-x-1'
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
                settings.flags?.showProjects ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.flags?.showProjects ? 'translate-x-6' : 'translate-x-1'
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
                settings.flags?.maintenanceMode ? 'bg-red-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.flags?.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
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
