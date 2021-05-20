import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAyA3gNoVyJ4asUTEfz4YUlZ5HZQJqzuNc",
    authDomain: "reactdb-f48ed.firebaseapp.com",
    projectId: "reactdb-f48ed",
    storageBucket: "reactdb-f48ed.appspot.com",
    messagingSenderId: "343241789791",
    appId: "1:343241789791:web:00ac610ff2d348fb5826ea",
    measurementId: "G-F5BTB73F63"
});

  export const auth = firebaseConfig.auth();
  export default firebase;