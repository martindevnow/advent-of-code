import { readFile } from '../../utils';

export const massToFuel = cumulative => mass => {
  const fuelMass = Math.floor(parseInt(mass) / 3) - 2;
  if (!cumulative) {
    // console.log('A:', fuelMass);
    return fuelMass;
  }
  if (fuelMass < 0) {
    // console.log('B:', fuelMass);
    return 0;
  }
  // console.log('C:', fuelMass);
  return fuelMass + massToFuel(cumulative)(fuelMass);
};

export const sum = (acc, curr) => acc + curr;

export const getTotalFuelRequirements = (massArr, cumulative = false) =>
  massArr.map(massToFuel(cumulative)).reduce(sum, 0);

// For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
// For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
// For a mass of 1969, the fuel required is 654.
// For a mass of 100756, the fuel required is 33583.

// console.log(massToFuel(12));
// console.log(massToFuel(14));
// console.log(massToFuel(1969));
// console.log(massToFuel(100756, false));
console.log(massToFuel(true)(100756));

let data = readFile('../2019/day-01/data.txt').split(/\r?\n/);

const partOneTotal = getTotalFuelRequirements(data);
console.log({ partOneTotal });

const partTwoTotal = getTotalFuelRequirements(data, true);
console.log({ partTwoTotal });
