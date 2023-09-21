const firebaseConfig = {
  apiKey: "AIzaSyCMJyV0v2rlI-RqSL8VBaNJLroMEVjfaeY",
  authDomain: "twitter-596a1.firebaseapp.com",
  projectId: "twitter-596a1",
  storageBucket: "twitter-596a1.appspot.com",
  messagingSenderId: "659373071939",
  appId: "1:659373071939:web:5860f74ecc6ee2394bbef6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let name = document.getElementById("name");
let mail = document.getElementById("mail");
let title = document.getElementById("title")
let image = document.getElementById("image");
let cap_con = document.getElementById("cap_con")
let type = document.getElementById("type");
let pro2 = document.getElementById("pro")
image.style.display = "none"

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(user);
    name.innerHTML = user.displayName;
    mail.innerHTML = user.email;
  } else {
    // User is signed out
    // ...
  }
});
function postblog(ev) {
  ev.preventDefault();
  let image = document.getElementById("image").files[0]
  let imageName = image.name;
  console.log(image, imageName);
  let storageRef = firebase.storage().ref(imageName)
  let uploadTask = storageRef.put(image);
  uploadTask.on('state_changed', (snapshot) => {
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, (error) => {
    console.log(error)
    alert("image could not upload")
    console.log(error);
  }, () => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      db.collection("post").doc().set({
        title: title.value,
        file: downloadURL,
        Comment: [
          {
            nameofcommentor: "",
            thepersoncomment: "",
          }
        ]
      }).then(() => {
        console.log("Document successfully written!");
        alert("post successful")
      })
        .catch((error) => {
          console.error("Error writing document: ", error);
          alert("post not successful")
        });
    });
  })
}
function showblog() {
  db.collection("post").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      cap_con.innerHTML += `
          <div id="profile">
                <div id="pro"><p>A</p></div>
                <div class="pro2">
                    <p class="nam" id="name"></p>
                    <p id="mail">@AishatAdekunle5</p>
                </div>
                <div class="pro3">
                  <i class="fa fa-ellipsis"></i>
                </div>
          </div>
          <p class="content">${doc.data().title}</p>
          <img class="im" src='${doc.data().file}' />
          <div class="ico">
            <button onclick="showcom()"><i class="fa-sharp fa-regular fa-comment"></i></button>
            <button><i class="fa-sharp fa-regular fa-heart"></i></button>
            <button><i class="fa-solid fa-bookmark"></i></i></button>
            <button><i class="fa-sharp fa-regular fa-arrow-up-from-bracket"></i></button>
          </div>
          <div id="post">
                <div id="wat">
                  <div id="pro">
                     <p>A</p>
                  </div> 
                  <div class="ti">
                  <input id="type" type="text" placeholder="Tweet your reply">
                  </div>
                </div>
                <div class="med">
                    <div class="meds">
                        <button onclick="showimage()"><i class="fa-regular fa-image"></i><input id="image" type="file"></button>
                        <button><span class="material-symbols-outlined">
                           gif_box
                           </span></button>
                        <button><i class="fa-thin fa-code-pull-request-draft fa-rotate-90"></i></button>
                        <button><i class="fa-regular fa-face-smile"></i></button>
                        <button><i class="fa-regular fa-calendar-circle-plus"></i></button>
                        <button><i class="fa fa fa-location-dot"></i></button>
                    </div>
                    <button id=rep onclick=entcom(event)>Reply</button>
                </div>
          </div>
    `
    });
  });
}
showblog()

function showimage() {
  image.click();
}
function showcom() {
  document.getElementById("post").style.display = "block"
}
function entcom(ev) {
  Comment.push(type.value)
}