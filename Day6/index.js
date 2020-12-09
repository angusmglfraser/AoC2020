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
