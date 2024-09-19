const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Perguntas definidas diretamente no código
const questions = [
  {
    question: 'Como validar o método de Multi-Fator de Autenticação (MFA)?',
    answers: ['Biometria e senha', 'Números', 'Palavra secreta', 'Senha'],
    correct: 'Biometria e senha',
    image: "images/pergunta1.jpg"
  },
  {
    question: 'Como manter o dispositivo seguro contra invasões e malwares?',
    answers: ['Não atualizar o sistema', 'Clicar em links suspeitos', 'Manter o sistema e aplicativos na sua última versão', 'Compartilhar a senha do dispositivo com colegas'],
    correct: 'Manter o sistema e aplicativos na sua última versão',
    image: "images/pergunta2.jpg"
  },
  {
    question: 'Como senhas fortes contribuem para a segurança da identidade digital?',
    answers: ['Facilitam a lembrança', 'Dificultam a quebra por atacantes', 'Não afetam a segurança', 'São menos seguras'],
    correct: 'Dificultam a quebra por atacantes',
    image: "images/pergunta3.jpg"
  },
  {
    question: 'O que é identidade digital e por que é importante protegê-la?',
    answers: ['Login em sites', 'Informações online que precisam de proteção', 'Identidade física', 'Apenas conta de e-mail'],
    correct: 'Informações online que precisam de proteção',
    image: "images/pergunta4.jpeg"
  },
  {
    question: 'O que é autenticação multifator (MFA) e como ela melhora a segurança?',
    answers: ['Login com senha apenas', 'Usa código adicional para maior segurança', 'Usa um fator apenas', 'Armazena senhas em banco de dados'],
    correct: 'Usa código adicional para maior segurança',
    image: "images/pergunta5.jpg"
  },
  {
    question: 'Quais são as melhores práticas para proteger seu dispositivo móvel contra roubo?',
    answers: ['Deixar desbloqueado', 'Não se preocupar com segurança.', 'Manter à vista', 'Usar senhas e criptografia'],
    correct: 'Usar senhas e criptografia',
    image: "images/pergunta6.jpg"
  },
  {
    question: 'Como a criptografia de dados ajuda a proteger suas informações pessoais?',
    answers: ['Não afeta a segurança', 'Reduz a proteção', 'Torna os dados inacessíveis sem a chave', 'Só protege e-mails'],
    correct: 'Torna os dados inacessíveis sem a chave',
    image: "images/pergunta7.jpg"
  },
  {
    question: 'Quais são os sinais de que um site pode não ser seguro?',
    answers: ['Erros de carregamento e falta do cadeado', 'URL com "https" e cadeado', 'Design atraente e rápido', 'URL curta e recomendação de amigos'],
    correct: 'Erros de carregamento e falta do cadeado',
    image: "images/pergunta8.png"
  },
  {
    question: 'O que é phishing e como se proteger?',
    answers: ['Não é uma ameaça', 'Vírus que afeta navegadores', 'Técnica para obter dados pessoais, verifique e-mails e links', 'Forma segura de obter dados'],
    correct: 'Técnica para obter dados pessoais, verifique e-mails e links',
    image: "images/pergunta9.jpg"
  },
  {
    question: 'Por que é importante proteger dados confidenciais?',
    answers: ['Sem necessidade', 'Só para grandes empresas', 'Dados são sempre seguros', 'Evita vazamentos e danos'],
    correct: 'Evita vazamentos e danos',
    image: "images/pergunta10.jpg"
  },
  {
    question: 'Quais são os riscos de compartilhar dados confidenciais por e-mail?',
    answers: ['Pode ser interceptado e mal usado', 'Sem riscos', 'Dados são sempre seguros', 'Evita vazamentos e danos'],
    correct: 'Pode ser interceptado e mal usado',
    image: "images/pergunta11.jpg"
  },
  {
    question: 'Como você pode identificar um site legítimo para inserir dados pessoais?',
    answers: ['Verificar se o site tem um design moderno', 'Procurar por análises positivas online', 'Checar se o site usa HTTPS', 'Confirmar se o site tem uma grande quantidade de visitantes'],
    correct: 'Checar se o site usa HTTPS',
    image: "images/pergunta12.jpeg"
  },
  {
    question: 'Qual é uma medida de segurança ao compartilhar dados confidenciais?',
    answers: ['Compartilhar em redes sociais', 'Enviar por e-mail sem criptografia', 'Usar canais seguros e protegidos', 'Confirmar se o site tem uma grande quantidade de visitantes'],
    correct: 'Usar canais seguros e protegidos',
    image: "images/pergunta13.jpg"
  },
  {
    question: 'Qual é um comportamento arriscado ao usar redes sociais?',
    answers: ['Ajustar configurações de privacidade regularmente', 'Usar autenticação de dois fatores', 'Publicar informações pessoais como endereço e número de telefone', 'Configurar alertas para atividade de conta'],
    correct: 'Publicar informações pessoais como endereço e número de telefone',
    image: "images/pergunta14.png"
  },
  {
    question: 'O que é um ataque de engenharia social?',
    answers: ['Um ataque que usa vírus para danificar hardware', 'Um ataque que manipula pessoas para obter informações confidenciais', 'Um ataque que compromete a segurança física de um computador', 'Um ataque que explora falhas em softwares antivírus'],
    correct: 'Um ataque que manipula pessoas para obter informações confidenciais',
    image: "images/pergunta15.jpg"
  },
  {
    question: 'Qual é um sinal de que seu dispositivo móvel pode ter sido comprometido por malware?',
    answers: ['Aumento no tempo de inicialização', 'Desempenho mais lento ao usar aplicativos', 'Anúncios pop-up e comportamento inesperado de aplicativos', 'Alterações na tela inicial'],
    correct: 'Anúncios pop-up e comportamento inesperado de aplicativos',
    image: "images/pergunta16.jpg"
  },
  {
    question: 'O que fazer se um aplicativo solicitado solicitar permissões desnecessárias?',
    answers: ['Conceder todas as permissões para evitar problemas', 'Ignorar e continuar usando o aplicativo', 'Negar permissões e considerar desinstalar o aplicativo', 'Compartilhar permissões com outros usuários'],
    correct: 'Negar permissões e considerar desinstalar o aplicativo',
    image: "images/pergunta17.jpg"
  },
  {
    question: 'Como você pode verificar se um aplicativo é seguro antes de instalá-lo?',
    answers: ['Verificar o número de downloads e avaliações', 'Ignorar a origem do aplicativo e instalar diretamente', 'Conferir as permissões solicitadas e pesquisar sobre o desenvolvedor', 'Instalar aplicativos sem ler as análises'],
    correct: 'Conferir as permissões solicitadas e pesquisar sobre o desenvolvedor',
    image: "images/pergunta18.png"
  },
  {
    question: 'O que fazer se você suspeitar que suas informações pessoais foram roubadas?',
    answers: ['Ignorar e continuar usando suas contas normalmente', 'Notificar as instituições financeiras e as autoridades competentes, e alterar suas senhas', 'Compartilhar a situação com amigos para obter conselhos', 'Deixar a situação como está e esperar por atualizações'],
    correct: 'Notificar as instituições financeiras e as autoridades competentes, e alterar suas senhas',
    image: "images/pergunta19.jpg"
  },
  {
    question: 'O que é uma senha forte?',
    answers: ['Uma senha que inclui apenas letras maiúsculas', 'Uma senha que combina letras, números e caracteres especiais, e tem pelo menos 12 caracteres', 'Uma senha que é fácil de lembrar, como seu nome', 'Uma senha que é a mesma em todos os sites'],
    correct: 'Uma senha que combina letras, números e caracteres especiais, e tem pelo menos 12 caracteres',
    image: "images/pergunta20.jpg"
  },
];

