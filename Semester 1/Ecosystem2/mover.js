function Mover(x, y, dx, dy, radius, clr, numOrbs){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0, 0);
  this.radius = radius;
  this.orbitAngle = Math.random()*Math.PI;
  this.clr = clr;
  this.orbiters = [];
  this.orbitclr = "rgba(102, 255, 0, 1)"

  //create all orbiters
   for(let i = 0; i<numOrbs; i++){
     let a = i*(Math.PI*2)/numOrbs + this.orbitAngle;
     let angleVel = numOrbs*0.01;
     this.orbiters.push(new Orbiter(this, 1, 50, a, angleVel, this.orbitclr));
   }
}

Mover.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();

    //update and render orbiters
    for(let i=0; i<this.orbiters.length;i++){
      let orb = this.orbiters[i];
      orb.update();
      orb.render();
    }

}


// draw the bubble on the canvas
Mover.prototype.render = function(){
    let ctx = game.ctx;
    let b = game.movers;

        ctx.strokeStyle = "rgba(255, 255, 255, 255)";
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.location.x,this.location.y, this.radius, Math.PI*2, 0, false);
        ctx.stroke();
        ctx.fill();
  }

// Move the bubble in a random direction
Mover.prototype.update = function(){
    if(!game.gamePaused){
      this.velocity.add(this.acceleration);
      this.velocity.limit(3);
      this.location.add(this.velocity);
    }
}

// When a bubble hits an edge of the canvas, it wraps around to the opposite edge.
Mover.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if (this.location.x > canvas.width || this.location.x < 0){
      this.velocity.x = -this.velocity.x;
    }
    if (this.location.y > canvas.height || this.location.y < 0){
      this.velocity.y = -this.velocity.y;
    }

  }
