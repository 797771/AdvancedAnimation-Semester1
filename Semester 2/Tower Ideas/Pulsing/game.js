function Game(){
    this.ga = new GameArea();
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    //   create the array of towers
    this.towers = [];
    let numTowers = 1;
    for(var i = 0; i < numTowers; i++){
        var x, y, rad, clr;
        x = this.canvas.width/2;
        y = this.canvas.height/2;
        rad = 10;
        clr = 'green';
        this.towers.push(new Tower(x, y, rad, clr, i)); // add new tower to array
    }
}

// function to run the game each animation cycle
Game.prototype.run = function(){
    for(let i = 0; i < this.towers.length; i++){
      this.towers[i].run();    // run each tower
   }
}
