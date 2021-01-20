function Vehicle(location){
  this.location = new JSVector(location.x, location.y);
  let dx = Math.random()*4-2;
  let dy = Math.random()*4-2;
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0,0);
  this.desiredSep = 20; //desired separation between vehicles
  this.neighborDist = 100;
  this.clr = "rgba(30, 139, 195, 1)";
  this.maxSpeed = 1;
  this.maxForce = 1.5;
}

Vehicle.prototype.run = function(vehicles){
  this.flock(vehicles);
  this.update();
  this.checkEdges();
  this.render();
}

Vehicle.prototype.render = function(){
  let ctx = game.context1;


      ctx.strokeStyle = "rgba(247, 202, 24, 1)";
      ctx.fillStyle = "rgba(247, 202, 24, 1)";

      ctx.save();
      ctx.beginPath();
      ctx.translate(this.location.x, this.location.y);
      ctx.rotate(this.velocity.getDirection()-Math.PI/2);
      ctx.moveTo(-8, -8);
      ctx.lineTo(0, 10);
      ctx.lineTo(6, -8);
      ctx.lineTo(-10, 1);
      ctx.lineTo(10, 1);
      ctx.lineTo(-8, -8);
      ctx.stroke();
      ctx.fill();
      ctx.restore();

      let ctx2 = game.context2;


          ctx2.strokeStyle = "rgba(247, 202, 24, 1)";
          ctx2.fillStyle = "rgba(247, 202, 24, 1)";

          ctx2.save();
          ctx2.beginPath();
          ctx2.translate(this.location.x, this.location.y);
          ctx2.rotate(this.velocity.getDirection()-Math.PI/2);
          ctx2.moveTo(-8, -8);
          ctx2.lineTo(0, 10);
          ctx2.lineTo(6, -8);
          ctx2.lineTo(-10, 1);
          ctx2.lineTo(10, 1);
          ctx2.lineTo(-8, -8);
          ctx2.stroke();
          ctx2.fill();
          ctx2.restore();

}

Vehicle.prototype.update = function(){
  if(!game.gamePaused){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
  }

}

Vehicle.prototype.checkEdges = function(){
  let world = game.world;
  if (this.location.x > world.right){
    this.location.x = world.left;
  }
  else if(this.location.x < world.left){
    this.location.x = world.right;
  }
  if (this.location.y < world.top){
    this.location.y = world.bottom;
  }
  else if(this.location.y > world.bottom){
    this.location.y = world.top;
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
  let sepMult = 0.05;
  let aliMult = 0.05;
  let cohMult = 0.01;
  //calculate 3 forces
  sep.multiply(sepMult);
  ali.multiply(aliMult);
  coh.multiply(cohMult);
  //add forces to flockForce
  flockForce.add(sep);
  flockForce.add(ali);
  flockForce.add(coh);
  flockForce.limit(this.maxForce);//limiting by maxForce
  this.acceleration.add(flockForce);
}

Vehicle.prototype.separate = function(vehicles){
  let sepForce = new JSVector(0,0);
  for(var i=0; i<vehicles.length;i++){
    let diff = JSVector.subGetNew(this.location, vehicles[i].location);
    let d = diff.getMagnitude();
    if((d>0) && (d<this.desiredSep)){
        diff.normalize();
        sepForce.add(diff);
    }
  }
  return sepForce;
}

Vehicle.prototype.align = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = this.location.distance(vehicles[i].location);
    if((d>0) && (d<this.neighborDist)){
      sum.add(vehicles[i].velocity);
      count++;//keep track of number of vehicles within distance
    }
  }
  if(count>0){
    sum.divide(count);
    sum.normalize();
    sum.multiply(this.maxSpeed);//maxSpeed
    let steer = sum.sub(this.velocity);
    steer.limit(this.maxForce);//maxForce
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
    if((d>0) && (d<this.neighborDist)){
      sum.add(vehicles[i].location);
      count++;//keep track of number of vehicles within distance
    }
  }
  if(count>0){
    sum.divide(count);
    return this.seek(sum);
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
