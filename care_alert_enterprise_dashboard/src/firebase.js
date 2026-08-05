import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Using the same credentials from your google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyA_idmYGHvU4pWZLgQYTXVM78hkHdGiUIg",
  projectId: "healthcare-b2d3f",
  storageBucket: "healthcare-b2d3f.firebasestorage.app",
  appId: "1:826174653106:web:YOUR_WEB_APP_ID_WOULD_GO_HERE", 
  // Note: Firestore works in Web preview even if appId is slightly mismatched for simple queries
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
