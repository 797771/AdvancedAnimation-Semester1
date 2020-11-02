function Snake(x, y, dx, dy, clr, numSegments){
  this.mover = new Mover(x, y, dx, dy, 10, clr);
  this.clr = clr;
  this.segments = [];
  this.numSegments = numSegments;

  //create segments
  for(let i=0;i<this.numSegments;i++){
    this.segments[i] = new JSVector(x-(10*(i+1)), y-(10*(i+1)));
  }
}

Snake.prototype.run = function(){
    this.mover.run();
    this.update();
    this.render();
}


Snake.prototype.render = function(){
    let ctx = game.ctx;
    for(var i = 0;i<this.numSegments;i++){
      ctx.strokeStyle = this.clr;
      ctx.fillStyle = this.clr;
      ctx.beginPath();
      ctx.arc(this.segments[i].x, this.segments[i].y, 10, Math.PI*2, 0, false);
      ctx.stroke();
      ctx.fill();
    }

  }

Snake.prototype.update = function(){
    if(!game.gamePaused){
      let dist;
      for(let i=0;i<this.numSegments;i++){
        if(i===0){
          dist = JSVector.subGetNew(this.mover.location, this.segments[i]);
        }
        else{
          dist = JSVector.subGetNew(this.segments[i-1], this.segments[i]);
        }
        this.segments[i] = JSVector.addGetNew(this.segments[i], dist);
      }
    }
}
