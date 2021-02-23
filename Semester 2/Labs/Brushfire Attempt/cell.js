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
      this.value = 0;

      this.neighbors = {
        n: null,
        ne: null,
        e: null,
        se: null,
        s: null,
        sw: null,
        w: null,
        nw: null,
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
        this.clr = "rgba(50, 150, 120, 0.2)"
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
      if(ecoSystem.valuesSet){
          ctx1.strokeText("val = "+ this.value, this.loc.x+5, this.loc.y+70);
      }
      ctx1.stroke();
      ctx1.restore();
    }

    loadNeighbors(n){
      if(this.es.arrLoaded){
        if(this.row>0 && !this.es.cells[this.row-1][this.col].occupied){//north
          this.neighbors.n=this.es.cells[this.row-1][this.col];
        }
        if(this.col>0 && !this.es.cells[this.row][this.col-1].occupied){//west
          this.neighbors.w=this.es.cells[this.row][this.col-1];
        }
        if(this.row<this.es.numRows-1 && !this.es.cells[this.row+1][this.col].occupied){//south
          this.neighbors.s=this.es.cells[this.row+1][this.col];
        }
        if(this.col<this.es.numCols-1 && !this.es.cells[this.row][this.col+1].occupied){//east
          this.neighbors.e=this.es.cells[this.row][this.col+1];
        }
        if(this.row>0 && this.col<this.es.numCols-1 && !this.es.cells[this.row-1][this.col+1].occupied){//north east
          this.neighbors.ne=this.es.cells[this.row-1][this.col+1];
        }
        if(this.row>0 && this.col>0 && !this.es.cells[this.row-1][this.col-1].occupied){//north west
          this.neighbors.nw=this.es.cells[this.row-1][this.col-1];
        }
        if(this.col<this.es.numCols-1 && this.row<this.es.numRows-1 && !this.es.cells[this.row+1][this.col+1].occupied){//south east
          this.neighbors.se=this.es.cells[this.row+1][this.col+1];
        }
        if(this.col>0 && this.row<this.es.numRows-1 && !this.es.cells[this.row+1][this.col-1].occupied){//south west
          this.neighbors.sw=this.es.cells[this.row+1][this.col-1];
        }
    }
  }

}//+++++++++++++++++++++  end of Cell class
