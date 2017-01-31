var squareSide = 10;
var rows = 50;
var columns = 50;
var canvasWidth = columns * squareSide + 10;
var canvasHeight = rows * squareSide + 10;
var fr = 30;

var grid;

var initialState = "........................O\n......................O.O\n............OO......OO............OO\n...........O...O....OO............OO\nOO........O.....O...OO\nOO........O...O.OO....O.O\n..........O.....O.......O\n...........O...O\n............OO";

function setup(){
	grid = setupGrid(rows, columns);
	createCanvas(canvasWidth, canvasHeight);
	frameRate(fr);
}

function draw(){
	drawGrid();
	step();
}

function drawGrid(){
	stroke("#5369A8");
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < columns; j++){
			fill("#5369A8");
			if(grid[i][j] == 1){
				fill(255);
			}
			rect(j * squareSide, i * squareSide, squareSide, squareSide);
		}
	}
}

// Moves simulation one step forward
function step(){
	var newGrid = copyGrid()
	for(var r = 0; r < rows; r++){
		for(var c = 0; c < columns; c++){
			var neighborCount = countNeighbors(r, c);
			if(neighborCount < 2 || neighborCount > 3) newGrid[r][c] = 0;
			else if(newGrid[r][c] == 1 && (neighborCount == 2 || neighborCount == 3)) newGrid[r][c] = 1;
			else if(neighborCount == 3) newGrid[r][c] = 1;
		}
	}
	grid = newGrid;
}

function mouseDragged(){
	var row = Math.floor(mouseY/squareSide);
	var column = Math.floor(mouseX/squareSide);
	grid[row][column] = 1;
}

function countNeighbors(row, column){
	var count = 0;
	for(var dr = -1; dr <= 1; dr++){
		for(var dc = -1; dc <= 1; dc++){
			if(dr == 0 && dc == 0) continue;
			if(row + dr >= 0 && row + dr < rows && column + dc >= 0 && column + dc < columns){
				if(grid[row + dr][column + dc] == 1){
					count += 1;
				}
			}
		}
	}
	return count;
}

function setupGrid(rows, columns){
	grid = [];
	for(var i = 0; i < rows; i++){
		var row = [];
		for(var j = 0; j < columns; j++){
			row.push(0);
		}
		grid.push(row);
	}
	gridInitialState(grid, initialState);
	return grid;
}

function copyGrid(){
	var newGrid = [];
	for(var i = 0; i < rows; i++){
		var row = [];
		for(var j = 0; j < columns; j++){
			row.push(grid[i][j]);
		}
		newGrid.push(row);
	}
	return newGrid;
}

function gridInitialState(grid, initialState){
	var currentRow = 0;
	var currentColumn = 0;
	var index = 0;
	while(index < initialState.length){
		var char = initialState[index];
		if(char === '\n'){
			index += 1;
			currentRow += 1;
			currentColumn = 0;
			continue;
		}
		if(char === 'O'){
			grid[currentRow][currentColumn] = 1;
		}
		currentColumn += 1;
		index += 1
	}
}