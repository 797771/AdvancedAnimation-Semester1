class Cell {
    constructor(game, r, c, occ) {
        this.width = game.cellWidth;
        this.height = game.cellHeight;
        let x = c * this.width;
        let y = r * this.height;
        this.loc = new JSVector(x, y);
        this.r = r;
        this.c = c;
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
        this.clr = "rgba(50, 150, 120, 0.2)"
      }
      if(this==game.grid[game.numRows-1][game.numCols-1]){
        this.clr = "black"
      }
      let ctx = game.ctx;
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.fillStyle=this.clr;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(this.loc.x, this.loc.y, this.width, this.height);
      ctx.fill();
      ctx.stroke();

    }

    update() {

    }

    loadNeighbors(n){
      if(this.game.arrLoaded){
        if(this.row>0 && !this.game.grid[this.row-1][this.col].occupied){//north
          this.neighbors.n=this.game.grid[this.row-1][this.col];
        }
        if(this.col>0 && !this.game.grid[this.row][this.col-1].occupied){//west
          this.neighbors.w=this.game.grid[this.row][this.col-1];
        }
        if(this.row<this.es.numRows-1 && !this.game.grid[this.row+1][this.col].occupied){//south
          this.neighbors.s=this.game.grid[this.row+1][this.col];
        }
        if(this.col<this.es.numCols-1 && !this.game.grid[this.row][this.col+1].occupied){//east
          this.neighbors.e=this.game.grid[this.row][this.col+1];
        }
    }
  }

}//+++++++++++++++++++++  end of Cell class
