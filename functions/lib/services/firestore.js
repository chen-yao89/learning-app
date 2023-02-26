"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idList = exports.plusMinus = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const { FIREBASE_apiKey, FIREBASE_authDomain, FIREBASE_projectId, FIREBASE_storageBucket, FIREBASE_messagingSenderId, FIREBASE_appId, FIREBASE_measurementId, } = process.env;
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
exports.app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(exports.app);
exports.plusMinus = (0, firestore_1.collection)(db, "plusMinus");
exports.idList = (0, firestore_1.collection)(db, "idList");
//# sourceMappingURL=firestore.js.map