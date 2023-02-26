import {initializeApp} from 'firebase/app';
import {collection, getFirestore} from 'firebase/firestore';
const {
  FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGINGSENDERID,
  FIREBASE_APPID,
  FIREBASE_MEASUREMENTID,
} = process.env;
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const plusMinus = collection(db, 'plusMinus');
export const idList = collection(db, 'idList');
