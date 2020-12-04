const fs = require('fs');

function parseRule(str) {
  const regex = /(\d+)-(\d+) (.)/;

  const [, lowerLimit, upperLimit, char] = str.match(regex);

  return {
    lowerLimit: Number(lowerLimit),
    upperLimit: Number(upperLimit),
    char,
  };
}

function validatePassword(rule, password) {
  const { lowerLimit, upperLimit, char } = rule;

  const filtered = password.split('').filter((x) => x === char);

  return (filtered.length >= lowerLimit && filtered.length <= upperLimit);
}

function countValidPasswords(input) {
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    const [ruleStr, password] = input[i].split(': ');

    const rule = parseRule(ruleStr);

    if (validatePassword(rule, password)) {
      count++;
    }
  }

  return count;
}

const passwords = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = countValidPasswords(passwords);

console.log({ result });
