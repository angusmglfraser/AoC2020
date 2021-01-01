const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const adapters = input.split('\n').map((x) => Number(x)).sort((a, b) => a - b);

let currentJoltage = 0;

let nextAdapter = 0;

const diffCounts = {
  3: 1,
};

do {
  // eslint-disable-next-line no-loop-func
  nextAdapter = adapters.find((x) => x > currentJoltage && x - currentJoltage <= 3);

  const diff = nextAdapter - currentJoltage;
  diffCounts[diff] = (diffCounts[diff] || 0) + 1;

  currentJoltage = nextAdapter;
} while (nextAdapter);

console.log({
  result: diffCounts[1] * diffCounts[3],
});

const pathCounts = { 0: 1 };

adapters.push(adapters[adapters.length - 1] + 3);

adapters.forEach((adapter) => {
  pathCounts[adapter] = (pathCounts[adapter - 3] || 0)
  + (pathCounts[adapter - 2] || 0)
  + (pathCounts[adapter - 1] || 0);
});

console.log({ result: pathCounts[adapters[adapters.length - 1]] });
