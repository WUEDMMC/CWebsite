import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBG2N6PAB0k3eGOsCTWNppD6QTwBBIE8VY",
    authDomain: "website-e025a.firebaseapp.com",
    databaseURL: "https://website-e025a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "website-e025a",
    storageBucket: "website-e025a.appspot.com",
    messagingSenderId: "960292179884",
    appId: "1:960292179884:web:8b85e06ee35ea205077409"
  };

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const messagesRef = ref(database, "website");

document.getElementById('contactForm').addEventListener('submit', submitForm);

document.addEventListener("DOMContentLoaded", function(){
  if (localStorage.getItem("answered") == "true"){
    let temp = localStorage.getItem("choice").toString();
    afterSend(temp);
  }
})

function submitForm(e) {
  e.preventDefault();

  let fname = getInputVal('fname');
  let lname = getInputVal('lname');
  let bDate = getInputVal('gebDate');

  console.log(bDate, typeof(bDate));

  if (bDate != "2010-04-21"){
    alertBox("Are you sure you're her?🤨", "Hmmmmmm");
    return
  }

  let choice;

  document.querySelectorAll(".checkBox").forEach(element => {
    if(element.checked){
       choice = element.value;     
    }
  });
 

  console.log(choice);

  if (!choice){
    alert("Du musst eine Auswahl treffen");
    return;
  }

  saveMessage(fname, lname, choice, gebDate);
  afterSend(choice);
  document.getElementById('contactForm').reset();
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveMessage(fname, lname, choice, gebDate) {
  const newMessageRef = push(messagesRef);
  set(newMessageRef, {
    vorname: fname,
    nachname: lname,
    CHOICE: choice,
    gebDate: gebDate
  });
}


function alertBox(alert, alertTitle){
  listenButtonClick();
  document.getElementById("header").innerHTML = alertTitle;
  document.getElementById("alertText").innerHTML = alert;
  document.getElementById("alertWrapper").style.display = "flex";
}

function closeAlertBox(){
  document.getElementById("alertWrapper").style.display = "none";
  document.getElementById("contactForm").reset();
}

function listenButtonClick(){
  document.getElementById("close").addEventListener("click", function(){
    closeAlertBox();
  });
}

document.getElementById("img").addEventListener("click", function(){
  document.getElementById("imgWrapper").style.display = "flex";
  document.querySelector("video").play();
  listenImgClose();
})

function listenImgClose(){
  document.getElementById("imgWrapper").addEventListener("click", function(){
    closeImg();
  })
}

function closeImg(){
  document.querySelector("video").pause()
  document.getElementById("imgWrapper").style.display = "none";
}

function afterSend(choice){
    if (choice == "Nein"){
      document.querySelector("#afterSendImg img").src = "/img/florkSad.png";
    }else if(choice == "Ja"){
      document.querySelector("#afterSendImg img").src = "/img/png-flork.png";
    }else{
      document.querySelector("#afterSendImg img").src = "/img/flork-png-37.png";
    }

    document.getElementById("afterSend").style.display = "flex";

    localStorage.setItem("answered", "true");
    localStorage.setItem("choice", choice);
}
