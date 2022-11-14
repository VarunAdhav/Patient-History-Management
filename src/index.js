import { initializeApp } from 'firebase/app';
import { getAuth , createUserWithEmailAndPassword , onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database'

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
const Database = getDatabase(firebaseapp);



/*//auth checking for user
onAuthStateChanged(auth, (user) => {
    if (user != null ) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log('logged in!!')
      // ...
    } else {
      // User is signed out
      // ...
      console.log('no users..')
    }
  });*/

//Register.html getting data
/*function register(){

  document.regform.action = "dist/Register Page.html";

  email = document.getElementById("email").value;
  UserName = document.getElementById("UserName").value;
  Password = document.getElementById("Password").value;
  Address = document.getElementById("Address").value;
  Name = document.getElementById("Name").value;
  ReEnter = document.getElementById("2ndPassword").value;
  Gender = document.getElementById("Gender").value;
  DOB = document.getElementById("DOB").value;
  PracticingYear = document.getElementById("year").value;

  createUserWithEmailAndPassword(email , Password)
  .then((result) => {
    var Doctor = auth.currentUser;

    var database_ref = ref(Database);

    //Database for containing Doctors Info...
    var Doctor_Info = {
      email : email,
      Name : Name,
      UserName : UserName , 
      DOB : DOB,
      Year_of_started_practicing : PracticingYear ,
      Gender  : Gender , 
      Clinic_Address : Address
    }

    //DataPush to FireBase Database...
    database_ref.child('Doctors/'+Doctor.uid).set(Doctor_Info);  

    alert("User Created Successfully!!");
  }).catch((err) => {
    alert("error ");
  });

}*/


//Onclick Register of Register.html page
/*document.getElementById("RegBtn").addEventListener("click" , Register);
function Register(){
  
  
  
}*/





//for dropdown of year
/*let dateDropdown = document.getElementById('year'); 
            
let currentYear = new Date().getFullYear();    
let earliestYear = 1970;     
while (currentYear >= earliestYear) {      
    let dateOption = document.createElement('option');          
    dateOption.text = currentYear;      
    dateOption.value = currentYear;        
    dateDropdown.add(dateOption);      
    currentYear -= 1;    
}*/