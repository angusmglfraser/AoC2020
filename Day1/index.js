const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const numbers = input.split('\n').map((x) => Number(x));

for (let i = 0; i < numbers.length; i++) {
  const n = numbers[i];

  const otherNumbers = numbers.filter((x) => x !== n);

  let found = false;
  let result;

  for (let j = 0; j < otherNumbers.length; j++) {
    if (n + otherNumbers[j] === 2020) {
      found = true;
      result = otherNumbers[j];
      break;
    }
  }

  if (found) {
    console.log({ result: n * result });
    break;
  }
}
