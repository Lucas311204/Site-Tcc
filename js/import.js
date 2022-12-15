function teste() {
  alert(document.querySelector("#est").value);
}

async function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = user.uid;
      readTasks();
      let userLabel = document.getElementById("h4");
      userLabel.innerHTML = user.email;
    } else {
      swal
        .fire({
          icon: "success",
          title: "Redirecionando para a tela de autenticação",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("login.html");
          }, 1000);
        });
    }
  });
}

async function showEst(userID) {
  userID = document.cookie;
  const logEsts = await db
    .collection("estabelecimento")
    .where("owner", "==", document.cookie)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id);

        var newItem =
          "<option value='" + doc.id + "'>" + requestEst(doc.id) + "</option>";
        $("#est").append(newItem);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  return logEsts;
}

async function sendImage(idEst) {
  console.log($("input[name=file]"));
  const userID = document.cookie;
  var formData = new FormData();
  formData.append(
    "pictures",
    document.querySelector("input[id='fileInput']").files[0]
  );

  $.ajax({
    url: "https://peat-api.onrender.com/estabelecimento/" + idEst + "/imagens",
    type: "POST",
    Authorization: userID,
    data: formData,
    processData: false,
    contentType: false,
    enctype: "multipart/form-data",
    success: function (data) {
      console.log(data);
    },
  });
}

function resetForm() {
  (document.getElementById("nome").value = ""),
    (document.getElementById("descricao").value = ""),
    (document.getElementById("logradouro").value = ""),
    (document.getElementById("estado").value = ""),
    (document.getElementById("cidade").value = ""),
    (document.getElementById("bairro").value = ""),
    (document.getElementById("complemento").value = ""),
    (document.getElementById("latitude").value = ""),
    (document.getElementById("longitude").value = ""),
    (document.getElementById("valor").value = ""),
    (document.getElementById("fileInput").value = ""),
    alert("Estabelecimento Cadastrado!");
}

function resetFormServico() {
  (document.getElementById("servico").value = ""),
    (document.getElementById("preco").value = ""),
    alert("Serviço Cadastrado!");
}

async function postEstabelecimento() {
  const userID = document.cookie;
  const requisicao = await fetch(
    "https://peat-api.onrender.com/estabelecimento",
    {
      method: "POST",
      headers: {
        Authorization: userID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          owner: document.cookie,
          nome: document.querySelector("#nome").value,
          descricao: document.querySelector("#descricao").value,
          estado: document.querySelector("#estado").value,
          cidade: document.querySelector("#cidade").value,
          bairro: document.querySelector("#bairro").value,
          logradouro: document.querySelector("#logradouro").value,
          complemento: document.querySelector("#complemento").value,
          coordenadas: {
            lat: parseFloat(document.querySelector("#latitude").value),
            long: parseFloat(document.querySelector("#longitude").value),
          },
          numero: parseInt(document.querySelector("#valor").value),
        },
      }),
    }
  );
  const resposta = await requisicao.json();

  console.log(resposta.id);

  sendImage(resposta.id);

  resetForm();
  return resposta;
}

function dateTime(time) {
  let unix_timestamp = time;
  let convert = unix_timestamp;

  var date = new Date(convert);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();

  var hours = date.getUTCHours();
  var minutes = "0" + date.getUTCMinutes();

  dateString =
    day +
    "/" +
    month +
    "/" +
    year +
    " &nbsp;" +
    hours +
    ":" +
    minutes.substr(-2) +
    "h";

  console.log(dateString);
  return dateString;
}

async function getReservas() {
  idEst = document.querySelector("#est").value;

  const userID = document.cookie;
  const requisicao = await fetch(
    "https://peat-api.onrender.com/estabelecimento/" + idEst + "/reserva",
    {
      method: "GET",
      headers: {
        Authorization: userID,
        "Content-Type": "application/json",
      },
    }
  );
  const resposta = await requisicao.json();

  console.log(resposta);
  const idCliente = resposta.id_usuario;

  $("#showReserva").empty();

  resposta.forEach(function (reserva, i) {
    console.log("[forEach]", reserva, i);

    var newItem =
      "<tr><th scope='row'>" +
      (i + 1) +
      "</th><td>" +
      reserva.id_usuario +
      "</td><td>" +
      reserva.servicos[0].nome +
      "</td><td>" +
      dateTime(reserva.data_horario) +
      "</td><td><button class='btn btn-success'>Aceitar</button> &nbsp; <button class='btn btn-danger' onClick=" +
      deleteReserva(idEst, reserva.id) +
      ">Excluir</button></td></tr>";

    $("#showReserva").append(newItem);
  });

  return resposta;
}

async function postServico(idEst) {
  idEst = document.querySelector("#est").value;

  const requisicao = await fetch(
    "https://peat-api.onrender.com/estabelecimento/" + idEst + "/servico",
    {
      method: "POST",
      headers: {
        uid: document.cookie,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          nome: document.querySelector("#servico").value,
          preco: parseInt(document.querySelector("#preco").value),
        },
      }),
    }
  );
  const resposta = await requisicao.json();

  if (resposta) {
    resetFormServico();
    alert("Serviço cadastrado");
    return resposta;
  }
}

function requestEst(estabelecimento) {
  const userID = document.cookie;
  var json = $.ajax({
    Authorization: userID,
    url: "https://peat-api.onrender.com/estabelecimento/" + estabelecimento,
    async: false,
    type: "GET",
    success: function (response) {
      return response;
    },
  });

  return json.responseJSON.nome;
}

async function deleteReserva(idEst, idReserva) {
  const userID = document.cookie;
  const requisicao = await fetch(
    "https://peat-api.onrender.com/estabelecimento/" +
      idEst +
      "/reserva/" +
      idReserva,
    {
      method: "delete",
      headers: {
        Authorization: userID,
        "Content-Type": "application/json",
      },
    }
  );
  const resposta = await requisicao.json();
  if (resposta) {
    return resposta;
  }
}

function getUsuario(idUser) {
  const userID = document.cookie;

  var json = $.ajax({
    url: "https://peat-api.onrender.com/usuario/" + idUser,
    async: false,
    type: "GET",
    success: function (response) {
      return response;
    },
  });

  return json;

  /* const requisicao = await fetch(
    "https://peat-api.onrender.com/usuario/" + idUser,
    {
      method: "GET",
      headers: {
        Authorization: userID,
        "Content-Type": "application/json",
      },
    }
  );
  const resposta = await requisicao.json();
  console.log(resposta.nome_completo);
  const nome = resposta.nome_completo;
  return resposta; */
}

function Client() {
  const clientID = document.querySelector("#clientID");
  alert(getUsuario(clientID));
}
