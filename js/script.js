const botaoTema = document.getElementById("botaoTema");
const botaoFonte = document.getElementById("botaoFonte");
const voltarTopo = document.getElementById("voltarTopo");

const umidade = document.getElementById("umidade");
const temperatura = document.getElementById("temperatura");
const folhas = document.getElementById("folhas");
const preservacao = document.getElementById("preservacao");

const valorUmidade = document.getElementById("valorUmidade");
const valorTemperatura = document.getElementById("valorTemperatura");
const valorFolhas = document.getElementById("valorFolhas");
const valorPreservacao = document.getElementById("valorPreservacao");

const risco = document.getElementById("risco");
const barraRisco = document.getElementById("barraRisco");
const tituloResultado = document.getElementById("tituloResultado");
const textoResultado = document.getElementById("textoResultado");
const botaoResetar = document.getElementById("botaoResetar");

const cardUmidade = document.getElementById("cardUmidade");
const cardTemperatura = document.getElementById("cardTemperatura");
const cardFolhas = document.getElementById("cardFolhas");
const cardPreservacao = document.getElementById("cardPreservacao");
const listaRecomendacoes = document.getElementById("listaRecomendacoes");

const progressoQuiz = document.getElementById("progressoQuiz");
const pontosQuiz = document.getElementById("pontosQuiz");
const perguntaQuiz = document.getElementById("perguntaQuiz");
const opcoesQuiz = document.getElementById("opcoesQuiz");
const feedbackQuiz = document.getElementById("feedbackQuiz");
const proximaPergunta = document.getElementById("proximaPergunta");
const reiniciarQuiz = document.getElementById("reiniciarQuiz");

const formRelatorio = document.getElementById("formRelatorio");
const nomeEquipe = document.getElementById("nomeEquipe");
const acao = document.getElementById("acao");
const relatorioGerado = document.getElementById("relatorioGerado");

botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("tema-escuro");

  if (document.body.classList.contains("tema-escuro")) {
    botaoTema.textContent = "☀️";
  } else {
    botaoTema.textContent = "🌙";
  }
});

botaoFonte.addEventListener("click", function () {
  document.body.classList.toggle("fonte-grande");

  if (document.body.classList.contains("fonte-grande")) {
    botaoFonte.textContent = "A-";
  } else {
    botaoFonte.textContent = "A+";
  }
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    voltarTopo.classList.add("aparecer");
  } else {
    voltarTopo.classList.remove("aparecer");
  }
});

voltarTopo.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

function atualizarSimulador() {
  const u = Number(umidade.value);
  const t = Number(temperatura.value);
  const f = Number(folhas.value);
  const p = Number(preservacao.value);

  valorUmidade.textContent = u;
  valorTemperatura.textContent = t;
  valorFolhas.textContent = f;
  valorPreservacao.textContent = p;

  cardUmidade.textContent = u + "%";
  cardTemperatura.textContent = t + "°C";
  cardFolhas.textContent = f + "%";
  cardPreservacao.textContent = p + "%";

  const calor = Math.max(0, t - 25) * 2;
  const faltaAgua = Math.max(0, 45 - u) * 0.8;
  const excessoAgua = Math.max(0, u - 75) * 0.5;
  const protecao = p * 0.35;

  let calculoRisco = Math.round(f * 0.55 + calor + faltaAgua + excessoAgua - protecao);

  if (calculoRisco < 0) {
    calculoRisco = 0;
  }

  if (calculoRisco > 100) {
    calculoRisco = 100;
  }

  risco.textContent = calculoRisco;
  barraRisco.style.width = calculoRisco + "%";

  if (calculoRisco >= 70) {
    barraRisco.style.background = "#b42318";
    tituloResultado.textContent = "Risco alto";
    textoResultado.textContent =
      "A lavoura precisa de atenção. Monitore as folhas, proteja o solo e aja com precisão.";
  } else if (calculoRisco >= 40) {
    barraRisco.style.background = "#e8782e";
    tituloResultado.textContent = "Risco moderado";
    textoResultado.textContent =
      "Existem sinais de alerta. Continue monitorando e reforce práticas preventivas.";
  } else {
    barraRisco.style.background = "#246b38";
    tituloResultado.textContent = "Risco baixo";
    textoResultado.textContent =
      "A área está em bom equilíbrio. Manter o solo protegido ajuda a conservar esse resultado.";
  }

  atualizarRecomendacoes(u, t, f, p, calculoRisco);
}

function atualizarRecomendacoes(u, t, f, p, calculoRisco) {
  const recomendacoes = [];

  if (calculoRisco >= 70) {
    recomendacoes.push("Fazer inspeção detalhada nas folhas e registrar os pontos críticos.");
  }

  if (u < 45) {
    recomendacoes.push("Usar irrigação planejada e cobertura vegetal para preservar a umidade.");
  }

  if (u > 75) {
    recomendacoes.push("Verificar drenagem para evitar excesso de umidade e doenças.");
  }

  if (t > 32) {
    recomendacoes.push("Evitar manejo em horários de maior estresse térmico.");
  }

  if (f > 55) {
    recomendacoes.push("Acompanhar sinais nas folhas antes de aplicar qualquer produto.");
  }

  if (p < 50) {
    recomendacoes.push("Aumentar preservação com áreas verdes e proteção de nascentes.");
  }

  if (recomendacoes.length === 0) {
    recomendacoes.push("Manter o monitoramento preventivo e continuar as boas práticas sustentáveis.");
  }

  listaRecomendacoes.innerHTML = "";

  recomendacoes.forEach(function (texto) {
    const item = document.createElement("li");
    item.textContent = texto;
    listaRecomendacoes.appendChild(item);
  });
}

