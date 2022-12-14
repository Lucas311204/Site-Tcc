function fazGet(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function criaLinha(usuario) {}

function main() {
  console.log(
    fazGet(
      "https://peat-api.onrender.com/estabelecimento/MCLOiq2lhnAXpENBZz4k/reserva/{id}"
    )
  );
}
