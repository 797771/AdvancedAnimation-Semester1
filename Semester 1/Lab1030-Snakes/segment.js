function Segment(x, y, dx, dy, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.clr = clr;
}

Segment.prototype.render = function(x, y){
  let ctx = game.ctx;
  ctx.strokeStyle = this.clr;
  ctx.beginPath();
  ctx.arc(x, y, 10, Math.PI*2, 0, false);
  ctx.stroke();
}
