# 🚨 GUÍA DE SOLUCIÓN DE PROBLEMAS - ADMIN CMS

## ❌ PROBLEMA: Error "does not provide an export named 'default'"

### ✅ SOLUCIÓN INMEDIATA:

**1. DETÉN el servidor de desarrollo:**
```bash
# Presiona Ctrl+C en la terminal donde corre npm run dev
```

**2. LIMPIA caché de Vite:**
```bash
# En la terminal, ejecuta:
rm -rf node_modules/.vite
# o en Windows PowerShell:
Remove-Item -Recurse -Force node_modules\.vite
```

**3. REINICIA el servidor:**
```bash
npm run dev
```

**4. RECARGA el navegador con caché limpio:**
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

---

## 🔐 CONFIGURAR ACCESO ADMIN (PASO A PASO)

### Paso 1: Iniciar Sesión

1. Ve a: `http://localhost:5173/login`
2. **Crea una cuenta** con email/password:
   - Email: tu_email@ejemplo.com
   - Password: (mínimo 6 caracteres)
3. Haz clic en **"Crear Cuenta"**

### Paso 2: Ver tu UID

Después de login, serás redirigido a `/show-uid` automáticamente.

**Si NO te redirige:**
- Ve manualmente a: `http://localhost:5173/show-uid`

**¿Aparece el UID vacío?**
- Espera 2 segundos (loading)
- Si sigue vacío, abre la consola (F12) y verás tu UID en los logs

### Paso 3: Copiar UID

En la página `/show-uid`:
1. Verás una **caja grande con tu UID**
2. Haz clic en el botón **"📋 Copiar UID"**
3. Deberías ver: **"✅ ¡Copiado!"**

**Alternativa (si no funciona el botón):**
- Selecciona el UID manualmente
- Ctrl+C para copiar

### Paso 4: Configurar como Admin

**A. Abre el archivo:**
```
src/firebase/auth.js
```

**B. Busca esta línea (alrededor línea 75):**
```javascript
export const ADMIN_UIDS = [
  'YOUR_ADMIN_UID_HERE', // 👈 REEMPLAZA ESTO
];
```

**C. Pega tu UID (CON COMILLAS):**
```javascript
export const ADMIN_UIDS = [
  'abc123xyz456...tuUIDaqui', // 👈 Tu UID pegado aquí
];
```

**D. GUARDA el archivo:** `Ctrl+S`

### Paso 5: Verificar Acceso

1. **Recarga el navegador:** `F5` o `Ctrl+R`
2. Deberías ver en el **header** (arriba): **"🔐 Admin Panel"**
3. Haz clic en **"Admin Panel"**
4. Llegarás a `/admin`
5. En el menú lateral, haz clic en **"Ajustes"** → `/admin/settings`
6. **¡AHORA VERÁS EL BOTÓN "🚀 Cargar Datos Iniciales"!**

---

## 🌱 CARGAR DATOS INICIALES

**En `/admin/settings`:**

1. Scroll hasta ver: **"🌱 Datos Iniciales"**
2. Verás el estado:
   - ⚠️ Firestore está vacío → **Haz clic en el botón**
   - ✅ Firestore tiene datos → **Ya está cargado**
3. Haz clic: **"🚀 Cargar Datos Iniciales"**
4. Confirma en el popup
5. Espera mensaje: **"✅ Datos iniciales cargados correctamente"**

---

## 🔥 PROBLEMAS COMUNES Y SOLUCIONES

### ❌ "FirestoreError: client is offline"

**Causas:**
1. Firestore aún no ha conectado (normal, espera 2-3 segundos)
2. Problema de red/internet
3. Firestore Rules mal configuradas

**Solución:**
- Este error es **temporal y normal**
- El sistema usa **fallback local** si Firestore falla
- Tu portfolio **seguirá funcionando** con datos locales
- Cuando Firestore conecte, usará esos datos

