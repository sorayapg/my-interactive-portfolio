import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { isAdmin as checkAdmin } from '../firebase/auth';

/**
 * Hook para verificar si el usuario actual es administrador
 * Retorna el estado de autenticación y si es admin
 */
export const useAdmin = () => {
  const { user, loading } = useAuth();

  const isAdmin = useMemo(() => {
    return checkAdmin(user);
  }, [user]);

  return { user, loading, isAdmin };
};
