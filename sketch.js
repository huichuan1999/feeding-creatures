//Main sketch below
// an array to store the creatures
let creatures = [];
let canvas;
let button;

let foodlocation = [];

let food = 0;
let feeding = false;
let clearing = false;

let hungry = 0;
let full = 1;
let creatureState = hungry;

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  for (let i = 0; i < 50; i++) {
    let c = new Creature(random(width), random(height), 20);
    creatures.push(c);
  }
  addGUI();
}

function draw() {
  background(250, 255, 200);

  food = foodlocation.length;

  // loop through all the creatrure and animate them each frame by accessing their update function
  for (let c of creatures) {
    c.update();

    for (let i = 0; i < foodlocation.length; i++) {
      if (c.moveToFood(foodlocation[i].x, foodlocation[i].y)) {
        //You will need to think about
        //a) managing food in the main sketch
        //b) keeping track of FED or FULL state in your creature class

        console.log("Arrived");
        
        //creature Eat
        c.diameter = c.diameter + 1;
        if (c.diameter >= 100) {
          c.diameter = 100;
          creatureState = full;
           c.color = color(0, 255, 255, 100);
        } 
      }
      
     else if (creatureState == full) {
          
          //manage returning to hungry state
          if (c.diameter >= 30) {
             c.diameter -= 5; // reduce every second frame
          } 
        }else {
            creatureState = hungry;
          }
      
      if(creatureState == hungry){

          c.color = color(0, 0, 255, 100);
      }

      //draw food
      fill(255, 100, 100);
      circle(foodlocation[i].x, foodlocation[i].y, random(20));
    }
  }
}

function mousePressed() {
  if (mouseX < width && mouseY < height) {
    let foodLoc = createVector(mouseX, mouseY);
    foodlocation.push(foodLoc);

    console.log(foodlocation);
  }
}

function handleButtonPress() {
  if (foodlocation.length > 0) {
    foodlocation.pop();
    clearing = true;
  }
  /*
  if (clearing && foodlocation.length > 0) {
    //manage button state
    button.html("CLEARING");
    button.addClass("inactive");
  }
  */
}

function addGUI() {
  //add a button
  button = createButton("CLEAR");

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");

  //Adding a mouse pressed event listener to the button
  button.mousePressed(handleButtonPress);
}
