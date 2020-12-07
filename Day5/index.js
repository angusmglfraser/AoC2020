const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

function getRow(str) {
  return parseInt(str.substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
}

function getColumn(str) {
  return parseInt(str.substring(7).replace(/L/g, '0').replace(/R/g, '1'), 2);
}

const passes = input.split('\n');

let maxId = -Infinity;

const allIds = [];

for (let row = 1; row < 127; row += 1) {
  for (let column = 0; column < 7; column += 1) {
    allIds.push((row * 8) + column);
  }
}

const foundIds = [];

let maxRow = -Infinity;

passes.forEach((pass) => {
  const row = getRow(pass);
  const column = getColumn(pass);
  const id = (8 * row) + column;

  foundIds.push(id);

  if (row > maxRow) {
    maxRow = row;
  }

  if (id > maxId) {
    maxId = id;
  }
});

console.log({ maxId });

const myId = allIds.find((x) => (
  foundIds.includes(x + 1) && foundIds.includes(x - 1) && !(foundIds.includes(x))
));

console.log({ myId });
