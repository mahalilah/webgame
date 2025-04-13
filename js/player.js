// Classe do jogador para o jogo Mahalilah usando p5.js

class Player {
  constructor(p5Instance) {
    this.p5 = p5Instance;
    this.position = GAME_CONSTANTS.START_POSITION; // Começa na casa 68 (Consciência Plena)
    this.targetPosition = this.position;
    this.animating = false;
    this.animationStartTime = 0;
    this.animationDuration = 500; // 500ms por casa
    this.size = 30;
    this.color = [180, 100, 50]; // Cor padrão do jogador
    this.gridPosition = positionToGrid(this.position);
    this.x = 0;
    this.y = 0;
    this.gameStarted = false;
    this.personalObject = "crystal"; // Objeto padrão
    
    // Opções de objetos pessoais
    this.objectOptions = ["crystal", "coin", "ring", "feather", "shell"];
  }
  
  setPersonalObject(object) {
    if (this.objectOptions.includes(object)) {
      this.personalObject = object;
    }
  }
  
  setColor(r, g, b) {
    this.color = [r, g, b];
  }
  
  updatePosition(board) {
    if (this.animating) {
      const currentTime = this.p5.millis();
      const elapsed = currentTime - this.animationStartTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);
      
      // Função de easing para movimento mais natural
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      // Obter as posições de grade inicial e final
      const startGrid = positionToGrid(this.position);
      const endGrid = positionToGrid(this.targetPosition);
      
      // Interpolar entre as posições
      const currentRow = this.p5.lerp(startGrid.row, endGrid.row, easeProgress);
      const currentCol = this.p5.lerp(startGrid.col, endGrid.col, easeProgress);
      
      // Converter para coordenadas de pixel
      const cellWidth = board.cellWidth;
      const cellHeight = board.cellHeight;
      this.x = currentCol * cellWidth + cellWidth / 2;
      this.y = currentRow * cellHeight + cellHeight / 2;
      
      // Verificar se a animação terminou
      if (progress >= 1) {
        this.animating = false;
        this.position = this.targetPosition;
        this.gridPosition = positionToGrid(this.position);
        
        // Verificar se há espada ou serpente na posição atual
        const sword = checkForSword(this.position);
        const snake = checkForSnake(this.position);
        
        if (sword) {
          // Iniciar animação para a nova posição (subida pela espada)
          setTimeout(() => {
            this.moveToPosition(sword, 800);
          }, 500);
        } else if (snake) {
          // Iniciar animação para a nova posição (descida pela serpente)
          setTimeout(() => {
            this.moveToPosition(snake, 800);
          }, 500);
        }
      }
    } else {
      // Quando não está animando, atualizar a posição com base na grade
      const cellWidth = board.cellWidth;
      const cellHeight = board.cellHeight;
      this.x = this.gridPosition.col * cellWidth + cellWidth / 2;
      this.y = this.gridPosition.row * cellHeight + cellHeight / 2;
    }
  }
  
  moveToPosition(newPosition, duration = 500) {
    if (this.animating) return false;
    
    this.targetPosition = newPosition;
    this.animating = true;
    this.animationStartTime = this.p5.millis();
    this.animationDuration = duration;
    
    return true;
  }
  
  moveByDiceRoll(diceValue) {
    if (this.animating) return false;
    
    // Calcular a nova posição com base no valor do dado
    const newPosition = calculateNewPosition(this.position, diceValue);
    
    // Iniciar a animação para a nova posição
    return this.moveToPosition(newPosition);
  }
  
  draw() {
    this.p5.push();
    
    // Desenhar o objeto pessoal do jogador
    switch (this.personalObject) {
      case "crystal":
        this.drawCrystal();
        break;
      case "coin":
        this.drawCoin();
        break;
      case "ring":
        this.drawRing();
        break;
      case "feather":
        this.drawFeather();
        break;
      case "shell":
        this.drawShell();
        break;
      default:
        this.drawCrystal();
    }
    
    this.p5.pop();
  }
  
  drawCrystal() {
    // Desenhar um cristal (forma de diamante)
    this.p5.fill(...this.color, 200);
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    
    this.p5.beginShape();
    this.p5.vertex(this.x, this.y - this.size/2);
    this.p5.vertex(this.x + this.size/3, this.y);
    this.p5.vertex(this.x, this.y + this.size/2);
    this.p5.vertex(this.x - this.size/3, this.y);
    this.p5.endShape(this.p5.CLOSE);
    
    // Adicionar brilho
    this.p5.fill(255, 255, 255, 150);
    this.p5.noStroke();
    this.p5.beginShape();
    this.p5.vertex(this.x, this.y - this.size/2);
    this.p5.vertex(this.x + this.size/6, this.y - this.size/6);
    this.p5.vertex(this.x, this.y);
    this.p5.vertex(this.x - this.size/6, this.y - this.size/6);
    this.p5.endShape(this.p5.CLOSE);
  }
  
  drawCoin() {
    // Desenhar uma moeda (círculo)
    this.p5.fill(255, 215, 0, 200);
    this.p5.stroke(139, 69, 19);
    this.p5.strokeWeight(1);
    this.p5.ellipse(this.x, this.y, this.size, this.size);
    
    // Adicionar detalhes à moeda
    this.p5.fill(218, 165, 32);
    this.p5.noStroke();
    this.p5.ellipse(this.x, this.y, this.size * 0.7, this.size * 0.7);
    
    // Símbolo na moeda
    this.p5.fill(255, 223, 0);
    this.p5.textSize(this.size * 0.4);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.text("ॐ", this.x, this.y);
  }
  
  drawRing() {
    // Desenhar um anel
    this.p5.fill(255, 215, 0, 0);
    this.p5.stroke(255, 215, 0);
    this.p5.strokeWeight(3);
    this.p5.ellipse(this.x, this.y, this.size, this.size);
    
    // Adicionar uma pedra ao anel
    this.p5.fill(...this.color);
    this.p5.noStroke();
    this.p5.ellipse(this.x, this.y - this.size/4, this.size/3, this.size/3);
  }
  
  drawFeather() {
    // Desenhar uma pena
    this.p5.push();
    this.p5.translate(this.x, this.y);
    this.p5.rotate(this.p5.PI / 6);
    
    // Haste da pena
    this.p5.stroke(200);
    this.p5.strokeWeight(1);
    this.p5.line(0, -this.size/2, 0, this.size/2);
    
    // Barbas da pena
    this.p5.fill(...this.color, 150);
    this.p5.noStroke();
    this.p5.beginShape();
    this.p5.vertex(0, -this.size/2);
    this.p5.vertex(this.size/3, 0);
    this.p5.vertex(0, this.size/2);
    this.p5.endShape(this.p5.CLOSE);
    
    this.p5.pop();
  }
  
  drawShell() {
    // Desenhar uma concha
    this.p5.fill(...this.color, 200);
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    
    // Forma básica da concha
    this.p5.ellipse(this.x, this.y, this.size, this.size * 0.8);
    
    // Padrão espiral
    this.p5.noFill();
    this.p5.stroke(255, 255, 255, 150);
    this.p5.strokeWeight(2);
    this.p5.beginShape();
    for (let i = 0; i < 360; i += 30) {
      const angle = this.p5.radians(i);
      const radius = (this.size/2) * (1 - i/360);
      const sx = this.x + Math.cos(angle) * radius;
      const sy = this.y + Math.sin(angle) * radius;
      this.p5.vertex(sx, sy);
    }
    this.p5.endShape();
  }
  
  isAnimating() {
    return this.animating;
  }
  
  getCurrentPosition() {
    return this.position;
  }
  
  getTargetPosition() {
    return this.targetPosition;
  }
  
  startGame() {
    this.gameStarted = true;
  }
  
  hasGameStarted() {
    return this.gameStarted;
  }
  
  resize(scale) {
    this.size = 30 * scale;
  }
}
