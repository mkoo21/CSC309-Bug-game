//Detect collisions between game objects and set their collision flag true
//This could probably be more efficient

var checkForCollisions = function(gameObjects){
  detection = false;
  if(gameObjects.length <= 1){
    return false;
  }
  for(var i = 0; i < gameObjects.length; i++){
    for(var j = 0; j < gameObjects.length; j++){
      if(i != j){
        a = gameObjects[i];
        b = gameObjects[j];
        x_dist = Math.abs(a.x - b.x);
        y_dist = Math.abs(a.y - b.y);
        //Taking width as radius (it doesn't need to be pixel-perfect, right?)
        dist = Math.hypot(x_dist, y_dist);
        if(dist < a.width + b.width){
          a.isCollided = true;
          b.isCollided = true;
          detection = true;
        }
      }
    }
  }
  return detection;
}
