import { auth, db, app } from "./Firebase.js"



import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, addDoc, onSnapshot, doc, getDoc, updateDoc, collection, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// console.log({auth ,db, app})








const getOnlineUser = async (email) => {

    const q = query(collection(db, "users"), where("email", "==", email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const user = [];
        querySnapshot.forEach((doc) => {
            user.push(doc.data());
        });
        var profname = document.getElementById("profname")
        //   console.log("Current cities in CA: ", user);
        profname.innerHTML = `${user[0].name}`
    });
}

////////////////////////////////////////
const getAllUsers = async (email) => {

    const q = query(collection(db, "users"), where("email", "!=", email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const user = [];
        querySnapshot.forEach((doc) => {
            user.push(doc.data());
        });
        var Users_ChatBox = document.getElementById("Users-ChatBox")
        //   console.log("Current cities in CA: ", user);
        for (let i = 0; i < user.length; i++) {
            const { name, img, uid } = user[i];
            const imgcheck = img ? img : `./img/profile.png`
            // console.log(uid)
            Users_ChatBox.innerHTML += `<ul class="contacts">
          <li onclick="slectedChat('${name}','${imgcheck}','${uid}', '${email}')" class="active">
            <div class="d-flex bd-highlight">
              <div class="img_cont">
                <img src=${imgcheck} class="rounded-circle user_img">
                <span class="online_icon"></span>
              </div>
              <div class="user_info">
                <span>${name}</span>
                <p>${name} is online</p>
              </div>
            </div>
          </li>
        </ul>`;
            document.getElementById('loader').style.display = 'none';
        }
    });
}
document.getElementById('loader').style.display = 'block';

onAuthStateChanged(auth, (user) => {
    // const uid = localStorage.getItem('user')
    // const useruid = user.uid;
    // console.log("name",user)
    getAllUsers(user.email)
    getOnlineUser(user.email)
    const img = user[0];
});

let slectedUserId;

const slectedChat = (name, imgcheck, slectedUid, email) => {
    // console.log(email )
    slectedUserId = slectedUid;
    const currentUserId = localStorage.getItem('user');
    let ChatId;
    if (currentUserId < slectedUserId) {
        ChatId = currentUserId + slectedUserId;
    } else {
        ChatId = slectedUserId + currentUserId;
    }


    const slectedProImg = document.getElementById("slectedProImg")
    const SlectedName = document.getElementById("SlectedName")
    const displayNone = document.getElementById("displayNone")
    slectedProImg.src = `${imgcheck}`;
    // console.log(slectedProImg.src)
    SlectedName.innerText = ` ${name}`;
    displayNone.style.display = 'block';
    // console.log(ChatId)
    getAllImg(ChatId, imgcheck, email)
}

const backbtn = () => {
    const floot = document.getElementById("floot");
    floot.style.display = 'none';
}

window.backbtn = backbtn
const logout = () => {
    localStorage.clear();
    location.href = "index.html"
}
// getUserData()
window.logout = logout

const messeg_input = document.getElementById("messeg_input");

messeg_input.addEventListener("keydown", async (e) => {
    const currentUserId = localStorage.getItem('user');
    let inputValue = messeg_input.value;
    if (e.keyCode == 13 && inputValue.trim() !== "") { // Check if input is not empty (ignoring leading/trailing whitespace)
        let ChatId;
        if (currentUserId < slectedUserId) {
            ChatId = currentUserId + slectedUserId;
        } else {
            ChatId = slectedUserId + currentUserId;
        }
        //////////////////////////
        let chatTime = moment(new Date()).fromNow();
        const chat_boxs = document.getElementById("chat-boxs");

        chat_boxs.innerHTML += `
        <div class="d-flex justify-content-end mb-4">
        <div class="msg_cotainer_send">
        ${inputValue}
            <span class="msg_time_send">${chatTime}</span>
        </div>
        <div class="img_cont_msg">
            <img src="./img/profile.png"
                class="rounded-circle user_img_msg">
        </div>
    </div>
`
        messeg_input.value = "";
        ////////////////////////////////
        // console.log("ChatId", ChatId)
        // console.log(messeg_input.value)
        // Add a new document with a generated id.
        const time = new Date();
        const docRef = await addDoc(collection(db, "messeges"), {
            messeges: inputValue,
            ChatID: ChatId,
            time: time,
            sender: currentUserId,
            receiver: slectedUserId,
        });
        console.log("message Sent");
    }
});



const getAllImg = async (ChatId, imgcheck, email) => {
    // console.log(imgcheck)
    // console.log(email)
    const q = query(collection(db, "users"), where("email", "==", email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const user = [];
        querySnapshot.forEach((doc) => {
            user.push(doc.data());
        });
        //   console.log( user);
        for (let i = 0; i < user.length; i++) {
            const img = user[i];
            // const imgcheck = img ? img : `./img/profile.png`
            //   console.log(img.img)

            getAllMesseges(ChatId, img.img, imgcheck)
        }
    });
}





const getAllMesseges = async (ChatId, img, imgcheck) => {
    const receiverImg = imgcheck ? imgcheck : `./img/profile.png`
    const senderImg = img ? img : `./img/profile.png`
    // console.log(receiverImg)
    // console.log(senderImg)
    ///////////////////////////////////////////////////////////////////////////////////////
    const q = query(collection(db, "messeges"), orderBy("time", 'desc'), where("ChatID", "==", ChatId));
    const chat_boxs = document.getElementById("chat-boxs");
    const currentUserId = localStorage.getItem('user');
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messege = [];
        querySnapshot.forEach((doc) => {
            messege.push(doc.data());
        });
        //////////////////////////////////////////////////////////////////////
        // console.log(messege[1].sender)
        chat_boxs.innerHTML = "";
        for (var i = 0; i < messege.length; i++) {
            let chatTime = moment(messege[i].time.toDate()).fromNow()
            // console.log(chatTime)
            if (currentUserId === messege[i].sender) {
                chat_boxs.innerHTML += `
                <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">
                ${messege[i].messeges}
                    <span class="msg_time_send">${chatTime}</span>
                </div>
                <div class="img_cont_msg">
                    <img src="${senderImg}"
                        class="rounded-circle user_img_msg">
                </div>
            </div>
        `
                // console.log("messege", messege);
            } else {
                chat_boxs.innerHTML += `
                <div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg">
                    <img src="${receiverImg}"
                        class="rounded-circle user_img_msg">
                </div>
                <div class="msg_cotainer">
                ${messege[i].messeges}
                    <span class="msg_time">${chatTime}</span>
                </div>
            </div> 
        `
            }
        }

    });
}

const profile = () => {
    window.location.href = "Home.html";
}



window.profile = profile;
window.slectedChat = slectedChat;