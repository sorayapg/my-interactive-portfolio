# 🔐 Sistema Admin Restringido - Guía Completa

## ✅ CAMBIOS IMPLEMENTADOS

### 1. **Login Simplificado (Login.jsx)**
- ❌ **Eliminado:** Formulario Email/Password completo
- ✅ **Conservado:** Solo Google Sign-In
- 🛡️ **Verificación post-login:** Si el usuario NO es admin → signOut automático + mensaje de error

### 2. **Whitelist de Admin (auth.js)**
- **ADMIN_UIDS:** `['dUvybxUGglg4p46PLsvlsD0MQz62']`
- **ADMIN_EMAILS:** `['tranchecitapg@gmail.com']`
- **Función `isAdmin(user)`:** Verifica tanto UID como email
- **Función `assertAdmin(user)`:** Helper para validaciones críticas

### 3. **Header Actualizado (Header.jsx)**
- ❌ **Eliminado:** Botón "Ver UID" (ya no necesario)
- ✅ **Conservado:** Botón "Admin Panel" (solo visible si isAdmin)
- ✅ **Conservado:** Botón "Salir" con confirmación

### 4. **PrivateRoute Mejorado (PrivateRoute.jsx)**
- 🚨 **Mensaje visual:** Si usuario autenticado pero NO admin → pantalla "Acceso Denegado" por 2s
- 🔄 **Redirect automático:** Redirige a `/` si no es admin

### 5. **Firestore Rules (firestore.rules)**
- 📖 **Lectura:** Pública para todos (portfolio público)
- ✍️ **Escritura:** Solo admin (UID en whitelist)
- 🗂️ **Colecciones protegidas:** profile, projects, experiences, coverLetter, settings

---

## 📋 ARCHIVOS MODIFICADOS

### [`src/firebase/auth.js`](src/firebase/auth.js)
```javascript
export const ADMIN_UIDS = ['dUvybxUGglg4p46PLsvlsD0MQz62'];
export const ADMIN_EMAILS = ['tranchecitapg@gmail.com'];

export const isAdmin = (user) => {
  if (!user) return false;
  return ADMIN_UIDS.includes(user.uid) || ADMIN_EMAILS.includes(user.email);
};

export const assertAdmin = (user) => {
  if (!isAdmin(user)) {
    throw new Error('Acceso denegado: no eres administrador');
  }
  return true;
};
```

### [`src/pages/Login.jsx`](src/pages/Login.jsx)
- Solo botón "Continuar con Google"
- Validación inmediata post-login
- signOut automático si NO es admin

### [`src/components/Header.jsx`](src/components/Header.jsx)
- Botón "Admin Panel" solo si `isAdmin === true`
- Botón "Login" solo si no autenticado

### [`src/routes/PrivateRoute.jsx`](src/routes/PrivateRoute.jsx)
- Pantalla de "Acceso Denegado" con mensaje claro
- Redirect a `/` después de 2 segundos

### [`firestore.rules`](firestore.rules)
- Read: público
- Write: solo admin (verificado por UID/email)

---

## 🚀 PASOS PARA PROBAR

### ✅ **Paso 1: Login como Admin (TÚ)**
```bash
1. Ve a /login
2. Haz clic en "Continuar con Google"
3. Selecciona tu cuenta: tranchecitapg@gmail.com
4. ✅ Deberías entrar directamente a /admin
5. ✅ Deberías ver el botón "Admin Panel" en el header
```

### ❌ **Paso 2: Login con Otra Cuenta (NO Admin)**
```bash
1. Cierra sesión (botón "Salir")
2. Ve a /login
3. Haz clic en "Continuar con Google"
4. Selecciona una cuenta diferente (cualquier otra)
5. ❌ Deberías ver mensaje: "⛔ Acceso denegado. No tienes permisos de administrador."
6. ❌ Sesión cerrada automáticamente
7. ❌ NO deberías ver el botón "Admin Panel" nunca
```

### 🚫 **Paso 3: Acceso Directo a /admin Sin Login**
```bash
1. En una ventana privada/incógnito
2. Ve directamente a http://localhost:5173/admin
3. ❌ Deberías ver pantalla de loading
4. ❌ Redirigido inmediatamente a /
```

### 🔐 **Paso 4: Acceso Directo a /admin Con Login NO Admin**
```bash
1. Haz login con cuenta NO admin
2. Intenta ir manualmente a /admin
3. ❌ Deberías ver pantalla "🚫 Acceso Denegado"
4. ❌ Redirigido a / después de 2 segundos
```

### ✅ **Paso 5: CRUD Funciona Solo Siendo Admin**
```bash
1. Login como admin (tranchecitapg@gmail.com)
2. Ve a /admin/projects
3. Intenta crear/editar/eliminar un proyecto
4. ✅ Debería funcionar normalmente
5. Cierra sesión
6. Como usuario NO admin o sin login:
   - Portfolio público sigue visible (lectura)
   - NO puedes acceder a /admin
   - NO puedes modificar Firestore
```

