import { estabelecimento } from "../servicos/service.js";

function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser.uid = user.uid;
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

const form = document.querySelector("#form__cadastro");

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
    valor: form.valor.value,
    coordenadas: form.coordenadas.value,
    owner: currentUser.uid,
  };
  console.log(novoLugar);
  estabelecimento
    .add(novoLugar)

    .then((docRef) => {
      form.reset();
      alert(`Cadastro do lugar seu estabelecimento ocorreu com sucesso!`);
    })
    .catch((error) => {
      alert(`Cadastro do lugar não pode ser concluido`);
      console.error("Error adding document: ", error);
    });
});
