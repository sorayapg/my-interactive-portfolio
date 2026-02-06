import { useState, useEffect } from 'react';
import { listStorybook, updateStoryOrder } from '../../services/contentService';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const AdminStoryboard = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    const { data } = await listStorybook();
    if (data) {
      setStories(data);
    }
    setLoading(false);
  };

  const moveUp = async (index) => {
    if (index === 0) return;
    
    const story = stories[index];
    const prevStory = stories[index - 1];
    
    // Intercambiar orders
    await updateStoryOrder(story.id, prevStory.order);
    await updateStoryOrder(prevStory.id, story.order);
    
    setMessage({ type: 'success', text: '✅ Orden actualizado' });
    loadStories();
    
    setTimeout(() => setMessage(null), 2000);
  };

  const moveDown = async (index) => {
    if (index === stories.length - 1) return;
    
    const story = stories[index];
    const nextStory = stories[index + 1];
    
    // Intercambiar orders
    await updateStoryOrder(story.id, nextStory.order);
    await updateStoryOrder(nextStory.id, story.order);
    
    setMessage({ type: 'success', text: '✅ Orden actualizado' });
    loadStories();
    
    setTimeout(() => setMessage(null), 2000);
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
          📖 Storyboard
        </h1>
        <p className="text-gray-600">
          Reordena las viñetas de tu historia
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 border-2 border-green-200">
          {message.text}
        </div>
      )}

      <div className="space-y-3">
        {stories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No hay viñetas en el storyboard aún
          </div>
        ) : (
          stories.map((story, index) => (
            <div
              key={story.id}
              className="flex items-center space-x-4 p-4 border-2 border-purple-200 rounded-lg bg-purple-50"
            >
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUpIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === stories.length - 1}
                  className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDownIcon className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-purple-600">
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{story.title}</h3>
                    <p className="text-sm text-gray-600">{story.subtitle}</p>
                  </div>
                </div>
              </div>
              
              {story.image && (
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 Usa los botones ↑ ↓ para reordenar las viñetas. Los cambios se guardan automáticamente.
        </p>
      </div>
    </div>
  );
};

export default AdminStoryboard;
