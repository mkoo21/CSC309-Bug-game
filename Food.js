
var food = function(x, y, width, height, drawFunction){
   this.__proto__ = new Displayable(x, y, foodRadius, foodRadius, drawFood);
   this.isDead = false;
}
