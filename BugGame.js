var food = [];
var bugs = [];
var buttons = [];
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
    startButton = new Button(100, 400, 200,75,"Start!","startButton",
      function(){
        setState("game");
      });
      buttons.push(startButton);
  } else if(state == "game"){
    document.getElementById("ptext").innerHTML = "GAME STARTED";
  }
}
