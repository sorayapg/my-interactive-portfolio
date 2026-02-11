# 🎨 Sistema de Gestión de Contenido - Portfolio Admin

## ✅ IMPLEMENTACIÓN COMPLETADA

Sistema completo de CRUD para gestionar el contenido del portfolio desde Firebase Firestore sin perder el contenido actual.

---

## 🚀 CÓMO EMPEZAR (PASO A PASO)

### 1️⃣ Cargar Datos Iniciales en Firestore

**⚠️ IMPORTANTE: Haz esto UNA SOLA VEZ al principio**

1. **Inicia sesión como admin** en `/login`
2. **Ve a Admin Panel** → `/admin/settings`
3. **Busca la sección "🌱 Datos Iniciales"**
4. **Haz clic en "🚀 Cargar Datos Iniciales"**
5. **Confirma la acción**

Esto cargará en Firestore:
- ✅ Tu perfil actual (nombre, bio, contacto, imagen)
- ✅ Proyecto CalendarApp con todos sus datos
- ✅ Experiencias laborales (Telefónica, CaixaBank)
- ✅ Cover Letter completa con todas las secciones
- ✅ Configuración inicial

### 2️⃣ Gestionar Contenido desde Admin

Ahora puedes editar todo desde `/admin`:

#### 📁 **Secciones Disponibles**

**🚀 Proyectos** (`/admin/projects`)
- Ver listado de proyectos
- ➕ Añadir nuevos proyectos
- ✏️ Editar proyectos existentes
- 🗑️ Eliminar proyectos (con confirmación)
- Campos: nombre, descripción, tecnologías, URLs, repos

**💼 Experiencias** (`/admin/experiences`)
- Ver experiencia laboral
- ➕ Añadir nuevas experiencias
- ✏️ Editar experiencias
- 🗑️ Eliminar experiencias
- Campos: empresa, rol, período, descripción, tecnologías, orden

**👤 Perfil** (`/admin/profile`)
- Editar información personal
- Nombre, título, bio, ubicación
- Email, teléfono, GitHub, LinkedIn
- URL de CV e imagen

**📝 Cover Letter** (`/admin/cover-letter`)
- Editor de texto para carta de presentación
- Formato JSON con secciones
- Guardado automático en Firestore

**⚙️ Ajustes** (`/admin/settings`)
- Toggles para mostrar/ocultar secciones
- Modo mantenimiento
- Botón de seed inicial

---

## 🎯 CÓMO FUNCIONA EL SISTEMA

### Sistema de Fallback Inteligente

El portfolio **siempre funciona**, incluso si Firestore está vacío:

```javascript
// Si Firestore tiene datos → usa Firestore ✅
// Si Firestore está vacío → usa datos locales hardcodeados ✅
```

**Secciones con Firestore + Fallback:**
- ✅ Projects (consume `listProjects()`)
- ✅ About (consume `getProfile()`)
- ⏳ CoverLetter (actualmente hardcodeada, puedes actualizarla)

### Datos en Firestore

**Colecciones:**
```
firestore/
├── profile (documento único: "main")
│   └── {name, title, about, email, github, linkedin, ...}
├── projects (colección)
│   └── {name, description, stack[], liveUrl, repos, visible, order}
├── experiences (colección)
│   └── {title, company, location, startDate, endDate, tech[], order}
├── coverLetter (documento único: "main")
│   └── {content: JSON string}
└── settings (documento único: "main")
    └── {flags: {}, sectionsOrder: []}
```

---

## 🔒 SEGURIDAD

### Firestore Rules (ya configuradas)

```javascript
// Lectura: todos (portfolio público)
// Escritura: solo tu UID de admin
```

Solo tú (con tu UID en `ADMIN_UIDS`) puedes:
- Crear contenido
- Editar contenido
- Eliminar contenido

El resto del mundo solo puede **leer** el portfolio.

---

## 🎨 UX Y VALIDACIONES

### Feedback Visual
- ✅ "Guardado" → mensaje verde 3 segundos
- ❌ "Error" → mensaje rojo con detalle
- ⏳ Loading states con spinners kawaii
- 🎭 Skeleton loaders en secciones

### Confirmaciones
- 🗑️ Al borrar: popup de confirmación
- 🌱 Al seed: popup de advertencia

