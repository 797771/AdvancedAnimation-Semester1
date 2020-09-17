var tiles=[];

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
  }

}
