class Cell {
    constructor(es, row, col, occ) {
      this.es = es;
      this.cells = es.cells;
      this.col = col;
      this.row = row;
      this.ctx1 = es.context1;
      this.width = es.cellWidth;
      this.height = es.cellHeight;
      this.xCoor = col*this.width+this.es.world.left;
      this.yCoor = row*this.height+this.es.world.top;
      this.loc = new JSVector(this.xCoor, this.yCoor);
      this.occupied = occ;

      // //creating an array of neighbors
      // this.neighbors = [];
      // let i=0;
      // for(let r=0; r<es.numRows; r++){
      //   for(let c=0; c<es.numCols; c++){
      //     let cell = this.cells[r][c];
      //     if(cell.col == this.col && cell.row == this.row-1 && cell.occupied==false){//neighbor directly above
      //       this.neighbors[i] = cell;
      //       i++;
      //     }
      //     else if(cell.col == this.col && cell.row == this.row+1 && cell.occupied==false){//neighbor directly below
      //       this.neighbors[i] = cell;
      //       i++;
      //     }
      //     else if(cell.row == this.row && cell.col == this.col-1 && cell.occupied==false){//neighbor directly left
      //       this.neighbors[i] = cell;
      //       i++;
      //     }
      //     else if(cell.row == this.row && cell.col == this.col+1 && cell.occupied==false){//neighbor directly right
      //       this.neighbors[i] = cell;
      //       i++;
      //     }
      //     else if(cell.row == this.row-1 && cell.col == this.col-1 && cell.occupied==false){//top left diagonal
      //       this.neighbors[i] = cell;
      //       i++;
      //     }
      //     else if(cell.row == this.row-1 && cell.col == this.col+1 && cell.occupied==false){//top right diagonal
      //       this.neighbors[i] = cell;
      //       i++;
      //     }
      //     else if(cell.row == this.row+1 && cell.col == this.col-1 && cell.occupied==false){//bottom left diagonal
      //       this.neighbors[i] = cell;
      //       i++;
      //     }
      //     else if(cell.row == this.row+1 && cell.col == this.col+1 && cell.occupied==false){//bottom right diagonal
      //       this.neighbors[i] = cell;
      //       i++;
      //     }
      //   }
      // }

    }//  +++++++++  end constructor

    run() {
        this.render();
        this.update();
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
      ctx1.stroke();
      ctx1.restore();
    }

    update() {
    }
}//+++++++++++++++++++++  end of Cell class
