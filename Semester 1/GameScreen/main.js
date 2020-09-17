var canvas;
var ctx;
var game;

window.onload=init;

function init(){
  canvas=document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 700;
  ctx=canvas.getContext('2d');
  game=new Game();

  animate();
}

function Game(){
  this.ga=new GameArea();
}

function animate(){
  requestAnimationFrame(animate);
}
