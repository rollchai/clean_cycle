import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCll4eHd9JHndHx1_rB6xyKfHpheHadPoo",
  authDomain: "clean-cycle-f5291.firebaseapp.com",
  projectId: "clean-cycle-f5291",
  storageBucket: "clean-cycle-f5291.firebasestorage.app",
  messagingSenderId: "834253919008",
  appId: "1:834253919008:web:0acde8c41abd9c3524bd45",
  measurementId: "G-BCNY685RRJ"
};
export const app=initializeApp(firebaseConfig);
export const messaging=getMessaging(app);
