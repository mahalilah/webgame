// Funções utilitárias para o jogo Mahalilah

// Função para obter o plano com base na posição
function getPlaneByPosition(position) {
    if (position >= 1 && position <= 9) {
        return {
            name: "Plano Básico",
            color: GAME_CONSTANTS.COLORS.PLANO_BASICO,
            index: 0
        };
    } else if (position >= 10 && position <= 18) {
        return {
            name: "Plano Imaginário",
            color: GAME_CONSTANTS.COLORS.PLANO_IMAGINARIO,
            index: 1
        };
    } else if (position >= 19 && position <= 27) {
        return {
            name: "Plano Racional",
            color: GAME_CONSTANTS.COLORS.PLANO_RACIONAL,
            index: 2
        };
    } else if (position >= 28 && position <= 36) {
        return {
            name: "Plano do Equilíbrio",
            color: GAME_CONSTANTS.COLORS.PLANO_EQUILIBRIO,
            index: 3
        };
    } else if (position >= 37 && position <= 45) {
        return {
            name: "Plano da Abertura",
            color: GAME_CONSTANTS.COLORS.PLANO_ABERTURA,
            index: 4
        };
    } else if (position >= 46 && position <= 54) {
        return {
            name: "Plano da Transformação",
            color: GAME_CONSTANTS.COLORS.PLANO_TRANSFORMACAO,
            index: 5
        };
    } else if (position >= 55 && position <= 63) {
        return {
            name: "Plano da Conexão",
            color: GAME_CONSTANTS.COLORS.PLANO_CONEXAO,
            index: 6
        };
    } else if (position >= 64 && position <= 72) {
        return {
            name: "Plano Divino",
            color: GAME_CONSTANTS.COLORS.PLANO_DIVINO,
            index: 7
        };
    }
    return {
        name: "",
        color: [255, 255, 255],
        index: -1
    };
}

// Função para calcular a nova posição após mover um número de casas
function calculateNewPosition(currentPosition, steps) {
    let newPosition = currentPosition + steps;
    
    // Lógica especial para as três últimas casas (70, 71, 72)
    if (currentPosition >= 69 && newPosition > 72) {
        // Calcular o movimento de ida e volta
        const extraSteps = newPosition - 72;
        newPosition = 72 - extraSteps;
        
        // Se ainda estiver além do limite, continuar o movimento
        if (newPosition < 70) {
            newPosition = 70 + (70 - newPosition);
        }
    }
    
    return newPosition;
}

// Função para verificar se a posição atual tem uma espada (subida)
function checkForSword(position) {
    return GAME_CONSTANTS.SWORDS[position] || null;
}

// Função para verificar se a posição atual tem uma serpente (descida)
function checkForSnake(position) {
    return GAME_CONSTANTS.SNAKES[position] || null;
}

// Função para verificar se o jogo foi concluído (retorno à casa 68 após iniciar)
function isGameCompleted(position, gameStarted) {
    return position === GAME_CONSTANTS.START_POSITION && gameStarted;
}

// Função para obter o nome da casa
function getHouseName(position) {
    return GAME_CONSTANTS.HOUSE_NAMES[position] || `Casa ${position}`;
}

// Função para obter o significado da casa
function getHouseMeaning(position) {
    return GAME_CONSTANTS.HOUSE_MEANINGS[position] || "Significado não disponível para esta casa.";
}

// Função para obter o significado do número do dado
function getDiceMeaning(value) {
    return GAME_CONSTANTS.DICE_MEANINGS[value] || "";
}

// Função para converter coordenadas de grade para coordenadas de pixel
function gridToPixel(row, col, cellWidth, cellHeight) {
    return {
        x: col * cellWidth,
        y: row * cellHeight
    };
}

// Função para converter posição da casa para coordenadas de grade
function positionToGrid(position) {
    const row = Math.floor((position - 1) / GAME_CONSTANTS.HOUSES_PER_ROW);
    const col = (position - 1) % GAME_CONSTANTS.HOUSES_PER_ROW;
    
    // Ajuste para o ziguezague (linhas alternadas são invertidas)
    const adjustedCol = row % 2 === 0 ? col : (GAME_CONSTANTS.HOUSES_PER_ROW - 1) - col;
    
    // Inverter as linhas para que a casa 1 fique na parte inferior
    const adjustedRow = (GAME_CONSTANTS.TOTAL_ROWS - 1) - row;
    
    return {
        row: adjustedRow,
        col: adjustedCol
    };
}

// Função para animar movimento entre duas posições
function animateMovement(startPos, endPos, duration, callback) {
    const startTime = millis();
    const startGrid = positionToGrid(startPos);
    const endGrid = positionToGrid(endPos);
    
    return function() {
        const elapsed = millis() - startTime;
        const progress = min(elapsed / duration, 1);
        
        // Função de easing para movimento mais natural
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        const currentRow = lerp(startGrid.row, endGrid.row, easeProgress);
        const currentCol = lerp(startGrid.col, endGrid.col, easeProgress);
        
        if (progress >= 1) {
            callback();
            return true; // Animação concluída
        }
        
        return {
            row: currentRow,
            col: currentCol,
            completed: false
        };
    };
}

// Função para desenhar texto com contorno
function drawTextWithOutline(txt, x, y, fillColor, strokeColor, strokeWeight, textSize) {
    push();
    textAlign(CENTER, CENTER);
    textSize(textSize);
    
    // Desenhar o contorno
    fill(strokeColor);
    for (let i = -strokeWeight; i <= strokeWeight; i++) {
        for (let j = -strokeWeight; j <= strokeWeight; j++) {
            if (i !== 0 || j !== 0) {
                text(txt, x + i, y + j);
            }
        }
    }
    
    // Desenhar o texto principal
    fill(fillColor);
    text(txt, x, y);
    pop();
}

// Função para verificar se o dispositivo é móvel
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

// Função para ajustar o tamanho do canvas com base no tamanho da tela
function calculateCanvasSize() {
    const container = document.getElementById('game-canvas-container');
    const containerWidth = container.clientWidth;
    
    // Manter a proporção do tabuleiro
    const ratio = GAME_CONSTANTS.BOARD_HEIGHT / GAME_CONSTANTS.BOARD_WIDTH;
    const canvasWidth = min(containerWidth, GAME_CONSTANTS.BOARD_WIDTH);
    const canvasHeight = canvasWidth * ratio;
    
    return {
        width: canvasWidth,
        height: canvasHeight,
        scale: canvasWidth / GAME_CONSTANTS.BOARD_WIDTH
    };
}
