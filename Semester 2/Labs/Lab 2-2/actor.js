class Actor{
constructor(){
  this.loc = new JSVector(ecoSystem.cells[0][0].loc.x + ecoSystem.cellWidth/2, ecoSystem.cells[0][0].loc.y + ecoSystem.cellHeight/2+15);
  this.currentCell = ecoSystem.cells[0][0];
  this.clr = "blue";

  // add an event handler such that the a, s, w, d keys
  // will move the actor from cell to cell
  window.addEventListener("keypress", function (event) {
      switch (event.code) {
          case "KeyA":
              if (this.currentCell.neighbors.n != null)
                  this.loc.y-=ecoSystem.cellHeight;
                  this.currentCell = ecoSystem.cells[this.currentCell.row-1][this.currentCell.col];
              break;
          case "KeyS":
              if (this.currentCell.neighbors.s != null)
                  this.loc.y+=ecoSystem.cellHeight;
                  this.currentCell = ecoSystem.cells[this.currentCell.row+1][this.currentCell.col];
              break;
          case "KeyW":
              if (this.currentCell.neighbors.w != null)
                  this.loc.x-=ecoSystem.cellHeight;
                  this.currentCell = ecoSystem.cells[this.currentCell.row][this.currentCell.col-1];
              break;
          case "KeyD":
              if (this.currentCell.neighbors.e != null)
                  this.loc.x+=ecoSystem.cellHeight;
                  this.currentCell = ecoSystem.cells[this.currentCell.row][this.currentCell.col+1];
              break;
              break;
      }
  }, false);
}

run(){
  this.render();
  this.update();
}

render(){
  let ctx = ecoSystem.context1;
  ctx.save();
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.moveTo(-5*4, -10*4);
  ctx.lineTo(0, -7*4);
  ctx.lineTo(5*4, -10*4);
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

}

update(){

}




}
