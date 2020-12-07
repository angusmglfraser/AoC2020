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

passes.forEach((pass) => {
  const row = getRow(pass);
  const column = getColumn(pass);
  const id = (8 * row) + column;

  if (id > maxId) {
    maxId = id;
  }
});

console.log({ maxId });
