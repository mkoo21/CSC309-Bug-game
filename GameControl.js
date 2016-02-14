//Detect collisions between game objects and set their collision flag true
//This could probably be more efficient
var collision = function(gameObjects){
  for(var i = 0; i < gameObjects.length; i++){
    for(var j = 0; j < gameObjects.length; j++){
      if (i != j){
        /*All below conditions must be true for objects to be separate,
          or if any 1 is false you have a collision*/
        if(!(bottomSeparate && topSeparate && leftSeparate && rightSeparate)){
          i.isCollided = true;
          j.isCollided = true;
        }
      }
    }
  }
}

function bottomSeparate(i, j){
  //I's bottom is above J's top
  return i.y + i.height < i.y;
}

function topSeparate(i, j){
  //I's top is lower than J's bottom
  return i.y > j.y + j.height;
}

function leftSeparate(i, j){
  //I's left is right of J's right
  return i.x > j.x + j.width;
}

function rightSeparate(i, j){
  //I's right is left of J's left
  return i.x + i.width < j.x;
}
