function Snake(x, y, dx, dy, clr, numSegments){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0, 0);
  this.clr = clr;
  this.segments = [];
  this.startRad = 20;
  this.numSegments = numSegments;
}

Snake.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();
}



Snake.prototype.render = function(){
    let ctx = game.ctx;
    let locx=this.location.x;
    let locy=this.location.y;
    let rad = this.startRad;

    for(let i=0;i<this.numSegments;i++){
      ctx.strokeStyle = this.clr;
      ctx.beginPath();
      ctx.arc(locx,locy, rad, Math.PI*2, 0, false);
      ctx.stroke();
      locx= locx-rad;
      locy= locy-rad;
      rad = rad-2;
    }
  }

Snake.prototype.update = function(){

    if(!game.gamePaused){
      this.velocity.add(this.acceleration);
      this.velocity.limit(3);
      this.location.add(this.velocity);
    }
}

Snake.prototype.checkEdges = function(){
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
