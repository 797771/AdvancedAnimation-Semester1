class Cell {
    constructor(game, r, c, occ) {
        this.game = game;
        this.width = game.cellWidth;
        this.height = game.cellHeight;
        let x = c * this.width;
        let y = r * this.height;
        this.loc = new JSVector(x, y);
        this.r = r;
        this.c = c;
        this.occupied = occ;
        this.dist=1000;

        // this.neighbors = {
        //   n: null,
        //   e: null,
        //   s: null,
        //   w: null,
        // }
        this.neighbors = new Array();
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
      if(this==this.game.grid[this.game.numRows-1][this.game.numCols-1]){
        this.clr = "orange"
      }
      let ctx = this.game.ctx;
      ctx.strokeStyle = "black";
      ctx.fillStyle=this.clr;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(this.loc.x, this.loc.y, this.width, this.height);
      ctx.fill();

      ctx.font = "10px sans-serif";
      ctx.strokeText(this.dist, this.loc.x+5, this.loc.y+30);
      ctx.stroke();
      ctx.restore();
    }

    loadNeighbors(n){
    //   if(this.game.arrLoaded){
    //     if(this.r>0 && !this.game.grid[this.r-1][this.c].occupied){//north
    //       this.neighbors.n=this.game.grid[this.r-1][this.c];
    //     }
    //     if(this.c>0 && !this.game.grid[this.r][this.c-1].occupied){//west
    //       this.neighbors.w=this.game.grid[this.r][this.c-1];
    //     }
    //     if(this.r<this.game.numRows-1 && !this.game.grid[this.r+1][this.c].occupied){//south
    //       this.neighbors.s=this.game.grid[this.r+1][this.c];
    //     }
    //     if(this.c<this.game.numCols-1 && !this.game.grid[this.r][this.c+1].occupied){//east
    //       this.neighbors.e=this.game.grid[this.r][this.c+1];
    //     }
    // }
  //   if(this.game.arrLoaded){
  //     if(this.r>0 && !this.game.grid[this.r-1][this.c].occupied){//north
  //       this.neighbors[0]=this.game.grid[this.r-1][this.c];
  //     }
  //     if(this.c>0 && !this.game.grid[this.r][this.c-1].occupied){//west
  //       this.neighbors[3]=this.game.grid[this.r][this.c-1];
  //     }
  //     if(this.r<this.game.numRows-1 && !this.game.grid[this.r+1][this.c].occupied){//south
  //       this.neighbors[2]=this.game.grid[this.r+1][this.c];
  //     }
  //     if(this.c<this.game.numCols-1 && !this.game.grid[this.r][this.c+1].occupied){//east
  //       this.neighbors[1]=this.game.grid[this.r][this.c+1];
  //     }
  //   }
  // }
  if(this.game.arrLoaded && this.neighbors.length==0){
    if(this.r>0){//north
      this.neighbors.push(this.game.grid[this.r-1][this.c]);
    }
    if(this.c>0){//west
      this.neighbors.push(this.game.grid[this.r][this.c-1]);
    }
    if(this.r<this.game.numRows-1){//south
      this.neighbors.push(this.game.grid[this.r+1][this.c]);
    }
    if(this.c<this.game.numCols-1){//east
      this.neighbors.push(this.game.grid[this.r][this.c+1]);
    }
  }
}

}//+++++++++++++++++++++  end of Cell class
