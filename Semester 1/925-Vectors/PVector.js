function PVector(px, py){
  this.x = px;
  this.y = py;
}

PVector.prototype.add(PVector v) {
  this.y = this.y + v.y;
  this.x = this.x + v.x;
}
