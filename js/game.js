// Classe principal do jogo Mahalilah usando p5.js

class Game {
  constructor(p5Instance) {
    this.p5 = p5Instance;
    this.state = GAME_CONSTANTS.GAME_STATES.NOT_STARTED;
    this.board = new GameBoard(p5Instance);
    this.dice = new Dice(p5Instance);
    this.player = new Player(p5Instance);
    this.currentHouseMeaning = "";
    this.showMeaning = false;
    this.meaningTimeout = null;
    this.is3DEnabled = !isMobileDevice() && window.innerWidth > 768;
    this.images = {};
    this.sounds = {};
    this.canvasSize = { width: 800, height: 720, scale: 1 };
  }
  
  preload() {
    // Carregar imagens
    this.images.sword = this.p5.loadImage('assets/sword.png');
    this.images.snake = this.p5.loadImage('assets/snake.png');
    this.images.background = this.p5.loadImage('assets/background-pattern.png');
    
    // Carregar sons
    this.sounds.dice = this.p5.loadSound('assets/dice-roll.mp3');
    this.sounds.move = this.p5.loadSound('assets/move.mp3');
    this.sounds.sword = this.p5.loadSound('assets/sword.mp3');
    this.sounds.snake = this.p5.loadSound('assets/snake.mp3');
    this.sounds.win = this.p5.loadSound('assets/win.mp3');
  }
  
  setup() {
    // Configurar o tabuleiro
    this.board.setImages(this.images.sword, this.images.snake, this.images.background);
    
    // Configurar o dado
    this.dice.setPosition(this.canvasSize.width / 2, this.canvasSize.height - 100);
    
    // Configurar o jogador
    this.player.setColor(180, 100, 50);
    
    // Configurar o estado inicial do jogo
    this.setState(GAME_CONSTANTS.GAME_STATES.NOT_STARTED);
    
    // Configurar o volume dos sons
    Object.values(this.sounds).forEach(sound => {
      sound.setVolume(0.5);
    });
  }
  
  update() {
    // Atualizar o dado
    this.dice.update();
    
    // Atualizar o jogador
    this.player.updatePosition(this.board);
    
    // Verificar se o jogador chegou a uma nova casa
    if (!this.player.isAnimating() && this.state === GAME_CONSTANTS.GAME_STATES.MOVING) {
      const currentPosition = this.player.getCurrentPosition();
      
      // Mostrar o significado da casa
      this.showHouseMeaning(currentPosition);
      
      // Verificar se o jogo foi concluído
      if (isGameCompleted(currentPosition, this.player.hasGameStarted())) {
        this.setState(GAME_CONSTANTS.GAME_STATES.COMPLETED);
        this.sounds.win.play();
      } else {
        this.setState(GAME_CONSTANTS.GAME_STATES.SHOWING_MEANING);
      }
    }
  }
  
  draw() {
    // Limpar o canvas
    this.p5.background(245, 241, 235);
    
    // Desenhar o tabuleiro
    this.board.draw();
    
    // Desenhar o jogador
    this.player.draw();
    
    // Desenhar o dado
    if (this.is3DEnabled) {
      this.dice.draw();
    } else {
      this.dice.draw2D();
    }
    
    // Desenhar informações do jogo
    this.drawGameInfo();
  }
  
