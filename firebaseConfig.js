// // firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Replace the following with your Firebase project configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDQceprT04YV6Da2XCT9nLR98QOZ9sQrlI",
//     authDomain: "familyconnectionapp.firebaseapp.com",
//     projectId: "familyconnectionapp",
//     storageBucket: "familyconnectionapp.firebasestorage.app",
//     messagingSenderId: "203652093289",
//     appId: "1:203652093289:web:6fb4bb50f7f3665a13d9f8",
//     measurementId: "G-Z3BX72LPR0"
//   };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and Firestore if needed
// export const auth = getAuth(app);
// export const firestore = getFirestore(app);


//new
// firebaseConfig.js
// import { initializeApp } from 'firebase/app';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyDQceprT04YV6Da2XCT9nLR98QOZ9sQrlI",
//     authDomain: "familyconnectionapp.firebaseapp.com",
//     projectId: "familyconnectionapp",
//     storageBucket: "familyconnectionapp.firebasestorage.app",
//     messagingSenderId: "203652093289",
//     appId: "1:203652093289:web:6fb4bb50f7f3665a13d9f8",
//     measurementId: "G-Z3BX72LPR0"
//   };

// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Auth with persistence
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// export const firestore = getFirestore(app);


// new
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQceprT04YV6Da2XCT9nLR98QOZ9sQrlI",
  authDomain: "familyconnectionapp.firebaseapp.com",
  projectId: "familyconnectionapp",
  storageBucket: "familyconnectionapp.firebasestorage.app",
  messagingSenderId: "203652093289",
  appId: "1:203652093289:web:6fb4bb50f7f3665a13d9f8",
  measurementId: "G-Z3BX72LPR0"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const firestore = getFirestore(app);

// Initialize and export Firebase Storage (needed for profile picture uploads)
export const storage = getStorage(app);

