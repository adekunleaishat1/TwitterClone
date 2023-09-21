

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMJyV0v2rlI-RqSL8VBaNJLroMEVjfaeY",
  authDomain: "twitter-596a1.firebaseapp.com",
  projectId: "twitter-596a1",
  storageBucket: "twitter-596a1.appspot.com",
  messagingSenderId: "659373071939",
  appId: "1:659373071939:web:5860f74ecc6ee2394bbef6"
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);


    let email = document.getElementById("email")
    let pass = document.getElementById("pass")
    let username = document.getElementById("username")
    // let user_details = JSON.parse(localStorage.getItem("reg_user"))
    function login(ev) {
        ev.preventDefault();
        // let found = user_details.find((curr) => curr.email == email.value || curr.password == pass.value);
        firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            let curr_users  = firebase.auth().currentUser;
            console.log(curr_users);
            window.location.href = "blog.html"
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }
    function sign(ev) {
        ev.preventDefault()
        window.location.href = "index.html"
    }


