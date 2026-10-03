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

---

## Sandbox — Evolución de la Demo CMS a entorno interactivo

Evolución de la Demo CMS (ya aislada con `mockService`) hacia un Sandbox completo: el Usuario Demo podrá editar datos ficticios en el CMS Demo y visualizar el resultado en un Portfolio Demo en vivo, sin afectar nunca a Firestore ni al Portfolio Real. Desarrollo por fases pequeñas, cada una validada antes de continuar con la siguiente.

### Fase 1 · Infraestructura mínima del Sandbox

**Objetivo**: crear la ruta `/sandbox/portfolio` y comprobar que puede consumir `mockService` de forma aislada, antes de adaptar ningún componente real del Portfolio.

**Decisiones**:
- Nuevo namespace de rutas `/sandbox/*`, independiente de `/demo/*` (que se mantiene intacto, sin modificar).
- Reutilización del `ServiceProvider`/`ServiceContext` ya existente (el mismo que usan `AdminLayout` y `DemoLayout`) — no se crea un provider nuevo.
- Se crea un componente de verificación dedicado (`SandboxPortfolio`) en lugar de reutilizar `About.jsx`, para aislar por completo la validación de infraestructura de cualquier cambio sobre componentes compartidos con el Portfolio Real.

**Archivos creados/modificados**:
- Creado: `src/pages/sandbox/SandboxPortfolio.jsx` — obtiene los datos exclusivamente vía `useService()`, sin ningún import de `contentService`.
- Modificado: `src/App.jsx` — nueva ruta `/sandbox/portfolio`, envuelta en `<ServiceProvider service={mockService} isDemo={true}>`.

**Validaciones realizadas**:
- Build de producción limpio (`npm run build`), sin errores ni warnings nuevos.
- `/` (Portfolio Real) sigue mostrando los datos reales de Firestore, sin cambios.
- `/admin` sin sesión redirige igual que antes de la fase.
- `/demo` (Demo CMS) funciona exactamente igual que antes de la fase.
- `/sandbox/portfolio` muestra correctamente `isDemo: true` y el perfil ficticio de `mockService` ("Alex Demo").
- Confirmado mediante búsqueda en el código que `SandboxPortfolio.jsx` no importa `contentService` en ningún punto.

**Resultado**: infraestructura base del Sandbox operativa y completamente aislada. Portfolio Real, CMS Real y Demo CMS sin regresiones.

### Fase 2 · Primer componente real compartido (`About.jsx`)

**Objetivo**: adaptar `About.jsx` para que obtenga `getProfile()` exclusivamente mediante `useService()`, eliminando su import directo de `contentService`, y reutilizar ese mismo componente en `/sandbox/portfolio` en sustitución de la pantalla de verificación `SandboxPortfolio` de la Fase 1.

**Decisiones**:
- `About.jsx` pasa a ser el primer componente de presentación compartido entre el Portfolio Real y el Sandbox, sin duplicar su lógica ni su JSX.
- `SandboxPortfolio.jsx` deja de usarse como vista de la ruta `/sandbox/portfolio`, pero se conserva en el repositorio sin eliminar, disponible para futuras pruebas internas de infraestructura si hiciera falta.
- No se ha modificado `ServiceContext.jsx`, `contentService.js` ni `mockService.js`: el cambio se limita exclusivamente al componente y al punto de montaje de la ruta.

**Archivos modificados**:
- `src/sections/About.jsx` — sustituido el import directo de `getProfile` desde `contentService` por el consumo vía `useService()`. Sin cambios en estado, efectos ni JSX.
- `src/App.jsx` — la ruta `/sandbox/portfolio` renderiza ahora `<About />` dentro del `ServiceProvider` con `mockService`; eliminado el import ya no usado de `SandboxPortfolio`.

**Validaciones realizadas**:
- Build de producción limpio, sin errores ni warnings nuevos.
- `/` (Portfolio Real): la sección "Sobre Mí" sigue mostrando los datos reales de Firestore, sin ningún cambio visual.
- `/sandbox/portfolio`: muestra ahora `About.jsx` alimentado por `mockService` (perfil ficticio "Alex Demo").
- `/demo` (Demo CMS) y `/admin` (sin sesión) funcionan exactamente igual que antes de la fase.
- Confirmado mediante búsqueda en el código que `About.jsx` ya no contiene ningún import de `contentService`.

**Resultado**: primer componente real del Portfolio compartido con éxito entre Portfolio Real y Sandbox, cambiando únicamente su fuente de datos según el `ServiceProvider` que lo envuelve. Portfolio Real, CMS Real y Demo CMS sin regresiones.

### Fase 4 · Segundo componente real compartido (`Certifications.jsx`)

**Objetivo**: adaptar `Certifications.jsx` para que obtenga `listCertifications()` exclusivamente mediante `useService()`, eliminando su import directo de `contentService`, y añadirlo a `/sandbox/portfolio` junto a `About.jsx` para que el resultado de la fase sea visible.

**Decisiones**:
- `Certifications.jsx` pasa a ser el segundo componente de presentación compartido entre el Portfolio Real y el Sandbox, repitiendo exactamente el mismo patrón ya validado en la Fase 2 con `About.jsx`.
- `CertificationModal.jsx` no requiere ningún cambio: ya recibe `cert`/`onClose` vía props, sin dependencia propia de ningún servicio.
- No se ha modificado `ServiceContext.jsx`, `contentService.js` ni `mockService.js`.

**Archivos modificados**:
- `src/sections/Certifications.jsx` — sustituido el import directo de `listCertifications` desde `contentService` por el consumo vía `useService()`. Sin cambios en estado, efectos ni JSX.
- `src/App.jsx` — añadido `<Certifications />` junto a `<About />` dentro de la ruta `/sandbox/portfolio`.

**Validaciones realizadas**:
- Build de producción limpio, sin errores ni warnings nuevos.
- `/` (Portfolio Real): la sección "Certificaciones" sigue mostrando los datos reales de Firestore, sin ningún cambio visual.
- `/sandbox/portfolio`: muestra ahora `About` + `Certifications`, con las 3 certificaciones ficticias de `mockService` (React - The Complete Guide, JavaScript Algorithms and Data Structures, Responsive Web Design).
- `/demo` (Demo CMS) y `/admin` (sin sesión) funcionan exactamente igual que antes de la fase.
- Confirmado mediante búsqueda en el código que `Certifications.jsx` ya no contiene ningún import de `contentService`.

**Resultado**: segundo componente real del Portfolio compartido con éxito entre Portfolio Real y Sandbox. Portfolio Real, CMS Real y Demo CMS sin regresiones.
