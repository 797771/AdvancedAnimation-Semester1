var tiles=[];
var buttons=[];


function GameArea(){
  //Wrapper Div
  this.wrapperDiv=document.getElementById("wrapperDiv");

  // create tileMenuDiv
  this.tileMenuDiv = document.createElement("div");
  this.wrapperDiv.appendChild(this.tileMenuDiv);

  //create 4 tile divs
  for(var i=0; i<4; i++){
    tiles[i]=this.tileDiv=document.createElement("div");
    this.tileMenuDiv.appendChild(tiles[i]);
    tiles[i].setAttribute("style", "padding:20px;width:45px;height:35px;margin-top: 50px;background-color: white;border: solid black 2px;position:relative;left:805px; top: 115px;");
  }

  // create buttonMenuDiv
  this.buttonMenuDiv = document.createElement("div");
  this.wrapperDiv.appendChild(this.buttonMenuDiv);


  //create 4 button divs
  for(var i=0; i<4; i++){
    buttons[i]=this.buttonDiv=document.createElement("div");
    this.buttonMenuDiv.appendChild(buttons[i]);
    buttons[i].setAttribute("style", "padding:20px;width:55px;height:45px;margin-right:100px;margin-top: 50px;border-radius:100%;background-color: white;border: solid black 2px;float:left;position:relative;bottom:510px;left:60px;");
  }

  // create html canvas inside wrapperDiv
  canvas2=document.createElement("canvas");
  this.wrapperDiv.appendChild(canvas2);
  canvas2.setAttribute("style", "background-color: purple;height: 500px;width: 800px;position: relative;bottom:505px;");

}
