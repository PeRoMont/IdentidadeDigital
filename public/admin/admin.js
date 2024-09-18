document.addEventListener('DOMContentLoaded', function() {
  const startGameButton = document.getElementById('startGameButton');
  const playersContainer = document.getElementById('playersContainer');

  const socket = io('https://quiz-identidade-digital.vercel.app');

  // Função para formatar a pontuação
  function formatScore(score) {
    // Usa Math.floor para garantir que apenas a parte inteira seja usada
    const integerScore = Math.floor(score);
    // Limita a 5 dígitos
    return integerScore > 99999 ? '99999' : integerScore.toString();
  }

  // Função para atualizar e classificar a lista de jogadores
  function updatePlayersList(players) {
    // Ordenar jogadores por pontuação em ordem decrescente
    const sortedPlayers = Object.values(players).sort((a, b) => b.score - a.score);

    playersContainer.innerHTML = ''; // Limpar a lista existente
    sortedPlayers.forEach(player => {
      const playerElement = document.createElement('div');
      playerElement.classList.add('player-item');

      // Nome do jogador
      const playerName = document.createElement('span');
      playerName.classList.add('player-name');
      playerName.textContent = player.name;

      // Pontuação do jogador (formatada)
      const playerScore = document.createElement('span');
      playerScore.classList.add('player-score');
      playerScore.textContent = ` - ${formatScore(player.score)} pontos`;

      playerElement.appendChild(playerName);
      playerElement.appendChild(playerScore);

      playersContainer.appendChild(playerElement);
    });
  }

  // Evento para iniciar o jogo
  startGameButton.addEventListener('click', () => {
    socket.emit('startGame');
  });

  // Atualizar a lista de jogadores
  socket.on('updatePlayers', (players) => {
    updatePlayersList(players); // Usar a função que classifica e atualiza a lista
  });

  // Atualizar a lista de jogadores e pontuações quando o jogo termina
  socket.on('endGame', (players) => {
    updatePlayersList(players); // Usar a função que classifica e atualiza a lista
  });
});
