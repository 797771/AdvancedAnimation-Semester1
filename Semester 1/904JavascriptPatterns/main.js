var canvas;
var ctx;
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
  animate();
}

// Declare and initialize the ball variables
var x, y, dx, dy, radius;
x = Math.random()*window.innerWidth;
y= Math.random()*window.innerHeight;
dx = Math.random()*10 - 5;
dy = Math.random()*10 - 5;
radius = 30;

function animate(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(155,180,50)';
  ctx.fillStyle = 'rgba(155,180, 50)';
  ctx.beginPath();
  ctx.arc(x,y,radius,Math.PI*2, 0, false);
  ctx.fill();
  ctx.stroke();
  x += dx;
  y += dy;
  if(x > canvas.width || x < 0)  dx = -dx;
  if(y > canvas.height || y < 0)  dy = -dy;
  requestAnimationFrame(animate);
}
