import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";


import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore ,collection, addDoc ,onSnapshot,doc, getDoc,setDoc ,query, where,} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCcy7dSjmnu8EBQ9UPyE_dk07O4sxEmgqA",
  authDomain: "chat-app-beta-7e7f0.firebaseapp.com",
  databaseURL: "https://chat-app-beta-7e7f0-default-rtdb.firebaseio.com",
  projectId: "chat-app-beta-7e7f0",
  storageBucket: "chat-app-beta-7e7f0.appspot.com",
  messagingSenderId: "97210817868",
  appId: "1:97210817868:web:6a8c2f4885dba03fa6c3e9"
};
  
  const app = initializeApp(firebaseConfig);
  // console.log(app)
  const auth = getAuth(app);
  const db = getFirestore(app);
  

  export {auth,db,app}