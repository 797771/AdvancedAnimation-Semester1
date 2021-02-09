class Cell {
    constructor(es, row, col, occ) {
      this.es = es;
      this.col = col;
      this.row = row;
      this.ctx1 = es.context1;
      this.width = es.cellWidth;
      this.height = es.cellHeight;
      this.xCoor = col*this.width+this.es.world.left;
      this.yCoor = row*this.height+this.es.world.top;
      this.loc = new JSVector(this.xCoor, this.yCoor);
      this.occupied = occ;

      this.neighbors = {
        n: null,
        e: null,
        s: null,
        w: null,
      }

    }//  +++++++++  end constructor

    run() {
        this.render();
        this.loadNeighbors(this.neighbors);
    }

    render() {
      if(this.occupied == true){
        this.clr = "red"
      }
      else{
        this.clr = "green"
      }
      let ctx1 = this.ctx1;
      ctx1.save();
      ctx1.strokeStyle = "rgba(0,0,0,1)";
      ctx1.fillStyle = this.clr;
      ctx1.beginPath();
      ctx1.rect(this.loc.x, this.loc.y, this.width, this.height);
      ctx1.fill();
      ctx1.font = "20px serif";
      ctx1.strokeText("c = "+ this.col, this.loc.x+5, this.loc.y+20);
      ctx1.strokeText("r = "+ this.row, this.loc.x+5, this.loc.y+50);
      ctx1.stroke();
      ctx1.restore();
    }

    loadNeighbors(){
    if(this.row>0 && !this.es.cells[this.row-1][this.col].occupied){
      this.neighbors.n=this.es.cells[this.row-1][this.col];
    }
    if(this.col>0 && !this.es.cells[this.row][this.col-1].occupied){
      this.neighbors.w=this.es.cells[this.row][this.col-1];
    }
    if(this.row<this.es.numRows-1 && !this.es.cells[this.row+1][this.col].occupied){
      this.neighbors.s=this.es.cells[this.row+1][this.col];
    }
    if(this.col<this.es.numCols-1 && !this.es.cells[this.row][this.col+1].occupied){
      this.neighbors.e=this.es.cells[this.row][this.col+1];
    }
  }

}//+++++++++++++++++++++  end of Cell class
