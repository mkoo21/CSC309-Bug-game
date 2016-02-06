/* Buttons are a Clickable type object
    */
var Button = function(x, y, width, height, text, id, clickFunction, drawFunction) {
    this.text = text; // Text shown on button
    this.id = id; //Identifier
    this.__proto__ = new Clickable(x,y,width,height, drawFunction, clickFunction);

}
