var squareSide = 12;
var rows = 50;
var columns = 50;

var canvasHeight = squareSide * rows + 10;
var canvasWidth = squareSide * columns + 10;

var ants = [];
var grid;

// ant object
// row - row position
// col - column position
// direction - ["UP", "RIGHT", "DOWN", "LEFT"], index

var directions = ["UP", "RIGHT", "DOWN", "LEFT"];

var ant1 = {
	row: 25,
	col: 25,
	direction: 0
};

function setup(){
	createCanvas(canvasWidth, canvasHeight);
	grid = setupGrid(rows, columns);
	ants.push(ant1);
}

function draw(){
	drawGrid(grid, rows, columns, squareSide);
	drawAnts(ants, squareSide);
	moveAnts(ants);
}

// Creates an initially blank grid of all 0's
function setupGrid(rows, columns){
	var grid = [];
	for(var i = 0; i < rows; i++){
		var row = [];
		for(var j = 0; j < columns; j++){
			row.push(0);
		}
		grid.push(row);
	}
	return grid;
}

// Draws the grid
function drawGrid(grid, rows, columns, squareSide){
	stroke(0);
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < columns; j++){
			if(grid[i][j] == 0) fill(255);
			else if(grid[i][j] == 1) fill(0);
			rect(j * squareSide, i * squareSide, squareSide, squareSide);
		}
	}
}

// Draws all the ants
function drawAnts(ants, squareSide){
	stroke("#FF0000");
	fill("#FF0000");
	for(var i = 0; i < ants.length; i++){
		var ant = ants[i];
		rect(ant.col * squareSide, ant.row * squareSide, squareSide, squareSide);
	}
}

// Move each ant at each time step.
// Rotate the ant.
// Invert the tile.
// Move ant forward 1 square.
function moveAnts(ants){
	for(var i = 0; i < ants.length; i++){
		var ant = ants[i];
		var dx = 0;
		var dy = 0;
		if(grid[ant.row][ant.col] == 0){
			ant.direction = modulus(ant.direction + 1, 4);
			grid[ant.row][ant.col] = 1;
		}else{
			ant.direction = modulus(ant.direction - 1, 4);
			grid[ant.row][ant.col] = 0;
		}

		var direction = directions[ant.direction];
		if(direction == "UP") dy = -1;
		else if(direction == "RIGHT") dx = 1;
		else if(direction == "DOWN") dy = 1;
		else if(direction == "LEFT") dx = -1;
		ant.row = modulus(ant.row + dy, rows);
		ant.col = modulus(ant.col + dx, columns);
	}
}

function mouseClicked(){
	var row = Math.floor(mouseY/squareSide);
	row = row % rows;
	var col = Math.floor(mouseX/squareSide);
	col = col % columns;
	var ant = {
		row: row,
		col: col,
		direction: 0
	};
	console.log(ant);
	ants.push(ant);
}

// javascript you miserable fuck
function modulus(x, mod){
	var r = x % mod;
	if(r == -1) r = mod - 1;
	return r;
}