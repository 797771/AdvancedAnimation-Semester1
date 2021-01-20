
function Moon(x, y, dx, dy, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0, 0);
  this.clr = clr;
  this.isOverlapping = false;
}
  //  placing methods in the prototype (every mover shares functions)
Moon.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();
  }

// draw the mover on the canvas
Moon.prototype.render = function(){
    let ctx = game.context1;
        ctx.save();
        ctx.translate(this.location.x, this.location.y);


        ctx.strokeStyle = "rgba(189, 195, 199, 1)";
        ctx.fillStyle = "rgba(189, 195, 199, 1)";
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, 15, Math.PI*2, 0, false);
        ctx.fill();

        ctx.strokeStyle = "rgba(16, 12, 8, 1)";
        ctx.fillStyle = "rgba(16, 12, 8, 1)";
        ctx.beginPath();
        ctx.arc(this.location.x+10, this.location.y, 15, Math.PI*2, 0, false);
        ctx.fill();
        ctx.restore();

        let ctx2 = game.context2;
            ctx2.save();
            ctx2.translate(this.location.x, this.location.y);


            ctx2.strokeStyle = "rgba(189, 195, 199, 1)";
            ctx2.fillStyle = "rgba(189, 195, 199, 1)";
            ctx2.beginPath();
            ctx2.arc(this.location.x, this.location.y, 15, Math.PI*2, 0, false);
            ctx2.fill();

            ctx2.strokeStyle = "rgba(16, 12, 8, 1)";
            ctx2.fillStyle = "rgba(16, 12, 8, 1)";
            ctx2.beginPath();
            ctx2.arc(this.location.x+10, this.location.y, 15, Math.PI*2, 0, false);
            ctx2.fill();
            ctx2.restore();
  }

// Move the mover in a random direction
Moon.prototype.update = function(){
  let m=game.moons;
  for(var i = 0;i<m.length;i++){
    if(this !== m[i]){
      let d = this.location.distance(m[i].location);
      if(d<100){//repell
            this.acceleration = JSVector.subGetNew(this.location, m[i].location);
            this.acceleration.normalize();
            this.acceleration.multiply(0.05);
      }
    }
  }

    if(!game.gamePaused){
      this.velocity.add(this.acceleration);
      this.velocity.limit(3);
      this.location.add(this.velocity);
    }
}

// When a mover hits an edge of the canvas, it wraps around to the opposite edge.
Moon.prototype.checkEdges = function(){
    let world = game.world;
    if (this.location.x > world.right || this.location.x < world.left){
      this.velocity.x = -this.velocity.x;
    }
    if (this.location.y < world.top || this.location.y > world.bottom){
      this.velocity.y = -this.velocity.y;
    }

  }
