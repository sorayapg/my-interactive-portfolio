import { createContext, useContext } from 'react';
import * as contentService from '../services/contentService';

/**
 * ServiceContext
 *
 * Inyecta el servicio activo (contentService o mockService) según el layout
 * que envuelva el árbol de componentes.
 *
 * - AdminLayout  → ServiceProvider con contentService  (Firebase real)
 * - DemoLayout   → ServiceProvider con mockService     (datos ficticios)
 *
 * El valor por defecto es contentService para garantizar que /admin/*
 * nunca rompa aunque el Provider no esté presente.
 */
const ServiceContext = createContext({ ...contentService, isDemo: false });

export const ServiceProvider = ({ service, isDemo = false, children }) => (
  <ServiceContext.Provider value={{ ...service, isDemo }}>
    {children}
  </ServiceContext.Provider>
);

/**
 * Hook para consumir el servicio activo desde cualquier página admin/demo.
 *
 * Uso:
 *   const { getProfile, updateProfile, isDemo } = useService();
 */
export const useService = () => useContext(ServiceContext);

export default ServiceContext;
