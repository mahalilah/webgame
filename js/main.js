// Arquivo principal para inicialização do jogo Mahalilah com p5.js

// Variáveis globais
let game;
let canvas;

// Função de inicialização do p5.js
function setup() {
  // Criar o canvas dentro do container
  const container = document.getElementById('game-canvas-container');
  const canvasSize = calculateCanvasSize();
  
  canvas = createCanvas(canvasSize.width, canvasSize.height, WEBGL);
  canvas.parent('game-canvas-container');
  
  // Habilitar o modo 3D se o dispositivo suportar
  const is3DEnabled = !isMobileDevice() && window.innerWidth > 768;
  if (!is3DEnabled) {
    noLoop(); // Desativar o loop para dispositivos que não suportam 3D
    // Recriar o canvas em modo 2D
    remove();
    canvas = createCanvas(canvasSize.width, canvasSize.height);
    canvas.parent('game-canvas-container');
    loop(); // Reativar o loop
  }
  
  // Configurar o p5.js
  angleMode(RADIANS);
  rectMode(CORNER);
  imageMode(CORNER);
  textFont('Poppins');
  
  // Criar e configurar o jogo
  game = new Game(window);
  game.setup();
  
  // Criar a interface do usuário
  const ui = new UI(game);
  
  // Adicionar a escala ao objeto p5 para uso nos componentes do jogo
  window.scale = canvasSize.scale;
  
  // Mostrar a tela inicial por padrão
  ui.showScreen('home-screen');
}

// Função de desenho do p5.js (loop principal)
function draw() {
  // Verificar se o jogo foi inicializado
  if (!game) return;
  
  // Atualizar o estado do jogo
  game.update();
  
  // Desenhar o jogo
  game.draw();
}

// Função de redimensionamento da janela
function windowResized() {
  // Recalcular o tamanho do canvas
  const canvasSize = calculateCanvasSize();
  resizeCanvas(canvasSize.width, canvasSize.height);
  
  // Atualizar a escala no objeto p5
  window.scale = canvasSize.scale;
  
  // Redimensionar o jogo
  if (game) {
    game.resize(canvasSize.width, canvasSize.height);
  }
}

// Função de clique do mouse
function mouseClicked() {
  // Verificar se o jogo foi inicializado
  if (!game) return;
  
  // Verificar se o clique foi dentro do canvas
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // Passar o clique para o jogo
    game.handleClick(mouseX, mouseY);
  }
}

// Função para carregar recursos antes de iniciar o jogo
function preload() {
  // Verificar se o jogo foi inicializado
  if (game) {
    game.preload();
  }
}

// Inicializar o jogo quando a página for carregada
window.onload = function() {
  // Verificar se o p5.js foi carregado
  if (typeof p5 !== 'undefined') {
    // O p5.js já está disponível, não é necessário fazer nada
    console.log('p5.js já está carregado');
  } else {
    // O p5.js não foi carregado, exibir mensagem de erro
    console.error('p5.js não foi carregado corretamente');
    
    // Exibir mensagem de erro para o usuário
    const container = document.getElementById('game-canvas-container');
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <h2>Erro ao carregar o jogo</h2>
          <p>Não foi possível carregar as bibliotecas necessárias para o jogo.</p>
          <p>Por favor, verifique sua conexão com a internet e tente novamente.</p>
          <button onclick="location.reload()">Tentar Novamente</button>
        </div>
      `;
    }
  }
};
