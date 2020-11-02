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

//A segment that is not a mover moves by first
//finding the vector difference between itself and the segment in front of it.
Snake.prototype.update = function(){
    if(!game.gamePaused){
      for(let i=0;i<this.numSegments;i++){
        if(i===0){
          let vel = JSVector.subGetNew(this.mover.location, this.segments[i]);
        }
        else if{
          let vel = JSVector.subGetNew(this.segments[i-1], this.segments[i]);
        }
        this.segments[i].add(vel);
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
