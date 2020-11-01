function Snake(x, y, dx, dy, clr, numSegments){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.clr = clr;
  this.segments = [];
  this.numSegments = numSegments;

  //create segments
  for(let i=0;i<this.numSegments;i++){
    this.segments.push(new Segment(this.x, this.y, this.dx, this.dy, this.clr));
  }
}

Snake.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();
}


Snake.prototype.render = function(){
    let x = this.segments[0].location.x;
    let y = this.segments[0].location.y;
    for(var i = 0;i<this.numSegments;i++){
      this.segments[i].render(x, y);
      x-=10;
      y-=10;
    }

  }

Snake.prototype.update = function(){
    if(!game.gamePaused){
      for(let i=1;i<this.numSegments;i++){
        let dir = this.segments[i-1].velocity.getDirection();
        this.segments[i].velocity.setDirection(dir);
      }
      for(let i=0;i<this.numSegments;i++){
        this.segments[i].location.add(this.segments[i].velocity);
      }
    }
}

Snake.prototype.checkEdges = function(){
    let canvas = game.canvas;

    for(let i=0;i<this.numSegments;i++){
      if (this.segments[i].location.x > canvas.width || this.segments[i].location.x < 0){
        this.segments[i].velocity.x = -this.segments[i].velocity.x;
      }
      if (this.segments[i].location.y > canvas.height || this.segments[i].location.y < 0){
        this.segments[i].velocity.y = -this.segments[i].velocity.y;
      }
    }
}

// function Snake(x, y, dx, dy, clr, numSegments){
//   this.location = new JSVector(x, y);
//   this.velocity = new JSVector(dx, dy);
//   this.acceleration = new JSVector(0, 0);
//   this.clr = clr;
//   this.segments = [];
//   this.startRad = 20;
//   this.numSegments = numSegments;
// }
//
// Snake.prototype.run = function(){
//     this.checkEdges();
//     this.render();
//     this.update();
// }
//
//
// Snake.prototype.render = function(){
//     let ctx = game.ctx;
//     let locx=this.location.x;
//     let locy=this.location.y;
//     let rad = this.startRad;
//
//     for(let i=0;i<this.numSegments;i++){
//       ctx.strokeStyle = this.clr;
//       ctx.beginPath();
//       ctx.arc(locx, locy, rad, Math.PI*2, 0, false);
//       ctx.stroke();
//       locx= locx-rad-5;
//       locy= locy-rad-5;
//       if(rad-2 >0){
//         rad = rad-2;
//       }
//     }
//   }
//
// Snake.prototype.update = function(){
//
//     if(!game.gamePaused){
//       let dir = this.segments[0].getDirection();
//       for(let i=1;i<this.numSegments;i++){
//         this.segments[i].setDirection(dir);
//       }
//
//       this.velocity.add(this.acceleration);
//       this.velocity.limit(3);
//       this.location.add(this.velocity);
//     }
// }
//
// Snake.prototype.checkEdges = function(){
//     let canvas = game.canvas;
//
//     if (this.location.x > canvas.width || this.location.x < 0){
//       this.velocity.x = -this.velocity.x;
//     }
//     if (this.location.y > canvas.height || this.location.y < 0){
//       this.velocity.y = -this.velocity.y;
//     }
//   }
