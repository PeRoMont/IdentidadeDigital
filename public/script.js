document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('playerNameInput');
    const submitNameButton = document.getElementById('submitNameButton');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeBox = document.querySelector('.box');
    const questionContainer = document.getElementById('questionContainer');
    const questionText = document.getElementById('questionText');
    const answerA = document.getElementById('answerA');
    const answerB = document.getElementById('answerB');
    const answerC = document.getElementById('answerC');
    const answerD = document.getElementById('answerD');
    const timerElement = document.getElementById('timer');
    const questionImage = document.getElementById('questionImage');
    const scoreDisplay = document.createElement('div');
    const socket = io();
    let countdown;
    let answering = false;
    let isFinalQuestion = false;
    let allQuestionsAnswered = false; // Flag para verificar se todas as perguntas foram respondidas
    let players = []; // Lista global de jogadores
    let timeLeft = 20; // Tempo inicial de 20 segundos

    // Adicionar a div de pontuação ao DOM
    scoreDisplay.id = 'playerScore';
    scoreDisplay.style.position = 'fixed';
    scoreDisplay.style.top = '10px';
    scoreDisplay.style.left = '10px';
    scoreDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    scoreDisplay.style.color = 'white';
    scoreDisplay.style.padding = '5px 10px';
    scoreDisplay.style.borderRadius = '5px';
    scoreDisplay.style.fontSize = '16px';
    scoreDisplay.style.display = 'none';
    document.body.appendChild(scoreDisplay);

    // Evento de envio do nome
    submitNameButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            socket.emit('joinGame', { playerName });
            playerNameInput.disabled = true;
            submitNameButton.disabled = true;
            playerNameInput.style.display = 'none';
            submitNameButton.style.display = 'none';
            welcomeMessage.textContent = `Aguarde ${playerName}, o jogo já vai começar.`;
        }
    });

    // Função para iniciar o timer
    function startTimer() {
        timeLeft = 20;
        timer = setInterval(() => {
          timeLeft--;
          updateTimerDisplay(timeLeft); // Atualiza a exibição do temporizador no cliente
          
          if (timeLeft <= 0) {
            clearInterval(timer);
            sendTimeout(); // Envia para o servidor que o tempo acabou
          }
        }, 1000);
      }

    // Quando o jogo começa
    socket.on('gameStarted', () => {
        welcomeBox.style.display = 'none';
        questionContainer.style.display = 'block';
    });

    // Função para resetar os botões de resposta
    function resetAnswerButtons() {
        [answerA, answerB, answerC, answerD].forEach((button) => {
            button.classList.remove('gray-disabled', 'correct', 'selected');
            button.disabled = false;
        });
        answering = false;
    }

    // Função para desativar todos os botões de resposta, exceto o selecionado
    function disableAllAnswers(selectedAnswer) {
        [answerA, answerB, answerC, answerD].forEach((button) => {
            if (button.textContent !== selectedAnswer) {
                button.classList.add('gray-disabled');
            }
            button.disabled = true;
        });
    }

    // Função para destacar a resposta correta e desativar as erradas
    function highlightCorrectAnswer(correctAnswer) {
        const buttons = [answerA, answerB, answerC, answerD];
        buttons.forEach((button) => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else {
                button.classList.add('gray-disabled');
                button.classList.remove('selected');
            }
            button.disabled = true;
        });
    }

    // Receber e exibir perguntas
    socket.on('question', (question, isLast) => {
        if (isFinalQuestion) return;
      
        resetAnswerButtons();
        startTimer();
        questionText.textContent = question.question;
        answerA.textContent = question.answers[0];
        answerB.textContent = question.answers[1];
        answerC.textContent = question.answers[2];
        answerD.textContent = question.answers[3];
        questionImage.src = question.image;
        isFinalQuestion = isLast;
    });

    // Quando o jogador responde
    [answerA, answerB, answerC, answerD].forEach((button) => {
        button.addEventListener('click', () => {
            if (!answering) {
                answering = true;
                button.classList.add('selected');
                disableAllAnswers(button.textContent);
                socket.emit('answer', button.textContent);
            }
        });
    });

    // Exibir a resposta correta
    socket.on('correctAnswer', (correctAnswer) => {
        highlightCorrectAnswer(correctAnswer);

        setTimeout(() => {
            if (isFinalQuestion) {
                allQuestionsAnswered = true; // Definir a flag para indicar que todas as perguntas foram respondidas
                socket.emit('requestEndGame');
                questionContainer.style.display = 'none'; // Ocultar a pergunta
            } else {
                resetAnswerButtons();
            }
        }, 3000);
    });

    // Atualizar a pontuação do jogador individualmente
    socket.on('playerScoreUpdate', (score) => {
        scoreDisplay.textContent = `Sua pontuação: ${score}`;
        scoreDisplay.style.display = 'block';
    });

    // Receber a lista de jogadores e suas pontuações
    socket.on('playersUpdate', (playersList) => {
        players = playersList;
    });

    let rankingDisplayed = false; // Flag para verificar se o ranking já foi exibido

    // Exibir a pontuação dos top 5 jogadores ao final
    socket.on('endGame', ({ players, message }) => {
        if (!allQuestionsAnswered) return; // Verificar se todas as perguntas foram respondidas antes de exibir o ranking
        if (rankingDisplayed) return; // Se o ranking já foi exibido, não fazer nada
        rankingDisplayed = true; // Definir que o ranking já foi exibido
        if (!players || players.length === 0) {
            console.error('Nenhum jogador encontrado para exibir o ranking.');
            return;
        }

        // Ordenar os jogadores por pontuação (do maior para o menor) e pegar os 5 primeiros
        const topPlayers = players.sort((a, b) => b.score - a.score).slice(0, 5);

        // Criar o container do ranking
        const rankingContainer = document.createElement('div');
        rankingContainer.id = 'rankingContainer';
        rankingContainer.style.backgroundColor = 'white';
        rankingContainer.style.borderRadius = '10px';
        rankingContainer.style.padding = '20px';
        rankingContainer.style.margin = '20px auto';
        rankingContainer.style.textAlign = 'center';
        rankingContainer.style.width = '50%';

        // Título
        const rankingTitle = document.createElement('h2');
        rankingTitle.textContent = 'Top 5 Melhores Jogadores';
        rankingContainer.appendChild(rankingTitle);

        // Listar os jogadores
        topPlayers.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.textContent = `${index + 1}. ${player.name} - ${Math.floor(player.score)}`; // Remove casas decimais
            rankingContainer.appendChild(playerDiv);
        });

        // Mensagem final
        const finalMessage = document.createElement('p');
        finalMessage.textContent = message;
        rankingContainer.appendChild(finalMessage);

        document.body.appendChild(rankingContainer);
    });
});
