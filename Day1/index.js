const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const numbers = input.split('\n').map((x) => Number(x));

for (let i = 0; i < numbers.length; i++) {
  const n = numbers[i];

  const otherNumbers = numbers.filter((x) => x !== n);

  let found = false;
  let result;

  for (let j = 0; j < otherNumbers.length; j++) {
    if (n + otherNumbers[j] === 2020) {
      found = true;
      result = otherNumbers[j];
      break;
    }
  }

  if (found) {
    console.log({ result: n * result });
    break;
  }
}

for (let i = 0; i < numbers.length; i++) {
  let found = false;
  const n1 = numbers[i];

  const o1 = numbers.filter((x) => x !== n1);

  for (let j = 0; j < o1.length; j++) {
    const n2 = o1[j];

    const o2 = o1.filter((x) => x !== n2);

    for (let k = 0; k < o2.length; k++) {
      const n3 = o2[k];

      if (n1 + n2 + n3 === 2020) {
        found = true;

        console.log({ result: n1 * n2 * n3 });
        break;
      }
    }

    if (found) {
      break;
    }
  }
  if (found) {
    break;
  }
}
