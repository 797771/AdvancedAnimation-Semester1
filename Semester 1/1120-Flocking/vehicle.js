function Vehicle(location){
  this.location = new JSVector(location.x, location.y);
  let dx = Math.random()*4-2;
  let dy = Math.random()*4-2;
  this.velocity = new JSVector(dx, dy);
  this.accleration = new JSVector(0,0);
  this.desiredSep = 10; //desired separation between vehicles
  this.clr = "rgba(180,0,220,.8)";
  this.maxSpeed = document.getElementById("slider2").value;
  this.maxForce = document.getElementById("slider1").value;
}

Vehicle.protoype.run = function(){
  this.flock(vehicles);
  this.update();
  this.checkEdges();
  this.render();
}

Vehicle.protoype.render = function(){

}

Vehicle.protoype.update = function(){

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

Vehicle.protoype.flock = function(vehicles){
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

Vehicle.protoype.separate = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = JSVector.distance(this.location, vehicles[i].location);
    if((d>0) && (d<this.desiredSep)){
        let diff = JSVector.sub(this.location, vehicles[i].location);
        diff.normalize();
        diff.divide(d);
        sum.add(diff);
        count++;
    }
    if(count>0){
      sum.divide(count);
      sum.normalize();
      sum.multiply(maxSpeed);
      let steer = JSVector.sub(sum, this.velocity);
      steer.limit(maxForce);
      return steer;
    }
    else{
      return new JSVector(0,0);
    }
}

Vehicle.protoype.align = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = JSVector.distance(this.location, vehicles[i].location);
    if((d>0) && (d<this.desiredSep)){
      sum.add(vehicles[i].velocity);
      count++;//keep track of number of vehicles within distance
    }
  }
  if(count>0){
    sum.divide(count);
    sum.normalize();
    sum.multiply(maxSpeed);
    let steer = JSVector.sub(sum, this.velocity);
    steer.limit(maxForce);
    return steer;
  }
  else{
    return new JSVector(0,0);
  }
}

Vehicle.protoype.cohesion = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = JSVector.distance(this.location, vehicles[i].location);
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

Vehicle.protoype.seek = function(target){
  let desired = JSVector.sub(target, this.location);
  desired.normalize();
  desired.multiply(maxSpeed);
  let steer = JSVector.sub(desired, this.velocity);
  steer.limit(maxForce);
  return steer;
}
