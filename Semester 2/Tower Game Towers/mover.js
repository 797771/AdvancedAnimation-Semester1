function Mover(x, y, dx, dy, rad, clr, tNum){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.pulser= new JSVector(0, 0);
  this.rad = rad;
  this.clr = clr;
  this.towerNum = tNum;
}
  //  placing methods in the prototype (every mover shares functions)
Mover.prototype.run = function(){
    this.update();
    this.render();
  }


// draw the mover on the canvas
Mover.prototype.render = function(){
    let ctx = game.ctx;
    ctx.strokeStyle = this.clr;
    ctx.fillStyle = this.clr;

    ctx.beginPath();
    ctx.arc(this.location.x,this.location.y, this.rad, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();
  }

// Move the mover in a random direction
Mover.prototype.update = function(){
    let towerLoc = game.towers[this.towerNum].location;
    let d = this.location.distance(towerLoc);

      if(d<2){//repell
            this.pulser = JSVector.subGetNew(this.location, towerLoc);
            this.pulser.normalize();
            this.pulser.multiply(0.05);
      }

      if(d>1){//attract
          this.pulser = JSVector.subGetNew(towerLoc, this.location);
          this.pulser.normalize();
          this.pulser.multiply(0.05);
      }


    this.velocity.add(this.pulser);
    this.velocity.limit(2);
    this.location.add(this.velocity);
}
