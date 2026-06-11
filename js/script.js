const btnFonte = document.getElementById("btnFonte");
const btnTopo = document.getElementById("btnTopo");

const umidade = document.getElementById("umidade");
const temperatura = document.getElementById("temperatura");
const folhas = document.getElementById("folhas");
const preservacao = document.getElementById("preservacao");

const valorUmidade = document.getElementById("valorUmidade");
const valorTemperatura = document.getElementById("valorTemperatura");
const valorFolhas = document.getElementById("valorFolhas");
const valorPreservacao = document.getElementById("valorPreservacao");

const painelUmidade = document.getElementById("painelUmidade");
const painelTemperatura = document.getElementById("painelTemperatura");
const painelFolhas = document.getElementById("painelFolhas");
const painelPreservacao = document.getElementById("painelPreservacao");

const risco = document.getElementById("risco");
const barraRisco = document.getElementById("barraRisco");
const tituloResultado = document.getElementById("tituloResultado");
const textoResultado = document.getElementById("textoResultado");
const listaRecomendacoes = document.getElementById("listaRecomendacoes");

const resetar = document.getElementById("resetar");
const salvarAnalise = document.getElementById("salvarAnalise");
const historicoLista = document.getElementById("historicoLista");
const historicoVazio = document.getElementById("historicoVazio");

const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const feedbackQuiz = document.getElementById("feedbackQuiz");
const quizProgresso = document.getElementById("quizProgresso");
const quizPontos = document.getElementById("quizPontos");
const proximaPergunta = document.getElementById("proximaPergunta");
const reiniciarQuiz = document.getElementById("reiniciarQuiz");

const nomeEquipe = document.getElementById("nomeEquipe");
const acaoSustentavel = document.getElementById("acaoSustentavel");
const gerarRelatorio = document.getElementById("gerarRelatorio");
const textoRelatorio = document.getElementById("textoRelatorio");

let contadorAnalises = 0;
let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

const perguntasQuiz = [
  {
    pergunta: "Qual atitude ajuda a proteger o solo da erosão?",
    opcoes: [
      "Retirar toda a vegetação do terreno",
      "Usar cobertura vegetal e rotação de culturas",
      "Irrigar sem controle todos os dias",
      "Aplicar defensivo sem monitoramento"
    ],
    correta: 1
  },
  {
    pergunta: "Por que o monitoramento da lavoura é importante?",
    opcoes: [
      "Porque evita qualquer tipo de trabalho no campo",
      "Porque ajuda a identificar problemas antes que se espalhem",
      "Porque elimina totalmente a necessidade de água",
      "Porque aumenta o desperdício de recursos"
    ],
    correta: 1
  },
  {
    pergunta: "O uso consciente da água na agricultura ajuda a:",
    opcoes: [
      "Preservar recursos naturais e reduzir desperdícios",
      "Secar nascentes e rios",
      "Aumentar a erosão",
      "Diminuir a produtividade sempre"
    ],
    correta: 0
  },
  {
    pergunta: "O que significa produção sustentável?",
    opcoes: [
      "Produzir sem pensar no futuro",
      "Produzir mais destruindo o ambiente",
      "Equilibrar produtividade e preservação ambiental",
      "Usar recursos naturais sem controle"
    ],
    correta: 2
  },
  {
    pergunta: "Como a tecnologia pode ajudar o produtor rural?",
    opcoes: [
      "Gerando dados para melhorar decisões no campo",
      "Substituindo totalmente a natureza",
      "Impedindo qualquer plantio",
      "Aumentando o desperdício de água"
    ],
    correta: 0
  }
];

function limitar(valor, minimo, maximo) {
  return Math.max(minimo, Math.min(maximo, valor));
}