---

## 🔥 DEPLOY DE FIRESTORE RULES

Para aplicar las reglas a tu proyecto Firebase:

### **Opción 1: Firebase Console (Manual)**
```bash
1. Ve a: https://console.firebase.google.com
2. Selecciona proyecto "soraya-porfolio"
3. Firestore Database → Rules
4. Copia el contenido de firestore.rules
5. Pégalo en el editor
6. Clic en "Publicar"
```

### **Opción 2: Firebase CLI (Recomendado)**
```bash
# Asegúrate de tener Firebase CLI instalado
npm install -g firebase-tools

# Login en Firebase
firebase login

# Deploy solo las rules
firebase deploy --only firestore:rules

# O deploy completo (hosting + rules)
firebase deploy
```

---

## 🧪 TESTING EN CONSOLA DEL NAVEGADOR

### **Verificar isAdmin en Runtime**
```javascript
// Abre DevTools → Console
import { isAdmin } from './src/firebase/auth';
import { useAuth } from './src/hooks/useAuth';

// Dentro de cualquier componente:
const { user } = useAuth();
console.log('User:', user);
console.log('Is Admin:', isAdmin(user));
```

### **Verificar Firestore Access**
```javascript
// Intenta escribir en Firestore desde consola
import { addDoc, collection } from 'firebase/firestore';
import { db } from './src/firebase/firebase';

// Como NO admin, esto debería FALLAR
try {
  await addDoc(collection(db, 'projects'), { test: true });
  console.log('✅ Escritura exitosa');
} catch (err) {
  console.error('❌ Escritura denegada:', err.message);
}
```

---

## 🛠️ TROUBLESHOOTING

### ❓ **"No veo el botón Admin Panel"**
**Solución:**
1. Verifica que tu UID es `dUvybxUGglg4p46PLsvlsD0MQz62`
2. O que tu email es `tranchecitapg@gmail.com`
3. Revisa la consola: `console.log(user.uid, user.email)`
4. Verifica que `src/firebase/auth.js` tiene las whitelists correctas

### ❓ **"Otro usuario logra entrar a /admin"**
**Solución:**
1. Verifica que desplegaste las Firestore Rules
2. Limpia caché del navegador
3. Verifica que `Login.jsx` tiene la validación post-login
4. Revisa la consola por errores

### ❓ **"CRUD no funciona ni siendo admin"**
**Solución:**
1. Verifica Firestore Rules en Firebase Console
2. Revisa que el UID en las rules coincide con `auth.js`
3. Comprueba errores en Network tab (DevTools)
4. Intenta re-deploy: `firebase deploy --only firestore:rules`

### ❓ **"Portfolio público no se ve (lecturas fallan)"**
**Solución:**
1. Firestore Rules permiten `read: if true`
2. Verifica que no hay regla más restrictiva
3. Revisa Network tab por errores 403

---

## 📊 RESUMEN DE SEGURIDAD

| Acción | Admin | No Admin | Sin Login |
|--------|-------|----------|-----------|
| Ver portfolio (/) | ✅ | ✅ | ✅ |
| Login (/login) | ✅ | ✅ (expulsado) | ✅ |
| Ver /admin | ✅ | ❌ | ❌ |
| Ver botón Admin | ✅ | ❌ | ❌ |
| Leer Firestore | ✅ | ✅ | ✅ |
| Escribir Firestore | ✅ | ❌ | ❌ |

---

## 🎯 PRÓXIMOS PASOS (OPCIONAL)

Si en el futuro quieres:

### **Añadir más admins:**
```javascript
// src/firebase/auth.js
export const ADMIN_UIDS = [
  'dUvybxUGglg4p46PLsvlsD0MQz62', // Admin principal
  'otroDQwerty123456789', // Nuevo admin
];

export const ADMIN_EMAILS = [
  'tranchecitapg@gmail.com',
  'otroadmin@gmail.com',
];
```

```javascript
// firestore.rules
let adminUIDs = [
  'dUvybxUGglg4p46PLsvlsD0MQz62',
  'otroDQwerty123456789'
];

let adminEmails = [
  'tranchecitapg@gmail.com',
  'otroadmin@gmail.com'
];
```

Luego: `firebase deploy --only firestore:rules`

### **Email/Password como backup:**
Si quieres restaurar email/password (manteniendo la whitelist de admin), solo necesitas:
1. Descomentar funciones `signInWithEmail` y `signUpWithEmail` en `auth.js`
2. Añadir formulario en `Login.jsx`
3. Seguir validando con `isAdmin()` post-login

---

## ✨ CONCLUSIÓN

Tu panel admin ahora es **100% privado**:
- ✅ Solo tú (UID/email en whitelist) puedes entrar
- ✅ Login solo con Google (simple y rápido)
- ✅ Expulsión automática de no-admins
- ✅ Firestore protegido: write solo admin, read público
- ✅ UI limpia: botones condicionales según rol

**¡Todo listo para producción!** 🚀
