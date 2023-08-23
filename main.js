// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 22;
let raio = diametroBolinha / 2;

// Variáveis da Velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;

// Variáveis do Oponente
let xRaqueteOp = 585;
let yRaqueteOp = 150;
let velocidadeYOp;
let chanceDeErrar = 0;

let lRaquete = 10;
let aRaquete = 90;

let colidiu = false;

let doisPlayers = false;

let meusPontos = 0;
let pontosOp = 0;

// Sons do jogo
let = raquetada;
let = ponto;
let = trilha;

function preload() {
  trilha = loadSound("sound/trilha.mp3");
  ponto = loadSound("sound/ponto.mp3");
  raquetada = loadSound("sound/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);

  mostraBolinha();
  mostraRaquete(xRaquete, yRaquete, lRaquete, aRaquete);
  mostraRaquete(xRaqueteOp, yRaqueteOp, lRaquete, aRaquete);

  movimentaBolinha();
  movimentaMinhaRaquete();
  movimentaOpRaquete();

  verificaColisao();
  // bolinhaNaoFicaPresa();

  // verificaColisaoRaquete();
  verificaColisaoRaqueteCollide(
    xRaquete,
    yRaquete,
    lRaquete,
    aRaquete,
    xBolinha,
    yBolinha,
    raio
  );
  verificaColisaoRaqueteCollide(
    xRaqueteOp,
    yRaqueteOp,
    lRaquete,
    aRaquete,
    xBolinha,
    yBolinha,
    raio
  );

  incluiPlacar();
  marcaPonto();
  vitoria();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao() {
  if (xBolinha > width - raio || xBolinha < raio) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha > height - raio || yBolinha < raio) {
    velocidadeYBolinha *= -1;
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 0) {
    xBolinha = 23;
  }
}

function mostraRaquete(x, y, l, a) {
  rect(x, y, l, a);
}

// function limitador(raquete) {
//   raquete = constrain(raquete, 10, 310);
// }

function movimentaMinhaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 10, 310);
}

function movimentaOpRaquete() {
  if (doisPlayers) {
    if (keyIsDown(UP_ARROW)) {
      yRaqueteOp -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
      yRaqueteOp += 10;
    }
    yRaqueteOp = constrain(yRaqueteOp, 10, 310);
  } else {
    velocidadeYOp = yBolinha - yRaqueteOp - lRaquete / 2 - 30;
    yRaqueteOp += velocidadeYOp + chanceDeErrar;
    calculaChanceDeErrar();
  }
  yRaqueteOp = constrain(yRaqueteOp, 10, 310);
}

function calculaChanceDeErrar() {
  if (pontosOp >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}

function verificaColisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + lRaquete &&
    yBolinha - raio < yRaquete + aRaquete &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaqueteCollide(x, y, l, a, xb, yb, r) {
  colidiu = collideRectCircle(x, y, l, a, xb, yb, r);

  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOp, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }

  if (xBolinha < 10) {
    pontosOp += 1;
    ponto.play();
  }
}

function vitoria() {
  if (pontosOp === 10) {
    fill(289);
  } else if (meusPontos === 10) {
    fill(289);
    text(meusPontos, 321, 26);
  }
}
