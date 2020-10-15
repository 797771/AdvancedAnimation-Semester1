
function Star(x, y, dx, dy, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.clr = clr;
  this.isOverlapping = false;
}
  //  placing methods in the prototype (every mover shares functions)
Star.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();
  }


// draw the mover on the canvas
Star.prototype.render = function(){
    let ctx = game.ctx;

        ctx.strokeStyle = "rgba(247, 202, 24, 1)";
        ctx.fillStyle = "rgba(247, 202, 24, 1)";

        ctx.save();
        ctx.beginPath();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.velocity.getDirection());
        ctx.moveTo(-8, -8);
        ctx.lineTo(0, 10);
        ctx.lineTo(6, -8);
        ctx.lineTo(-10, 1);
        ctx.lineTo(10, 1);
        ctx.lineTo(-8, -8);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
  }

// Move the mover in a random direction
Star.prototype.update = function(){
  let b=game.stars;
    if(!game.gamePaused){
        this.location.add(this.velocity);
    }
}

// When a mover hits an edge of the canvas, it wraps around to the opposite edge.
Star.prototype.checkEdges = function(){
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
