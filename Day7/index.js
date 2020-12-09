const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const map = {};

lines.forEach((line) => {
  const [base, rules] = line.split(' bags contain ');

  if (!map[base]) {
    map[base] = { children: [], parents: [] };
  }

  if (rules !== 'no other bags.') {
    const rulesArr = rules.split(', ');

    rulesArr.forEach((rule) => {
      const [, quantity, color] = rule.match(/(\d+) (.*) bags?\.?/);

      map[base].children.push({ quantity, color });

      if (!map[color]) {
        map[color] = { children: [], parents: [base] };
      } else {
        map[color].parents.push(base);
      }
    });
  }
});

const start = 'shiny gold';

let toEvaluateQueue = [...map[start].parents];

const visitedColors = {};

while (toEvaluateQueue.length) {
  const color = toEvaluateQueue.pop();
  if (!visitedColors[color]) {
    visitedColors[color] = true;
    toEvaluateQueue.push(...map[color].parents);
    toEvaluateQueue = toEvaluateQueue.filter((val, i, arr) => (
      arr.indexOf(val) === i && !visitedColors[val]
    ));
  }
}

const containerCandidates = Object.keys(visitedColors);

console.log({ length: containerCandidates.length });
