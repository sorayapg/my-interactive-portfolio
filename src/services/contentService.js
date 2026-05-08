import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
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
    await setDoc(docRef, {
      ...profileData,
      updatedAt: serverTimestamp(),
    }, { merge: true });
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
    await setDoc(docRef, {
      content,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar cover letter:', error);
    return { error: error.message };
  }
};

/**
 * ============================================
 * COVER LETTER CARDS (modelo modular por card)
 * Usa la misma colección 'coverLetter'.
 * El doc 'main' (legado) queda excluido automáticamente
 * porque orderBy('order') ignora documentos sin ese campo.
 * ============================================
 */

export const listCoverLetterCards = async () => {
  try {
    const q = query(collection(db, 'coverLetter'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return { data: [], error: null };
    }
    const cards = [];
    querySnapshot.forEach((d) => {
      if (d.id !== 'main') cards.push({ id: d.id, ...d.data() });
    });
    return { data: cards, error: null };
  } catch (error) {
    console.error('Error al listar cover letter cards:', error);
    return { data: [], error: error.message };
  }
};

export const addCoverLetterCard = async (cardData) => {
  try {
    const docRef = await addDoc(collection(db, 'coverLetter'), {
      ...cardData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error('Error al añadir card:', error);
    return { id: null, error: error.message };
  }
};

export const updateCoverLetterCard = async (id, cardData) => {
  try {
    const docRef = doc(db, 'coverLetter', id);
    await updateDoc(docRef, {
      ...cardData,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar card:', error);
    return { error: error.message };
  }
};

export const deleteCoverLetterCard = async (id) => {
  try {
    await deleteDoc(doc(db, 'coverLetter', id));
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar card:', error);
    return { error: error.message };
  }
};

export const updateCoverLetterCardOrder = async (id, newOrder) => {
  try {
    const docRef = doc(db, 'coverLetter', id);
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
 * Migración idempotente: sube las cards locales a Firestore.
 * Usa 'localId' para evitar duplicados si se ejecuta más de una vez.
 */
export const seedCoverLetterFromLocal = async (cards) => {
  try {
    const q = query(collection(db, 'coverLetter'));
    const snapshot = await getDocs(q);
    const existingLocalIds = new Set();
    snapshot.forEach((d) => {
      if (d.data().localId != null) existingLocalIds.add(String(d.data().localId));
    });

    let added = 0;
    for (const card of cards) {
      if (existingLocalIds.has(String(card.localId))) continue;
      const { localId, ...rest } = card;
      await addDoc(collection(db, 'coverLetter'), {
        localId: String(localId),
        ...rest,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      added++;
    }
    return { added, error: null };
  } catch (error) {
    console.error('Error en migración cover letter:', error);
    return { added: 0, error: error.message };
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

export const addStorybook = async (storyData) => {
  try {
    const docRef = await addDoc(collection(db, 'storybook'), {
      ...storyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error('Error al añadir viñeta:', error);
    return { id: null, error: error.message };
  }
};

export const updateStorybook = async (id, storyData) => {
  try {
    const docRef = doc(db, 'storybook', id);
    await updateDoc(docRef, {
      ...storyData,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar viñeta:', error);
    return { error: error.message };
  }
};

export const deleteStorybook = async (id) => {
  try {
    await deleteDoc(doc(db, 'storybook', id));
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar viñeta:', error);
    return { error: error.message };
  }
};

/**
 * Migración idempotente: sube viñetas locales a Firestore.
 * Usa `localId` como clave para evitar duplicados si se ejecuta más de una vez.
 */
export const seedStorybookFromLocal = async (vinetas) => {
  try {
    // Obtener localIds ya existentes en Firestore
    const q = query(collection(db, 'storybook'));
    const snapshot = await getDocs(q);
    const existingLocalIds = new Set();
    snapshot.forEach((d) => {
      if (d.data().localId != null) existingLocalIds.add(String(d.data().localId));
    });

    let added = 0;
    for (const vineta of vinetas) {
      if (existingLocalIds.has(String(vineta.id))) continue; // ya migrada
      await addDoc(collection(db, 'storybook'), {
        localId: String(vineta.id),
        title: vineta.title,
        text: vineta.text,
        img: vineta.img,
        alt: vineta.alt,
        bg: vineta.bg,
        order: vineta.id, // mantener orden original
        visible: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      added++;
    }
    return { added, error: null };
  } catch (error) {
    console.error('Error en migración storybook:', error);
    return { added: 0, error: error.message };
  }
};

/**
 * ============================================
 * WHITEBOARD
 * Colección 'whiteboard'. Documentos identificados por sceneId (0-4).
 * Solo se editan title, description, buttonText, buttonLink.
 * Las animaciones y paths visuales vienen siempre de scenes.js.
 * ============================================
 */

export const listWhiteboardScenes = async () => {
  try {
    const q = query(collection(db, 'whiteboard'), orderBy('sceneId', 'asc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return { data: [], error: null };
    const scenes = [];
    querySnapshot.forEach((d) => scenes.push({ id: d.id, ...d.data() }));
    return { data: scenes, error: null };
  } catch (error) {
    console.error('Error al listar whiteboard scenes:', error);
    return { data: [], error: error.message };
  }
};

export const updateWhiteboardScene = async (id, sceneData) => {
  try {
    const docRef = doc(db, 'whiteboard', id);
    await updateDoc(docRef, {
      ...sceneData,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar escena whiteboard:', error);
    return { error: error.message };
  }
};

/**
 * Migración idempotente: sube escenas locales a Firestore.
 * Usa sceneId como clave para evitar duplicados.
 */
export const seedWhiteboardFromLocal = async (scenes) => {
  try {
    const q = query(collection(db, 'whiteboard'));
    const snapshot = await getDocs(q);
    const existingSceneIds = new Set();
    snapshot.forEach((d) => {
      if (d.data().sceneId != null) existingSceneIds.add(String(d.data().sceneId));
    });

    let added = 0;
    for (const scene of scenes) {
      if (existingSceneIds.has(String(scene.sceneId))) continue;
      await addDoc(collection(db, 'whiteboard'), {
        sceneId: scene.sceneId,
        title: scene.title,
        description: scene.description,
        buttonText: scene.buttonText || '',
        buttonLink: scene.buttonLink || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      added++;
    }
    return { added, error: null };
  } catch (error) {
    console.error('Error en migración whiteboard:', error);
    return { added: 0, error: error.message };
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
    await setDoc(docRef, {
      ...settingsData,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar settings:', error);
    return { error: error.message };
  }
};

/**
 * ============================================
 * SEED DATA - Carga inicial de datos
 * ============================================
 */

export const seedInitialData = async (seedData) => {
  try {
    const batch = writeBatch(db);

    // Profile
    if (seedData.profile) {
      const profileRef = doc(db, 'profile', 'main');
      batch.set(profileRef, { ...seedData.profile, updatedAt: serverTimestamp() }, { merge: true });
    }

    // Cover Letter
    if (seedData.coverLetter) {
      const coverLetterRef = doc(db, 'coverLetter', 'main');
      batch.set(coverLetterRef, { ...seedData.coverLetter, updatedAt: serverTimestamp() }, { merge: true });
    }

    // Settings
    if (seedData.settings) {
      const settingsRef = doc(db, 'settings', 'main');
      batch.set(settingsRef, { ...seedData.settings, updatedAt: serverTimestamp() }, { merge: true });
    }

    await batch.commit();

    // Projects (usar addDoc para colecciones)
    if (seedData.projects && seedData.projects.length > 0) {
      for (const project of seedData.projects) {
        await addDoc(collection(db, 'projects'), {
          ...project,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }

    // Experiences (usar addDoc para colecciones)
    if (seedData.experiences && seedData.experiences.length > 0) {
      for (const experience of seedData.experiences) {
        await addDoc(collection(db, 'experiences'), {
          ...experience,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error al cargar datos iniciales:', error);
    return { success: false, error: error.message };
  }
};

/**
 * ============================================
 * CERTIFICATIONS
 * ============================================
 */

export const listCertifications = async () => {
  try {
    const q = query(collection(db, 'certifications'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { data: [], error: null };
    }

    const certifications = [];
    querySnapshot.forEach((doc) => {
      certifications.push({ id: doc.id, ...doc.data() });
    });

    return { data: certifications, error: null };
  } catch (error) {
    console.error('Error al listar certificaciones:', error);
    return { data: [], error: error.message };
  }
};

export const addCertification = async (certificationData) => {
  try {
    const docRef = await addDoc(collection(db, 'certifications'), {
      ...certificationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error('Error al añadir certificación:', error);
    return { id: null, error: error.message };
  }
};

export const updateCertification = async (id, certificationData) => {
  try {
    const docRef = doc(db, 'certifications', id);
    await updateDoc(docRef, {
      ...certificationData,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error al actualizar certificación:', error);
    return { error: error.message };
  }
};

export const deleteCertification = async (id) => {
  try {
    await deleteDoc(doc(db, 'certifications', id));
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar certificación:', error);
    return { error: error.message };
  }
};

/**
 * Verificar si ya existen datos en Firestore
 */
export const checkExistingData = async () => {
  try {
    const profileSnap = await getDoc(doc(db, 'profile', 'main'));
    const projectsSnap = await getDocs(collection(db, 'projects'));
    
    return {
      hasProfile: profileSnap.exists(),
      hasProjects: !projectsSnap.empty,
      isEmpty: !profileSnap.exists() && projectsSnap.empty,
    };
  } catch (error) {
    console.error('Error al verificar datos:', error);
    return { hasProfile: false, hasProjects: false, isEmpty: true };
  }
};
