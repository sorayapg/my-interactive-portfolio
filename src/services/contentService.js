import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * ============================================
 * PROFILE
 * ============================================
 */

export const getProfile = async () => {
  try {
    const docRef = doc(db, 'profile', 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    
    // Fallback: datos por defecto si no existe en Firestore
    return {
      data: {
        name: 'Soraya',
        title: 'Frontend Developer',
        bio: 'Apasionada por crear experiencias web únicas',
        email: 'tu@email.com',
        github: 'https://github.com/tuusuario',
        linkedin: 'https://linkedin.com/in/tuusuario',
      },
      error: null,
    };
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return { data: null, error: error.message };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const docRef = doc(db, 'profile', 'main');
    await updateDoc(docRef, {
      ...profileData,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return { error: error.message };
  }
};

/**
 * ============================================
 * EXPERIENCES
 * ============================================
 */

export const listExperiences = async () => {
  try {
    const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Fallback: datos de ejemplo si no hay en Firestore
      return {
        data: [
          {
            id: 'temp-1',
            company: 'Empresa Ejemplo',
            role: 'Desarrolladora Frontend',
            period: '2023 - Actualidad',
            description: 'Desarrollo de aplicaciones web con React',
            order: 0,
          },
        ],
        error: null,
      };
    }
    
    const experiences = [];
    querySnapshot.forEach((doc) => {
      experiences.push({ id: doc.id, ...doc.data() });
    });
    
    return { data: experiences, error: null };
  } catch (error) {
    console.error('Error al listar experiencias:', error);
    return { data: [], error: error.message };
  }
};

export const addExperience = async (experienceData) => {
  try {
    const docRef = await addDoc(collection(db, 'experiences'), {
      ...experienceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error('Error al añadir experiencia:', error);
    return { id: null, error: error.message };
  }
};

export const updateExperience = async (id, experienceData) => {
  try {
    const docRef = doc(db, 'experiences', id);
    await updateDoc(docRef, {
      ...experienceData,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar experiencia:', error);
    return { error: error.message };
  }
};

export const deleteExperience = async (id) => {
  try {
    await deleteDoc(doc(db, 'experiences', id));
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar experiencia:', error);
    return { error: error.message };
  }
};

/**
 * ============================================
 * PROJECTS
 * ============================================
 */

export const listProjects = async () => {
  try {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Fallback: datos de ejemplo
      return {
        data: [
          {
            id: 'temp-1',
            title: 'Proyecto Ejemplo',
            description: 'Descripción del proyecto',
            technologies: ['React', 'Tailwind'],
            image: '/images/placeholder.png',
            github: 'https://github.com',
            demo: 'https://ejemplo.com',
            order: 0,
          },
        ],
        error: null,
      };
    }
    
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    
    return { data: projects, error: null };
  } catch (error) {
    console.error('Error al listar proyectos:', error);
    return { data: [], error: error.message };
  }
};

export const addProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error('Error al añadir proyecto:', error);
    return { id: null, error: error.message };
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, {
      ...projectData,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    return { error: error.message };
  }
};

export const deleteProject = async (id) => {
  try {
    await deleteDoc(doc(db, 'projects', id));
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    return { error: error.message };
  }
};

/**
 * ============================================
 * COVER LETTER
 * ============================================
 */

export const getCoverLetter = async () => {
  try {
    const docRef = doc(db, 'coverLetter', 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    
    // Fallback: texto por defecto
    return {
      data: {
        content: 'Texto de la carta de presentación...',
      },
      error: null,
    };
  } catch (error) {
    console.error('Error al obtener cover letter:', error);
    return { data: null, error: error.message };
  }
};

export const updateCoverLetter = async (content) => {
  try {
    const docRef = doc(db, 'coverLetter', 'main');
    await updateDoc(docRef, {
      content,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar cover letter:', error);
    return { error: error.message };
  }
};

/**
 * ============================================
 * STORYBOOK
 * ============================================
 */

export const listStorybook = async () => {
  try {
    const q = query(collection(db, 'storybook'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { data: [], error: null };
    }
    
    const stories = [];
    querySnapshot.forEach((doc) => {
      stories.push({ id: doc.id, ...doc.data() });
    });
    
    return { data: stories, error: null };
  } catch (error) {
    console.error('Error al listar storybook:', error);
    return { data: [], error: error.message };
  }
};

export const updateStoryOrder = async (id, newOrder) => {
  try {
    const docRef = doc(db, 'storybook', id);
    await updateDoc(docRef, {
      order: newOrder,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar orden:', error);
    return { error: error.message };
  }
};

/**
 * ============================================
 * SETTINGS
 * ============================================
 */

export const getSettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    
    // Fallback: configuración por defecto
    return {
      data: {
        sectionsOrder: ['hero', 'about', 'coverLetter', 'storyboard', 'projects'],
        showStoryboard: true,
        showProjects: true,
        maintenanceMode: false,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error al obtener settings:', error);
    return { data: null, error: error.message };
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const docRef = doc(db, 'settings', 'main');
    await updateDoc(docRef, {
      ...settingsData,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar settings:', error);
    return { error: error.message };
  }
};
