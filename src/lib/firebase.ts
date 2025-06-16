
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tus variables de entorno deberían estar en un archivo .env.local en la raíz del proyecto.
// Ejemplo de contenido para .env.local:
// NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..............."
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="tu-proyecto.firebaseapp.com"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="tu-proyecto-id"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="tu-proyecto.appspot.com"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
// NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef1234567890"
// NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-ABCDEFGHIJ" (Opcional)

const apiKeyFromEnv = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// -------- START DEBUG LOG --------
console.log("--- Firebase Initialization Attempt ---");
console.log(`[DEBUG] Value of NEXT_PUBLIC_FIREBASE_API_KEY from environment: "${apiKeyFromEnv}"`);
// --------  END DEBUG LOG  --------


if (!apiKeyFromEnv || apiKeyFromEnv.trim() === "") {
  console.error(
    "CRITICAL FIREBASE SETUP ERROR: NEXT_PUBLIC_FIREBASE_API_KEY is undefined or empty. " +
    "Please ensure it is set correctly in your .env.local file (located in the root of your project) " +
    "and that you have RESTARTED your Next.js development server (e.g., by stopping and re-running `npm run dev`)."
  );
  throw new Error(
    "Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is missing or empty. Check server console logs and your .env.local file."
  );
}

const firebaseConfig = {
  apiKey: apiKeyFromEnv,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// More robust check for critical config values
const requiredConfigKeys: (keyof typeof firebaseConfig)[] = [
  'apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'
];
let missingKeysFound = false;
for (const key of requiredConfigKeys) {
  if (!firebaseConfig[key]) {
    console.error(
      `CRITICAL FIREBASE SETUP ERROR: Firebase config value for "NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}" (resulting in config key "${key}") is missing or undefined. ` +
      "Please ensure it is set correctly in your .env.local file and that you have RESTARTED your Next.js development server."
    );
    missingKeysFound = true;
  }
}

if (missingKeysFound) {
  throw new Error(
    "One or more critical Firebase configuration values are missing. Check server console logs for details and verify your .env.local file."
  );
}

if (firebaseConfig.apiKey === "AIzaSyCQvQk24Z0MzULV2-8QMVStYAO1lrUsMBY" || firebaseConfig.apiKey === "AIzaSy...............") {
 console.warn(
   "ADVERTENCIA: La Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) que se está utilizando parece ser un valor de ejemplo/placeholder. " +
   "Si este es tu proyecto real, asegúrate de que estás usando tu API Key única desde la consola de Firebase. " +
   "Usar un placeholder genérico resultará en errores como 'auth/invalid-api-key'."
 );
}

let app: FirebaseApp;

if (!getApps().length) {
  console.log("[INFO] Attempting to initialize new Firebase app with projectId:", firebaseConfig.projectId);
  try {
    app = initializeApp(firebaseConfig);
    console.log("[INFO] Firebase app initialized successfully.");
  } catch (error) {
    console.error("[CRITICAL] Error during Firebase initializeApp call:", error);
    // Re-throw the error to make it clear initialization failed and stop further execution.
    throw error;
  }
} else {
  app = getApp();
  console.log("[INFO] Using existing Firebase app.");
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
