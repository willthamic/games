var p1;
var p2;

function setup() {
	createCanvas(1000,600);
	p1 = new Player(010,10,150,"player1");
	p2 = new Player(990,10,150,"player2");
}

function draw() {
	background(100);
	p1.draw();
	p2.draw();
	p1.keyMove();
	p2.keyMove();
}

var Player = function (x, v, h, c) {
	this.x = x;
	this.y = height/2;
	this.v = v;
	this.w = 10;
	this.h = h;
	if (c == "player1") {
		this.up = 87;
		this.down = 83;
	} else if (c = "player2") {
		this.up = 73;
		this.down = 75;
	}
	this.keyMove = function () {
		if (keyIsDown(this.up)) {
			this.y -= this.v;
		} else if (keyIsDown(this.down)) {
			this.y += this.v;
		}
		this.y = constrain(this.y,h/2,height-h/2);
	}
	this.draw = function () {
		rect(this.x-this.w/2,this.y-this.h/2,10,this.h);
	}

}