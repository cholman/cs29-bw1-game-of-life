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
let canvasSize = 400;
let alive = 255;
let dead = 0;
let simulate = 0;
let play = false;
let fps = 60;
function setup() {
  // put setup code here
  
  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('canvas');

  let start = createButton("Start Sim");
  start.parent('start');
  start.mousePressed(startSim);

  let pause = createButton('Pause');
  pause.parent('pause');
  pause.mousePressed(pauseGame);

  let random = createButton('Random');
  random.parent('resume');
  random.mousePressed(resetSketch);

  let stop = createButton('Stop');
  stop.parent('stop');
  stop.mousePressed(clearGrid);

  let nextFrame = createButton('Next Frame');
  nextFrame.parent('nextframe');
  nextFrame.mousePressed(skipFrame);

  let speedUp = createButton('faster');
  speedUp.parent('slider');
  speedUp.mousePressed(faster);
  let speedDown = createButton('slower');
  speedDown.parent('slider');
  speedDown.mousePressed(slower);
  // let sizeup = createButton('+');
  // sizeup.parent('sizeup');
  // sizeup.mousePressed(speedUp());
  
  // let sizedown = createButton('-');
  // sizedown.parent('sizedown');
  // sizedown.mousePressed(speedDown());
  frameRate(fps);
  clearGrid();
}
function skipFrame(){
  noLoop();
  redraw();
}
// function mousePressed() {
//   for (var i = 0; i < cols; i++) {
//     for (var j = 0; j < cols; j++) {
//         var distance = dist(mouseX, mouseY, x[j], y[i]);
//         if(distance < w/2) col[i * cols + j] =! col[i * cols + j];
//     }
//   }
// }
function faster(){
  fps += 10;
  frameRate(fps);
}
function slower(){
  fps -= 10;
  frameRate(fps);
}

function resetSketch() {
  cols = width / res;
  rows = height / res;
  loop();
  frameRate(fps);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      grid[i][j] = floor(random(2));
    }
  }
}


function clearGrid() {
  cols = width / res;
  rows = height / res;
  loop();
  frameRate(fps);
  simulate = 0;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let x = i * res;
      let y = j * res;
      grid[i][j] = 0;
      fill(dead);
      stroke(alive);
      rect(x, y, res - 1 , res - 1);
    }
  }
}
function pauseGame() {
  if(play){
    noLoop()
    play = !play;
  } else {
    loop();
    play = !play;
  }
  
}
// function resumeGame() {
//   loop()
// }

// function clearGrid() {
//   for i j grid[i][j] = 0
// }
// function draw() {
//   background(255);
//   for (let i = 0; i < cols; i++){
//     for (let j = 0; j < rows; j++){
//       let x = i * res;
//       let y = j * res;
//       stroke(0);
//       fill(0);
//       rect(x, y, res - 1 , res - 1);
//       if(grid[i][j] == 1){
//         fill(255);
//         rect(x, y, res - 1 , res - 1);
//       } 
//     }
// }
function startSim() {
  simulate = 1;
  frameRate(fps);
  loop();
}
function mousePressed() {
  if(!simulate){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
        let x = i * res;
        let y = j * res;
        var distance = dist(mouseX, mouseY, x + res/2, y + res/2);
        console.log(distance);
        if(distance < res/2){grid[i][j] = 1;
        }
        console.log(grid[i][j])
    }
    
  }
}
}
function draw() {
  background(255);
  if(simulate == 0){
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        let x = i * res;
        let y = j * res;
        stroke(alive); //grid color
        fill(0);       //grid fill (dead)
        rect(x, y, res - 1 , res - 1);
        if(grid[i][j] == 1){
          fill(255); //grid alive
          rect(x, y, res - 1 , res - 1);
        } 
      }
  }
}

  else if(simulate == 1){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let x = i * res;
      let y = j * res;
      stroke(alive); //grid color
      fill(0);       //grid fill (dead)
      rect(x, y, res - 1 , res - 1);
      if(grid[i][j] == 1){
        fill(255); //grid alive
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