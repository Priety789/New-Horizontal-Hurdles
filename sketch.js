var canvas, backgroundImage;

var gameState = 0;
var runnerCount;
var allRunners;
var distance = 0;

var form, runner, game;

var runners, runner1, runner2, runner3, runner4;

function preload() {
}

function setup(){
    canvas = createCanvas(displayWidth - 20, displayHeight - 30);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}


function draw(){
  if(runnerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
    if (gameState === 2) {
        game.end();
    } 
}
