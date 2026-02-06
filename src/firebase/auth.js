import { 
  signInWithPopup, 
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
 * 👉 Reemplaza con tu UID real después del primer login
 */
export const ADMIN_UIDS = [
  'YOUR_ADMIN_UID_HERE', // 👈 Reemplaza con tu UID real
  // Puedes añadir más UIDs aquí
];

/**
 * Verificar si un usuario es administrador
 */
export const isAdmin = (user) => {
  if (!user) return false;
  return ADMIN_UIDS.includes(user.uid);
};
