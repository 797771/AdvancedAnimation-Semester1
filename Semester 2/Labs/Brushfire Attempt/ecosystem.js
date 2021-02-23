class EcoSystem {
    constructor() {
        this.canvas1 = document.getElementById('cnv1');
        this.context1 = this.canvas1.getContext('2d');
        this.canvas1Loc = new JSVector();
        this.valuesSet = false;

        //  set number of columns, rows and cell width-height
        this.numCols = 40;
        this.cellWidth = this.canvas1.width/this.numCols;
        this.numRows = 30;
        this.cellHeight = this.canvas1.height/this.numRows;

        //  set number of cells in canvas
        this.cells = new Array(this.numRows);


        this.arrLoaded = false;
        //  load a 2D array of Cell objects
        for(let r=0; r<this.cells.length; r++){
          this.cells[r] = new Array(this.numCols);
          for(let c=0; c<this.numCols; c++){
            if(Math.random()*10 < 3){
              this.cells[r][c] = new Cell(this, r, c, true);
            }
            else{
              this.cells[r][c] = new Cell(this, r, c, false);
            }
          }
        }
        this.arrLoaded = true;

        this.canvas1.addEventListener("click", function(e){
          // this.xCoor = col*this.width+this.es.world.left;
          // this.yCoor = row*this.height+this.es.world.top;
          let c = Math.floor((e.offsetX+ecoSystem.canvas1Loc.x)/ecoSystem.cellWidth);
          let r = Math.floor((e.offsetY+ecoSystem.canvas1Loc.y)/ecoSystem.cellHeight);
          if((c>=0 && c<ecoSystem.numCols) && (r>=0 && r<ecoSystem.numRows)){
            ecoSystem.cells[r][c].occupied = !ecoSystem.cells[r][c].occupied;
          }
        });
    }//  +++++++++++++++++++++++++++++++++++++++++++++++++++  end Constructor

    // function to run the game each animation cycle
    run() {


        let ctx1 = this.context1;
        let cnv1 = this.canvas1;
        ctx1.fillStyle = "green";
        ctx1.fillRect(0, 0, cnv1.width, cnv1.height);

        ctx1.save();
        // translate according to the location of the canvas in the world
        ctx1.translate(-this.canvas1Loc.x, -this.canvas1Loc.y);
        // draw the bounds of the world in canvas1
        ctx1.beginPath();
        // ctx1.rect(this.world.left, this.world.top, this.world.width, this.world.height);
        ctx1.strokeStyle = "green";
        ctx1.lineWidth = 2;
        ctx1.stroke();
        //draw the x and y axes of the world in canvas1
        ctx1.beginPath();
        ctx1.moveTo(this.world.left, 0);
        ctx1.lineTo(this.world.right, 0);
        ctx1.moveTo(0, this.world.top);
        ctx1.lineTo(0, this.world.bottom);
        ctx1.strokeStyle = "red";
        ctx1.lineWidth = 2;
        ctx1.stroke();

        //  Render the cells in the 2D array
        let firstR = Math.floor((this.canvas1Loc.y-this.world.top)/this.cellHeight);
        if(firstR<0){
          firstR=0;
        }
        let lastR= Math.floor(firstR + (cnv1.height/this.cellHeight));
        if(lastR>=this.numRows){
          lastR = this.numRows-1;
        }
        let firstC = Math.floor((this.canvas1Loc.x-this.world.left)/this.cellWidth);
        if(firstC<0){
          firstC=0;
        }
        let lastC = Math.floor((this.canvas1Loc.x-this.world.left+cnv1.width)/this.cellWidth);
        if(lastC>=this.numCols){
          lastC = this.numCols-1;
        };


        for(let r=firstR;r<=lastR; r++){
          for(let c=firstC; c<=lastC; c++){
                this.cells[r][c].run();
            }
          }

        this.setValues();
        this.valuesSet=true;

        ctx1.restore();
    }// ++++++++++++++++++++++++  end run()


    setValues(){
      let lastcell = this.cells[this.numRows-1][this.numCols-1];
      lastcell.value = 0;
      for(let r=this.numRows-1; r>0; r--){
        for(let c=this.numCols-1; c>0; c--){
          let neighbors = this.cells[r][c].neighbors;
          if(neighbors.n != null && neighbors.n.value == 0){//north
            neighbors.n.value+=10;
          }
          if(neighbors.e != null && neighbors.e.value == 0 && neighbors.e != lastcell){//east
            neighbors.e.value+=10;
          }
          if(neighbors.s != null && neighbors.s.value == 0 && neighbors.s != lastcell){//south
            neighbors.s.value+=10;
          }
          if(neighbors.w != null && neighbors.w.value == 0){//west
            neighbors.w.value+=10;
          }
          if(neighbors.ne != null && neighbors.ne.value == 0){//north east
            neighbors.ne.value+=14;
          }
          if(neighbors.se != null && neighbors.se.value == 0 && neighbors.se != lastcell){//south east
            neighbors.se.value+=14;
          }
          if(neighbors.sw != null && neighbors.sw.value == 0){//south west
            neighbors.sw.value+=14;
          }
          if(neighbors.nw != null && neighbors.nw.value == 0){//north west
            neighbors.nw.value+=14;
          }
        }
      }
    }


}//  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Class
