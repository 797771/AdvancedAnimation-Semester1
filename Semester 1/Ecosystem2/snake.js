function Snake(x, y, dx, dy, clr, numSegments){
  this.snakemover = new SnakeMover(x, y, dx, dy, 10, clr);
  this.clr = clr;
  this.segments = [];
  this.numSegments = numSegments;

  //create segments
  let d = 20;
  for(let i=0;i<this.numSegments;i++){
    this.segments[i] = new JSVector(x-d, y-d);
    d=d-20;
  }

  //create particle ParticleSystem
  this.psystem = new ParticleSystem(this.snakemover.location.x, this.snakemover.location.y);
}

Snake.prototype.run = function(){
    this.snakemover.run();
    this.psystem.run(this.snakemover.location.x, this.snakemover.location.y);
    this.update();
    this.render();
}


Snake.prototype.render = function(){
    let ctx = game.ctx;
    for(var i = 0;i<this.numSegments;i++){
        ctx.strokeStyle = "rgba(0, 0, 0)";
        ctx.fillStyle = "rgba(92, 62, 45, 1)";
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(this.segments[i].x, this.segments[i].y, 5, Math.PI*2, 0, false);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "rgba(92, 62, 45, 1)";
        ctx.translate(this.segments[i].x, this.segments[i].y);
        ctx.moveTo(-6, -6);
        ctx.lineTo(0, 8);
        ctx.lineTo(6, -6);
        ctx.lineTo(-6, -6);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

  }

Snake.prototype.update = function(){
    if(!game.gamePaused){
      for(let i=0;i<this.numSegments;i++){
        if(i==0){
          this.segments[i] = new JSVector(this.snakemover.location.x, this.snakemover.location.y);
        }
        else{
          let vB = JSVector.subGetNew(this.segments[i], this.segments[i-1]);
          vB.setMagnitude(this.segments.length);
          this.segments[i] = JSVector.addGetNew(this.segments[i-1], vB);
        }
       }
       }
}
