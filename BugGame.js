//Control variables
var clickables = [];
var gameObjects = []; //contains Displayables
var state;
var level;

//Start screen parameters
//Start game button
var startButtonX = 100; //x position of top left corner
var startButtonY = 400;
var startButtonWidth = 200;
var startButtonHeight = 75;

//Level selection
//Text
var levelTextX = 100;
var levelTextY = 175;
var levelTextWidth = 300;
var levelTextHeight = 50;

//Buttons
var levelOneButtonX = levelTextX + 110; //Coords for center of circle
var levelOneButtonY = levelTextY - 25;

var levelTwoButtonX = levelTextX + 210;
var levelTwoButtonY = levelOneButtonY;

var levelButtonRadius = 5;

//Game mode
var margin = 10; //Objects spawn within this distance of edge of viewport
var foodRadius = 15;

//Get ready for drawing/responding
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.addEventListener("mousedown", getPosition, false);

 /* Mousedown event on canvas */
function getPosition(event){
  var x = event.offsetX;
  var y = event.offsetY;
  document.getElementById("ptext").innerHTML = "Event x: " + x + " y: " + y;

  //Iterate over clickable objects searching for a hit
  for (var i = 0; i < clickables.length; i++) {
    result = clickables[i].detect(x,y);
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
  //Iterate over all objects
  for(var i = 0; i < gameObjects.length;i++){
    gameObjects[i].draw(context);
  }
}

/*
  Clear entire board
*/
function clear() {
  gameObjects = [];
  clickables = [];
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function setState(s) {
  // if start menu (use an ifelse or switch or whatever)
  clear();
  state = s;
  if(state == "start"){

    //Create start button
    var startButton = new Button(startButtonX, startButtonY, startButtonWidth,
      startButtonHeight, "Start!", "startButton",
      function(){
        setState("game");
      }, drawStartButton);

    gameObjects.push(startButton);
    clickables.push(startButton);

    //Create level selection text
    var levelText = new Displayable(levelTextX,levelTextY,levelTextWidth,
      levelTextHeight,drawLevelText);
    gameObjects.push(levelText);

    //Create level selection buttons
    var levelOneButton = new Button(levelOneButtonX - levelButtonRadius,
      levelOneButtonY - levelButtonRadius,
      2*levelButtonRadius, 2*levelButtonRadius, "", "levelOneButton",
      function(){
        changeLevel(this);
      }, drawLevelButton);
    levelOneButton.clicked = true; // Game starts in level 1 by default
    level = 1;

    var levelTwoButton = new Button(levelTwoButtonX - levelButtonRadius,
      levelTwoButtonY - levelButtonRadius,
      2*levelButtonRadius, 2*levelButtonRadius, "", "levelTwoButton",
      function(){
        changeLevel(this);
      }, drawLevelButton);

    gameObjects.push(levelOneButton);
    clickables.push(levelOneButton);
    gameObjects.push(levelTwoButton);
    clickables.push(levelTwoButton);


  } else if(state == "game"){
    document.getElementById("ptext").innerHTML = "GAME STARTED";

    //Generate food at random locations
    var minHeight = Math.floor(canvas.height / 2);
    var maxHeight = Math.floor(canvas.height);

    for(var i = 0; i < 5; i++){
      //Generate random x, y where y is in the bottom half of the viewport
      //TODO: Check for overlap
      var x = Math.floor(Math.random() * (canvas.width - foodRadius
        - (2 * margin))) + margin;
      var y = Math.floor(Math.random() * Math.floor(canvas.height / 2))
          + Math.floor(canvas.height / 2) - foodRadius - margin;
      var food = new Displayable(x, y, foodRadius, foodRadius, drawFood);
      gameObjects.push(food);
    }
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

function drawLevelText(context){
  context.beginPath();
  context.fillText("Level: ",this.x,this.y);
  context.fillText("1 ",this.x + 100, this.y + 25);
  context.fillText("2 ",this.x + 200,this.y + 25);
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

function drawFood(context){
  context.beginPath();
  context.arc(this.x + (this.width/2), this.y + (this.height/2),
  this.width/2, 0, 2*Math.PI);
  context.fill();
}

function changeLevel(levelButton){
  //change level and draw a filled circle in the button
  //Note that startbutton's click function can call setstate - this should
  //find the other button and turn it off
  levelOneButton = getGameObjById("levelOneButton");
  levelTwoButton = getGameObjById("levelTwoButton");
  context.clearRect(0, 0, canvas.width, canvas.height); //Buttons need to be redrawn

  if(levelButton.id == "levelOneButton"){
    level = "One";
    levelOneButton.clicked = true;
    levelTwoButton.clicked = false;
  }
  else{
    // Must be level two
    level = "Two";
    levelOneButton.clicked = false;
    levelTwoButton.clicked = true;
  }
}

function getGameObjById(id){
  for(var i = 0; i < gameObjects.length; i++){
    if(gameObjects[i].id == id){
      return gameObjects[i];
    }
  }
  return null;
}
