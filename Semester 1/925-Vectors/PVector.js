function PVector(x1, y1){
  this.x = x1;
  this.y = y1;
}

PVector.prototype.add = function(v3){
  this.x = this.x + v3.x;
  this.y = this.y + v3.y;
}
