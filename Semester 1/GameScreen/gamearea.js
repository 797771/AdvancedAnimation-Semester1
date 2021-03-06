var tiles=[];
var buttons=[];


function GameArea(){
  //Wrapper Div
  this.wrapperDiv=document.getElementById("wrapperDiv");

  // create tileMenuDiv
  this.tileMenuDiv = document.createElement("div");
  this.wrapperDiv.appendChild(this.tileMenuDiv);
  this.tileMenuDiv.id="tileMenuDiv";

  //create 4 tile divs
  for(var i=0; i<4; i++){
    tiles[i]=this.tileDiv=document.createElement("div");
    this.tileMenuDiv.appendChild(tiles[i]);
    tiles[i].setAttribute("style","padding:20px;width:45px;height:35px;margin-top: 50px;background-color: white;border: solid black 2px;position:relative;left:5px;bottom:25px;");
  }

  // create buttonMenuDiv
  this.buttonMenuDiv = document.createElement("div");
  this.wrapperDiv.appendChild(this.buttonMenuDiv);
  this.buttonMenuDiv.id="buttonMenuDiv";

  //create 4 button divs
  for(var i=0; i<4; i++){
    buttons[i]=this.buttonDiv=document.createElement("div");
    this.buttonMenuDiv.appendChild(buttons[i]);
    buttons[i].setAttribute("style", "padding:20px;width:55px;height:45px;margin-right:100px;margin-top: 50px;border-radius:100%;background-color: white;border: solid black 2px;float:left;position:relative;bottom:45px;left: 50px;");
  }

  // create html canvas inside wrapperDiv
  canvas=document.getElementById("canvas");
  this.wrapperDiv.appendChild(canvas);
  canvas.setAttribute("style", "background-color: black;height: 500px;width: 800px;position: relative;bottom:505px;");

}