  drawGameInfo() {
    this.p5.push();
    
    // Desenhar o estado atual do jogo
    this.p5.fill(80, 40, 20);
    this.p5.noStroke();
    this.p5.textSize(16 * this.canvasSize.scale);
    this.p5.textAlign(this.p5.LEFT, this.p5.TOP);
    
    let stateText = "";
    switch (this.state) {
      case GAME_CONSTANTS.GAME_STATES.NOT_STARTED:
        stateText = "Clique no dado para começar o jogo";
        break;
      case GAME_CONSTANTS.GAME_STATES.WAITING_FOR_FIRST_SIX:
        stateText = "Tire 6 no dado para iniciar sua jornada";
        break;
      case GAME_CONSTANTS.GAME_STATES.PLAYING:
        stateText = "Sua vez de jogar. Clique no dado.";
        break;
      case GAME_CONSTANTS.GAME_STATES.MOVING:
        stateText = "Movendo...";
        break;
      case GAME_CONSTANTS.GAME_STATES.SHOWING_MEANING:
        stateText = "Significado da casa " + this.player.getCurrentPosition();
        break;
      case GAME_CONSTANTS.GAME_STATES.COMPLETED:
        stateText = "Parabéns! Você completou sua jornada!";
        break;
    }
    
    this.p5.text(stateText, 10 * this.canvasSize.scale, 10 * this.canvasSize.scale);
    
    // Desenhar o significado da casa atual
    if (this.showMeaning) {
      const padding = 20 * this.canvasSize.scale;
      const boxWidth = this.canvasSize.width - (padding * 2);
      const boxHeight = 100 * this.canvasSize.scale;
      const boxX = padding;
      const boxY = this.canvasSize.height - boxHeight - padding;
      
      // Desenhar o fundo
      this.p5.fill(255, 250, 240, 230);
      this.p5.stroke(180, 120, 40);
      this.p5.strokeWeight(2 * this.canvasSize.scale);
      this.p5.rect(boxX, boxY, boxWidth, boxHeight, 10 * this.canvasSize.scale);
      
      // Desenhar o texto
      this.p5.fill(80, 40, 20);
      this.p5.noStroke();
      this.p5.textSize(14 * this.canvasSize.scale);
      this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
      this.p5.text(this.currentHouseMeaning, 
                  boxX + padding, 
                  boxY + padding, 
                  boxWidth - (padding * 2), 
                  boxHeight - (padding * 2));
    }
    
    // Desenhar o significado do dado quando estiver esperando o primeiro 6
    if (this.state === GAME_CONSTANTS.GAME_STATES.WAITING_FOR_FIRST_SIX && !this.dice.isRolling()) {
      const diceValue = this.dice.getValue();
      const diceMeaning = getDiceMeaning(diceValue);
      
      if (diceMeaning) {
        const padding = 20 * this.canvasSize.scale;
        const boxWidth = this.canvasSize.width - (padding * 2);
        const boxHeight = 60 * this.canvasSize.scale;
        const boxX = padding;
        const boxY = this.canvasSize.height - boxHeight - padding - (this.showMeaning ? (120 * this.canvasSize.scale) : 0);
        
        // Desenhar o fundo
        this.p5.fill(255, 245, 230, 230);
        this.p5.stroke(180, 120, 40);
        this.p5.strokeWeight(2 * this.canvasSize.scale);
        this.p5.rect(boxX, boxY, boxWidth, boxHeight, 10 * this.canvasSize.scale);
        
        // Desenhar o texto
        this.p5.fill(80, 40, 20);
        this.p5.noStroke();
        this.p5.textSize(14 * this.canvasSize.scale);
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.text(diceMeaning, 
                    boxX + padding, 
                    boxY + padding, 
                    boxWidth - (padding * 2), 
                    boxHeight - (padding * 2));
      }
    }
    
    this.p5.pop();
  }
  
  handleClick(x, y) {
    // Verificar se o clique foi no dado
    const diceX = this.dice.position.x;
    const diceY = this.dice.position.y;
    const diceSize = this.dice.size;
    
    if (
      x >= diceX - diceSize/2 && 
      x <= diceX + diceSize/2 && 
      y >= diceY - diceSize/2 && 
      y <= diceY + diceSize/2
    ) {
      this.rollDice();
      return;
    }
    
    // Verificar se o clique foi em uma casa do tabuleiro
    const house = this.board.getHouseAtCoordinates(x, y);
    if (house) {
      this.showHouseMeaning(house.position);
      return;
    }
  }
  
  rollDice() {
    // Verificar se o dado já está rolando
    if (this.dice.isRolling()) return;
    
    // Verificar se o jogador está se movendo
    if (this.player.isAnimating()) return;
    
    // Verificar se estamos mostrando o significado de uma casa
    if (this.state === GAME_CONSTANTS.GAME_STATES.SHOWING_MEANING) {
      // Esconder o significado e permitir jogar o dado
      this.showMeaning = false;
      if (this.meaningTimeout) {
        clearTimeout(this.meaningTimeout);
        this.meaningTimeout = null;
      }
      this.setState(GAME_CONSTANTS.GAME_STATES.PLAYING);
    }
    
    // Rolar o dado
    const diceValue = this.dice.roll();
    this.sounds.dice.play();
    
    // Processar o resultado do dado com base no estado do jogo
    setTimeout(() => {
      switch (this.state) {
        case GAME_CONSTANTS.GAME_STATES.NOT_STARTED:
          this.setState(GAME_CONSTANTS.GAME_STATES.WAITING_FOR_FIRST_SIX);
          break;
          
        case GAME_CONSTANTS.GAME_STATES.WAITING_FOR_FIRST_SIX:
          if (diceValue === 6) {
            this.player.startGame();
            this.setState(GAME_CONSTANTS.GAME_STATES.PLAYING);
          }
          break;
          
        case GAME_CONSTANTS.GAME_STATES.PLAYING:
          // Mover o jogador com base no valor do dado
          if (this.player.moveByDiceRoll(diceValue)) {
            this.setState(GAME_CONSTANTS.GAME_STATES.MOVING);
            this.sounds.move.play();
          }
          break;
      }
    }, 1000); // Esperar 1 segundo para mostrar o resultado do dado
  }
  
