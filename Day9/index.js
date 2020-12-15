const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

function findInvalidValue(numbers, { bufferLength = 25, rule }) {
  const buffer = [];
  let index = 0;
  while (buffer.length < bufferLength) {
    buffer.push(numbers[index]);
    index += 1;
  }

  let valid = true;
  while (valid) {
    const val = numbers[index];
    valid = rule(val, buffer);
    index += 1;
    buffer.push(val);
    buffer.shift();
  }

  return numbers[index - 1];
}

const numArr = input.split('\n').map((x) => Number(x));

const result = findInvalidValue(numArr, {
  rule: (num, buf) => {
    for (let i = 0; i < buf.length; i += 1) {
      for (let j = i + 1; j < buf.length; j += 1) {
        if (buf[i] + buf[j] === num) {
          return true;
        }
      }
    }
    return false;
  },
});

console.log({ result });

let min;
let max;

let found = false;
for (let i = 0; i < numArr.length; i += 1) {
  min = numArr[i];
  max = numArr[i];

  let sum = numArr[i];
  for (let j = i + 1; j < numArr.length; j += 1) {
    if (numArr[j] < min) { min = numArr[j]; }
    if (numArr[j] > max) { max = numArr[j]; }
    sum += numArr[j];
    if (sum === result) {
      found = true;
      break;
    }
  }
  if (found) break;
}
console.log({ sum: min + max });
