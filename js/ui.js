// Interface do usuário para o jogo Mahalilah

class UI {
  constructor(game) {
    this.game = game;
    this.setupEventListeners();
    this.updateScreens();
  }
  
  setupEventListeners() {
    // Botões de navegação
    const btnHome = document.getElementById('btn-home');
    const btnGame = document.getElementById('btn-game');
    const btnRules = document.getElementById('btn-rules');
    
    if (btnHome) {
      btnHome.addEventListener('click', () => this.showScreen('home-screen'));
    }
    
    if (btnGame) {
      btnGame.addEventListener('click', () => this.showScreen('game-screen'));
    }
    
    if (btnRules) {
      btnRules.addEventListener('click', () => this.showScreen('rules-screen'));
    }
    
    // Redimensionamento da janela
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }
  
  showScreen(screenId) {
    // Ocultar todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Mostrar a tela selecionada
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
      selectedScreen.classList.add('active');
    }
    
    // Atualizar os botões de navegação
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    // Ativar o botão correspondente
    switch (screenId) {
      case 'home-screen':
        document.getElementById('btn-home')?.classList.add('active');
        break;
      case 'game-screen':
        document.getElementById('btn-game')?.classList.add('active');
        break;
      case 'rules-screen':
        document.getElementById('btn-rules')?.classList.add('active');
        break;
    }
  }
  
  updateScreens() {
    this.updateHomeScreen();
    this.updateRulesScreen();
  }
  
  updateHomeScreen() {
    const homeScreen = document.getElementById('home-screen');
    if (!homeScreen) return;
    
    homeScreen.innerHTML = `
      <h1 class="home-title">Mahalilah</h1>
      <h2 class="home-subtitle">O Jogo do Autoconhecimento</h2>
      
      <div class="card">
        <p class="home-description">
          Mahalilah é um jogo milenar de origem hindu que proporciona uma jornada de autoconhecimento e reflexão.
          Com 72 casas distribuídas em 8 planos diferentes, o jogo representa a jornada da alma em busca da consciência plena.
        </p>
        
        <p class="home-description">
          Cada casa tem um significado especial que será revelado durante sua jornada.
          As espadas (subidas) representam atalhos para evolução, enquanto as serpentes (descidas) simbolizam os desafios e retrocessos.
        </p>
        
        <div class="home-buttons">
          <button class="btn" onclick="document.getElementById('btn-game').click()">Iniciar Jornada</button>
          <button class="btn btn-secondary" onclick="document.getElementById('btn-rules').click()">Ver Regras</button>
        </div>
      </div>
    `;
  }
  
  updateRulesScreen() {
    const rulesScreen = document.getElementById('rules-screen');
    if (!rulesScreen) return;
    
    rulesScreen.innerHTML = `
      <h1 class="rules-title">Regras do Jogo</h1>
      
      <div class="card rules-section">
        <h3>Objetivo</h3>
        <p>O objetivo do jogo é percorrer o tabuleiro, partindo da casa 68 (Consciência Plena) e retornando a ela após passar por todas as casas necessárias para completar sua jornada de autoconhecimento.</p>
      </div>
      
      <div class="card rules-section">
        <h3>Como Jogar</h3>
        <ol>
          <li>Para iniciar, você deve tirar o número 6 no dado.</li>
          <li>Após iniciar, jogue o dado e avance o número de casas indicado.</li>
          <li>Ao parar em uma casa, leia seu significado e reflita sobre ele.</li>
          <li>Se você parar em uma casa com a base de uma espada, suba até a casa onde está a ponta da espada.</li>
          <li>Se você parar em uma casa com a cabeça de uma serpente, desça até a casa onde está a cauda da serpente.</li>
          <li>Nas três últimas casas (70, 71 e 72), se o número tirado no dado for maior que o necessário para chegar à casa 72, você deve retroceder o número de casas excedentes.</li>
          <li>O jogo termina quando você retorna à casa 68 (Consciência Plena).</li>
        </ol>
      </div>
      
      <div class="card rules-section">
        <h3>Os 8 Planos</h3>
        <div class="plano-item" style="background-color: var(--plano-basico);">
          <strong>Plano Básico (casas 1-9):</strong> Representa os fundamentos da existência humana.
        </div>
        <div class="plano-item" style="background-color: var(--plano-imaginario);">
          <strong>Plano Imaginário (casas 10-18):</strong> Representa o mundo dos desejos e fantasias.
        </div>
        <div class="plano-item" style="background-color: var(--plano-racional);">
          <strong>Plano Racional (casas 19-27):</strong> Representa o intelecto e a razão.
        </div>
        <div class="plano-item" style="background-color: var(--plano-equilibrio);">
          <strong>Plano do Equilíbrio (casas 28-36):</strong> Representa a harmonia entre corpo, mente e espírito.
        </div>
        <div class="plano-item" style="background-color: var(--plano-abertura);">
          <strong>Plano da Abertura (casas 37-45):</strong> Representa a expansão da consciência.
        </div>
        <div class="plano-item" style="background-color: var(--plano-transformacao);">
          <strong>Plano da Transformação (casas 46-54):</strong> Representa as mudanças profundas no ser.
        </div>
        <div class="plano-item" style="background-color: var(--plano-conexao);">
          <strong>Plano da Conexão (casas 55-63):</strong> Representa a ligação com o divino.
        </div>
        <div class="plano-item" style="background-color: var(--plano-divino);">
          <strong>Plano Divino (casas 64-72):</strong> Representa a realização espiritual.
        </div>
      </div>
      
      <div class="card rules-section">
        <h3>Significado dos Números do Dado</h3>
        <ul>
          <li><strong>1:</strong> NÃO - Você ainda não está preparado, jogue outra vez, peça mentalmente para entrar.</li>
          <li><strong>2:</strong> Você está muito mental ou pensando muito.</li>
          <li><strong>3:</strong> Você está nervoso ou apressado.</li>
          <li><strong>4:</strong> Você está preocupado com coisas materiais. Está muito formal diante do jogo.</li>
          <li><strong>5:</strong> Você precisa silenciar um pouco os seus desejos e ouvir seu íntimo que te pede convicção, fé.</li>
          <li><strong>6:</strong> SIM - Você pode começar seu caminho pelo Mahalilah.</li>
        </ul>
      </div>
      
      <button class="btn" onclick="document.getElementById('btn-game').click()">Iniciar Jogo</button>
    `;
  }
  
  handleResize() {
    // Notificar o jogo sobre o redimensionamento
    if (this.game) {
      const canvasContainer = document.getElementById('game-canvas-container');
      if (canvasContainer) {
        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientHeight;
        this.game.resize(width, height);
      }
    }
  }
}
