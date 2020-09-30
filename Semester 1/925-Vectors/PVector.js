function PVector(x1, y1){
  this.x = x1;
  this.y = y1;
}

PVector.prototype.add(v3){
  this.y = this.y + v3.y;
  this.x = this.x + v3.x;
}
