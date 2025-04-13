// Classe do dado para o jogo Mahalilah usando p5.js

class Dice {
  constructor(p5Instance) {
    this.p5 = p5Instance;
    this.value = 1;
    this.rolling = false;
    this.rollStartTime = 0;
    this.rollDuration = 1000; // 1 segundo
    this.size = 80;
    this.position = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.targetRotation = { x: 0, y: 0, z: 0 };
    this.rollValues = [];
    this.rollIndex = 0;
    this.rollInterval = 100; // 100ms entre cada valor durante a rolagem
    this.lastRollTime = 0;
    
    // Mapeamento de rotações para cada face do dado
    this.faceRotations = [
      { x: 0, y: 0, z: 0 },         // 1 (face superior)
      { x: 0, y: Math.PI / 2, z: 0 }, // 2 (face direita)
      { x: Math.PI / 2, y: 0, z: 0 }, // 3 (face frontal)
      { x: -Math.PI / 2, y: 0, z: 0 }, // 4 (face traseira)
      { x: 0, y: -Math.PI / 2, z: 0 }, // 5 (face esquerda)
      { x: Math.PI, y: 0, z: 0 }      // 6 (face inferior)
    ];
  }
  
  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }
  
  roll() {
    if (this.rolling) return;
    
    this.rolling = true;
    this.rollStartTime = this.p5.millis();
    
    // Gerar valores aleatórios para a animação
    this.rollValues = [];
    for (let i = 0; i < 10; i++) {
      this.rollValues.push(Math.floor(Math.random() * 6) + 1);
    }
    
    // Garantir que o último valor seja diferente do penúltimo
    const finalValue = Math.floor(Math.random() * 6) + 1;
    if (this.rollValues[this.rollValues.length - 1] === finalValue) {
      this.rollValues.push(finalValue === 6 ? 1 : finalValue + 1);
    } else {
      this.rollValues.push(finalValue);
    }
    
    this.rollIndex = 0;
    this.lastRollTime = this.p5.millis();
    
    // Definir a rotação alvo com base no valor final
    const finalIndex = this.rollValues[this.rollValues.length - 1] - 1;
    this.targetRotation = { ...this.faceRotations[finalIndex] };
    
    // Adicionar rotações extras para efeito visual
    this.targetRotation.x += Math.PI * 2 * (2 + Math.random());
    this.targetRotation.y += Math.PI * 2 * (2 + Math.random());
    this.targetRotation.z += Math.PI * 2 * Math.random();
    
    return this.rollValues[this.rollValues.length - 1];
  }
  
  update() {
    if (this.rolling) {
      const currentTime = this.p5.millis();
      const elapsed = currentTime - this.rollStartTime;
      
      // Atualizar o valor exibido durante a rolagem
      if (currentTime - this.lastRollTime > this.rollInterval && this.rollIndex < this.rollValues.length - 1) {
        this.rollIndex++;
        this.value = this.rollValues[this.rollIndex];
        this.lastRollTime = currentTime;
      }
      
      // Calcular o progresso da animação
      const progress = Math.min(elapsed / this.rollDuration, 1);
      
      // Função de easing para movimento mais natural
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      // Interpolar a rotação atual para a rotação alvo
      this.rotation.x = this.p5.lerp(0, this.targetRotation.x, easeProgress);
      this.rotation.y = this.p5.lerp(0, this.targetRotation.y, easeProgress);
      this.rotation.z = this.p5.lerp(0, this.targetRotation.z, easeProgress);
      
      // Verificar se a animação terminou
      if (progress >= 1) {
        this.rolling = false;
        this.value = this.rollValues[this.rollValues.length - 1];
      }
    }
  }
  
  draw() {
    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    
    // Aplicar rotações
    this.p5.rotateX(this.rotation.x);
    this.p5.rotateY(this.rotation.y);
    this.p5.rotateZ(this.rotation.z);
    
    // Desenhar o cubo
    this.p5.stroke(80, 40, 20);
    this.p5.strokeWeight(2);
    this.p5.fill(255);
    this.p5.box(this.size);
    
    // Desenhar os pontos nas faces
    this.drawDots();
    
    this.p5.pop();
  }
  
  drawDots() {
    const halfSize = this.size / 2;
    const dotSize = this.size / 10;
    const offset = this.size / 4;
    
    this.p5.fill(80, 40, 20);
    this.p5.noStroke();
    
    // Face 1 (frente)
    this.p5.push();
    this.p5.translate(0, 0, halfSize);
    this.p5.ellipse(0, 0, dotSize, dotSize);
    this.p5.pop();
    
    // Face 2 (direita)
    this.p5.push();
    this.p5.translate(halfSize, 0, 0);
    this.p5.rotateY(this.p5.HALF_PI);
    this.p5.ellipse(-offset, -offset, dotSize, dotSize);
    this.p5.ellipse(offset, offset, dotSize, dotSize);
    this.p5.pop();
    
    // Face 3 (cima)
    this.p5.push();
    this.p5.translate(0, -halfSize, 0);
    this.p5.rotateX(this.p5.HALF_PI);
    this.p5.ellipse(-offset, -offset, dotSize, dotSize);
    this.p5.ellipse(0, 0, dotSize, dotSize);
    this.p5.ellipse(offset, offset, dotSize, dotSize);
    this.p5.pop();
    
    // Face 4 (baixo)
    this.p5.push();
    this.p5.translate(0, halfSize, 0);
    this.p5.rotateX(-this.p5.HALF_PI);
    this.p5.ellipse(-offset, -offset, dotSize, dotSize);
    this.p5.ellipse(-offset, offset, dotSize, dotSize);
    this.p5.ellipse(offset, -offset, dotSize, dotSize);
    this.p5.ellipse(offset, offset, dotSize, dotSize);
    this.p5.pop();
    
    // Face 5 (esquerda)
    this.p5.push();
    this.p5.translate(-halfSize, 0, 0);
    this.p5.rotateY(-this.p5.HALF_PI);
    this.p5.ellipse(-offset, -offset, dotSize, dotSize);
    this.p5.ellipse(-offset, offset, dotSize, dotSize);
    this.p5.ellipse(0, 0, dotSize, dotSize);
    this.p5.ellipse(offset, -offset, dotSize, dotSize);
    this.p5.ellipse(offset, offset, dotSize, dotSize);
    this.p5.pop();
    
    // Face 6 (trás)
    this.p5.push();
    this.p5.translate(0, 0, -halfSize);
    this.p5.rotateY(this.p5.PI);
    this.p5.ellipse(-offset, -offset, dotSize, dotSize);
    this.p5.ellipse(-offset, 0, dotSize, dotSize);
    this.p5.ellipse(-offset, offset, dotSize, dotSize);
    this.p5.ellipse(offset, -offset, dotSize, dotSize);
    this.p5.ellipse(offset, 0, dotSize, dotSize);
    this.p5.ellipse(offset, offset, dotSize, dotSize);
    this.p5.pop();
  }
  
  isRolling() {
    return this.rolling;
  }
  
  getValue() {
    return this.value;
  }
  
  getMeaning() {
    return getDiceMeaning(this.value);
  }
  
  // Versão 2D do dado para dispositivos com menor capacidade
  draw2D() {
    this.p5.push();
    
    // Desenhar o fundo do dado
    this.p5.fill(255);
    this.p5.stroke(80, 40, 20);
    this.p5.strokeWeight(2);
    this.p5.rect(this.position.x - this.size/2, this.position.y - this.size/2, this.size, this.size, 10);
    
    // Desenhar os pontos com base no valor atual
    this.p5.fill(80, 40, 20);
    this.p5.noStroke();
    
    const dotSize = this.size / 8;
    const offset = this.size / 4;
    
    switch (this.value) {
      case 1:
        this.p5.ellipse(this.position.x, this.position.y, dotSize, dotSize);
        break;
      case 2:
        this.p5.ellipse(this.position.x - offset, this.position.y - offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y + offset, dotSize, dotSize);
        break;
      case 3:
        this.p5.ellipse(this.position.x - offset, this.position.y - offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x, this.position.y, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y + offset, dotSize, dotSize);
        break;
      case 4:
        this.p5.ellipse(this.position.x - offset, this.position.y - offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x - offset, this.position.y + offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y - offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y + offset, dotSize, dotSize);
        break;
      case 5:
        this.p5.ellipse(this.position.x - offset, this.position.y - offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x - offset, this.position.y + offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x, this.position.y, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y - offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y + offset, dotSize, dotSize);
        break;
      case 6:
        this.p5.ellipse(this.position.x - offset, this.position.y - offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x - offset, this.position.y, dotSize, dotSize);
        this.p5.ellipse(this.position.x - offset, this.position.y + offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y - offset, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y, dotSize, dotSize);
        this.p5.ellipse(this.position.x + offset, this.position.y + offset, dotSize, dotSize);
        break;
    }
    
    // Efeito de "tremor" durante a rolagem
    if (this.rolling) {
      const shakeAmount = 5 * (1 - Math.min((this.p5.millis() - this.rollStartTime) / this.rollDuration, 1));
      this.p5.translate(
        this.p5.random(-shakeAmount, shakeAmount),
        this.p5.random(-shakeAmount, shakeAmount)
      );
    }
    
    this.p5.pop();
  }
  
  resize(scale) {
    this.size = 80 * scale;
  }
}
