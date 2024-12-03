const range = '248345-746315'.split('-').map(a => parseInt(a));
console.log({ range });

const isValid = pass => {
  if (pass.length !== 6) {
    // console.log('too short');
    return false;
  }
  let lastDigit = 0;
  let currentDigit;
  let hasDuplicate = false;
  let pairDigit = 0;
  let badDigits = [];
  for (let i = 0; i < 6; i++) {
    currentDigit = parseInt(pass.charAt(i));

    // console.log({
    //   currentDigit,
    //   lastDigit,
    //   hasDuplicate,
    //   pairDigit
    // });

    // Check if decreasing
    if (currentDigit < lastDigit) {
      // console.log('descending');
      return false;
    }

    if (!pairDigit && !badDigits.includes(currentDigit)) {
      if (currentDigit === lastDigit) {
        // console.log('found a pair');
        pairDigit = currentDigit;
        hasDuplicate = true;
      }
    } else {
      if (currentDigit === pairDigit) {
        // console.log('pair was not just a pair');
        pairDigit = 0;
        hasDuplicate = false;
        badDigits.push(currentDigit);
      }
    }

    lastDigit = currentDigit;
  }

  if (!hasDuplicate) {
    // console.log('no dupes');
    return false;
  }
  return true;
};

// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).

// console.log('111111', isValid('111111'));
// console.log('223450', isValid('223450'));
// console.log('123789', isValid('123789'));

let validPws = 0;
for (let j = range[0]; j < range[1]; j++) {
  if (isValid(j.toString())) {
    console.log(j);
    validPws++;
  }
}
console.log({ validPws });

// 112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
// 123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
// 111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).

console.log('112333', isValid('112333'));
console.log('112233', isValid('112233'));
console.log('123444', isValid('123444'));
console.log('122444', isValid('122444'));
console.log('224444', isValid('224444'));
console.log('222444', isValid('222444'));
console.log('222244', isValid('222244'));
console.log('677778', isValid('677778'));

// 676 too ----
// 788 too high
