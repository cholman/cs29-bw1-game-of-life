function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
let grid;
let res = 20;
let cols;
let rows;

function setup() {
  // put setup code here
  createCanvas(600, 400);
  cols = width / res;
  rows = height / res;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      grid[i][j] = floor(random(2))
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let x = i * res;
      let y = j * res;
      if(grid[i][j] == 1){
        fill(255);
        stroke(0);
        rect(x, y, res - 1 , res - 1);
      } 
    }
  }

  let next = make2DArray(cols, rows);

  //compute next based on grid
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < cols; j++){
      let state = grid[i][j];
      //edges
      // if (i == 0 || i == cols - 1 || j == 0 || j == rows -1){
      //   next[i][j] = state
      // } else {

      //count live neighbors
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3){
        next[i][j] = 1;
      } else if (state == 1 && neighbors < 2 || neighbors > 3){
        next[i][j] = 0;
      }else{
        next[i][j] = state;
      }
  }
}

grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}