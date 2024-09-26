# IdentidadeDigitalCenco

# Projeto criado com o obejtivo de criar uma dinâmia com a equipe de TI da Cencosud Brasil, onde os mesmos após uma apresentação de Ciber Segurança, sobre os temas de Identidade Digital, Navegação Segura, Segurança de dispositivos entre outros.

- Tecnologias utilizadas
  - JavaScript;
  - HTML;
  - CSS;
  - Socket IO (servidor);
  - Ngrok (criação de um túnel para conexão dos demais usuários/jogadores).


 
- Consiste em um simples jogo baseado na lógica e gameplay do kahoot, onde as perguntas podem ser cadastradas em quantidade X (sem limites), a lógica e entendimento do mesmo é bem simples:
  - Server roda na porta 3000;
  - Pasta com o banco de imagens para ser referênciada em cada pergunta;
  - Cadastro das perguntas diretamente no código do servidor, logo não é armazenada em cache;
  - Contabilização de pontos dos jogadores (1000pts que decaem a depender do tempo que for respondido);
  - Ranking com os 5 melhores jogadores ao final da partida.

O projeto já está em funcionamento mas ainda consta com algumas melhorias para uma melhor jogabilidade, demais correções, ajustes ou pontos de melhoria podem estar sendo compartilhados também.

- Passos para iniciar o projeto:
  - Entrar na pasta do projeto via CMD ou PowerShell (preferível);
  - Para iniciar o server, basta usar o comando node server.js;
  - As pages de jogador e de admin (que vai inicar o jogo e ver os jogadores que entraram) vão estar disponíveis para acessar via local host;
    - Admin Page: http://localhost:3000/admin/admin.html? -> ![image](https://github.com/user-attachments/assets/5c0198cc-a0dd-4f9d-aeb2-3aca41902fd8)
    - User Page: http://localhost:3000/index.html -> ![image](https://github.com/user-attachments/assets/b5bfe029-7257-406b-baef-5f3698057038)
  - Quando o admin ou jogadores entram na seção vai ser informado no terminal do servidor, e quando o jogador colcoar o nome e entrar vai aparecer para o admin -> ![image](https://github.com/user-attachments/assets/da14dfa8-ea79-4bff-926a-760ea9b4e47f)
  - Página de espera user -> ![image](https://github.com/user-attachments/assets/f18b3780-f936-4620-ad66-542af7c3de12)
  - Admin display -> ![image](https://github.com/user-attachments/assets/714712bb-5a31-4bf8-8ea0-9b2827601e57)
 
  - E ao iniciar o joog as perguntas são mostradas na tela para os jogadores simultanêamente.
  - Utilizar ngrok para criação do túnel e deixar o mesmo online na web.
