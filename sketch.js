var database;
var hero1, hero2;
var item;

var assassinStop, assassinWalking, assassinBack;
var warriorStop, warriorWalking, warriorBack;
var scientistStop, scientistWalking, scientistBack;
var robotStop, robotWalking, robotBack;

var groupWalls;
var form, player;
var playerCount;
var gameState;
var allPlayers;
var heros = [];
var knifeEquiped;
var allEquipaments;
var equipamentos;
var ammoPointP;

function preload() {
  //carrega imagens da assassina
  assassinStop = loadAnimation("img/assassina/Assassina-1.png");
  assassinWalking = loadAnimation("img/assassina/AssassinaAndando.png", "img/assassina/AssassinaAndando1.png", "img/assassina/AssassinaAndando2.png");
  assassinBack = loadAnimation("img/assassina/AssassinaAtrasParado.png", "img/assassina/AssassinaAtras.png", "img/assassina/AssassinaAtras1.png");

  //carrega imagens guerreiro
  warriorStop = loadAnimation("img/guerreiro/Guerreiro.png");
  warriorWalking = loadAnimation("img/guerreiro/GuerreiroAndando.png", "img/guerreiro/GuerreiroAndando1.png", "img/guerreiro/GuerreiroAndando2.png");
  warriorBack = loadAnimation("img/guerreiro/GuerreiroAtras.png", "img/guerreiro/GuerreiroAtras1.png", "img/guerreiro/GuerreiroAtras2.png");

  //carrega imagens cientista
  scientistStop = loadAnimation("img/cientista/Cientista.png");
  scientistWalking = loadAnimation("img/cientista/Cientista.png", "img/cientista/CientistaAndando.png", "img/cientista/CientistaAndando1.png");
  scientistBack = loadAnimation("img/cientista/CientistaAtras.png", "img/cientista/CientistaAtras1.png", "img/cientista/CientistaAtras2.png");

  //carrega imagens robo
  robotStop = loadAnimation("img/robo/Robo.png");
  robotWalking = loadAnimation("img/robo/Robo.png", "img/robo/RoboAndando.png", "img/robo/RoboAndando1.png");
  robotBack = loadAnimation("img/robo/RoboAtras.png", "img/robo/RoboAtras1.png", "img/robo/RoboAtras2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //chama o banco de dados
  database = firebase.database();
  //console.log(database);

  //chama estados do jogo
  game = new Game();
  game.getState();
  game.start();

  //chama sprites dos muros do mapa
  buildWalls();
}

function draw() {
  background(51);

  //atualiza os estados do jogo
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {

    game.play();
    
  }


}

function buildWalls() {

  //console.log(`windowWidth: ${windowWidth} width: ${height}`)
  //Cubo das pontas
  wall1 = createSprite(60, 70, 30, 30);
  wall2 = createSprite(60, height - 70, 30, 30);
  wall3 = createSprite(width - 60, height - 70, 30, 30);
  wall4 = createSprite(width - 60, 70, 30, 30);

  //Paredes grandes centrais (meio/cima)
  wall5a = createSprite(width / 2, 70, 200, 30);
  wall5b = createSprite(width / 2 - 85, 100, 30, 80);
  wall5c = createSprite(width / 2 + 85, 100, 30, 80);

  //Paredes grandes centrais (meio/baixo)
  wall6a = createSprite(width / 2, height - 70, 200, 30);
  wall6b = createSprite(width / 2 - 85, height - 100, 30, 80);
  wall6c = createSprite(width / 2 + 85, height - 100, 30, 80);

  //Paredes grandes Lateral esquerda (cima)
  wall7a = createSprite(width / 2 - 300, 70, 150, 30);
  wall7b = createSprite(width / 2 - 240, 100, 30, 80);

  //Paredes grandes Lateral esquerda (baixo)
  wall8a = createSprite(width / 2 - 300, height - 70, 150, 30);
  wall8b = createSprite(width / 2 - 240, height - 100, 30, 80);

  //Paredes grandes Lateral direita (cima)
  wall9a = createSprite(width / 2 + 300, 70, 150, 30);
  wall9b = createSprite(width / 2 + 240, 100, 30, 80);

  //Paredes grandes Lateral direita (baixo)
  wall10a = createSprite(width / 2 + 300, height - 70, 150, 30);
  wall10b = createSprite(width / 2 + 240, height - 100, 30, 80);

  //grupo de paredes
  groupWalls = new Group();
  groupWalls.add(wall1, wall2, wall3, wall4, wall5a,
    wall5b, wall5c, wall6a, wall6b, wall6c, wall7a, wall7b,
    wall8a, wall8b, wall9a, wall9b, wall10a, wall10b);
}



