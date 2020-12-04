const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

function validatePassport(obj) {
  const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    // 'cid',
  ];

  for (let i = 0; i < requiredFields.length; i += 1) {
    const key = requiredFields[i];

    if (obj[key] === undefined) {
      return false;
    }
  }

  return true;
}

const passportData = input.split(/\n\n/g).map((str) => {
  const pairs = str.split(/\s/g);

  const result = {};

  pairs.forEach((pair) => {
    const [key, value] = pair.split(':');
    result[key] = value;
  });

  return result;
});

let count = 0;

passportData.forEach((passport) => {
  if (validatePassport(passport)) {
    count += 1;
  }
});

console.log({ count });
