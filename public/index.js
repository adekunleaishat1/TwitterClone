
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
  var provider = new firebase.auth.GoogleAuthProvider();


let email = document.getElementById("email"); 
let password = document.getElementById("password")
let username = document.getElementById("username")
let user_details = JSON.parse(localStorage.getItem("reg_user"));
let data =
    {
        email: email.value,
        Password: password.value,
        username: username.value
    }
function sign(ev) {
    ev.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            let curr_user = firebase.auth().currentUser;
            console.log(curr_user);
            user.updateProfile({
            displayName: username.value,
           }).then(() => {
              // Update successful
              window.location.href = "login.html"
                 // ...
           }).catch((error) => {
              // An error occurred
                  // ...
           });                 
          alert("user signed up successfully")
        })
        .catch((error) => { 
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    console.log(email.value, password.value)
}
function signwithgg(ev) {
    ev.preventDefault();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            console.log("successful");
            // IdP data available in result.additionalUserInfo.profile.
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}
function login(ev) {
  ev.preventDefault()
  window.location.href = "login.html"
}

