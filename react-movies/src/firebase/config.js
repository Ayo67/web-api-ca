// Import required Firebase dependencies
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDyx1cfVMN9TH8PP1uR1V2TR0wKW_89-sY",
  authDomain: "movies-app-59866.firebaseapp.com",
  databaseURL: "https://movies-app-59866-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movies-app-59866",
  storageBucket: "movies-app-59866.firebasestorage.app",
  messagingSenderId: "149202355759",
  appId: "1:149202355759:web:e1b005bf8e36eb287468da",
  measurementId: "G-1PCVV812RJ"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;