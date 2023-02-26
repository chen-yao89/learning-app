"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idList = exports.plusMinus = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID, FIREBASE_MEASUREMENTID, } = process.env;
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
exports.app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(exports.app);
exports.plusMinus = (0, firestore_1.collection)(db, "plusMinus");
exports.idList = (0, firestore_1.collection)(db, "idList");
//# sourceMappingURL=firestore.js.map