import { initializeApp } from 'firebase/app';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref , get , child} from 'firebase/database';

//initialization
const firebaseapp = initializeApp({
    apiKey: "AIzaSyAPKK7LNDjvyQHuv8RMcot3rOcX7Tk2UrA",
    authDomain: "patient-s-history-management.firebaseapp.com",
    databaseURL: "https://patient-s-history-management-default-rtdb.firebaseio.com",
    projectId: "patient-s-history-management",
    storageBucket: "patient-s-history-management.appspot.com",
    messagingSenderId: "1014811910553",
    appId: "1:1014811910553:web:505104b81991e09ae1f308",
    measurementId: "G-2RPD3RPJER"
});


//Initialization of instances
const auth = getAuth(firebaseapp);
if(document.getElementById("SignBtn") != null){
    document.getElementById("SignBtn").addEventListener('click' , SignIn );
}
/*function signIn(){
    Email = document.getElementById('semail');
    Password = document.getElementById('sPassword');
    console.log('Entered Function');
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
        console.log('Log In Success...')
        const user = userCredential.user;
        alert(user);
    // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}*/
function SignIn(){
    console.log("In");
    const Email = document.getElementById('semail').value;
    const Password = document.getElementById('sPassword').value;
    signInWithEmailAndPassword(auth, Email, Password)
    .then((userCredential) => {
       
      const user = userCredential.user;
      
      const dbRef = ref(getDatabase());
      var userId = user.uid;
      console.log(userId , auth.currentUser.uid)
      console.log(userId);
      get(child(dbRef, `Doctors/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          var Name = snapshot.val().name
          console.log(Name);
          localStorage.setItem("name" , Name)
        } else { 
          console.log("No data available");
        }
      }).catch((error) => {
        alert(error)
      });
      window.location.href = '/dist/Welcome Page.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }