function ParticleSystem(x, y){
  this.particles = [];
  this.emitloc = new JSVector(x, y);
}

ParticleSystem.prototype.run = function(x, y){
  this.addParticle();
  this.update(x, y);
}

ParticleSystem.prototype.addParticle = function(){
  let rad = 5;
  let pclr = "rbga(255, 255, 255)";
  this.particles.push(new Particle(this.emitloc.x, this.emitloc.y, rad, pclr));
}

ParticleSystem.prototype.update = function(x, y){
  for(var i = this.particles.length-1;i>=0;i--){
    let p = this.particles[i];
    this.emitloc = new JSVector(x, y);
    p.run();
    if(p.isDead()){
      this.particles.splice(i, 1);
    }
  }
}
