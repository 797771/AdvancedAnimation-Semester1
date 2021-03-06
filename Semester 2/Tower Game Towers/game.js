function Game(){

    this.ga = new GameArea();   // create all the dom elements
    // get the canvas as a property of the game
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
    this.canvas = document.getElementById('canvas');
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
    for (let r = 0; r < this.grid.length; r++) {
        this.grid[r] = new Array(this.numCols);
        for (let c = 0; c < this.grid[r].length; c++) {
            this.grid[r][c] = new Cell(this, r, c);
        }
    }

    // Create a path for the actors to follow.
    // The path is an array of cells as specified in a separate file.
    this.path = [];
    for(let c = 0; c < pathCells.length; c++){
        let cell = this.grid[pathCells[c][0]][pathCells[c][1]];
        cell.isPath = true;
        this.path.push(cell);
    }

    // Create an actor to follow the path.
    // Additional actors may be created periodically.
    this.actors = [];
    this.actors.push(new Actor(this));
    setInterval(this.addActor,5000);


    //add tower to clicked cell
    this.towers=[];
    this.numTowers=0;
    this.canvas.addEventListener("click", function(t){
      let c = Math.floor((t.offsetX)/game.cellWidth);
      let r = Math.floor((t.offsetY)/game.cellHeight);
      if(!game.grid[r][c].isPath){
          let x = game.grid[r][c].loc.x+27.4;
          let y = game.grid[r][c].loc.y+26.8;
          let rad = 10;
          let clr = "white";
          game.towers.push(new Tower(x, y, rad, clr, game.numTowers));
          game.numTowers++;
        }
    });


}//++++++++++++++++++++++  end Game constructor

// function to run the game each animation cycle
Game.prototype.run = function(){
    this.ctx.fillStyle = "saddlebrown";
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    for (let r = 0; r < this.grid.length; r++) {
        for (let c = 0; c < this.numCols; c++) {
            this.grid[r][c].run();
        }
    }
    // Show the end cell
    this.ctx.fillStyle = "brown";
    this.ctx.font = '18px sans-serif';
    let endCell = this.path[this.path.length-1];
    this.ctx.fillText("End", endCell.loc.x + endCell.width/2 - 16,
                    endCell.loc.y + endCell.height/2 + 8);

    // run all the actors
    for(let i = 0; i < this.actors.length; i++){
        this.actors[i].run();
    }
    for(let i = 0; i < this.towers.length; i++){
        this.towers[i].run();    // run each tower
   }

}

Game.prototype.addActor = function(){
 game.actors.push(new Actor(game));
}
