// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC_KF_VYb7p5yE5wdJF_mHY1zcL5FmBSU8',
  authDomain: 'chen-learning-app.firebaseapp.com',
  projectId: 'chen-learning-app',
  storageBucket: 'chen-learning-app.appspot.com',
  messagingSenderId: '712117085868',
  appId: '1:712117085868:web:b08cf2da9da02c958c6109',
  measurementId: 'G-QNE2EV8WYJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const plusMinus = collection(db, 'plusMinus');
export const idList = collection(db, 'idList');
