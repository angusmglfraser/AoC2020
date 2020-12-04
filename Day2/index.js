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

function validatePassword2(rule, password) {
  const { lowerLimit: index1, upperLimit: index2, char } = rule;

  const c1 = password[index1 - 1] === char;
  const c2 = password[index2 - 1] === char;

  return (c1 || c2) && !(c1 && c2);
}

function countValidPasswords(input, validator) {
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    const [ruleStr, password] = input[i].split(': ');

    const rule = parseRule(ruleStr);

    if (validator(rule, password)) {
      count++;
    }
  }

  return count;
}

const passwords = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = countValidPasswords(passwords, validatePassword);

console.log({ result });

const result2 = countValidPasswords(passwords, validatePassword2);

console.log({ result2 });
