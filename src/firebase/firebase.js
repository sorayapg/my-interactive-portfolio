import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyClWfsZ3-cBSR5yEj52tx-idJOx6VJaYR0",
  authDomain: "soraya-porfolio.firebaseapp.com",
  projectId: "soraya-porfolio",
  storageBucket: "soraya-porfolio.firebasestorage.app",
  messagingSenderId: "562296029401",
  appId: "1:562296029401:web:0a971523f34cd6adf67ec8",
  measurementId: "G-B34MKRJJVQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Analytics
const analytics = getAnalytics(app);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { analytics };

// Configurar provider de Google
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export default app;
