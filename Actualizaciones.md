# Actualizaciones del Portfolio — Registro de implementaciones

Portfolio personal con CMS integrado, diseño kawaii/pastel y animaciones SVG.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| UI | React 18 + Vite |
| Estilos | Tailwind CSS v3 |
| Iconos | @heroicons/react/24/outline |
| Base de datos | Firebase Firestore |
| Autenticación | Firebase Auth (Google + email/password) |
| Hosting | Firebase Hosting (`soraya-porfolio`) |
| Animaciones | CSS keyframes + IntersectionObserver (DrawStory) |

---

## Estructura de rutas

```
/                     → Portfolio público (todas las secciones)
/admin                → Panel CMS (requiere autenticación)
/admin/home           → Dashboard admin
/admin/profile        → Editar perfil/hero
/admin/experiences    → CRUD experiencias
/admin/projects       → CRUD proyectos
/admin/certifications → CRUD certificaciones
/admin/cover-letter   → Editar carta de presentación
/admin/storyboard     → CRUD viñetas storyboard
/admin/settings       → Configuración general
/login                → Acceso admin
```

---

## Lo que se ha implementado

### CMS — Panel de Administración

- **Arquitectura CMS completa**: Panel protegido en `/admin` con `PrivateRoute` + Firebase Auth. Solo accesible con UID autorizado.
- **7 secciones editables** desde el panel:
  - Perfil / Hero
  - Experiencias (CRUD completo con Firestore)
  - Proyectos (CRUD completo con Firestore)
  - **Certificaciones** — implementada de cero:
    - Colección `certifications` en Firestore
    - `contentService.js` con `listCertifications`, `addCertification`, `updateCertification`, `deleteCertification`
    - Formulario con campos: título, organización, fecha, URL verificación, imagen, skills, descripción
    - Badge automático "Reciente" para las 2 últimas certificaciones añadidas
  - Carta de presentación
  - Storyboard (CRUD viñetas)
  - Configuración general
- **`src/config/adminSections.js`**: Fuente única de verdad para la navegación admin — clases Tailwind definidas de forma estática para evitar purge en producción.
- **Firestore Rules**: Colección `certifications` con `read: public, write: isAdmin()`. Desplegadas correctamente.
- **`useAdmin.js` / `useAuth.js`**: Hooks de autenticación y verificación de rol admin.
- **AdminLayout + AdminNav**: Layout con navegación lateral responsive.

---

### Portfolio Público

#### Corrección global — `App.css`
- **Problema**: Vite genera boilerplate en `App.css` con `#root { max-width: 1280px; padding: 2rem; text-align: center }` que restringe todo el ancho del portfolio y centra el texto globalmente.
- **Solución**: Reemplazado completamente por `#root { width: 100%; }` únicamente.

#### Sección Hero
- Altura compactada: `min-h-[55vh] py-10` (antes ocupaba pantalla completa)
- Fondo pastel: `backgroundColor: '#FCE7F3'`

#### Sección About
- Sin `min-height` fijo — altura basada en contenido: `py-14 bg-white`

#### Sección CoverLetter
- Sin `min-height` fijo — altura basada en contenido: `py-14 bg-pink-50`

#### Sección Projects
- Tema visual kawaii/pastel unificado:
  - Fondo: `bg-violet-50`
  - Cards: `rounded-2xl border-violet-100 hover:-translate-y-1`
  - Tech chips: `bg-pink-100 text-pink-700 rounded-full`
  - Links: rosa (`text-pink-500`) y violeta (`text-violet-500`)

#### Sección Certifications (nueva — completa)
- Sección pública implementada de cero, consume datos de Firestore en tiempo real
- Cards con diseño kawaii: `border-pink-200`, sombra rosa en hover
- Badge "Reciente" automático para las 2 últimas (lógica `getRecentIds`)
- Zona imagen con gradiente `from-pink-50 to-purple-50`
- Skills como chips `bg-purple-50 text-purple-400`
- **`CertificationModal.jsx`**: Modal detalle con animación `certModalIn`, imagen `object-contain`, botón verificar con gradiente rosa, cierre por Escape/overlay/X, bloqueo scroll body

