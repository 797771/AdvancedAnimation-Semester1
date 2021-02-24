function Game(){

    this.ga = new GameArea();   // create all the dom elements
    // get the canvas as a property of the game
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
    this.canvas = document.getElementById('canvas');
    this.canvas1Loc = new JSVector();
    // get the context
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = this.canvas.getContext('2d'); // This is the context

    //  set number of cells in grid
    this.numCols = 20;
    this.cellWidth = this.canvas.width / this.numCols;
    this.numRows = 13;
    this.cellHeight = this.canvas.height / this.numRows;

    // Create the two-dimensional grid of cells
    this.grid = new Array(this.numRows);
    // Populate the grid of cells
    this.arrLoaded=false;
    for (let r = 0; r < this.grid.length; r++) {
        this.grid[r] = new Array(this.numCols);
        for (let c = 0; c < this.grid[r].length; c++) {
            if(Math.random()*10 < 2){
              this.grid[r][c] = new Cell(this, r, c, true);
            }
            else{
              this.grid[r][c] = new Cell(this, r, c, false);
            }
        }
    }
    this.arrLoaded=true;

    this.canvas.addEventListener("click", function(e){
      let c = Math.floor((e.offsetX+game.canvas1Loc.x)/game.cellWidth);
      let r = Math.floor((e.offsetY+game.canvas1Loc.y)/game.cellHeight);
      if((c>=0 && c<game.numCols) && (r>=0 && r<game.numRows)){
        game.grid[r][c].occupied = !game.grid[r][c].occupied;
      }
    });

}//++++++++++++++++++++++  end Game constructor

// function to run the game each animation cycle
Game.prototype.run = function(){
    for (let r = 0; r < this.grid.length; r++) {
        for (let c = 0; c < this.numCols; c++) {
            this.grid[r][c].run();
        }
    }
    // Show the end cell
    this.ctx.font = '18px sans-serif';
    let endCell = this.grid[this.numRows-1][this.numCols-1];
    this.ctx.fillText("End", endCell.loc.x + endCell.width/2 - 16,
                    endCell.loc.y + endCell.height/2 + 8);

    //label distances from endCell
    this.distances();

}

Game.prototype.distances = function(){
  let queue = new Array();
  let parentCell;
  let endCell = this.grid[this.numRows-1][this.numCols-1];
  endCell.dist = 0;
  queue.push(endCell);
  for(;queue.length>0;){
    parentCell = queue.shift();
    for(let i=0;i<parentCell.neighbors.length;i++){
      if(10<parentCell.neighbors[i].dist){
        parentCell.neighbors[i].dist=parentCell.dist+10;
        queue.push(parentCell.neighbors[i]);
      }
    }
  }
}
