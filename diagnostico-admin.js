// 🔍 SCRIPT DE DIAGNÓSTICO - Copia y pega en la consola del navegador (F12)
// Este script verifica el estado de tu configuración Firebase y Auth

console.clear();
console.log('🔍 === DIAGNÓSTICO DE ADMIN CMS ===\n');

// 1. Verificar Firebase
try {
  console.log('1️⃣ Firebase inicializado:', typeof firebase !== 'undefined' ? '✅' : '❌');
} catch (e) {
  console.log('1️⃣ Firebase:', '⚠️ No disponible en window.firebase');
}

// 2. Verificar Auth
import { auth } from './src/firebase/firebase.js';
const currentUser = auth.currentUser;

console.log('2️⃣ Usuario actual:', currentUser ? '✅ Logueado' : '❌ No logueado');
if (currentUser) {
  console.log('   - Email:', currentUser.email);
  console.log('   - UID:', currentUser.uid);
  console.log('   📋 COPIA ESTE UID:', `'${currentUser.uid}'`);
}

// 3. Verificar ADMIN_UIDS
import { ADMIN_UIDS } from './src/firebase/auth.js';
console.log('3️⃣ ADMIN_UIDS configurado:', ADMIN_UIDS);
console.log('   ⚠️ Incluye "YOUR_ADMIN_UID_HERE"?', ADMIN_UIDS.includes('YOUR_ADMIN_UID_HERE') ? '❌ SÍ - NECESITAS CAMBIARLO' : '✅ NO');

if (currentUser) {
  console.log('   ✅ Tu UID está en la lista?', ADMIN_UIDS.includes(currentUser.uid) ? '✅ SÍ - ERES ADMIN' : '❌ NO - AÑÁDELO');
}

// 4. Verificar Firestore
import { db } from './src/firebase/firebase.js';
console.log('4️⃣ Firestore inicializado:', db ? '✅' : '❌');

console.log('\n📝 === PRÓXIMOS PASOS ===');
if (!currentUser) {
  console.log('1. Ve a /login e inicia sesión');
  console.log('2. Vuelve aquí y ejecuta este script de nuevo');
} else if (ADMIN_UIDS.includes('YOUR_ADMIN_UID_HERE')) {
  console.log('1. Copia tu UID de arriba (entre comillas)');
  console.log('2. Abre src/firebase/auth.js');
  console.log('3. Reemplaza "YOUR_ADMIN_UID_HERE" con tu UID');
  console.log('4. Guarda y recarga la página');
} else if (!ADMIN_UIDS.includes(currentUser.uid)) {
  console.log('1. Añade tu UID a ADMIN_UIDS en src/firebase/auth.js:');
  console.log(`   export const ADMIN_UIDS = ['${currentUser.uid}'];`);
  console.log('2. Guarda y recarga la página');
} else {
  console.log('✅ ¡Todo configurado! Ve a /admin/settings');
}

console.log('\n💡 TIP: Si no puedes importar en consola, ve a /show-uid en el navegador\n');
