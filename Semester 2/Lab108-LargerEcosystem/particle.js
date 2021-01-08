function Particle(x, y, rad, clr){
  this.location = new JSVector(x, y);//initialize location at emitter location
  this.velocity = new JSVector(Math.random(), Math.random());
  //this.acceleration = new JSVector(0, -0.05);
  this.lifespan = 225;
  this.radius = rad;
  this.clr = clr;
}

Particle.prototype.run = function(){
  this.update();
  this.render();
}

Particle.prototype.render = function(){
  let ctx = game.context1;
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.save();
  ctx.beginPath();
  ctx.translate(this.location.x, this.location.y);
  ctx.moveTo(-3, -3);
  ctx.lineTo(0, 3);
  ctx.lineTo(3, -3);
  ctx.lineTo(-3, -3);
  ctx.stroke();
  ctx.fill()
  ctx.restore();
}

Particle.prototype.update = function(){
  //this.velocity.add(this.acceleration);
  this.location.add(this.velocity);
  this.lifespan-=2;
}

Particle.prototype.isDead = function(){
  if(this.lifespan<0){
    return true;
  }
  else{
    return false;
  }
}
