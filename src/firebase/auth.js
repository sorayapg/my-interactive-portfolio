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
 * 👉 Reemplaza 'YOUR_ADMIN_UID_HERE' con tu UID real
 * 📍 Para obtener tu UID: haz login y ve a /show-uid
 */
export const ADMIN_UIDS = [
  'dUvybxUGglg4p46PLsvlsD0MQz62', // 👈 REEMPLAZA ESTO con tu UID de /show-uid
  // Ejemplo: 'abc123xyz456def789', 
  // Puedes añadir más UIDs aquí separados por comas
];

/**
 * Verificar si un usuario es administrador
 */
export const isAdmin = (user) => {
  if (!user) return false;
  return ADMIN_UIDS.includes(user.uid);
};
