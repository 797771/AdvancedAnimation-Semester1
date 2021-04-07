function Tower(x, y, rad, clr, tNum){
  this.location = new JSVector(x, y);
  this.rad = rad;
  this.clr = clr;
  this.tNum = tNum;

  //create the array of movers for each tower
  this.movers = [];
  let numMovers = 50;
  for(var i = 0; i < numMovers; i++){
      var x, y, dx, dy, rad, clr;
      x = this.location.x;
      y = this.location.y;
      dx=Math.random()*3-2;
      dy=Math.random()*3-2;
      rad = 2.5;
      clr = "rgba(255, 255, 255, 0.7)";
      this.movers.push(new Mover(x, y, dx, dy, rad, clr, this.tNum)); // add new mover to array
  }
}

Tower.prototype.run = function(){
    this.update();
    this.render();
  }


// draw the tower on the canvas
Tower.prototype.render = function(){
    let ctx = game.ctx;
    ctx.strokeStyle = 'rgb(0,0,0, 0.0)';
    ctx.fillStyle = 'rgb(0,0,0, 0.0)';
    ctx.beginPath();
    ctx.arc(this.location.x,this.location.y, this.rad, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();

  }

Tower.prototype.update = function(){
  for(let i=0; i<this.movers.length;i++){
    this.movers[i].run();
  }
}
