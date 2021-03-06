function Snake(x, y, dx, dy, clr, numSegments){
  this.snakemover = new SnakeMover(x, y, dx, dy, 10, clr);
  this.clr = clr;
  this.segments = [];
  this.numSegments = numSegments;
  this.rad = 5;

  //create segments
  let d = 20;
  for(let i=0;i<this.numSegments;i++){
    this.segments[i] = new JSVector(x-d, y-d);
    d=d-20;
  }

  //create  ParticleSystem
  this.psystem = new ParticleSystem(this.snakemover.location.x, this.snakemover.location.y);
}

Snake.prototype.run = function(){
    this.snakemover.run();
    this.psystem.run(this.snakemover.location.x, this.snakemover.location.y);
    this.update();
    this.render();
}


Snake.prototype.render = function(){
    let ctx = game.context1;
    for(var i = 0;i<this.numSegments;i++){
        ctx.strokeStyle = "rgba(0, 0, 0)";
        ctx.fillStyle = this.clr;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(this.segments[i].x, this.segments[i].y, this.rad, Math.PI*2, 0, false);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = this.clr;
        ctx.translate(this.segments[i].x, this.segments[i].y);
        ctx.moveTo(-6, -6);
        ctx.lineTo(0, 8);
        ctx.lineTo(6, -6);
        ctx.lineTo(-6, -6);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    let ctx2 = game.context2;
    for(var i = 0;i<this.numSegments;i++){
        ctx2.strokeStyle = "rgba(0, 0, 0)";
        ctx2.fillStyle = this.clr;
        ctx2.save();
        ctx2.beginPath();
        ctx2.lineWidth = 2;
        ctx2.arc(this.segments[i].x, this.segments[i].y, this.rad, Math.PI*2, 0, false);
        ctx2.fill();
        ctx2.stroke();
        ctx2.strokeStyle = this.clr;
        ctx2.translate(this.segments[i].x, this.segments[i].y);
        ctx2.moveTo(-6, -6);
        ctx2.lineTo(0, 8);
        ctx2.lineTo(6, -6);
        ctx2.lineTo(-6, -6);
        ctx2.stroke();
        ctx2.fill();
        ctx2.restore();
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
