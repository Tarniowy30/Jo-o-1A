const btnFonte = document.getElementById("btnFonte");
const btnTema = document.getElementById("btnTema");
const btnTopo = document.getElementById("btnTopo");

const cultura = document.getElementById("cultura");
const umidade = document.getElementById("umidade");
const temperatura = document.getElementById("temperatura");
const folhas = document.getElementById("folhas");
const preservacao = document.getElementById("preservacao");

const valorUmidade = document.getElementById("valorUmidade");
const valorTemperatura = document.getElementById("valorTemperatura");
const valorFolhas = document.getElementById("valorFolhas");
const valorPreservacao = document.getElementById("valorPreservacao");

const painelCultura = document.getElementById("painelCultura");
const painelUmidade = document.getElementById("painelUmidade");
const painelTemperatura = document.getElementById("painelTemperatura");
const painelPreservacao = document.getElementById("painelPreservacao");

const barraRisco = document.getElementById("barraRisco");
const numeroRisco = document.getElementById("numeroRisco");
const tituloRisco = document.getElementById("tituloRisco");
const textoRisco = document.getElementById("textoRisco");
const campoVisual = document.getElementById("campoVisual");

const listaRecomendacoes = document.getElementById("listaRecomendacoes");

const btnResetar = document.getElementById("btnResetar");
const btnSalvar = document.getElementById("btnSalvar");
const btnLimparHistorico = document.getElementById("btnLimparHistorico");
const listaHistorico = document.getElementById("listaHistorico");
const historicoVazio = document.getElementById("historicoVazio");

const perguntaQuiz = document.getElementById("perguntaQuiz");
const opcoesQuiz = document.getElementById("opcoesQuiz");
const feedbackQuiz = document.getElementById("feedbackQuiz");
const quizProgresso = document.getElementById("quizProgresso");
const quizPontos = document.getElementById("quizPontos");
const btnProxima = document.getElementById("btnProxima");
const btnReiniciarQuiz = document.getElementById("btnReiniciarQuiz");

const nomeEquipe = document.getElementById("nomeEquipe");
const acaoSustentavel = document.getElementById("acaoSustentavel");
const btnGerarRelatorio = document.getElementById("btnGerarRelatorio");
const textoRelatorio = document.getElementById("textoRelatorio");

let indicePergunta = 0;
let pontos = 0;
let respondeu = false;

const perguntas = [
  {
    pergunta: "Qual atitude ajuda a proteger o solo contra erosão?",
    opcoes: [
      "Retirar toda a vegetação do terreno",
      "Usar cobertura vegetal e rotação de culturas",
      "Irrigar sem controle todos os dias",
      "Aplicar defensivos sem monitoramento"
    ],
    correta: 1
  },
  {
    pergunta: "Por que a tecnologia pode ajudar na agricultura sustentável?",
    opcoes: [
      "Porque elimina totalmente o trabalho humano",
      "Porque permite analisar dados e tomar decisões melhores",
      "Porque impede qualquer tipo de plantio",
      "Porque aumenta o desperdício de água"
    ],
    correta: 1
  },
  {
    pergunta: "O que significa equilíbrio entre produção e meio ambiente?",
    opcoes: [
      "Produzir sem pensar nos impactos ambientais",
      "Preservar tudo e nunca produzir alimentos",
      "Produzir com responsabilidade, protegendo recursos naturais",
      "Usar água e solo sem controle"
    ],
    correta: 2
  },
  {
    pergunta: "Qual ação ajuda a economizar água no campo?",
    opcoes: [
      "Irrigar em excesso todos os dias",
      "Monitorar a umidade do solo antes de irrigar",
      "Desmatar áreas próximas às nascentes",
      "Ignorar períodos de chuva"
    ],
    correta: 1
  },
  {
    pergunta: "Antes de aplicar defensivos, o ideal é:",
    opcoes: [
      "Monitorar a lavoura e identificar o problema",
      "Aplicar sempre, mesmo sem necessidade",
      "Esperar a lavoura morrer",
      "Usar qualquer produto sem orientação"
    ],
    correta: 0
  }
];

// Função para limitar valores dentro de um intervalo.
function limitar(valor, minimo, maximo) {
  return Math.max(minimo, Math.min(maximo, valor));
}

// Função para deixar o nome da cultura com primeira letra maiúscula.
function formatarCultura(nome) {
  const nomes = {
    milho: "Milho",
    soja: "Soja",
    feijao: "Feijão",
    hortalicas: "Hortaliças"
  };

  return nomes[nome] || "Milho";
}

// Função para calcular o risco conforme os dados informados.
function calcularRisco() {
  const valorCultura = cultura.value;
  const u = Number(umidade.value);
  const t = Number(temperatura.value);
  const f = Number(folhas.value);
  const p = Number(preservacao.value);

  let riscoUmidade = 0;
  let riscoTemperatura = 0;
  let pesoCultura = 1;

  if (valorCultura === "hortalicas") {
    pesoCultura = 1.15;
  }

  if (valorCultura === "feijao") {
    pesoCultura = 1.08;
  }

  if (u < 45) {
    riscoUmidade = (45 - u) * 1.25;
  } else if (u > 85) {
    riscoUmidade = (u - 85) * 1.05;
  }

  if (t > 30) {
    riscoTemperatura = (t - 30) * 3.8;
  } else if (t < 14) {
    riscoTemperatura = (14 - t) * 2.1;
  }

  const riscoFolhas = f * 0.52;
  const riscoPreservacao = (100 - p) * 0.24;

  const total = (riscoUmidade + riscoTemperatura + riscoFolhas + riscoPreservacao) * pesoCultura;

  return Math.round(limitar(total, 0, 100));
}

