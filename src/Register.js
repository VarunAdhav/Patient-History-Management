import { initializeApp  } from 'firebase/app';
import { getAuth , createUserWithEmailAndPassword , uid } from 'firebase/auth';
import { getDatabase, ref , set} from 'firebase/database';

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


if(document.getElementById('RegBtn') != null){
    document.getElementById('RegBtn').addEventListener('click' , Register );
}
function Register(){

    const Email = document.getElementById("email").value;
    const Password = document.getElementById("Password").value;
    const Address = document.getElementById("Address").value;
    const Name = document.getElementById("Name").value;
    const ReEnter = document.getElementById("2ndPassword").value;

    //Calculating Experiance
   /* const Y = new Date();
    const Experiance = Y.getFullYear() - PracticingYear;*/

    if(validateEmail(Email)== false){
        alert("Mail ID is not valid... Check it again");
        return;
    }
    if( validateFeild(Name , Address) == false){
        alert("Name , User Name , Address... \n One of the feild is not valid Check it again...");
        return;
    }
    if( validatePassword(Password) == false ){
        alert( "Password criteria isn't fulfilled ... try to have a different password" );
        return;
    }
    if(PasswordMatch(Password , ReEnter) == false){
        alert( "The passwords does't match.... Try re-entering the Password feilds" );
        return;
    }

    createUserWithEmailAndPassword(auth , Email , Password);
        var Doctor = auth.currentUser;
        const userId = Doctor.uid;

    set(ref(Database, 'Doctors/' + userId), {
        email: Email,
        address: Address,
        name: Name,
    });

    alert("User Created Successfully!!");
    console.log('Check firebase Console!!!!');
}

function validateEmail(Email){
const exp = /^[^@]+@\w+(\.\w+)+\w$/;
if(exp.test(Email) == true){
    return true;
}else{
    return false;
}
}
function validatePassword(Password){

if(Password == Name || Password.length < 6 ){
    return false;
}else{
    return true;
}
}
function PasswordMatch(Password , ReEnter){
if(Password != ReEnter){
    return false;
}else{
    return true;
}
} 

function validateFeild(Name , Address){
if(Name == null || Address == null ){
    return false;
}else{
    return true;
}
}

