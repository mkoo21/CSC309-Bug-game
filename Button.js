/*
  Buttons in the game extend Clickable
*/

var Button = function(x, y, width, height, text, id, clickFunction, type) {
    this.text = text; // Text shown on button
    this.id = id; //Identifier
    if(type == "start"){
      drawFunction = drawStartButton;
    }
    if(type == "level"){
      drawFunction = drawLevelButton;
    }
    this.__proto__ = new Clickable(x,y,width,height, drawFunction, clickFunction);
    this.clicked = false;
}

function drawStartButton(context){
  context.beginPath();
  context.lineWidth="5";
  context.rect(this.x, this.y, this.width, this.height);
  context.stroke();
  context.font="30px Arial";
  context.fillText(this.text,this.x + this.width/3,this.y + this.height/1.5);
}

function drawLevelButton(context){
  context.beginPath();
  context.lineWidth = 2;
  //Transform button's x, y back to center of circle, and width back to radius
  context.arc(this.x + (this.width/2), this.y + (this.height/2),
  this.width/2, 0, 2*Math.PI);
  //Draw a filled circle for the selected level, an outline for the other
  if(this.clicked == true){
    context.fill();
  }
  else{
    context.stroke();
  }
}
