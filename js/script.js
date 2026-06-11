const salvarAnalise = document.getElementById("salvarAnalise");
const historicoLista = document.getElementById("historicoLista");
const historicoVazio = document.getElementById("historicoVazio");

let contadorAnalises = 0;

function definirClasseRisco(valor) {
  if (valor >= 70) {
    return "selo-alto";
  }

  if (valor >= 40) {
    return "selo-moderado";
  }

  return "selo-baixo";
}

function salvarHistoricoAnalise() {
  const riscoAtual = Number(risco.textContent);
  const tituloAtual = tituloResultado.textContent;
  const umidadeAtual = umidade.value;
  const temperaturaAtual = temperatura.value;
  const folhasAtual = folhas.value;
  const preservacaoAtual = preservacao.value;

  contadorAnalises++;

  if (historicoVazio) {
    historicoVazio.style.display = "none";
  }

  const item = document.createElement("li");

  item.innerHTML =
    "<strong>Análise " + contadorAnalises + "</strong><br>" +
    "Risco calculado: " + riscoAtual + "%<br>" +
    "Umidade: " + umidadeAtual + "% | " +
    "Temperatura: " + temperaturaAtual + "°C | " +
    "Folhas: " + folhasAtual + "% | " +
    "Preservação: " + preservacaoAtual + "%<br>" +
    "<span class='selo-risco " + definirClasseRisco(riscoAtual) + "'>" +
    tituloAtual +
    "</span>";

  historicoLista.prepend(item);

  const totalItens = historicoLista.querySelectorAll("li");

  if (totalItens.length > 5) {
    historicoLista.removeChild(totalItens[totalItens.length - 1]);
  }
}

if (salvarAnalise) {
  salvarAnalise.addEventListener("click", salvarHistoricoAnalise);
}
