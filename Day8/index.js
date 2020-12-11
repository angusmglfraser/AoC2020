const fs = require('fs');
const GameConsole = require('../GameConsole');

const input = fs.readFileSync('input.txt', 'utf-8');
const gameConsole = new GameConsole(input);

let visitedInstructions = {};

while (!visitedInstructions[gameConsole.programCounter]) {
  visitedInstructions[gameConsole.programCounter] = true;
  gameConsole.step();
}

const { acc } = gameConsole;

console.log({ acc });

const nopIndeces = [];
const jmpIndeces = [];

for (let i = 0; i < gameConsole.instructions.length; i += 1) {
  const { op } = gameConsole.instructions[i];

  if (op === 'nop') {
    nopIndeces.push(i);
  }

  if (op === 'jmp') {
    jmpIndeces.push(i);
  }
}

let found = false;
let finalAcc;

for (let i = 0; i < nopIndeces.length && !found; i += 1) {
  const testConsole = new GameConsole(input);
  testConsole.instructions[nopIndeces[i]].op = 'jmp';
  visitedInstructions = {};

  while (!(testConsole.isHalted || visitedInstructions[testConsole.programCounter])) {
    visitedInstructions[testConsole.programCounter] = true;
    testConsole.step();
  }

  if (testConsole.isHalted) {
    found = true;
    finalAcc = testConsole.acc;
    break;
  }
}

if (found) {
  console.log({ finalAcc });
} else {
  for (let i = 0; i < jmpIndeces.length; i += 1) {
    const testConsole = new GameConsole(input);
    testConsole.instructions[jmpIndeces[i]].op = 'nop';
    visitedInstructions = {};

    while (!(testConsole.isHalted || visitedInstructions[testConsole.programCounter])) {
      visitedInstructions[testConsole.programCounter] = true;
      testConsole.step();
    }

    if (testConsole.isHalted) {
      finalAcc = testConsole.acc;
      break;
    }
  }
  console.log({ finalAcc });
}
