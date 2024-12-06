import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDkFP4sfIDNlvg18tn0n9w5wUaKhwnt1w8",
    authDomain: "zesty-80616.firebaseapp.com",
    projectId: "zesty-80616",
    storageBucket: "zesty-80616.firebasestorage.app",
    messagingSenderId: "917722771884",
    appId: "1:917722771884:web:4eb4a2ca80ec2864edca09",
    measurementId: "G-8EDBW6WMS4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