umidade.addEventListener("input", atualizarSimulador);
temperatura.addEventListener("input", atualizarSimulador);
folhas.addEventListener("input", atualizarSimulador);
preservacao.addEventListener("input", atualizarSimulador);

botaoResetar.addEventListener("click", function () {
  umidade.value = 50;
  temperatura.value = 25;
  folhas.value = 30;
  preservacao.value = 60;
  atualizarSimulador();
});

const perguntas = [
  {
    pergunta: "Qual é a ideia central de um agro sustentável?",
    opcoes: [
      "Produzir sem pensar no futuro",
      "Equilibrar produção e preservação ambiental",
      "Usar mais água sem controle",
      "Desmatar para aumentar qualquer área"
    ],
    correta: 1
  },
  {
    pergunta: "Qual prática ajuda a proteger o solo?",
    opcoes: [
      "Cobertura vegetal",
      "Queima de resíduos",
      "Erosão sem controle",
      "Retirada de toda vegetação"
    ],
    correta: 0
  },
  {
    pergunta: "Como sensores ajudam o campo?",
    opcoes: [
      "Ignorando dados",
      "Medindo condições como umidade e temperatura",
      "Aumentando desperdícios",
      "Eliminando todo planejamento"
    ],
    correta: 1
  },
  {
    pergunta: "Qual ação ajuda a preservar água?",
    opcoes: [
      "Vazamentos constantes",
      "Proteção de nascentes e irrigação eficiente",
      "Remoção de matas ciliares",
      "Uso sem planejamento"
    ],
    correta: 1
  },
  {
    pergunta: "Por que monitorar sinais nas folhas?",
    opcoes: [
      "Para identificar problemas no início",
      "Para ignorar a lavoura",
      "Para aumentar perdas",
      "Para evitar qualquer análise"
    ],
    correta: 0
  }
];

let indicePergunta = 0;
let pontuacao = 0;
let respondeu = false;

function carregarPergunta() {
  respondeu = false;
  feedbackQuiz.textContent = "";
  proximaPergunta.disabled = true;

  const atual = perguntas[indicePergunta];

  progressoQuiz.textContent = "Pergunta " + (indicePergunta + 1) + " de " + perguntas.length;
  perguntaQuiz.textContent = atual.pergunta;
  opcoesQuiz.innerHTML = "";

  atual.opcoes.forEach(function (opcao, indice) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "opcao";
    botao.textContent = opcao;

    botao.addEventListener("click", function () {
      verificarResposta(indice, botao);
    });

    opcoesQuiz.appendChild(botao);
  });
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
  if (respondeu) {
    return;
  }

  respondeu = true;

  const atual = perguntas[indicePergunta];
  const botoes = document.querySelectorAll(".opcao");

  botoes.forEach(function (botao, indice) {
    if (indice === atual.correta) {
      botao.classList.add("correta");
    }
  });

  if (indiceEscolhido === atual.correta) {
    pontuacao++;
    pontosQuiz.textContent = pontuacao;
    feedbackQuiz.textContent = "Correto! Essa escolha combina com sustentabilidade.";
  } else {
    botaoEscolhido.classList.add("errada");
    feedbackQuiz.textContent = "Ainda não. Observe a alternativa marcada em verde.";
  }

  proximaPergunta.disabled = false;
}

proximaPergunta.addEventListener("click", function () {
  indicePergunta++;

  if (indicePergunta < perguntas.length) {
    carregarPergunta();
  } else {
    finalizarQuiz();
  }
});

reiniciarQuiz.addEventListener("click", function () {
  indicePergunta = 0;
  pontuacao = 0;
  pontosQuiz.textContent = "0";
  proximaPergunta.style.display = "inline-flex";
  carregarPergunta();
});

function finalizarQuiz() {
  perguntaQuiz.textContent = "Quiz concluído!";
  opcoesQuiz.innerHTML = "";
  progressoQuiz.textContent = "Resultado final";
  proximaPergunta.style.display = "none";

  if (pontuacao >= 4) {
    feedbackQuiz.textContent =
      "Parabéns! Você fez " + pontuacao + " de " + perguntas.length +
      ". Você compreendeu bem o agro sustentável.";
  } else {
    feedbackQuiz.textContent =
      "Você fez " + pontuacao + " de " + perguntas.length +
      ". Continue estudando produção e meio ambiente.";
  }
}

formRelatorio.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = nomeEquipe.value.trim();
  const acaoEscolhida = acao.value;
  const riscoAtual = risco.textContent;

  if (nome === "" || acaoEscolhida === "") {
    relatorioGerado.textContent = "Preencha todos os campos para gerar o relatório.";
    return;
  }

  relatorioGerado.innerHTML =
    "<strong>Relatório AgroGuardião 360</strong><br>" +
    "Estudante/equipe: " + nome + ".<br>" +
    "Risco atual estimado da lavoura: " + riscoAtual + "%.<br>" +
    "Compromisso sustentável: " + acaoEscolhida + ".<br>" +
    "Conclusão: tecnologia, produção e preservação precisam caminhar juntas para construir um futuro sustentável.";
});

atualizarSimulador();
carregarPergunta();
