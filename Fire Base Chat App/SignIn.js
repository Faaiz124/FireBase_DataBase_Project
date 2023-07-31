import { auth, db, app } from "./Firebase.js"



import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// console.log({auth ,db, app})



function SignIn() {

  const Semail = document.getElementById("signInEmail").value;
  const Spassword = document.getElementById('signInPassword').value;

  document.getElementById("signInEmail").value = "";
  document.getElementById('signInPassword').value = "";


  signInWithEmailAndPassword(auth, Semail, Spassword)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('user', user.uid)
      // localStorage.setItem('name',user.name)
      // console.log("user",user)
      // alert("Wellcome To Firease Login")

      // window.location.href = "Chat.html";  


      var innerwidth = window.innerWidth;
      if (innerwidth <= 768) {
        // console.log(innerwidth)
        window.location.href = "Chat.html"
      }
      else {
        window.location.href = "comChat.html"
      }

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //   console.log("errorCode",errorCode)
      alert("Wrog Password")
    });

}

window.SignIn = SignIn