const players = {};
let currentQuestionIndex = 0;
let gameStarted = false;
let answers = {};
const responseTime = 20000; // Tempo limite de 20 segundos
let questionStartTime;

// Função para enviar a próxima pergunta
function sendQuestion() {
  if (currentQuestionIndex < questions.length) {
    console.log('Enviando pergunta:', questions[currentQuestionIndex]);
    io.emit('question', questions[currentQuestionIndex], currentQuestionIndex === questions.length - 1);
    answers = {}; // Limpar respostas anteriores
    questionStartTime = Date.now(); // Registrar o início da pergunta

    // Temporizador de 20 segundos para exibir a resposta correta
    setTimeout(() => {
      showCorrectAnswer(); // Mostra a resposta correta após 20 segundos
    }, 20000); // 20 segundos de intervalo
  } else {
    console.log('Fim do jogo. Enviando ranking.');
    sendTop10Players(); // Envia o ranking dos 10 melhores jogadores
    gameStarted = false; // Finaliza o jogo
  }
}

// Função para mostrar a resposta correta
function showCorrectAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion) {
    io.emit('correctAnswer', currentQuestion.correct); // Envia a resposta correta para os jogadores

    // Espera 3 segundos antes de enviar a próxima pergunta
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        sendQuestion(); // Envia a próxima pergunta
      } else {
        sendTop10Players(); // Envia o ranking dos 10 melhores jogadores
      }
    }, 3000); // Espera 3 segundos após mostrar a resposta
  }
}

