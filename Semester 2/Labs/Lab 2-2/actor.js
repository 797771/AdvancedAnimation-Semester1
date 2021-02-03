class Actor{
constructor(){
  this.loc = new JSVector(ecoSystem.world.top+ecoSystem.cellWidth/2, ecoSystem.world.left+ecoSystem.cellHeight/2);
  this.clr = "blue";

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
  ctx.arc(this.loc.x, this.loc.y, 10, Math.PI*2, 0, false);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

}

update(){

}




}
