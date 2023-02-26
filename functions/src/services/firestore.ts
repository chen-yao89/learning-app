import {initializeApp} from "firebase/app";
import {collection, getFirestore} from "firebase/firestore";
const {
	FIREBASE_apiKey,
	FIREBASE_authDomain,
	FIREBASE_projectId,
	FIREBASE_storageBucket,
	FIREBASE_messagingSenderId,
	FIREBASE_appId,
	FIREBASE_measurementId,
} = process.env;
const firebaseConfig = {
  apiKey: FIREBASE_apiKey,
  authDomain: FIREBASE_authDomain,
  projectId: FIREBASE_projectId,
  storageBucket: FIREBASE_storageBucket,
  messagingSenderId: FIREBASE_messagingSenderId,
  appId: FIREBASE_appId,
  measurementId: FIREBASE_measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const plusMinus = collection(db, "plusMinus");
export const idList = collection(db, "idList");
