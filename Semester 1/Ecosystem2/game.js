function Game(){

    this.gamePaused = false;    // the game may be paused or not
    this.ga = new GameArea();   // create all the dom elements
    // get the canvas as a property of the game
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
    this.canvas = document.getElementById('canvas');
    // get the context
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = this.canvas.getContext('2d'); // This is the context

    this.movers = [];
    this.createMovers(this.canvas, 1);

    //   create the array of bubble objects
    this.stars = [];
    let numStars = 10;
    for(var i = 0; i < numStars; i++){
        var x, y, dx, dy, clr, r, g, b;
        x = Math.random()*this.canvas.width;
        y = Math.random()*this.canvas.height;
        dx = Math.random()*6-3;
        dy = Math.random()*6-3;
        r = 255;
        g = 255;
        b = 255;
        clr = "rgba(" + r + ", "+ g + ","+ b +")"
        this.stars.push(new Star(x, y, dx, dy, clr));
    }

    this.hearts = [];
    let numHearts = 4;
    for(var i = 0; i < numHearts; i++){
        var x, y, dx, dy, clr, r, g, b;
        x = Math.random()*this.canvas.width;
        y = Math.random()*this.canvas.height;
        dx = Math.random()*6-3;
        dy = Math.random()*6-3;
        r = 255;
        g = 255;
        b = 255;
        clr = "rgba(" + r + ", "+ g + ","+ b +")"
        this.hearts.push(new Heart(x, y, dx, dy, clr));
      }


}

// function to run the game each animation cycle
Game.prototype.run = function(){
  if(!this.gamePaused){
    for(let i = 0; i < this.hearts.length; i++){
    this.hearts[i].run();
   }
    for(let i = 0; i < this.stars.length; i++){
      this.stars[i].run();
    }
    for(let i = 0; i < this.movers.length; i++){
      this.movers[i].run();
    }
  }
}

Game.prototype.createMovers = function(canvas, numMovers){
  for(var i = 0; i<numMovers;i++){
    var x, y, dx, dy, radius, clr, numOrbs;
    radius = 30;
    x = Math.random()*this.canvas.width;
    y = Math.random()*this.canvas.height;
    dx = Math.random()*2-1;
    dy = Math.random()*2-1;
    clr = "rgba(8, 146, 208, 1)"
    numOrbs = 40;
    this.movers.push(new Mover(x, y, dx, dy, radius, clr, numOrbs));
  }
}
