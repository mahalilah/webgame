# Mahalilah - O Jogo do Autoconhecimento

Este é um jogo de tabuleiro web baseado no jogo milenar indiano Mahalilah, que proporciona uma jornada de autoconhecimento e reflexão.

## Sobre o Jogo

Mahalilah é um jogo de tabuleiro com 72 casas distribuídas em 8 planos diferentes, representando a jornada da alma em busca da consciência plena. Cada casa tem um significado especial que é revelado durante a jornada.

As espadas (subidas) representam atalhos para evolução, enquanto as serpentes (descidas) simbolizam os desafios e retrocessos.

## Tecnologias Utilizadas

- HTML5
- CSS3 (com design responsivo)
- JavaScript
- p5.js (para renderização e lógica do jogo)

## Como Jogar

1. Para iniciar, você deve tirar o número 6 no dado.
2. Após iniciar, jogue o dado e avance o número de casas indicado.
3. Ao parar em uma casa, leia seu significado e reflita sobre ele.
4. Se você parar em uma casa com a base de uma espada, suba até a casa onde está a ponta da espada.
5. Se você parar em uma casa com a cabeça de uma serpente, desça até a casa onde está a cauda da serpente.
6. Nas três últimas casas (70, 71 e 72), se o número tirado no dado for maior que o necessário para chegar à casa 72, você deve retroceder o número de casas excedentes.
7. O jogo termina quando você retorna à casa 68 (Consciência Plena).

## Estrutura do Projeto

```
mahalilah-game/
├── index.html          # Página principal do jogo
├── css/
│   ├── style.css       # Estilos principais
│   └── responsive.css  # Estilos responsivos
├── js/
│   ├── constants.js    # Constantes do jogo
│   ├── utils.js        # Funções utilitárias
│   ├── board.js        # Classe do tabuleiro
│   ├── dice.js         # Classe do dado
│   ├── player.js       # Classe do jogador
│   ├── game.js         # Classe principal do jogo
│   ├── ui.js           # Interface do usuário
│   └── main.js         # Inicialização do jogo
└── assets/
    ├── background-pattern.svg  # Padrão de fundo
    ├── sword.svg               # Imagem da espada
    ├── snake.svg               # Imagem da serpente
    └── ornament.svg            # Ornamento decorativo
```

## Instalação e Execução

1. Clone este repositório:
   ```
   git clone https://github.com/mahalilah/webgame.git
   ```

2. Abra o arquivo `index.html` em seu navegador para jogar.

## Compatibilidade

O jogo é compatível com todos os navegadores modernos e dispositivos (desktop, tablet e mobile). Em dispositivos com menor capacidade de processamento, o jogo automaticamente alterna para o modo 2D para melhor desempenho.

## Licença

Este projeto está licenciado sob a licença MIT.
