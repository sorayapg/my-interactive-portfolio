import { 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

/**
 * Iniciar sesión con Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { user: null, error: error.message };
  }
};

/**
 * Iniciar sesión con Email/Password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { user: null, error: error.message };
  }
};

/**
 * Crear cuenta con Email/Password
 */
export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    return { user: null, error: error.message };
  }
};

/**
 * Cerrar sesión
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return { error: error.message };
  }
};

/**
 * Observador de cambios de autenticación
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * UIDs de administradores autorizados
 * ⚠️ SOLO estos usuarios tendrán acceso al panel /admin
 */
export const ADMIN_UIDS = [
  'dUvybxUGglg4p46PLsvlsD0MQz62', // UID de la admin principal
];

/**
 * Emails de administradores autorizados
 * ⚠️ Backup por si el UID cambia o múltiples métodos de login
 */
export const ADMIN_EMAILS = [
  'tranchecitapg@gmail.com', // Email de la admin principal
];

/**
 * Verificar si un usuario es administrador
 * Comprueba tanto UID como email contra las whitelists
 */
export const isAdmin = (user) => {
  if (!user) return false;
  return ADMIN_UIDS.includes(user.uid) || ADMIN_EMAILS.includes(user.email);
};

/**
 * Helper para forzar validación de admin o lanzar error
 * Útil para operaciones críticas
 */
export const assertAdmin = (user) => {
  if (!isAdmin(user)) {
    throw new Error('Acceso denegado: no eres administrador');
  }
  return true;
};
