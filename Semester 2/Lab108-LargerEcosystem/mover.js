function Mover(x, y, dx, dy, radius, clr, numOrbs){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0, 0);
  this.radius = radius;
  this.orbitAngle = Math.random()*Math.PI;
  this.clr = clr;
  this.orbiters = [];
  this.orbitclr = "rgba(102, 255, 0, 1)"
  this.orbitRad = 50;

  //create all orbiters
   for(let i = 0; i<numOrbs; i++){
     let a = i*(Math.PI*2)/numOrbs + this.orbitAngle;
     let angleVel = numOrbs*0.01;
     this.orbiters.push(new Orbiter(this, 1, this.orbitRad, a, angleVel, this.orbitclr));
   }

}

Mover.prototype.run = function(){
  //mover shrinks when touching particles from snake
  for(var j=0; j<game.snakes.length;j++){
    let particles = game.snakes[j].psystem.particles;
    for(var i = 0; i<particles.length; i++){
      let d = this.location.distance(particles[i].location);
      if(d<50 && this.radius>3){
        this.radius-=0.01;
        if(this.orbitRad>10){
          this.orbitRad-=0.05;
        }
      }
    }
  }
    this.checkEdges();
    this.update();
    this.render();

    //update and render orbiters
    for(let i=0; i<this.orbiters.length;i++){
      let orb = this.orbiters[i];
      orb.rotator.setMagnitude(this.orbitRad);
      orb.update();
      orb.render();
    }

}


// draw the bubble on the canvas
Mover.prototype.render = function(){
    let ctx = game.context1;
    let b = game.movers;

        ctx.strokeStyle = "rgba(255, 255, 255, 255)";
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.location.x,this.location.y, this.radius, Math.PI*2, 0, false);
        ctx.stroke();
        ctx.fill();

        let ctx2 = game.context2;

            ctx2.strokeStyle = "rgba(255, 255, 255, 255)";
            ctx2.fillStyle = this.clr;
            ctx2.beginPath();
            ctx2.arc(this.location.x,this.location.y, this.radius, Math.PI*2, 0, false);
            ctx2.stroke();
            ctx2.fill();
  }

// Move the bubble in a random direction
Mover.prototype.update = function(){
    if(!game.gamePaused){
      this.velocity.add(this.acceleration);
      this.velocity.limit(3);
      this.location.add(this.velocity);
    }
}


Mover.prototype.checkEdges = function(){
  let world = game.world;
  if (this.location.x > world.right || this.location.x < world.left){
    this.velocity.x = -this.velocity.x;
  }
  if (this.location.y < world.top || this.location.y > world.bottom){
    this.velocity.y = -this.velocity.y;
  }

  }
