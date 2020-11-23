function Vehicle(location){
  this.location = new JSVector(location.x, location.y);
  let dx = Math.random()*4-2;
  let dy = Math.random()*4-2;
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0,0);
  this.desiredSep = 10; //desired separation between vehicles
  this.clr = "rgba(30, 139, 195, 1)";
  this.maxSpeed = document.getElementById("slider2").value;
  this.maxForce = document.getElementById("slider1").value;
}

Vehicle.prototype.run = function(vehicles){
  this.flock(vehicles);
  this.update();
  this.checkEdges();
  this.render();
}

Vehicle.prototype.render = function(){
  let ctx = game.ctx;
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;

  ctx.save();
  ctx.beginPath();
  ctx.translate(this.location.x, this.location.y);
  ctx.rotate(this.velocity.getDirection());
  ctx.lineTo(-8, -8);
  ctx.lineTo(0, -5);
  ctx.lineTo(8, -8);
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

}

Vehicle.prototype.update = function(){
  if(!game.gamePaused){
    this.velocity.add(this.acceleration);
    this.velocity.limit(3);
    this.location.add(this.velocity);

  }

}

Vehicle.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if (this.location.x > canvas.width || this.location.x < 0){
      this.velocity.x = -this.velocity.x;
    }
    if (this.location.y > canvas.height || this.location.y < 0){
      this.velocity.y = -this.velocity.y;
    }
  }

Vehicle.prototype.flock = function(vehicles){
  //flock force is the accumulation of all forces
  let flockForce = new JSVector(0, 0);
  //set up force vectors to be added to acceleration
  let sep = this.separate(vehicles);
  let ali = this.align(vehicles);
  let coh = this.cohesion(vehicles);
  //set multiples via sliders
  let sepMult = document.getElementById("slider3").value;
  let aliMult = document.getElementById("slider4").value;
  let cohMult = document.getElementById("slider5").value;
  //calculate 3 forces
  sep.multiply(sepMult);
  ali.multiply(aliMult);
  coh.multiply(cohMult);
  //add forces to flockForce
  flockForce.add(sep);
  flockForce.add(ali);
  flockForce.add(coh);
  this.acceleration.add(flockForce);
}

Vehicle.prototype.separate = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = this.location.distance(vehicles[i].location);
    if((d>0) && (d<this.desiredSep)){
        let diff = this.location.sub(vehicles[i].location);
        diff.normalize();
        diff.divide(d);
        sum.add(diff);
        count++;
    }
    if(count>0){
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.maxSpeed);
      let steer = sum.sub(this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }
    else{
      return new JSVector(0,0);
    }
  }
}

Vehicle.prototype.align = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = this.location.distance(vehicles[i].location);
    if((d>0) && (d<this.desiredSep)){
      sum.add(vehicles[i].velocity);
      count++;//keep track of number of vehicles within distance
    }
  }
  if(count>0){
    sum.divide(count);
    sum.normalize();
    sum.multiply(this.maxSpeed);
    let steer = sum.sub(this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }
  else{
    return new JSVector(0,0);
  }
}

Vehicle.prototype.cohesion = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = this.location.distance(vehicles[i].location);
    if((d>0) && (d<this.desiredSep)){
      sum.add(vehicles[i].location);
      count++;//keep track of number of vehicles within distance
    }
  }
  if(count>0){
    sum.divide(count);
    return seek(sum);
  }
  else{
    return new JSVector(0,0);
  }
}

Vehicle.prototype.seek = function(target){
  let desired = target.sub(this.location);
  desired.normalize();
  desired.multiply(this.maxSpeed);
  let steer = desired.sub(this.velocity);
  steer.limit(this.maxForce);
  return steer;
}
