/*
  Superclass for clickable objects
*/
var Clickable = function(x, y, width, height, clickFunction){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.click = clickFunction;

  this.detect = function(x,y){
    var inbounds_x = (x > this.x) && (this.x + this.width > x);
    var inbounds_y = (y  > this.y) && (this.y + this.height > y);
    if(inbounds_x && inbounds_y){
      this.click();
      return true;
    }
    return false;
  }
}
