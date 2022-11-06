import { initializeApp } from 'firebase/app';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth';
//import { getDatabase, ref , set} from 'firebase/database';

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


document.getElementById('SignBtn').addEventListener('click' , signIn );
function signIn(){
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
}