#### Sección Storyboard (refactorizada)
- **Antes**: 9 bloques estáticos con imágenes `h-96` → scroll enorme en la página
- **Ahora**: Array de datos `vinetas[]` + grid compacto + modal de detalle
  - Grid: `grid-cols-2 sm:grid-cols-3 gap-4` — 3 columnas desktop, 2 móvil
  - Cards compactas con imagen `h-44` móvil / `h-52` desktop
  - Imagen con `object-contain` + fondo `bg-white/70 shadow-inner` → se ve completa sin recortes agresivos
  - Hover: `scale-105` en imagen + `hover:-translate-y-1 hover:shadow-xl` en card
  - **`StoryboardModal.jsx`**: Modal con historia completa, imagen `object-contain`, cierre por Escape/overlay/X, animación `certModalIn` reutilizada
  - Todos los textos originales preservados — visibles en el modal al hacer clic

#### Sección ProfessionalStory / DrawStory (Whiteboard Animation)
- Espaciado entre escenas compactado para reducir scroll:
  - Wrapper de escena: `min-h-[60vh] py-3 px-4` (antes `min-h-screen`)
  - Grid interno: `gap-6 lg:gap-10 lg:items-start`
  - Columna de texto: `space-y-4`
- **No modificados** (críticos para el funcionamiento):
  - `IntersectionObserver` con `rootMargin: '-40% 0px -40% 0px'`
  - Sentinel `absolute top-1/2 left-0 w-full h-1`
  - Paginador `fixed bottom-8 left-1/2` con auto-hide

#### `src/index.css`
- `@keyframes certModalIn` definida una sola vez al final del archivo
- Reutilizada por `CertificationModal.jsx` y `StoryboardModal.jsx`

---

## Pendiente — Portfolio Público

### Fase 2 · Navegación entre secciones
- [ ] Añadir `id` a cada sección: `#about`, `#cover-letter`, `#storyboard`, `#professional-story`, `#projects`, `#certifications`
  - La sección DrawStory necesita el `id` en el wrapper externo **sin tocar** la lógica interna del IntersectionObserver
- [ ] Mejorar `Header.jsx` con anchor links a cada sección
- [ ] Menú hamburguesa para móvil
- [ ] Scroll suave (`scroll-behavior: smooth` o `scrollIntoView`)
- [ ] Indicador de sección activa en la navegación (highlight del link actual)

### Fase 3 · Mejoras visuales
- [ ] Continuidad visual entre imagen y zona de texto en cards del Storyboard
- [ ] Animaciones de entrada al hacer scroll (fade-in sutil por sección)
- [ ] Modo oscuro opcional (las secciones usan `bg-*` de Tailwind, compatible con dark mode)

### Fase 4 · SEO y rendimiento
- [ ] Meta tags (`og:title`, `og:description`, `og:image`) en `index.html`
- [ ] `<title>` dinámico por sección
- [ ] Lazy loading de imágenes del Storyboard y Certificaciones
- [ ] Comprimir imágenes en `public/images/storyboard/`

---

## Notas técnicas

- **Tailwind y clases dinámicas**: No usar interpolación de strings para clases Tailwind. El compilador de producción purga las clases no encontradas como literals. Definir siempre las clases completas de forma estática (ver `adminSections.js` como ejemplo correcto).
- **DrawStory — no tocar**: El `IntersectionObserver` usa un sentinel `absolute top-1/2` para activar el paginador. Modificar el padding/margin de las escenas puede romper el trigger.
- **`firestore.rules`**: Cada nueva colección debe añadirse explícitamente. Tras modificar: `npx firebase deploy --only firestore:rules`.
- **Despliegue completo**: `npm run build` → `firebase deploy`.