// Função para mostrar o ranking dos 10 melhores jogadores
function sendTop10Players() {
  const sortedPlayers = Object.values(players)
    .sort((a, b) => b.score - a.score) // Ordena os jogadores por pontuação (decrescente)
    .slice(0, 10); // Pega os 10 melhores
  io.emit('endGame', { players: sortedPlayers, message: 'Obrigado por participar!' });
}

// Verificar se todos os jogadores responderam
function checkIfAllAnswered() {
  return Object.keys(players).every(playerId => answers[playerId]);
}

// Atualizar a pontuação do jogador individualmente e enviar para ele
function updatePlayerScore(socket) {
  socket.emit('playerScoreUpdate', players[socket.id].score.toFixed(0)); // Envia a pontuação do jogador
}

io.on('connection', (socket) => {
  console.log('Novo jogador conectado');

  // Adicionar jogador à lista de jogadores
  socket.on('joinGame', (data) => {
    const { playerName } = data;
    players[socket.id] = { name: playerName || 'Desconhecido', score: 0 }; // Define 'Desconhecido' se o nome não for fornecido
    console.log(`${playerName || 'Desconhecido'} conectado`);
    io.emit('updatePlayers', Object.values(players));
    socket.emit('welcomeMessage', 'Aguardando o início do jogo...');
  });

  // Quando o administrador inicia o jogo
  socket.on('startGame', () => {
    console.log('Iniciando o jogo...');
    if (!gameStarted) {
      gameStarted = true;
      io.emit('gameStarted');
      sendQuestion();
    }
  });

  // Quando um jogador envia uma resposta
  socket.on('answer', (answer) => {
    if (gameStarted && !answers[socket.id]) {
      if (players[socket.id]) { 
        console.log(`${players[socket.id].name} respondeu: ${answer}`);
        answers[socket.id] = answer;
  
        if (answer === questions[currentQuestionIndex].correct) {
          const timeTaken = (Date.now() - questionStartTime) / 1000;
          const score = Math.max(1000 - timeTaken * 50, 0); // Até 1000 pontos, diminuindo conforme o tempo
          players[socket.id].score += score;
          io.emit('updatePlayers', Object.values(players)); // Atualizar pontuação de todos os jogadores
        }
  
        updatePlayerScore(socket);
  
        // Mesmo se todos responderem, não avança imediatamente para a próxima pergunta
        if (checkIfAllAnswered()) {
          io.emit('allPlayersAnswered'); // Apenas notifica que todos responderam
        }
      } else {
        console.error('Jogador não encontrado:', socket.id);
      }
    }
  });

  // Quando o tempo expira
  socket.on('timeExpired', () => {
    if (gameStarted && !checkIfAllAnswered()) {
      console.log("Tempo expirado. Mostrando resposta correta.");
      showCorrectAnswer(); // Mostra a resposta correta se o tempo acabar e nem todos tiverem respondido
    }
  });

  // Quando um jogador desconecta
  socket.on('disconnect', () => {
    const playerName = players[socket.id]?.name || 'Desconhecido';
    console.log(`${playerName} desconectado`);
    delete players[socket.id];
    io.emit('updatePlayers', Object.values(players));
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
