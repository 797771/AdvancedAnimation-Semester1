function Game(){

    this.gamePaused = false;    // the game may be paused or not
    this.ga = new GameArea();   // create all the dom elements
    // get the canvas as a property of the game
    this.canvas = document.getElementById('canvas');
    // get the context
    this.ctx = this.canvas.getContext('2d'); // This is the context

    //create particle system
    let x = this.canvas.width/2;
    let y = this.canvas.height/2;
    this.psystem = new ParticleSystem(x, y);
}

// function to run the game each animation cycle
Game.prototype.run = function(){
  if(!this.gamePaused){
    this.psystem.run();
  }
}