**Verificar Firestore Rules:**
1. Ve a: https://console.firebase.google.com/
2. Selecciona proyecto: `soraya-porfolio`
3. Firestore Database → Rules
4. Asegúrate que las rules permitan:
   ```
   match /databases/{database}/documents {
     // Lectura pública
     match /{document=**} {
       allow read: if true;
       allow write: if request.auth != null && request.auth.uid == 'TU_UID_AQUI';
     }
   }
   ```

### ❌ "No veo el botón Admin Panel"

**Verificar:**
1. ¿Iniciaste sesión? → Ve a `/login`
2. ¿Pusiste tu UID en ADMIN_UIDS? → Revisa `src/firebase/auth.js`
3. ¿Guardaste el archivo? → `Ctrl+S`
4. ¿Recargaste el navegador? → `F5`

**Debug paso a paso:**
```javascript
// Abre consola (F12) y pega esto:
const auth = await import('./src/firebase/firebase.js').then(m => m.auth);
const ADMIN_UIDS = await import('./src/firebase/auth.js').then(m => m.ADMIN_UIDS);
console.log('Usuario:', auth.currentUser?.email);
console.log('UID:', auth.currentUser?.uid);
console.log('ADMIN_UIDS:', ADMIN_UIDS);
console.log('Es admin?', ADMIN_UIDS.includes(auth.currentUser?.uid));
```

### ❌ "/admin/settings" da error 404 o no carga

**Verificar routing:**
1. ¿El servidor dev está corriendo? → `npm run dev`
2. ¿Hay errores en consola? → `F12` → pestaña Console
3. ¿El PrivateRoute funciona? → Debería redirigir a `/` si no eres admin

**Acceso directo temporal:**
Si eres admin pero no puedes acceder:
- Navega manualmente a: `http://localhost:5173/admin/settings`

---

## ✅ CHECKLIST COMPLETO

Marca cada paso cuando lo completes:

- [ ] npm run dev corriendo sin errores
- [ ] Navegador en http://localhost:5173
- [ ] Cache limpiada (Ctrl+Shift+R)
- [ ] Cuenta creada en /login (email + password)
- [ ] UID visible en /show-uid
- [ ] UID copiado al portapapeles
- [ ] src/firebase/auth.js editado (UID pegado en ADMIN_UIDS)
- [ ] Archivo guardado (Ctrl+S)
- [ ] Navegador recargado (F5)
- [ ] Botón "Admin Panel" visible en header
- [ ] /admin carga correctamente
- [ ] /admin/settings carga correctamente
- [ ] Botón "🚀 Cargar Datos Iniciales" visible
- [ ] Datos iniciales cargados
- [ ] ✅ "Firestore tiene datos" en settings

---

## 🆘 SI NADA FUNCIONA

**Reseteo completo:**

```bash
# 1. Detén el servidor
Ctrl+C

# 2. Limpia todo
rm -rf node_modules/.vite
rm -rf dist

# 3. Reinstala (solo si es necesario)
# npm install

# 4. Reinicia
npm run dev

# 5. Navegador: Ctrl+Shift+R (hard refresh)
```

**Verifica archivos clave:**
```
src/firebase/auth.js       → ADMIN_UIDS con tu UID
src/firebase/firebase.js   → Config correcta
src/App.jsx                → Rutas /admin/* definidas
src/pages/ShowUID.jsx      → export default al final
```

---

## 📞 SOPORTE RÁPIDO

**Comandos útiles:**

Ver errores en consola:
```javascript
// En consola del navegador (F12):
window.location.href = '/show-uid'  // Ver UID
```

Verificar estado de auth:
```javascript
import { auth } from './src/firebase/firebase.js';
console.log('Logueado?', !!auth.currentUser);
console.log('UID:', auth.currentUser?.uid);
```

---

**🎉 Una vez configurado, NO necesitas repetir estos pasos. Tu UID quedará guardado en el código.**
