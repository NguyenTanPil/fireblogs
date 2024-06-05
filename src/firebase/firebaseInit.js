import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VUE_APP_FIREBASE_KEY,
  authDomain: import.meta.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

const defaultProject = initializeApp(firebaseConfig);

const defaultFirestore = getFirestore(defaultProject);

export default defaultFirestore;