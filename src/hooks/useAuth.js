import { useState, useEffect } from 'react';
import { onAuthChange } from '../firebase/auth';

/**
 * Hook para manejar el estado de autenticación
 * Retorna el usuario actual y el estado de carga
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
