const fs = require('fs');
const GameConsole = require('../GameConsole');

const input = fs.readFileSync('input.txt', 'utf-8');
const gameConsole = new GameConsole(input);

const visitedInstructions = {};

while (!visitedInstructions[gameConsole.programCounter]) {
  visitedInstructions[gameConsole.programCounter] = true;
  gameConsole.step();
}

const { acc } = gameConsole;

console.log({ acc });
