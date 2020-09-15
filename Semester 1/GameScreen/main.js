window.onload=init;
var canvas;
var ctx;
var game;

function init(){
  canvas=document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
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
