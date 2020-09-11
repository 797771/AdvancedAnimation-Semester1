var canvas;
var ctx;
var balls=new Array();
//  intialize the Canvas and context
window.onload = init;

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,24,35)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  loadBalls(100);
  animate();
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
  this.dx = Math.random()*10 - 5;
  this.dy = Math.random()*10 - 5;
  this.radius = 10;
}

  Ball.prototype.update=function(){
    this.x += this.dx;
    this.y += this.dy;
    if(this.x > canvas.width || this.x < 0)  this.dx = -this.dx;
    if(this.y > canvas.height || this.y < 0)  this.dy = -this.dy;
  }

  Ball.prototype.render=function(){
    ctx.strokeStyle = 'rgba(155,180,50)';
    ctx.fillStyle = 'rgba(155,180, 50)';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,Math.PI*2, 0, false);
    ctx.fill();
    ctx.stroke();
  }


function loadBalls(num){
  for(var i=0; i<num; i++){
    balls[i]=new Ball(Math.random()*window.innerWidth, Math.random()*window.innerHeight);
  }
}
