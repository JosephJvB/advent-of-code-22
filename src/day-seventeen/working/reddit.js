const fs = require('fs')
const { input } = require("././reddit-parse");
console.time("ExecutionTime");

const { rocks, pattern } = input;
const settledRock = {}

const checkCollision = (rock) => {
  for (let piece of rock) {
    if (settledRock[`${piece.x},${piece.y}`]) return "ROCK";
    if (piece.y <= 0) return "FLOOR";
    if (piece.x <= 0 || piece.x >= 8) return "WALL";
  }
  return false;
};

const updatePosition = (rock, tallestPoint) => {
  rock.forEach((piece) => {
    piece.y += tallestPoint + 4;
    piece.x += 3;
  });
  return rock;
};

const findTallestPoint = (rock, tallestPoint) => {
  for (let piece of rock) {
    tallestPoint = Math.max(tallestPoint, piece.y);
  }
  return tallestPoint;
};

let remainingPattern = [...pattern];
let tallestPoint = 0;
for (let i = 0; i < 2022; i++) {
  let rocksCopy = JSON.parse(JSON.stringify(rocks));

  let rock = rocksCopy[i % rocks.length];
  rock = updatePosition(rock, tallestPoint);

  let isFallNextMove = false;
  while (true) {
    if (isFallNextMove) {
      rock.forEach((piece) => {
        piece.y -= 1;
      });
      let checkCollisionResult = checkCollision(rock);
      if (checkCollisionResult === "ROCK" || checkCollisionResult === "FLOOR") {
        // Revert the fall and add the rock to the settledRock set
        const char = {
          0: '#',
          1: '@',
          2: '$',
          3: '%',
          4: '&',
        }[i % rocks.length]
        rock.forEach((piece) => {
          piece.y += 1;
          settledRock[`${piece.x},${piece.y}`] = char;
        });
        tallestPoint = findTallestPoint(rock, tallestPoint);
        break;
      }
    } else {
      let xMove = remainingPattern.shift() === ">" ? 1 : -1;
      if (remainingPattern.length === 0) remainingPattern = [...pattern];
      rock.forEach((piece) => {
        piece.x += xMove;
      });
      let checkCollisionResult = checkCollision(rock);
      if (checkCollisionResult === "ROCK" || checkCollisionResult === "WALL") {
        // Revert the move
        rock.forEach((piece) => {
          piece.x -= xMove;
        });
      }
    }
    isFallNextMove = !isFallNextMove;
  }
}
drawGrid(settledRock)

console.log(tallestPoint);

console.timeEnd("ExecutionTime");

function drawGrid(tower) {
  let Y = 0
  let X = 7
  for (let coord in tower) {
    const [x, y] = coord.split(',').map(s => parseInt(s))
    Y = Math.max(Y, y)
  }
  const grid = []
  for (let y = 0; y <= Y; y++) {
    const row = []
    for (let x = 1; x <= X; x++) {
      const c = `${x},${y}`
      if (tower[c]) {
        row.push(tower[c])
      } else {
        row.push('.')
      }
    }
    grid.push(row)
  }
  grid.reverse()
  const s = grid.map(r => r.join('')).join('\n')
  fs.writeFileSync(__dirname + '/reddit-grid.txt', s)
}