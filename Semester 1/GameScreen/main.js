var canvas;
var ctx;
var game;

window.onload=init;

function init(){
  game=new Game();

  animate();
}

function Game(){
  this.ga=new GameArea();
}

function animate(){
  requestAnimationFrame(animate);
}
