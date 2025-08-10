// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore if needed
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDlg2mrm3g7FBGjkKIK2UwNekUj8wy3bJk",
	authDomain: "login-auth-f9e55.firebaseapp.com",
	projectId: "login-auth-f9e55",
	storageBucket: "login-auth-f9e55.firebasestorage.app",
	messagingSenderId: "471809140270",
	appId: "1:471809140270:web:7c1b1dcc15f697898361bf",
	measurementId: "G-C0FRZY8S2H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app); // Assuming you want to use Firestore as well
export default app;