  showHouseMeaning(position) {
    const houseName = getHouseName(position);
    const houseMeaning = getHouseMeaning(position);
    
    this.currentHouseMeaning = `${houseName}: ${houseMeaning}`;
    this.showMeaning = true;
    
    // Limpar o timeout anterior, se existir
    if (this.meaningTimeout) {
      clearTimeout(this.meaningTimeout);
    }
    
    // Configurar um novo timeout para esconder o significado após 5 segundos
    this.meaningTimeout = setTimeout(() => {
      if (this.state === GAME_CONSTANTS.GAME_STATES.SHOWING_MEANING) {
        this.showMeaning = false;
        this.setState(GAME_CONSTANTS.GAME_STATES.PLAYING);
      }
    }, 5000);
  }
  
  setState(newState) {
    this.state = newState;
    
    // Executar ações específicas para cada estado
    switch (newState) {
      case GAME_CONSTANTS.GAME_STATES.COMPLETED:
        // Ações para quando o jogo for concluído
        this.showHouseMeaning(GAME_CONSTANTS.START_POSITION);
        break;
    }
    
    // Atualizar a interface do usuário
    this.updateUI();
  }
  
  updateUI() {
    // Atualizar elementos da interface com base no estado atual
    const gameScreen = document.getElementById('game-screen');
    const gameControls = document.getElementById('game-controls');
    
    if (!gameScreen || !gameControls) return;
    
    // Limpar controles existentes
    gameControls.innerHTML = '';
    
    // Adicionar controles com base no estado
    switch (this.state) {
      case GAME_CONSTANTS.GAME_STATES.NOT_STARTED:
        const startButton = document.createElement('button');
        startButton.className = 'btn';
        startButton.textContent = 'Iniciar Jogo';
        startButton.onclick = () => this.rollDice();
        gameControls.appendChild(startButton);
        
        const objectSelector = document.createElement('div');
        objectSelector.className = 'object-selector';
        objectSelector.innerHTML = `
          <h3>Escolha seu objeto pessoal:</h3>
          <div class="object-options">
            <button class="object-btn active" data-object="crystal">Cristal</button>
            <button class="object-btn" data-object="coin">Moeda</button>
            <button class="object-btn" data-object="ring">Anel</button>
            <button class="object-btn" data-object="feather">Pena</button>
            <button class="object-btn" data-object="shell">Concha</button>
          </div>
        `;
        gameControls.appendChild(objectSelector);
        
        // Adicionar eventos aos botões de objeto
        const objectButtons = objectSelector.querySelectorAll('.object-btn');
        objectButtons.forEach(button => {
          button.addEventListener('click', () => {
            // Remover a classe active de todos os botões
            objectButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar a classe active ao botão clicado
            button.classList.add('active');
            // Definir o objeto pessoal do jogador
            this.player.setPersonalObject(button.dataset.object);
          });
        });
        break;
        
      case GAME_CONSTANTS.GAME_STATES.WAITING_FOR_FIRST_SIX:
      case GAME_CONSTANTS.GAME_STATES.PLAYING:
        const rollButton = document.createElement('button');
        rollButton.className = 'btn';
        rollButton.textContent = 'Jogar Dado';
        rollButton.onclick = () => this.rollDice();
        gameControls.appendChild(rollButton);
        break;
        
      case GAME_CONSTANTS.GAME_STATES.COMPLETED:
        const restartButton = document.createElement('button');
        restartButton.className = 'btn';
        restartButton.textContent = 'Jogar Novamente';
        restartButton.onclick = () => this.restart();
        gameControls.appendChild(restartButton);
        break;
    }
  }
  
  restart() {
    // Reiniciar o jogo
    this.player = new Player(this.p5);
    this.player.setColor(180, 100, 50);
    this.setState(GAME_CONSTANTS.GAME_STATES.NOT_STARTED);
    this.showMeaning = false;
    if (this.meaningTimeout) {
      clearTimeout(this.meaningTimeout);
      this.meaningTimeout = null;
    }
  }
  
  resize(width, height) {
    // Calcular o novo tamanho do canvas
    this.canvasSize = calculateCanvasSize();
    
    // Redimensionar os componentes do jogo
    this.board.resize(this.canvasSize.scale);
    this.dice.resize(this.canvasSize.scale);
    this.player.resize(this.canvasSize.scale);
    
    // Reposicionar o dado
    this.dice.setPosition(this.canvasSize.width / 2, this.canvasSize.height - 100 * this.canvasSize.scale);
  }
}
