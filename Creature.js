// create our creature class
class Creature {
  // this constructor is called when we define new Creature(...)
  constructor(_x, _y) {
    this.location = new createVector(_x, _y);  // Location of shape
    this.velocity = new createVector(random(-2,2),random(-2,2));  // Velocity of shape
    this.friction = new createVector(0, 0); 
    this.desired = new createVector(0, 0); 
    this.diameter = random(10,40);
    this.speedLimit = random(1,this.diameter/10);
    this.color = color(0,0,255,100);
  }

  moveToFood(x, y){

    this.desired.x = x;
    this.desired.y = y;
    let direction = p5.Vector.sub(this.desired, this.location); // gets vector between these two points

    // mag / magnitude is the length of the distance between the two points
    if (direction.mag() < this.diameter/2){
      return true; //stops moving as it returns before adding direction to velocity below
    } 
  
    //only move if they are close to the target x & y locations
    if(direction.mag() < 200){
      direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction )
      this.velocity.add(direction);
    }
    return false;
  } 
 
  update() {

    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.01);
    this.velocity.add(this.friction);

    //limit how fast each one can go
    this.velocity.limit(this.speedLimit);
    // Add velocity to the location.
    this.location.add(this.velocity);


    // Bounce off edges (updated from last term to work better with canvas resize)
    if (this.location.x > width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y = this.velocity.y * -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1; 
    }
  
    // Display circle at location vector
    stroke(255);
    fill(this.color);
    circle(this.location.x,this.location.y,this.diameter);
  }
}
