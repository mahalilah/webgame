// Classe do tabuleiro do jogo Mahalilah usando p5.js

class GameBoard {
  constructor(p5Instance) {
    this.p5 = p5Instance;
    this.width = GAME_CONSTANTS.BOARD_WIDTH;
    this.height = GAME_CONSTANTS.BOARD_HEIGHT;
    this.cellWidth = this.width / GAME_CONSTANTS.HOUSES_PER_ROW;
    this.cellHeight = this.height / GAME_CONSTANTS.TOTAL_ROWS;
    
    // Carregar imagens
    this.loadImages();
    
    // Inicializar as posições das casas
    this.initializeHouses();
    
    // Inicializar as espadas e serpentes
    this.initializePathways();
  }
  
  loadImages() {
    // Imagens serão carregadas no preload do p5.js
    this.swordImg = null;
    this.snakeImg = null;
    this.backgroundPattern = null;
  }
  
  setImages(swordImg, snakeImg, backgroundPattern) {
    this.swordImg = swordImg;
    this.snakeImg = snakeImg;
    this.backgroundPattern = backgroundPattern;
  }
  
  initializeHouses() {
    this.houses = [];
    
    for (let position = 1; position <= GAME_CONSTANTS.TOTAL_HOUSES; position++) {
      const grid = positionToGrid(position);
      const plane = getPlaneByPosition(position);
      
      this.houses.push({
        position: position,
        grid: grid,
        name: getHouseName(position),
        plane: plane,
        x: grid.col * this.cellWidth + this.cellWidth / 2,
        y: grid.row * this.cellHeight + this.cellHeight / 2,
        width: this.cellWidth,
        height: this.cellHeight
      });
    }
  }
  
  initializePathways() {
    // Inicializar espadas (subidas)
    this.swords = [];
    for (const [start, end] of Object.entries(GAME_CONSTANTS.SWORDS)) {
      const startPos = parseInt(start);
      const endPos = parseInt(end);
      const startHouse = this.getHouseByPosition(startPos);
      const endHouse = this.getHouseByPosition(endPos);
      
      if (startHouse && endHouse) {
        this.swords.push({
          start: startHouse,
          end: endHouse,
          startPos: startPos,
          endPos: endPos
        });
      }
    }
    
    // Inicializar serpentes (descidas)
    this.snakes = [];
    for (const [start, end] of Object.entries(GAME_CONSTANTS.SNAKES)) {
      const startPos = parseInt(start);
      const endPos = parseInt(end);
      const startHouse = this.getHouseByPosition(startPos);
      const endHouse = this.getHouseByPosition(endPos);
      
      if (startHouse && endHouse) {
        this.snakes.push({
          start: startHouse,
          end: endHouse,
          startPos: startPos,
          endPos: endPos
        });
      }
    }
  }
  
  getHouseByPosition(position) {
    return this.houses.find(house => house.position === position);
  }
  
  getHouseAtCoordinates(x, y) {
    // Converter coordenadas do mouse para coordenadas do tabuleiro
    const scaledX = x / this.p5.scale;
    const scaledY = y / this.p5.scale;
    
    for (const house of this.houses) {
      const houseX = house.x - house.width / 2;
      const houseY = house.y - house.height / 2;
      
      if (
        scaledX >= houseX && 
        scaledX <= houseX + house.width && 
        scaledY >= houseY && 
        scaledY <= houseY + house.height
      ) {
        return house;
      }
    }
    
    return null;
  }
  
  draw() {
    this.p5.push();
    
    // Desenhar o fundo do tabuleiro
    this.drawBackground();
    
    // Desenhar as casas
    this.drawHouses();
    
    // Desenhar as espadas e serpentes
    this.drawPathways();
    
    this.p5.pop();
  }
  
  drawBackground() {
    // Desenhar o fundo com padrão
    if (this.backgroundPattern) {
      this.p5.image(this.backgroundPattern, 0, 0, this.width, this.height);
    } else {
      // Fallback se a imagem não estiver carregada
      this.p5.background(245, 241, 235);
    }
    
    // Desenhar bordas para os planos
    for (let i = 0; i < GAME_CONSTANTS.TOTAL_ROWS; i++) {
      const planeColor = Object.values(GAME_CONSTANTS.COLORS)[i];
      this.p5.fill(...planeColor, 50);
      this.p5.noStroke();
      this.p5.rect(0, i * this.cellHeight, this.width, this.cellHeight);
      
      // Desenhar o nome do plano
      this.p5.fill(80, 40, 20);
      this.p5.textSize(16);
      this.p5.textAlign(this.p5.RIGHT, this.p5.CENTER);
      
      const planeNames = [
        "Plano Divino",
        "Plano da Conexão",
        "Plano da Transformação",
        "Plano da Abertura",
        "Plano do Equilíbrio",
        "Plano Racional",
        "Plano Imaginário",
        "Plano Básico"
      ];
      
      this.p5.text(planeNames[i], this.width - 10, i * this.cellHeight + this.cellHeight / 2);
    }
  }
  
