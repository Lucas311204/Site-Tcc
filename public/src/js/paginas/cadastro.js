import { estabelecimento } from '../servicos/service.js'

const form = document.querySelector("#form__cadastro");

form.addEventListener('submit', (event) => {

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
    }
    console.log(novoLugar)
    estabelecimento.add(novoLugar).then((docRef) => {
        form.reset();
        alert(`Cadastro do lugar seu estabelecimento ocorreu com sucesso!`)
    })
        .catch((error) => {
            alert(`Cadastro do lugar não pode ser concluido`)
            console.error("Error adding document: ", error);
        });
})