const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const adapters = input.split('\n').map((x) => Number(x)).sort((a, b) => a - b);

let currentJoltage = 0;

let nextAdapter = 0;

const diffCounts = { 3: 1 };

do {
  nextAdapter = adapters.find((x) => x > currentJoltage && x - currentJoltage <= 3);

  const diff = nextAdapter - currentJoltage;
  diffCounts[diff] = (diffCounts[diff] || 0) + 1;

  currentJoltage = nextAdapter;
} while (nextAdapter);

console.log({ result: diffCounts[1] * diffCounts[3] });
