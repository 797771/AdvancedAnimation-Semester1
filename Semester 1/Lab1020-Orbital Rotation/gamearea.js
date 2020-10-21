// GameArea class to create all the DOM elements in code rather than html

function GameArea(){
  // create canvas
  let canvas =  document.getElementById("canvas"); // gets its style from mystyles.css
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.backgroundColor="black";
}
