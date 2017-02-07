var px = 0.0;
var py = 0.0;
var pz = 0.0;

var x = 0.01;
var y = 0.0;
var z = 0.0;

var rho = 28;
var sigma = 10;
var beta = 8/3;
var dt = 0.01;

var hueValue = 0;
var scalar = 5;

var canvasWidth = 500;
var canvasHeight = 500;

function setup(){
	createCanvas(canvasWidth, canvasHeight, P2D);
	colorMode(HSB, 255);
	background(0);
}

function draw(){
	px = x;
	py = y;
	pz = z;
	x = x + dx();
	y = y + dy();
	z = z + dz();

	translate(width/2, height/2);
	stroke(hueValue, 255, 255);
	hueValue = (hueValue + 0.1) % 255;
	line(px*scalar, py*scalar, x*scalar, y*scalar);
}

function dx(){
	return sigma*(y - x)*dt;
}

function dy(){
	return (x*(rho - z) - y)*dt;
}

function dz(){
	return (x*y - beta*z)*dt;
}