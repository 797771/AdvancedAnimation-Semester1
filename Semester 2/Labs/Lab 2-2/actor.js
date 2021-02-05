class Actor{
constructor(){
  this.loc = new JSVector(ecoSystem.cells[0][0].loc.x + ecoSystem.cellWidth/2, ecoSystem.cells[0][0].loc.y + ecoSystem.cellHeight/2+5);
  this.vel = new JSVector(0, 0);
  this.currentCell = ecoSystem.cells[0][0];
  this.clr = "blue";


  // add an event handler such that the a, s, w, d keys
  // will move the actor from cell to cell
  window.addEventListener("keypress", function (event) {
    let actor = ecoSystem.actor;
      switch (event.code) {
          case "KeyW":
              if (actor.currentCell.neighbors.n != null){
                  actor.loc.y-=ecoSystem.cellHeight;
                  actor.currentCell = ecoSystem.cells[actor.currentCell.row-1][actor.currentCell.col];
                  actor.vel.setDirection(Math.PI/2);
                }
              break;
          case "KeyS":
              if (actor.currentCell.neighbors.s != null){
                  actor.loc.y+=ecoSystem.cellHeight;
                  actor.currentCell = ecoSystem.cells[actor.currentCell.row+1][actor.currentCell.col];
                  actor.vel.setDirection(3*Math.PI/2);
                }
              break;
          case "KeyA":
              if (actor.currentCell.neighbors.w != null){
                  actor.loc.x-=ecoSystem.cellWidth;
                  actor.currentCell = ecoSystem.cells[actor.currentCell.row][actor.currentCell.col-1];
                  actor.vel.setDirection(Math.PI);
                }
              break;
          case "KeyD":
              if (actor.currentCell.neighbors.e != null){
                  actor.loc.x+=ecoSystem.cellWidth;
                  actor.currentCell = ecoSystem.cells[actor.currentCell.row][actor.currentCell.col+1];
                  actor.vel.setDirection(0);
                }
              break;
              break;
      }
  }, false);
}//end constructor

run(){
  this.render();
}

render(){
  let ctx = ecoSystem.context1;
  ctx.save();
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.translate(this.loc.x, this.loc.y);
  //ctx.rotate(this.vel.getDirection());
  ctx.moveTo(-5*4, -10*4);
  ctx.lineTo(0, -7*4);
  ctx.lineTo(5*4, -10*4);
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

}



}