// Função para definir nível, cor e texto do risco.
function obterNivelRisco(valor) {
  if (valor >= 70) {
    return {
      nome: "Risco alto",
      classe: "alto",
      cor: "#b42318",
      texto: "A lavoura apresenta sinais críticos. É necessário monitorar folhas, revisar umidade, proteger o solo e agir com cuidado para evitar perdas."
    };
  }

  if (valor >= 40) {
    return {
      nome: "Risco moderado",
      classe: "moderado",
      cor: "#e8782e",
      texto: "A lavoura precisa de atenção. Continue acompanhando os dados e adote ações preventivas antes que o problema aumente."
    };
  }

  return {
    nome: "Risco baixo",
    classe: "baixo",
    cor: "#1f8a45",
    texto: "A lavoura está em condição favorável. Mantenha o monitoramento e continue usando práticas sustentáveis."
  };
}

// Função para gerar recomendações conforme a análise.
function gerarRecomendacoes() {
  const u = Number(umidade.value);
  const t = Number(temperatura.value);
  const f = Number(folhas.value);
  const p = Number(preservacao.value);
  const valorCultura = formatarCultura(cultura.value);

  const recomendacoes = [];

  recomendacoes.push(`Monitorar a cultura de ${valorCultura} com frequência para evitar perdas.`);

  if (u < 45) {
    recomendacoes.push("Aumentar o controle da irrigação, priorizando economia de água.");
  }

  if (u > 85) {
    recomendacoes.push("Verificar excesso de umidade para evitar doenças e encharcamento.");
  }

  if (t > 30) {
    recomendacoes.push("Observar sinais de estresse térmico nas plantas nos horários mais quentes.");
  }

  if (f > 45) {
    recomendacoes.push("Investigar sinais nas folhas antes de aplicar qualquer defensivo.");
  }

  if (p < 55) {
    recomendacoes.push("Melhorar a preservação de nascentes, matas ciliares e cobertura do solo.");
  }

  if (recomendacoes.length === 1) {
    recomendacoes.push("Manter boas práticas, como rotação de culturas e cobertura vegetal.");
  }

  return recomendacoes;
}

// Função principal para atualizar todo o simulador.
function atualizarSimulador() {
  const risco = calcularRisco();
  const nivel = obterNivelRisco(risco);
  const recomendacoes = gerarRecomendacoes();

  valorUmidade.textContent = `${umidade.value}%`;
  valorTemperatura.textContent = `${temperatura.value}°C`;
  valorFolhas.textContent = `${folhas.value}%`;
  valorPreservacao.textContent = `${preservacao.value}%`;

  painelCultura.textContent = formatarCultura(cultura.value);
  painelUmidade.textContent = `${umidade.value}%`;
  painelTemperatura.textContent = `${temperatura.value}°C`;
  painelPreservacao.textContent = `${preservacao.value}%`;

  numeroRisco.textContent = risco;
  barraRisco.style.width = `${risco}%`;
  barraRisco.style.background = nivel.cor;

  tituloRisco.textContent = nivel.nome;
  textoRisco.textContent = nivel.texto;

  campoVisual.className = "campo-visual";

  if (risco >= 70) {
    campoVisual.classList.add("critico");
  } else if (risco >= 40) {
    campoVisual.classList.add("moderado");
  }

  listaRecomendacoes.innerHTML = "";

  recomendacoes.forEach(function (recomendacao) {
    const item = document.createElement("li");
    item.textContent = recomendacao;
    listaRecomendacoes.appendChild(item);
  });
}

// Função para reiniciar os valores do simulador.
function resetarSimulador() {
  cultura.value = "milho";
  umidade.value = 50;
  temperatura.value = 25;
  folhas.value = 30;
  preservacao.value = 60;
  atualizarSimulador();
}

// Função para salvar análise no localStorage.
function salvarAnalise() {
  const risco = calcularRisco();
  const nivel = obterNivelRisco(risco);

  const analise = {
    cultura: formatarCultura(cultura.value),
    umidade: umidade.value,
    temperatura: temperatura.value,
    folhas: folhas.value,
    preservacao: preservacao.value,
    risco: risco,
    nivel: nivel.nome,
    classe: nivel.classe,
    data: new Date().toLocaleString("pt-BR")
  };

  const historico = JSON.parse(localStorage.getItem("historicoAgroGuardiao")) || [];

  historico.unshift(analise);

  if (historico.length > 5) {
    historico.pop();
  }

  localStorage.setItem("historicoAgroGuardiao", JSON.stringify(historico));

  carregarHistorico();
}