  drawHouses() {
    for (const house of this.houses) {
      const x = house.x - this.cellWidth / 2;
      const y = house.y - this.cellHeight / 2;
      
      // Desenhar o fundo da casa
      this.p5.fill(...house.plane.color, 200);
      this.p5.stroke(100, 70, 40);
      this.p5.strokeWeight(1);
      this.p5.rect(x, y, this.cellWidth, this.cellHeight, 5);
      
      // Desenhar o número da casa
      this.p5.fill(80, 40, 20);
      this.p5.noStroke();
      this.p5.textSize(16);
      this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
      this.p5.text(house.position, house.x, house.y - 10);
      
      // Desenhar o nome da casa (abreviado)
      this.p5.textSize(10);
      this.p5.text(house.name.substring(0, 12), house.x, house.y + 10);
      
      // Destacar a casa inicial (68)
      if (house.position === GAME_CONSTANTS.START_POSITION) {
        this.p5.stroke(255, 215, 0);
        this.p5.strokeWeight(3);
        this.p5.noFill();
        this.p5.rect(x, y, this.cellWidth, this.cellHeight, 5);
      }
    }
  }
  
  drawPathways() {
    // Desenhar as espadas (subidas)
    for (const sword of this.swords) {
      this.drawSword(sword.start, sword.end);
    }
    
    // Desenhar as serpentes (descidas)
    for (const snake of this.snakes) {
      this.drawSnake(snake.start, snake.end);
    }
  }
  
  drawSword(startHouse, endHouse) {
    if (this.swordImg) {
      // Calcular o ângulo entre as casas
      const angle = this.p5.atan2(endHouse.y - startHouse.y, endHouse.x - startHouse.x);
      
      // Calcular a distância entre as casas
      const distance = this.p5.dist(startHouse.x, startHouse.y, endHouse.x, endHouse.y);
      
      // Desenhar a espada como uma imagem
      this.p5.push();
      this.p5.translate(startHouse.x, startHouse.y);
      this.p5.rotate(angle);
      this.p5.image(this.swordImg, 0, -10, distance, 20);
      this.p5.pop();
    } else {
      // Fallback se a imagem não estiver carregada
      this.p5.stroke(100, 150, 255);
      this.p5.strokeWeight(3);
      this.p5.line(startHouse.x, startHouse.y, endHouse.x, endHouse.y);
      
      // Desenhar uma seta na ponta
      const angle = this.p5.atan2(endHouse.y - startHouse.y, endHouse.x - startHouse.x);
      const arrowSize = 10;
      
      this.p5.push();
      this.p5.translate(endHouse.x, endHouse.y);
      this.p5.rotate(angle);
      this.p5.fill(100, 150, 255);
      this.p5.triangle(0, 0, -arrowSize, arrowSize/2, -arrowSize, -arrowSize/2);
      this.p5.pop();
    }
  }
  
  drawSnake(startHouse, endHouse) {
    if (this.snakeImg) {
      // Calcular o ângulo entre as casas
      const angle = this.p5.atan2(endHouse.y - startHouse.y, endHouse.x - startHouse.x);
      
      // Calcular a distância entre as casas
      const distance = this.p5.dist(startHouse.x, startHouse.y, endHouse.x, endHouse.y);
      
      // Desenhar a serpente como uma imagem
      this.p5.push();
      this.p5.translate(startHouse.x, startHouse.y);
      this.p5.rotate(angle);
      this.p5.image(this.snakeImg, 0, -10, distance, 20);
      this.p5.pop();
    } else {
      // Fallback se a imagem não estiver carregada
      this.p5.stroke(50, 180, 50);
      this.p5.strokeWeight(3);
      
      // Desenhar uma linha ondulada para representar a serpente
      const segments = 20;
      const amplitude = 10;
      const dx = (endHouse.x - startHouse.x) / segments;
      const dy = (endHouse.y - startHouse.y) / segments;
      const angle = this.p5.atan2(dy, dx);
      const perpX = -Math.sin(angle) * amplitude;
      const perpY = Math.cos(angle) * amplitude;
      
      this.p5.beginShape();
      this.p5.noFill();
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = this.p5.lerp(startHouse.x, endHouse.x, t);
        const y = this.p5.lerp(startHouse.y, endHouse.y, t);
        const offset = Math.sin(t * Math.PI * 4);
        this.p5.vertex(x + perpX * offset, y + perpY * offset);
      }
      this.p5.endShape();
      
      // Desenhar a cabeça da serpente
      this.p5.fill(50, 180, 50);
      this.p5.noStroke();
      this.p5.ellipse(endHouse.x, endHouse.y, 8, 8);
    }
  }
  
  highlightHouse(position) {
    const house = this.getHouseByPosition(position);
    if (house) {
      this.p5.push();
      this.p5.stroke(255, 215, 0);
      this.p5.strokeWeight(3);
      this.p5.noFill();
      this.p5.rect(
        house.x - this.cellWidth / 2, 
        house.y - this.cellHeight / 2, 
        this.cellWidth, 
        this.cellHeight, 
        5
      );
      this.p5.pop();
    }
  }
  
  resize(scale) {
    this.cellWidth = (this.width * scale) / GAME_CONSTANTS.HOUSES_PER_ROW;
    this.cellHeight = (this.height * scale) / GAME_CONSTANTS.TOTAL_ROWS;
    
    // Recalcular as posições das casas
    for (const house of this.houses) {
      house.x = house.grid.col * this.cellWidth + this.cellWidth / 2;
      house.y = house.grid.row * this.cellHeight + this.cellHeight / 2;
      house.width = this.cellWidth;
      house.height = this.cellHeight;
    }
  }
}
