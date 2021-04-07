// Actor class.  Each actor starts life at the beginning of a path
// and follows that path to the end where it dies.

class Actor {
    constructor(game){
        this.game = game;
        // start off the actor in the first cell of the path
        this.pathIndex = 0;
        this.currentCell = game.path[this.pathIndex];
        this.nextCell = game.path[this.pathIndex+1];   // next in the path of cells
        // where this actor should aim -- the center of the next cell in the path
        this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width/2,
                            this.nextCell.loc.y + this.nextCell.height/2);
        this.lastCell = game.path[game.path.length-1];  // end of the path
        // position the actor initially in the center of the first cell
        this.loc = new JSVector(this.currentCell.loc.x + this.currentCell.width/2,
                                this.currentCell.loc.y + this.currentCell.height/2);
        this.vel = new JSVector(0,0);   // velocity
        this.acc = new JSVector(0,0);   //steering acceleration
        this.pulser = new JSVector(0,0);
        this.maxSpeed = 1;
        this.clr="rgba(0, 128, 0)";
        this.rad=6;
        this.closeT;
    }

    run() {
        this.update();
        this.render();
    }

    update(){
        //attraction to towers
        if(game.towers.length == 0){
          this.followPath();
        }
        else{
          this.findCloseTower();
          let towerLoc = this.closeT.location;
          let d = this.loc.distance(towerLoc);
          if(d<100){
            this.pulser = JSVector.subGetNew(towerLoc, this.loc);
            this.pulser.normalize();
            this.pulser.multiply(0.05);

            this.vel.add(this.pulser);
            this.vel.limit(1.5);
            this.loc.add(this.vel);
            if(this.rad>3){
              this.rad-=0.05;;
            }
          }
          else{
            this.followPath();
          }
        }
  }

    render(){
        let ctx = game.ctx;
        ctx.strokeStyle = this.clr;
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }

    followPath(){
      if(this.currentCell!=this.lastCell){
        let d = this.loc.distance(this.target);
        this.acc = JSVector.subGetNew(this.target, this.loc);
        this.acc.normalize();
        this.acc.multiply(0.08);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.loc.add(this.vel);

        if(d<=25){
          this.pathIndex++;
          this.currentCell = this.game.path[this.pathIndex];
          this.nextCell = this.game.path[this.pathIndex+1];
          this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width/2,
                              this.nextCell.loc.y + this.nextCell.height/2);
        }
      }
    }

    findCloseTower(){
      let minD = 1200;
      for(let i=0; i<game.towers.length;i++){
        let towerLoc = game.towers[i].location;
        let d = this.loc.distance(towerLoc);
        if(d<minD){
          minD = d;
          this.closeT = game.towers[i];
        }
      }
    }

}
