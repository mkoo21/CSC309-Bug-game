/* Buttons are a Clickable type object
    */
var Button = function(x, y, width, height, text, id, clickFunction) {
    this.text = text; // Text shown on button
    this.id = id; //Identifier
    this.__proto__ = new Clickable(x,y,width,height,clickFunction);

    this.draw = function(context){
      context.beginPath();
      context.lineWidth="5";
      context.rect(this.x, this.y, this.width, this.height);
      context.stroke();
      context.font="30px Arial";
      context.fillText(this.text,this.x + this.width/3,this.y + this.height/1.5);
    }



}