// Função para carregar histórico salvo.
function carregarHistorico() {
  const historico = JSON.parse(localStorage.getItem("historicoAgroGuardiao")) || [];

  listaHistorico.innerHTML = "";

  if (historico.length === 0) {
    historicoVazio.style.display = "block";
    return;
  }

  historicoVazio.style.display = "none";

  historico.forEach(function (analise, indice) {
    const item = document.createElement("li");

    item.innerHTML = `
      <strong>Análise ${indice + 1} - ${analise.cultura}</strong><br>
      Risco: ${analise.risco}% |
      Umidade: ${analise.umidade}% |
      Temperatura: ${analise.temperatura}°C |
      Folhas: ${analise.folhas}% |
      Preservação: ${analise.preservacao}%<br>
      <small>${analise.data}</small><br>
      <span class="selo-risco ${analise.classe}">${analise.nivel}</span>
    `;

    listaHistorico.appendChild(item);
  });
}

// Função para limpar histórico.
function limparHistorico() {
  localStorage.removeItem("historicoAgroGuardiao");
  carregarHistorico();
}

// Função para carregar pergunta do quiz.
function carregarPergunta() {
  respondeu = false;
  feedbackQuiz.textContent = "";
  opcoesQuiz.innerHTML = "";

  const item = perguntas[indicePergunta];

  quizProgresso.textContent = `Pergunta ${indicePergunta + 1} de ${perguntas.length}`;
  quizPontos.textContent = pontos;
  perguntaQuiz.textContent = item.pergunta;

  item.opcoes.forEach(function (opcao, indice) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = opcao;

    botao.addEventListener("click", function () {
      responderPergunta(indice, botao);
    });

    opcoesQuiz.appendChild(botao);
  });
}

// Função para validar resposta do quiz.
function responderPergunta(indiceEscolhido, botaoClicado) {
  if (respondeu) {
    return;
  }

  respondeu = true;

  const item = perguntas[indicePergunta];
  const botoes = opcoesQuiz.querySelectorAll("button");

  botoes.forEach(function (botao, indice) {
    botao.disabled = true;

    if (indice === item.correta) {
      botao.classList.add("correta");
    }
  });

  if (indiceEscolhido === item.correta) {
    pontos++;
    quizPontos.textContent = pontos;
    feedbackQuiz.textContent = "Resposta correta! Excelente decisão sustentável.";
    feedbackQuiz.style.color = "#1f8a45";
  } else {
    botaoClicado.classList.add("errada");
    feedbackQuiz.textContent = "Resposta incorreta. Observe a alternativa correta destacada.";
    feedbackQuiz.style.color = "#b42318";
  }
}

// Função para avançar no quiz.
function proximaPergunta() {
  if (indicePergunta < perguntas.length - 1) {
    indicePergunta++;
    carregarPergunta();
    return;
  }

  perguntaQuiz.textContent = "Quiz finalizado!";
  opcoesQuiz.innerHTML = "";
  feedbackQuiz.style.color = "#1f8a45";
  feedbackQuiz.textContent = `Você fez ${pontos} ponto(s) de ${perguntas.length}. Continue praticando atitudes sustentáveis no campo.`;
}

// Função para reiniciar quiz.
function reiniciarQuiz() {
  indicePergunta = 0;
  pontos = 0;
  carregarPergunta();
}

// Função para gerar relatório final.
function gerarRelatorio() {
  const nome = nomeEquipe.value.trim();
  const acao = acaoSustentavel.value;
  const risco = calcularRisco();
  const nivel = obterNivelRisco(risco);

  if (nome === "" || acao === "") {
    textoRelatorio.textContent = "Preencha o nome e selecione uma ação sustentável para gerar o relatório.";
    return;
  }

  textoRelatorio.textContent =
    `Nós, da equipe ${nome}, assumimos o compromisso de ${acao}. ` +
    `Com base na simulação do AgroGuardião 360, a lavoura analisada apresentou ${risco}% de risco, classificado como ${nivel.nome}. ` +
    `O projeto mostra que a tecnologia, quando usada com responsabilidade, ajuda a fortalecer o agro e proteger o meio ambiente.`;
}

// Eventos dos botões e controles.
btnFonte.addEventListener("click", function () {
  document.body.classList.toggle("fonte-grande");
});

btnTema.addEventListener("click", function () {
  document.body.classList.toggle("escuro");

  if (document.body.classList.contains("escuro")) {
    btnTema.textContent = "☀️";
  } else {
    btnTema.textContent = "🌙";
  }
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

[cultura, umidade, temperatura, folhas, preservacao].forEach(function (controle) {
  controle.addEventListener("input", atualizarSimulador);
});

btnResetar.addEventListener("click", resetarSimulador);
btnSalvar.addEventListener("click", salvarAnalise);
btnLimparHistorico.addEventListener("click", limparHistorico);

btnProxima.addEventListener("click", proximaPergunta);
btnReiniciarQuiz.addEventListener("click", reiniciarQuiz);

btnGerarRelatorio.addEventListener("click", gerarRelatorio);

// Inicialização do projeto.
atualizarSimulador();
carregarHistorico();
carregarPergunta();
