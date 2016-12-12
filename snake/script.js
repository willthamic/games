// Block Scale describes the width of each cell of the grid.
// Update Rate determines how long it is between each movement of the snake.
var blockScale = 20;
var updateRate = 8;

// Current Tick is the value of the current positon within Update Rate.
// Snake is a variable that holds the Snake object.
// Food is a variable that holds the Food object.
// Flag is a boolean that keeps the snake from changing directions twice in one updateRate.
var currentTick = 0;
var snake;
var food;
var flag;

// Runs once when the the webpage opens.
function setup() {
	// Creates a 600 by 600 pixel canvas.
	createCanvas(600,600);
	snake = new Snake(0,0);
	food = new Food();
	// Sends the food object to a random location.
	food.update();
}

// Loops over and over.
function draw() {
	// Increases the current tick variable.
	// When currentTick reaches updateRate it is set to zero and the
	// code in the if statement runs.
	currentTick++;
	if (currentTick === updateRate) {
		// Draw background, redraw snake, draw food, reallow snake movement.
		background(75);
		snake.update();
		food.draw();
		flag = false;
	}
	currentTick %= updateRate;
}

function keyPressed() {
	// Each of the following require three things:
	//   * Given key is being pressed
	//   * Snake is not moving in the opposite direction of the pressed key.
	//   * Flag is set to false.
	// If these conditions are met, the velocity is changed and flag is
	// set to true, preventing velocity changes until next update.
	if (keyCode === LEFT_ARROW && snake.xVel == 0 && !flag) {
		snake.xVel = -1;
		snake.yVel = 0;
		flag = true;
	} else if (keyCode === RIGHT_ARROW && snake.xVel == 0 && !flag) {
		snake.xVel = 1;
		snake.yVel = 0;
		flag = true;
	} else if (keyCode === UP_ARROW && snake.yVel == 0 && !flag) {
		snake.xVel = 0;
		snake.yVel = -1;
		flag = true;
	} else if (keyCode === DOWN_ARROW && snake.yVel == 0 && !flag) {
		snake.xVel = 0;
		snake.yVel = 1;
		flag = true;
	}
}

var Snake = function (x,y) {
	// Initial settings.
	this.xVel = 0;
	this.yVel = 0;
	this.pieces = [[0,0]];

	// Runs each game update.
	this.update = function () {
		// If the snake head is over the food, move the food and add a dummy element to end of snake.
		if (this.pieces[0][0] == food.x && this.pieces[0][1] == food.y) {
			food.update();
			food.draw();
			this.pieces.push([0,0]);
		}
		
		// If the head of the snake is over any other part of the snake, restart game.
		for (var i = 1; i < this.pieces.length; i++) {
			if (this.pieces[0][0] == this.pieces[i][0] && this.pieces[0][1] == this.pieces[i][1]) {
				this.pieces = [[0,0]];
				food.update();
				food.draw();
				this.xVel = 0;
				this.yVel = 0;
			}
		}

		// Add a new block at the beginning of the snake, in the direction of velocity.
		this.pieces.unshift([
			constrain(this.pieces[0][0] + this.xVel*blockScale,0,width-blockScale),
			constrain(this.pieces[0][1] + this.yVel*blockScale,0,height-blockScale)
			]);

		// Remove the last aprt of the snake. Two options:
		//    * If the snake had eaten food, the dummy is removed.
		//      This makes the snake one block longer.
		//    * If the snake hasn't eaten the last block is removed,
		//      which represents movement. 
		this.pieces.pop();

		// Redraw the snake
		fill(255);
		for (var i = 0; i < this.pieces.length; i++) {
			if (i==1) fill(200);
			rect(this.pieces[i][0],this.pieces[i][1],blockScale,blockScale);
		}
	}
}

var Food = function () {
	this.x;
	this.y;

	// Draws the food.
	this.draw = function() {
		fill(153, 204, 1);
		rect(this.x,this.y,blockScale,blockScale);
	}

	// Draws the food in a new location.
	this.update = function () {
		// Generates a new location.
		this.x = floor(random(width/blockScale))*blockScale;
		this.y = floor(random(height/blockScale))*blockScale;
		
		// If this location is in the snake, get a new one.
		for (var i = 0; i < snake.pieces.length; i++) {
			if (this.x == snake.pieces[i][0] && this.y == snake.pieces[i][1])
				food.update();
		}
	}
}