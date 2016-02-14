//Detect collisions between game objects and set their collision flag true
//This could probably be more efficient

var checkForCollisions = function(gameObjects){
  //margin is a space allowance (for generating food etc.)
  var detection = false;
  for(var i = 0; i < gameObjects.length; i++){
    for(var j = 0; j < gameObjects.length; j++){
      if (i != j){
        /*All below conditions must be true for objects to be separate,
          or if any 1 is false you have a collision*/
        a = gameObjects[i];
        b = gameObjects[j];
        if(!(bottomSeparate(a,b) || topSeparate(a,b) || leftSeparate(a,b) || rightSeparate(a,b))){
          i.isCollided = true;
          j.isCollided = true;
          detection = true;
        }
      }
    }
  }
  return detection;
}

function bottomSeparate(i, j){
  //I's bottom is above J's top
  return i.y + i.height + margin < i.y;
}

function topSeparate(i, j){
  //I's top is lower than J's bottom
  return i.y > j.y + j.height + margin;
}

function leftSeparate(i, j){
  //I's left is right of J's right
  return i.x > j.x + j.width + margin;
}

function rightSeparate(i, j){
  //I's right is left of J's left
  return i.x + i.width + margin < j.x;
}