function calcularRisco() {
  const u = Number(umidade.value);
  const t = Number(temperatura.value);
  const f = Number(folhas.value);
  const p = Number(preservacao.value);

  let riscoUmidade = 0;

  if (u < 45) {
    riscoUmidade = (45 - u) * 1.35;
  } else if (u > 85) {
    riscoUmidade = (u - 85) * 1.1;
  }

  let riscoTemperatura = 0;

  if (t > 30) {
    riscoTemperatura = (t - 30) * 4;
  } else if (t < 15) {
    riscoTemperatura = (15 - t) * 2;
  }

  const riscoFolhas = f * 0.55;
  const riscoPreservacao = (100 - p) * 0.25;

  const total = Math.round(
    limitar(riscoUmidade + riscoTemperatura + riscoFolhas + riscoPreservacao, 0, 100)
  );

  return total;
}

function obterNivel(valor) {
  if (valor >= 70) {
    return {
      titulo: "Risco alto",
      classe: "selo-alto",
      cor: "#b42318",
      texto: "A lavoura apresenta sinais de alerta. É recomendado monitorar com urgência, verificar folhas, umidade e adotar ações de proteção ambiental."
    };
  }

  if (valor >= 40) {
    return {
      titulo: "Risco moderado",
      classe: "selo-moderado",
      cor: "#e8782e",
      texto: "A lavoura exige atenção. Continue acompanhando os dados e aplique medidas preventivas para evitar perdas."
    };
  }

  return {
    titulo: "Risco baixo",
    classe: "selo-baixo",
    cor: "#246b38",
    texto: "A lavoura está em condição favorável. Mantenha o monitoramento e as boas práticas sustentáveis."
  };
}

function criarRecomendacoes() {
  const u = Number(umidade.value);
  const t = Number(temperatura.value);
  const f = Number(folhas.value);
  const p = Number(preservacao.value);

  const recomendacoes = [];

  if (u < 45) {
    recomendacoes.push("Aumentar o cuidado com a irrigação e evitar desperdício de água.");
  }

  if (u > 85) {
    recomendacoes.push("Verificar excesso de umidade para evitar doenças e encharcamento.");
  }

  if (t > 30) {
    recomendacoes.push("Monitorar o estresse térmico das plantas nos horários mais quentes.");
  }

  if (f > 45) {
    recomendacoes.push("Observar manchas, folhas amareladas ou sinais de pragas antes de aplicar defensivos.");
  }

  if (p < 55) {
    recomendacoes.push("Preservar áreas verdes, nascentes e melhorar a proteção do solo.");
  }

  if (recomendacoes.length === 0) {
    recomendacoes.push("Continuar o monitoramento e manter as práticas sustentáveis já adotadas.");
  }

  return recomendacoes;
}

function atualizarSimulador() {
  const u = Number(umidade.value);
  const t = Number(temperatura.value);
  const f = Number(folhas.value);
  const p = Number(preservacao.value);

  valorUmidade.textContent = u + "%";
  valorTemperatura.textContent = t + "°C";
  valorFolhas.textContent = f + "%";
  valorPreservacao.textContent = p + "%";

  painelUmidade.textContent = u + "%";
  painelTemperatura.textContent = t + "°C";
  painelFolhas.textContent = f + "%";
  painelPreservacao.textContent = p + "%";

  const riscoCalculado = calcularRisco();
  const nivel = obterNivel(riscoCalculado);

  risco.textContent = riscoCalculado;
  barraRisco.style.width = riscoCalculado + "%";
  barraRisco.style.background = nivel.cor;
  tituloResultado.textContent = nivel.titulo;
  textoResultado.textContent = nivel.texto;

  const recomendacoes = criarRecomendacoes();

  listaRecomendacoes.innerHTML = "";

  recomendacoes.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    listaRecomendacoes.appendChild(li);
  });
}

function reiniciarAnalise() {
  umidade.value = 50;
  temperatura.value = 25;
  folhas.value = 30;
  preservacao.value = 60;
  atualizarSimulador();
}

