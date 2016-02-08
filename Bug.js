
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

var Bug = function(x,y,type,draw){
  this.dead = false;
  this.opacity = 1;
}

//Bug factory
function createBug(x,y){

}

//The bug's clickFunction
function killBug(){
  this.dead = true;
  //TODO: loop should lower opacity of dead bugs
}
