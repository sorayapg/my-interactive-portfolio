import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ShowUID = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Debug: log para verificar estado de auth
  console.log('ShowUID - Loading:', loading, 'User:', user?.email, 'UID:', user?.uid);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-purple-200 max-w-md">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">⚠️ No has iniciado sesión</h1>
          <p className="text-gray-700 mb-4">Necesitas iniciar sesión primero para ver tu UID.</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition font-semibold"
          >
            Ir a Login
          </button>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-purple-200 max-w-2xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">
            🔐 Tu UID de Firebase
          </h1>
          <p className="text-gray-600">
            Copia este UID y añádelo al archivo auth.js
          </p>
        </div>

        <div className="mb-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
          <p className="text-sm text-purple-700 mb-2 font-semibold">
            👤 Usuario actual:
          </p>
          <p className="text-gray-800 mb-4">
            {user.email || user.displayName || 'Usuario anónimo'}
          </p>
          
          <p className="text-sm text-purple-700 mb-2 font-semibold">
            🆔 Tu UID:
          </p>
          <div className="bg-white p-4 rounded border-2 border-purple-300 font-mono text-sm break-all">
            {user.uid}
          </div>
        </div>

        <button
          onClick={copyToClipboard}
          className="w-full mb-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition font-semibold shadow-lg"
        >
          {copied ? '✅ ¡Copiado!' : '📋 Copiar UID'}
        </button>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-yellow-800 mb-2">📝 Pasos siguientes:</h3>
          <ol className="text-sm text-yellow-700 space-y-2 list-decimal list-inside">
            <li>Copia el UID de arriba (botón "Copiar UID")</li>
            <li>Abre el archivo: <code className="bg-yellow-100 px-2 py-1 rounded">src/firebase/auth.js</code></li>
            <li>Busca la línea: <code className="bg-yellow-100 px-2 py-1 rounded">export const ADMIN_UIDS = [</code></li>
            <li>Reemplaza <code className="bg-yellow-100 px-2 py-1 rounded">'YOUR_ADMIN_UID_HERE'</code> con tu UID</li>
            <li>Guarda el archivo y recarga esta página</li>
          </ol>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-blue-800 mb-2">💡 Ejemplo:</h3>
          <pre className="text-xs bg-white p-3 rounded border border-blue-300 overflow-x-auto">
{`export const ADMIN_UIDS = [
  '${user.uid}', // 👈 Tu UID
];`}
          </pre>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            ← Volver al Portfolio
          </button>
          <button
            onClick={() => navigate('/admin')}
            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-medium"
          >
            Ir a Admin →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowUID;
