/* 
async function requestReserva(Estabelecimento) {
    const requisicao = await fetch('https://peat-api.onrender.com/api-docs/estabelecimento/'+Estabelecimento)
    const resposta = await requisicao.json()
    const { id_usuario, data_horario } = resposta
    return { id_usuario, data_horario }

} */
function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser.uid = user.uid;
      readTasks();
      let userLabel = document.getElementById("h4");
      userLabel.innerHTML = user.uid;
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

function requestReserva(Estabelecimento, userID) {
  var json = $.ajax({
    url: "https://peat-api.onrender.com/estabelecimento/",
    async: true,
    type: "GET",
    success: function (response) {
      return response;
    },
  });

  return json;
}

function renderPetShop() {
  let itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  for (let nome of nomes) {
    const newItem = document.createElement("li");
    newItem.setAttribute(
      "class",
      "list-group-item d-flex justify-content-between"
    );
    newItem.appendChild(document.createTextNode(nome.title));
    newItem.appendChild(createDelButton(nome));
    itemList.appendChild(newItem);
  }
}

async function readTasks() {
  nome = [];
  const logNome = await db
    .collection("estabelecimento")
    .where("owner", "==", currentUser.uid)
    .get();
  for (doc of logNome.docs) {
    nome.push({
      id: doc.id,
      title: doc.data().title,
    });
  }
  renderPetShop();
}
