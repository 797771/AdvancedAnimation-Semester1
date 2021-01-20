class Cell {
    constructor(, row, col, ) {
      let width = ecoSystem.cellWidth;
      let height = ecoSystem.cellHeight;
      let xCoor = col*width;
      let yCoor = row*height;
    }//  +++++++++  end constructor

    run() {
        this.render();
        this.update();
    }

    render() {
      ctx = ecoSystem.context1;
      ctx.save();
      ctx.strokeStyle = "black";
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.rect(this.xCoor, this.yCoor, this.width, this.height);
      

    }

    update() {

    }
}//+++++++++++++++++++++  end of Cell class
