var blockScale = 20;
var snake;
var updateRate = 8;
var currentTick = 0;
var food;
var flag;

function setup() {
	createCanvas(600,600);
	snake = new Snake(0,0);
	food = new Food();
	food.update();
}

function draw() {
	currentTick++;
	if (currentTick === updateRate) {
		background(75);
		snake.update();
		food.draw();
		flag = false;
	}
	currentTick %= updateRate;
}

function keyPressed() {
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
	fill(255,255,255);
	this.xVel = 0;
	this.yVel = 0;
	this.pieces = [[0,0]];
	this.update = function () {
		if (this.pieces[0][0] == food.x && this.pieces[0][1] == food.y) {
			food.update();
			this.pieces.push([0,0]);
		}

		for (var i = 1; i < this.pieces.length; i++) {
			if (this.pieces[0][0] == this.pieces[i][0] && this.pieces[0][1] == this.pieces[i][1]) {
				this.pieces = [[0,0]];
				food.update();
				this.xVel = 0;
				this.yVel = 0;
			}
		}

		this.pieces.unshift([
			constrain(this.pieces[0][0] + this.xVel*blockScale,0,width-blockScale),
			constrain(this.pieces[0][1] + this.yVel*blockScale,0,height-blockScale)
			]);
		this.pieces.pop();

		fill(255);
		for (var i = 0; i < this.pieces.length; i++) {
			rect(this.pieces[i][0],this.pieces[i][1],blockScale,blockScale);
		}
	}
}

var Food = function () {
	this.x;
	this.y;
	this.draw = function() {
		fill(153, 204, 1);
		rect(this.x,this.y,blockScale,blockScale);
	}
	this.update = function () {
		this.x = floor(random(width/blockScale))*blockScale;
		this.y = floor(random(height/blockScale))*blockScale;
		fill(153, 204, 1);
		rect(this.x,this.y,blockScale,blockScale);
	}
}