### Validaciones
- Campos obligatorios marcados
- URLs validadas (formato correcto)
- Orden numérico para sorting

---

## 📦 ARCHIVOS CLAVE CREADOS/MODIFICADOS

### ✨ Nuevos Archivos
```
src/data/seedData.js              # Datos iniciales del portfolio
```

### 🔧 Archivos Actualizados

**Services:**
```
src/services/contentService.js    # Métodos CRUD + seed completos
```

**Admin Pages:**
```
src/pages/admin/AdminSettings.jsx     # Con botón de seed
src/pages/admin/AdminProjects.jsx     # CRUD completo
src/pages/admin/AdminExperiences.jsx  # CRUD completo
src/pages/admin/AdminProfile.jsx      # Formulario edición
src/pages/admin/AdminCoverLetter.jsx  # Editor texto
```

**Portfolio Sections:**
```
src/sections/Projects.jsx         # Consume Firestore + fallback
src/sections/About.jsx            # Consume Firestore + fallback
```

---

## 🧪 CÓMO PROBAR

### Test 1: Seed Inicial
1. Ve a `/admin/settings`
2. Haz clic en "Cargar Datos Iniciales"
3. Verifica que dice "✅ Datos iniciales cargados"
4. Recarga y verifica: "✅ Firestore tiene datos"

### Test 2: CRUD de Proyectos
1. Ve a `/admin/projects`
2. Deberías ver "CalendarApp"
3. Haz clic en "✏️" para editar
4. Cambia la descripción
5. Guarda → verifica mensaje "✅ Proyecto actualizado"
6. Ve al portfolio público (`/`)
7. Verifica que el cambio se refleja ✨

### Test 3: Portfolio Público
1. Ve a `/` (portfolio)
2. Scroll hasta "Proyectos"
3. Deberías ver contenido desde Firestore
4. Si Firestore falla → verás fallback local

---

## 🐛 TROUBLESHOOTING

### "No puedo ver el botón Admin"
- ✅ ¿Iniciaste sesión?
- ✅ ¿Tu UID está en `src/firebase/auth.js` → `ADMIN_UIDS`?

### "Error al cargar datos iniciales"
- ✅ Verifica Firestore Rules en Firebase Console
- ✅ Verifica que tu UID tiene permisos de escritura

### "Portfolio muestra datos antiguos"
- ✅ Haz hard refresh (Ctrl+Shift+R)
- ✅ Verifica que seed se cargó correctamente

### "Cambios no se reflejan en el portfolio"
- ✅ Verifica que el campo `visible` no sea `false`
- ✅ Recarga el portfolio después de guardar

---

## 🎉 PRÓXIMOS PASOS OPCIONALES

### Mejoras Futuras (si quieres)
- [ ] Drag & drop para reordenar (usar `react-beautiful-dnd` o similar)
- [ ] Upload de imágenes a Firebase Storage
- [ ] Editor rich text para Cover Letter (ej: Quill, Tiptap)
- [ ] Preview en tiempo real antes de guardar
- [ ] Historial de cambios (versioning)
- [ ] Multi-idioma (i18n)

### Integración con CoverLetter Section
Si quieres que CoverLetter también consuma Firestore:
1. Actualiza `src/sections/CoverLetter.jsx`
2. Lee `getCoverLetter()` en `useEffect`
3. Parse el JSON del contenido
4. Renderiza dinámicamente

---

## 💖 RESUMEN

Ya tienes:
- ✅ Sistema de seed inicial (botón en Admin Settings)
- ✅ CRUD completo para proyectos y experiencias
- ✅ Formularios de edición para perfil y cover letter
- ✅ Portfolio consuming Firestore con fallback
- ✅ Loading states y feedback visual kawaii
- ✅ Seguridad: solo tú escribes, todos leen
- ✅ Sin romper el portfolio público existente

**Todo funciona sin dependencias nuevas, mantiene el estilo kawaii/pastel, y es accesible. 🎨✨**

---

## 📞 SOPORTE

Si algo no funciona:
1. Revisa la consola del navegador (F12)
2. Verifica Firestore Rules en Firebase Console
3. Asegúrate de haber hecho el seed inicial

**¡Disfruta gestionando tu portfolio con tu propio mini CMS! 🚀**
