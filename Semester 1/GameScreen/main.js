var canvas;
var ctx;

window.onload = init;

function init(){
  canvas = document.getElementById('cnv');
  canvas.width = window.innerWidth-25;
  canvas.height = window.innerHeight-30;
  canvas.style.border = 'solid black 5px';
  ctx = wrapperDiv.getContext('2d');

  const wrapperDiv=document.createElement("div");
  const buttonMenuDiv=document.createElement("div");
  const buttonDiv=document.createElement("div");
  buttonMenuDiv.appendChild(buttonDiv);
  wrapperDiv.appendChild(buttonMenuDiv);
}
