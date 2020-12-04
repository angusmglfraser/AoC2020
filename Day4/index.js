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

function strictlyValidatePasspost(obj) {
  if (!validatePassport(obj)) {
    return false;
  }

  // DATE VALIDATION
  const byr = Number(obj.byr) || 0;

  if (byr < 1920 || byr > 2002) {
    return false;
  }

  const iyr = Number(obj.iyr) || 0;

  if (iyr < 2010 || iyr > 2020) {
    return false;
  }

  const eyr = Number(obj.eyr) || 0;

  if (eyr < 2020 || eyr > 2030) {
    return false;
  }

  // HEIGHT VAlIDATION
  const { hgt } = obj;

  if (hgt.match(/^\d+cm$/)) {
    const measure = parseInt(hgt, 10);

    if (measure < 150 || measure > 193) {
      return false;
    }
  } else if (hgt.match(/^\d+in$/)) {
    const measure = parseInt(hgt, 10);

    if (measure < 59 || measure > 76) {
      return false;
    }
  } else {
    return false;
  }

  // COLOUR VALIDATION
  const colorRegex = /^#(\d|[a-f]){6}$/i;

  const { hcl } = obj;
  if (!hcl.match(colorRegex)) {
    return false;
  }

  const { ecl } = obj;
  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) {
    return false;
  }

  // PID validation
  const { pid } = obj;

  if (!pid.match(/^\d{9}$/)) {
    return false;
  }

  return true;
}

count = 0;

passportData.forEach((passport) => {
  if (strictlyValidatePasspost(passport)) {
    count += 1;
  }
});

console.log({ count });
