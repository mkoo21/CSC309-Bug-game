
var infoBar = function(score,height){
  this.display = false; //whether or not to show bar
  this.score = score;
  this.height = height;
}

function drawInfoBar(context){
  context.beginPath();
  context.lineWidth="5";
  context.moveTo(0,this.height);
  context.lineTo(canvas.width);
  context.stroke();
}
