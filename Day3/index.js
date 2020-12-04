const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

function traverse(map, xIncrement = 3, yIncrement = 1) {
  const totalRows = map.length;
  const totalColumns = map[0].length;
  let row = 0;
  let col = 0;

  let steps = 0;
  let trees = 0;
  let empties = 0;

  while (row < totalRows) {
    steps += 1;

    if (map[row][col % totalColumns] === '#') {
      trees += 1;
    } else {
      empties += 1;
    }
    row += yIncrement;
    col += xIncrement;
  }

  return {
    row, col, steps, trees, empties,
  };
}

const result = traverse(
  input.split('\n'),
);

console.log({ result });
