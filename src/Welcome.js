if(document.getElementById('drname') != null){
    document.getElementById('drname').innerHTML = "Doctor "
}

import { initializeApp } from 'firebase/app';
import { getDatabase, ref , set , get , child } from 'firebase/database';


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
const Database = getDatabase(firebaseapp);

if(document.getElementById('New Patient') || document.getElementById('Search Patient') || document.getElementById('ShowEntry') ||
document.getElementById('AddNewEntry') != null){
    document.getElementById('New Patient').addEventListener('click' , AddPatient)
    document.getElementById('Search Patient').addEventListener('click' , SearchPatient)
    
}

let userId = localStorage.getItem("uid")
console.log(userId);
//                                                                      ADD PATIENT
function AddPatient(){
    let Name = document.getElementById('pName').value
    let PhoneNumber = document.getElementById('pPhno').value
    let Age = document.getElementById('pAge').value
    let Gender = document.getElementById('pGender').value
    let FirstHistory = document.getElementById('pfHistory').value

    Name = Name.toLowerCase()
    //console.log(Name);

    if(validatepatient( PhoneNumber , Name , userId) == false){
        console.log('False');
        return;
        console.log('hi');
    }

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate);

    set(ref(Database, 'Doctors/' + userId + '/Patients/' + PhoneNumber+Name), {
        Patient_Name: Name,
        Patient_Phone_Number: PhoneNumber,
        Patient_Age : Age,
        Patient_Gender : Gender
    });
    set(ref(Database, 'Doctors/' + userId + '/Patients/' + PhoneNumber+Name + '/History'), {
        [currentDate] : FirstHistory
    });

}

function validatepatient( phno , name ,userId ){

    if(phno.length < 10){
        alert('Please enter a Valid Phone Number')
        return false;
    }

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Doctors/${userId}/Patients/${phno+name}`)).then((snapshot) => {
        if (snapshot.exists()) {
          /*var Name = snapshot.val().name
          console.log(Name);
          localStorage.setItem("name" , Name);*/
          alert('Already a patient with exact details exist!!! Please Serach for the Patient')
          return false;
        } else { 
          console.log("No data available");
          return true;
        }
      }).catch((error) => {
        alert(error)
      });
}

//                                                      Search Patient
function SearchPatient(){
    let Name = document.getElementById('Name').value
    let PhoneNumber = document.getElementById('Phno').value

    if(PhoneNumber.length < 10){
        alert('Please enter a Valid Phone Number')
        return false;
    }

    Name = Name.toLowerCase()
    let NewEntry = document.getElementById("NewEntryForm")
    let HistoryTag = document.getElementById("History")

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Doctors/${userId}/Patients/${PhoneNumber+Name}`)).then((snapshot) => {
        if (snapshot.exists()) {
          var history = snapshot.val().History;
          history = Object.keys(history) + " : " + Object.values(history)
          console.log(typeof(history));
          //alert('Patient Found')
          
        NewEntry.style.display = 'block'
        HistoryTag.style.display = 'block'
        HistoryTag.innerHTML = history
        document.getElementById('AddNewEntry').addEventListener('click' , AddNewEntry)
          
        } else { 
          HistoryTag.style.display = 'block'
          HistoryTag.innerHTML = 'No Patient is found with such Credentials'  
          //alert("No Patient is found with such Credentials")
          console.log("No data available");
          return
        }
      }).catch((error) => {
        alert(error)
      });
}

//                                                          ADD ENTRY
function AddNewEntry(){
    let NewEntry = document.getElementById('NewHistory').val

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    set(ref(Database, 'Doctors/' + userId + '/Patients/' + PhoneNumber+Name + '/History'), {
        [currentDate] : NewEntry
    });
}