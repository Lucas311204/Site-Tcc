var firebaseConfig = {
  apiKey: "AIzaSyDbdngozElYBEYdk98Qei3BlalFR3P1h8I",
  authDomain: "peat-f2f94.firebaseapp.com",
  databaseURL: "https://peat-f2f94-default-rtdb.firebaseio.com",
  projectId: "peat-f2f94",
  storageBucket: "peat-f2f94.appspot.com",
  messagingSenderId: "346964342472",
  appId: "1:346964342472:web:519a149657fd9e95c817fd",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var var_lista = document.getElementById("div_lista")

var dados=""

var db = fireabaseRef = firebase.database().ref().child("reservas");
db.on('child_added', function(snapshot){
  var adicionado = snapshot.val();

  dados = "<table>" + "<tr><td>"+adicionado+"</td></tr>" + dados;

  var_lista.innerHTML = dados;
})