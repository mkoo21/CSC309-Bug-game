
var Food = function(x, y, width, height, drawFunction){
   this.__proto__ = new Clickable(x, y, width, height,
     drawFunction, function(){killOnClick(this);});
   this.isDead = false;
}


function drawFood(context){
  context.beginPath();
  context.arc(this.x + (this.width/2), this.y + (this.height/2),
  this.width/2, 0, 2*Math.PI);
  context.fillStyle = 'blue';
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = 'black';
  context.stroke();
  if(this.isCollided){
    this.isDead == true;
    }
}


function killOnClick(food){
  //For testing only
  food.isCollided = true;
}
