var food = [];
var bugs = [];
var buttons = [];
var displays = [];
var state;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.addEventListener("mousedown", getPosition, false);

 /* Mousedown event on canvas */
function getPosition(event){
  var x = event.offsetX;
  var y = event.offsetY;
  document.getElementById("ptext").innerHTML = "Event x: " + x + " y: " + y;

  //Iterate over clickable objects searching for a hit
  allClickables = buttons.concat(bugs);

  for (var i = 0; i < allClickables.length; i++) {
    result = buttons[i].detect(x,y);
    document.getElementById("ptext2").innerHTML = result;
    if(result == true){
      break;  //Only one thing can be clicked at a time
    }
  }
}

function startGame(){
  setState("start");
  setInterval(draw, 20);
  document.getElementById("ptext").innerHTML = "Menu";
}

/* Draw game objects by calling their draw functions
    All draw functions should have the same sig (take context as param)
  */
function draw(){
  //Iterate over all objects (for now just buttons)
  for(var i = 0; i < buttons.length;i++){
    buttons[i].draw(context);
  }
}

/*
  Clear entire board (individual objects will have their own
  clear function) (TODO)
*/
function clear() {
  food = [];
  bugs = [];
  buttons = [];
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function setState(s) {
  // if start menu (use an ifelse or switch or whatever)
  clear();
  state = s;
  if(state == "start"){
    //Start button
    startButton = new Button(100, 400, 200,75,"Start!","startButton",
      function(){
        setState("game");
      }, drawStartButton);
      buttons.push(startButton);

    //Level selections
  } else if(state == "game"){
    document.getElementById("ptext").innerHTML = "GAME STARTED";
  }
}

function drawStartButton(context){
  context.beginPath();
  context.lineWidth="5";
  context.rect(this.x, this.y, this.width, this.height);
  context.stroke();
  context.font="30px Arial";
  context.fillText(this.text,this.x + this.width/3,this.y + this.height/1.5);
}

function drawLevelOneButton(context){
  
}
