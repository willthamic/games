var blockScale = 15;
var snake;
var updateRate = 5;
var currentTick = 0;
var food;

function setup() {
	createCanvas(640,480);
	snake = new Snake(0,0);
	food = new Food();
	food.update();
	noStroke();
}

function draw() {
	currentTick++;
	if (currentTick === updateRate) {
		background(75);
		snake.update();
		food.draw();
	}
	currentTick %= updateRate;
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		snake.xVel = -1;
		snake.yVel = 0;
	} else if (keyCode === RIGHT_ARROW) {
		snake.xVel = 1;
		snake.yVel = 0;
	} else if (keyCode === UP_ARROW) {
		snake.xVel = 0;
		snake.yVel = -1;
	} else if (keyCode === DOWN_ARROW) {
		snake.xVel = 0;
		snake.yVel = 1;
	}
}

var Snake = function (x,y) {
	this.x = x;
	this.y = y;
	this.xVel = 0;
	this.yVel = 0;
	this.update = function () {
		this.x = constrain(this.x + this.xVel*blockScale,0,width-blockScale);
		this.y = constrain(this.y + this.yVel*blockScale,0,height-blockScale);
		fill(255,255,255);
		rect(this.x,this.y,blockScale,blockScale);
		if (this.x == food.x && this.y == food.y) {
			food.update();
		}
	}
}

var Food = function () {
	this.x;
	this.y;
	this.draw = function() {
		fill(200,50,50);
		rect(this.x,this.y,blockScale,blockScale);
	}
	this.update = function () {
		this.x = floor(random(width/blockScale))*blockScale;
		this.y = floor(random(height/blockScale))*blockScale;
		fill(200,50,50);
		rect(this.x,this.y,blockScale,blockScale);
		console.log(floor(random(width)/20)*20);
	}
}