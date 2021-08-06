import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDi7m4UBI01oFflh8GpI_iBd80tx463YMQ",
    authDomain: "keeper-851cb.firebaseapp.com",
    projectId: "keeper-851cb",
    storageBucket: "keeper-851cb.appspot.com",
    messagingSenderId: "398738799938",
    appId: "1:398738799938:web:5c5c97607796d7224cdcdb",
    measurementId: "G-6J3LFKLY79"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;
