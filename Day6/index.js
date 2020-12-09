const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const groups = [];

input.split('\n\n').forEach((x) => {
  const data = x.split('\n');

  const thisGroup = [];

  data.forEach((line) => {
    thisGroup.push(line.split(''));
  });

  groups.push(thisGroup);
});

let sum = 0;

groups.forEach((group) => {
  const answered = {};
  group.forEach((person) => {
    person.forEach((question) => {
      answered[question] = true;
    });
  });

  sum += Object.keys(answered).length;
});

console.log({ sum });

sum = 0;

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
groups.forEach((group) => {
  const answered = {};

  alphabet.forEach((letter) => {
    let found = true;
    for (let i = 0; i < group.length && found; i += 1) {
      const person = group[i];
      if (!person.includes(letter)) {
        found = false;
      }
    }

    if (found) {
      answered[letter] = true;
    }
  });

  sum += Object.keys(answered).length;
});

console.log({ sum });
