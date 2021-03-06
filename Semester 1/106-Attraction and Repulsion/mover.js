//  Mover constructor function +++++++++++++++++++++++++++++

function Mover(x, y, dx, dy, rad, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.attract = new JSVector(0, 0);
  this.repulse = new JSVector(0, 0);
  this.rad = rad;
  this.clr = clr;
  this.isOverlapping = false;
}
  //  placing methods in the prototype (every mover shares functions)
Mover.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();
  }


// draw the mover on the canvas
Mover.prototype.render = function(){
    let ctx = game.ctx;
    let b = game.movers;

        if(this == b[0]){
          ctx.strokeStyle = "rgba(154, 18, 179, 1)";
          ctx.fillStyle = "rgba(154, 18, 179, 1)";
        }
        else if(this == b[1]){
          ctx.strokeStyle = "rgba(0, 181, 204, 1)";
          ctx.fillStyle = "rgba(0, 181, 204, 1)";
        }
        else{
          ctx.strokeStyle = "rgba(255,255,255,255)";//this.clr;
          ctx.fillStyle = this.clr;
        }
        ctx.beginPath();
        ctx.arc(this.location.x,this.location.y, this.rad, Math.PI*2, 0, false);
        ctx.stroke();
        ctx.fill();

  }

// Move the mover in a random direction
Mover.prototype.update = function(){
  let b=game.movers;
  if(this !== b[0]){
      let d = this.location.distance(b[0].location);
      if(d<200){
        this.repulse = JSVector.subGetNew(this.location, b[0].location);
        this.repulse.normalize();
        this.repulse.multiply(0.05);
      }
    }
    if(this !== b[1]){
        let d = this.location.distance(b[1].location);
        if(d<200){
          this.attract = JSVector.subGetNew(b[1].location, this.location);
          this.attract.normalize();
          this.attract.multiply(0.05);
        }
      }
    if(!game.gamePaused){
        this.velocity.add(this.attract);
        this.velocity.add(this.repulse);
        this.velocity.limit(3);
        this.location.add(this.velocity);
    }
}

// When a mover hits an edge of the canvas, it wraps around to the opposite edge.
Mover.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if (this.location.x > canvas.width){
      this.location.x = 0;
    }
    else if(this.location.x < 0){
      this.location.x = canvas.width;
    }
    if (this.location.y > canvas.height){
      this.location.y = 0;
    }
    else if(this.location.y < 0){
      this.location.y = canvas.height;
    }

  }
