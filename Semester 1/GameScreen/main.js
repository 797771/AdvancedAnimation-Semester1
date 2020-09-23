var canvas;
var ctx;
var game;
var balls=new Array();

window.onload=init;

function init(){
  game=new Game();

  canvas=document.getElementById("canvas");
  ctx=canvas.getContext('2d');

  loadBalls(100);
  animate();
}

function Game(){
  this.ga=new GameArea();
}


function animate(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  for(var i=0; i<balls.length;i++){
    balls[i].update();
    balls[i].render();
  }
  requestAnimationFrame(animate);
}

function Ball(x, y){
  this.x = x;
  this.y = y;
  this.dx = Math.random()*10-5;
  this.dy = Math.random()*10-5;
  this.radius = 5;
}

  Ball.prototype.update=function(){
    this.x += this.dx;
    this.y += this.dy;
    if(this.x > canvas.width || this.x < 0)  this.dx = -this.dx;
    if(this.y > canvas.height || this.y < 0)  this.dy = -this.dy;
  }

  Ball.prototype.render=function(){
    ctx.strokeStyle = 'rgba(255, 255, 255)';
    ctx.fillStyle = 'rgba(0, 0, 0)';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,Math.PI*2, 0, false);
    ctx.fill();
    ctx.stroke();
  }


function loadBalls(num){
  for(var i=0; i<num; i++){
    balls[i]=new Ball(Math.random()*canvas.width, Math.random()*canvas.height);
  }
}
