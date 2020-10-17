var canvas;
var ctx;
window.onload = init;

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(255, 255, 255)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  this.ball = new Oscillator();
  ball.run();
}


  function Oscillator(){
    this.angle = new JSVector(0, 0);
    this.velocity = new JSVector(Math.random(-0.05,0.05),Math.random(-0.05,0.05));
    this.amplitude = new JSVector(Math.random(canvas.width/2),Math.random(canvas.height/2));
  }

  Oscillator.prototype.run = function(){
      this.oscillate();
      this.display();
    }

  Oscillator.prototype.oscillate = function(){
    this.angle.add(this.velocity);
  }

  Oscillator.prototype.display = function(){
    this.x = Math.sin(this.angle.x)*this.amplitude.x;
    this.y = Math.sin(this.angle.y)*this.amplitude.y;

    ctx.strokeStyle = "rgba(255, 255, 255, 255)";
    ctx.beginPath();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.lineTo(this.x,this.y);
    ctx.arc(this.x,this.y,30,Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();
  }
