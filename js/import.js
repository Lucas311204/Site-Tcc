const db = firebase.firestore();

function teste() {
  alert(document.querySelector("#valor").value);
}

async function sendImage(estabelecimento_ID, image) {
  const imagem = document.querySelector("#imagem").value;
  const requisicao = await fetch(
    `https://peat-api.onrender.com/estabelecimento/zOUtQC8p3oXQlE5q9uq0/imagens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: image,
    }
  );
  const resposta = await requisicao.text();

  return resposta;
}

async function postEstabelecimento() {
  const requisicao = await fetch(
    "https://peat-api.onrender.com/estabelecimento",
    {
      method: "POST",
      headers: {
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
  console.log(resposta);
  return resposta;
  Object.Keys(firebase.auth().currentUser.uid)[0];
  localStorage.setItem("docID", "id da doc");
}
/* Código Sem Api pra cadastro */

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

const service = document.querySelector("#form__servico");
if (!!service) {
  service.addEventListener("submit", (event) => {
    showEst(document.cookie);
  });
}
const form = document.querySelector("#form__cadastro");
if (!!form) {
  form.addEventListener("submit", (event) => {
    getUser();
    event.preventDefault();

    let novoLugar = {
      nome: form.nome.value,
      cidade: form.cidade.value,
      estado: form.estado.value,
      logradouro: form.logradouro.value,
      bairro: form.bairro.value,
      descricao: form.descricao.value,
      complemento: form.complemento.value,
      coordenadas: {
        lat: parseFloat(document.querySelector("#latitude").value),
        long: parseFloat(document.querySelector("#longitude").value),
      },
      valor: form.valor.value,
      owner: document.cookie,
    };
    console.log(novoLugar);

    estabelecimento
      .add(novoLugar)

      .then((docRef) => {
        Object.Keys(firebase.auth().currentUser.uid)[0]; //gerador de id
        form.reset();
        alert(`Cadastro do lugar seu estabelecimento ocorreu com sucesso!`);
      })
      .catch((error) => {
        alert(`Cadastro do lugar não pode ser concluido`);
        console.error("Error adding document: ", error);
      });
  });
}
/* Fim código sem api de cadastro */

async function getReserva() {
  var json = $.ajax({
    url: "https://peat-api.onrender.com/estabelecimento/MCLOiq2lhnAXpENBZz4k/reserva",
    async: true,
    type: "GET",
    success: function (response) {
      return response;
    },
  });

  return json;

  /* const logEsts = await db
    .collection("estabelecimento")
    .where("owner", "==", document.cookie)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        //MCLOiq2lhnAXpENBZz4k
        //pTXd6JIdMbSYhHaq9fQ

        console.log(json.responseJSON);

        /* var newItem = "a";
        $("#est").append(newItem);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    }); */
}

getReserva();

async function postServico() {
  idEst = document.querySelector("#est").value;

  const requisicao = await fetch(
    "https://peat-api.onrender.com/estabelecimento/" + idEst + "/servico",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          nome: document.querySelector("#servico").value,
          preco: document.querySelector("#preco").value,
        },
      }),
    }
  );
  const resposta = await requisicao.json();
  if (resposta) {
    return resposta;
  }
}

async function sendImage(estabelecimento_ID, image) {
  const requisicao = await fetch(
    `https://peat-api.onrender.com/estabelecimento/${estabelecimento_ID}/imagens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: image,
    }
  );
  const resposta = await requisicao.text();

  return resposta;
}

function requestEst(estabelecimento) {
  var json = $.ajax({
    url: "https://peat-api.onrender.com/estabelecimento/" + estabelecimento,
    async: false,
    type: "GET",
    success: function (response) {
      return response;
    },
  });

  return json.responseJSON.nome;
}

async function showEst(userID) {
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

/* const db = firebase.firestore();
let currentUser = {};
let profile = false;

function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser.uid = user.uid;
      getUserInfo(user.uid);
      let userLabel = document.getElementById("navbarDropdown");
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

async function getUserInfo(uid) {
  const logUsers = await db.collection("profile").where("uid", "==", uid).get();
  let userInfo = document.getElementById("userInfo");
  if (logUsers.docs.length == 0) {
    userInfo.innerHTML = "Estabelecimento não registrado";
  } else {
    userInfo.innerHTML = "Estabelecimento registrado";
    profile = true;
    const userData = logUsers.docs[0];
    currentUser.id = userData.id;
    currentUser.firstName = userData.data().firstName;
    currentUser.lastName = userData.data().lastName;
    document.getElementById("inputFirstName").value = currentUser.firstName;
    document.getElementById("inputLastName").value = currentUser.lastName;
  }
}

async function saveProfile() {
  const firstName = document.getElementById("inputFirstName").value;
  const lastName = document.getElementById("inputLastName").value;
  if (!profile) {
    await db.collection("profile").add({
      uid: currentUser.uid,
      firstName: firstName,
      lastName: lastName,
    });
    getUserInfo(currentUser.uid);
  } else {
    await db.collection("profile").doc(currentUser.id).update({
      firstName: firstName,
      lastName: lastName,
    });
  }
}
 */