function salvarHistoricoAnalise() {
  const riscoAtual = Number(risco.textContent);
  const nivel = obterNivel(riscoAtual);

  contadorAnalises++;

  if (historicoVazio) {
    historicoVazio.style.display = "none";
  }

  const item = document.createElement("li");

  item.innerHTML =
    "<strong>Análise " + contadorAnalises + "</strong><br>" +
    "Risco calculado: " + riscoAtual + "%<br>" +
    "Umidade: " + umidade.value + "% | " +
    "Temperatura: " + temperatura.value + "°C | " +
    "Folhas: " + folhas.value + "% | " +
    "Preservação: " + preservacao.value + "%<br>" +
    "<span class='selo-risco " + nivel.classe + "'>" + nivel.titulo + "</span>";

  historicoLista.prepend(item);

  const totalItens = historicoLista.querySelectorAll("li");

  if (totalItens.length > 5) {
    historicoLista.removeChild(totalItens[totalItens.length - 1]);
  }
}

function carregarPergunta() {
  respondeu = false;
  feedbackQuiz.textContent = "";
  opcoes.innerHTML = "";

  const item = perguntasQuiz[perguntaAtual];

  quizProgresso.textContent = "Pergunta " + (perguntaAtual + 1) + " de " + perguntasQuiz.length;
  quizPontos.textContent = pontos;
  pergunta.textContent = item.pergunta;

  item.opcoes.forEach(function (texto, indice) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;

    botao.addEventListener("click", function () {
      responderQuiz(indice, botao);
    });

    opcoes.appendChild(botao);
  });
}

function responderQuiz(indice, botaoClicado) {
  if (respondeu) {
    return;
  }

  respondeu = true;

  const item = perguntasQuiz[perguntaAtual];
  const botoes = opcoes.querySelectorAll("button");

  botoes.forEach(function (botao, i) {
    botao.disabled = true;

    if (i === item.correta) {
      botao.classList.add("correta");
    }
  });

  if (indice === item.correta) {
    pontos++;
    quizPontos.textContent = pontos;
    feedbackQuiz.textContent = "Resposta correta! Muito bem.";
    feedbackQuiz.style.color = "#246b38";
  } else {
    botaoClicado.classList.add("errada");
    feedbackQuiz.textContent = "Resposta incorreta. Observe a alternativa destacada.";
    feedbackQuiz.style.color = "#b42318";
  }
}

function proxima() {
  if (perguntaAtual < perguntasQuiz.length - 1) {
    perguntaAtual++;
    carregarPergunta();
  } else {
    pergunta.textContent = "Quiz finalizado!";
    opcoes.innerHTML = "";
    feedbackQuiz.style.color = "#1f7a3a";
    feedbackQuiz.textContent =
      "Você fez " + pontos + " ponto(s) de " + perguntasQuiz.length + ".";
  }
}

function reiniciarQuizFuncao() {
  perguntaAtual = 0;
  pontos = 0;
  carregarPergunta();
}

function gerarTextoRelatorio() {
  const nome = nomeEquipe.value.trim();
  const acao = acaoSustentavel.value;

  if (nome === "" || acao === "") {
    textoRelatorio.textContent =
      "Preencha o nome da equipe e escolha uma ação sustentável para gerar o relatório.";
    return;
  }

  textoRelatorio.textContent =
    "Nós, da equipe " + nome + ", assumimos o compromisso de " + acao +
    ". O projeto AgroGuardião 360 mostra que a tecnologia pode ajudar o campo a produzir com responsabilidade, " +
    "protegendo a água, o solo e o futuro das próximas gerações.";
}

btnFonte.addEventListener("click", function () {
  document.body.classList.toggle("fonte-grande");
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 350) {
    btnTopo.classList.add("aparecer");
  } else {
    btnTopo.classList.remove("aparecer");
  }
});

btnTopo.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

[umidade, temperatura, folhas, preservacao].forEach(function (controle) {
  controle.addEventListener("input", atualizarSimulador);
});

resetar.addEventListener("click", reiniciarAnalise);
salvarAnalise.addEventListener("click", salvarHistoricoAnalise);
proximaPergunta.addEventListener("click", proxima);
reiniciarQuiz.addEventListener("click", reiniciarQuizFuncao);
gerarRelatorio.addEventListener("click", gerarTextoRelatorio);

atualizarSimulador();
carregarPergunta();
