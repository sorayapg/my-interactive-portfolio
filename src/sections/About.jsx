import { useState, useEffect } from 'react';
import { getProfile } from '../services/contentService';

// Datos de fallback
const fallbackProfile = {
  name: 'Soraya Povedano Gardo',
  imageUrl: 'public/images/storyboard/Soraya.png',
  about: 'Soy Desarrolladora Front-End especializada en React y JavaScript, enfocada en crear interfaces funcionales, intuitivas y visualmente cuidadas.\n\nHe participado en el desarrollo del Cloud Portal corporativo de Telefónica, creando componentes frontend dentro de una arquitectura híbrida PHP (Joomla) y JavaScript, así como en proyectos reales como una aplicación de huella de carbono para CaixaBank y una aplicación full-stack de gestión de eventos (CalendarApp) con autenticación de usuarios.\n\nMe caracterizo por combinar lógica técnica con sensibilidad de diseño, cuidando la experiencia de usuario, el detalle visual pixel-perfect y la integración eficiente con backend.',
  cvUrl: '/documents/Curriculum Vitae Soraya Povedano Gardo.pdf',
};

function About() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const { data } = await getProfile();
    
    if (data && data.name) {
      setProfile({ ...fallbackProfile, ...data });
    }
    
    setLoading(false);
  };

  const paragraphs = profile.about?.split('\n\n') || [];

  return (
    <section className="py-16 bg-white text-gray-800"> {/* Padding vertical, fondo blanco, texto oscuro */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Sobre Mí</h2>

        <div className="text-center mb-8">
          <img 
            src={profile.imageUrl} 
            alt={profile.name} 
            className="mx-auto rounded-full w-40 h-40 object-cover" 
          />
        </div>

        <div className="text-left">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            paragraphs.map((para, idx) => (
              <p key={idx} className="text-lg mb-4">
                {para}
              </p>
            ))
          )}
          
          <a
            href={profile.cvUrl}
            download
            className="mt-4 inline-block bg-pink-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-pink-600 transition duration-300"
          >
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
