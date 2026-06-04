/**
 * serviceFactory.js
 *
 * FASE 0 — Infraestructura base para la futura demo pública del CMS.
 *
 * ⚠️  NINGUNA página admin importa desde aquí todavía.
 *     Las páginas admin usan contentService.js directamente hasta Fase 1.
 *     Este archivo NO modifica el comportamiento del portfolio ni del CMS real.
 *
 * Decide qué servicio usar según VITE_DEMO_MODE:
 *   VITE_DEMO_MODE=true  → mockService  (datos ficticios, sin Firebase)
 *   (omitido / false)    → contentService (producción, valor por defecto siempre)
 *
 * USO FUTURO (Fase 1+):
 *   En lugar de importar desde contentService.js directamente,
 *   las páginas admin importarán desde serviceFactory:
 *
 *     import activeService from '../services/serviceFactory';
 *     const { getProfile, updateProfile } = activeService;
 *
 * Para activar demo mode localmente:
 *   Ver .env.local.example
 */

import * as contentService from './contentService';
import * as mockService from './mockService';

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

/**
 * Servicio activo.
 * El default es siempre contentService (producción real).
 * Solo cambia a mockService cuando VITE_DEMO_MODE=true explícitamente.
 */
const activeService = isDemoMode ? mockService : contentService;

export default activeService;
