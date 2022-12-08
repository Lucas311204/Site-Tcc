
async function postEstabelecimento(estabelecimento) {
    const { nome, avaliacao_media, descricao, estado, cidade, bairro, logradouro, complemento, numero } = estabelecimento;

    const requisicao = await fetch('https://peat-api.onrender.com/estabelecimento', {
      "method": "POST",
      "headers": {
        'Content-Type': 'application/json'
      },
      "body": JSON.stringify({
        "data": {
          "nome": nome,
          "avaliacao_media": avaliacao_media,
          "descricao": descricao,
          "estado": estado,
          "cidade": cidade,
          "bairro": bairro,
          "logradouro": logradouro,
          "complemento": complemento,
          "coordenadas": {
            "lat": 0,
            "long": 0
          },
          "numero": numero
        }
      })
    });
    const resposta = await requisicao.json();

    return resposta;

}

async function sendImage(estabelecimento_ID, image) {
  const requisicao = await fetch(`https://peat-api.onrender.com/estabelecimento/${estabelecimento_ID}/imagens`, {
    "method": "POST",
    "headers": {
      'Content-Type': 'multipart/form-data'
    },
    "body": image
  });
  const resposta = await requisicao.text();

  return resposta;

}

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

/* function requestReserva(Estabelecimento, userID) {
  var json = $.ajax({
    url: "https://peat-api.onrender.com/estabelecimento/" + user.uid + "",
    async: true,
    type: "GET",
    success: function (response) {
      return response;
    },
  });

  return json;
}
 */
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
