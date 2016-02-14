
//Bug parameters (constant)
//Speeds for each level
var bugBlackSpeed_one = 150;
var bugRedSpeed_one = 75;
var bugOrangeSpeed_one = 60;

var bugBlackSpeed_two = 200;
var bugRedSpeed_two = 100;
var bugOrangeSpeed_two = 80;

//Point values
var bugBlackScore = 5;
var bugRedScore = 3;
var bugOrangeScore = 1;

//Probabilities
var bugBlackProb = 0.3
var bugRedProb = 0.3;
var bugOrangeProb = 0.4;

//Dimension of bug hitbox
var bugSize = 25;

var Bug = function(x,y,color, level){
  this.__proto__ = new Displayable(x, y, bugSize, bugSize, drawBug);
  this.dead=false;
  this.color=color;

  if(color == "black"){
    this.value = bugBlackScore;
    if(level == 1){
      this.speed = bugBlackSpeed_one;
    }
    else if(level == 2){
      this.speed = bugBlackSpeed_two;
    }
  }
  else if(color == "red"){
    this.value = bugRedScore;
    if(level == 1){
      this.speed = bugRedSpeed_one;
    }
    else if(level == 2){
      this.speed = bugRedSpeed_two;
    }
  }
  else if(color == "orange"){
    this.value = bugOrangeScore;
    if(level == 1){
      this.speed = bugOrangeSpeed_one;
    }
    else if(level == 2){
      this.speed = bugOrangeSpeed_two;
    }
  }

}

//Bug factory
function createBug(margin, level){
  //set margin as Infobar height + margin in main

  //generate random bug parameters
  var x = Math.floor(Math.random() * (canvas.width - bugSize - (2 * margin))) + margin;
  var y = 0 + margin;
  var color = getBugType();

  //create a bug based on level
  var Abug = new Bug(x,y,color, level);
  return Abug;
}

function getBugType(){
  var probability=Math.random();
  if (probability < 0.3){
    return "black";
  }
  else if (probability >= 0.3 && probability <= 0.6){
    return "red";
  }
  else if (probability > 0.6){
    return "orange";
  }
}

//The bug's clickFunction
function killBug(){
  this.dead = true;
  //TODO: loop should lower opacity of dead bugs
}

function drawBug(context){

  color = this.color;

  //draw the object
  context.save();

  context.beginPath();
  context.arc(this.x+5, this.y+15, 5, 0, 2*Math.PI);
  context.moveTo(this.x+5, this.y+21);
  context.bezierCurveTo(this.x, this.y+20, this.x, this.y+30, this.x+5, this.y+38.75);
  context.moveTo(this.x+5, this.y+21);
  context.bezierCurveTo(this.x+10, this.y+20, this.x+10, this.y+30, this.x+5, this.y+38.75);
  context.fillStyle = color;
  context.lineWidth = 1;
  context.strokeStyle = "#000000"
  context.stroke();

  context.fill();
  context.restore();

  //Move towards closest food
  var fid = findNearest(this.x,this.y);

  //Find distance to center of nearest food
  yp = (foods[fid].y)-this.y;
  xp= (foods[fid].x)-this.x;

  argc = Math.atan2(yp,xp);

  x_distance = Math.cos(argc);
  y_distance = Math.sin(argc);
  factor = (this.speed/50) / (Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2))); //force bug to move this.speed/(ticks per second) pixels
  this.x += factor * x_distance;
  this.y += factor * y_distance;

}
