import * as utils from "../utils";
const data = utils.readFile("day-13/data.txt");

const [timestamp, busesStr] = data.split(/\r?\n/);
const time = Number(timestamp);
const onlyBuses = busesStr
  .split(",")
  .filter((bus) => bus !== "x")
  .map((busId) => ({ id: Number(busId) }));

const nextBusTimes = onlyBuses
  .map((bus) => {
    const nextTime = Math.ceil(time / bus.id) * bus.id;
    return {
      id: bus.id,
      nextTime: nextTime,
    };
  })
  .sort((busA, busB) => busA.nextTime - busB.nextTime);

// console.log({ timestamp, nextBusTimes });
// console.log("Result :: Part 1");
// console.log(nextBusTimes[0].id * (nextBusTimes[0].nextTime - time));

const allBusesWithOffset = busesStr
  .split(",")
  .map((bus, index) => ({
    id: isNaN(Number(bus)) ? 0 : Number(bus),
    offset: index,
  }))
  .filter((bus) => bus.id > 0);
// .sort((busA, busB) => busB.id - busA.id);

// console.log(allBusesWithOffset);

const doesDepartAt = (busId: number | 0, expectedDeparture: number): boolean =>
  utils.mod(busId)(expectedDeparture) === 0;

let resultFound = false;
let currentTime = 0;
let currentStep = allBusesWithOffset[0].id;
let currentTarget = 1;
let iteration = 0;
while (!resultFound) {
  iteration++;
  const matchFound = doesDepartAt(
    allBusesWithOffset[currentTarget].id,
    currentTime + allBusesWithOffset[currentTarget].offset
  );

  if (matchFound) {
    console.log(
      `MATCH :: Array Index ${currentTarget}, BusID: ${allBusesWithOffset[currentTarget].id} at time ${currentTime}`
    );
    console.log(
      `Bus with ID: ${allBusesWithOffset[currentTarget].id} does depart at ${currentTime} offset by ${allBusesWithOffset[currentTarget].offset}`
    );

    currentStep = currentStep * allBusesWithOffset[currentTarget].id;
    currentTarget++;
    console.log(
      `Setting step Size to ${currentStep} and moving to next target ${currentTarget}`
    );
  }

  if (currentTarget === allBusesWithOffset.length) {
    resultFound = true;
    console.log(`Result found at time ${currentTime}`);
    break;
  }

  if (iteration > 100000000) {
    console.log("maybe ok, maybe broken");
    break;
  }
  currentTime += currentStep;
}

console.log("Result Found :: Part 2");
console.log({
  currentStep,
  currentTarget,
  currentTime,
  iteration,
});
// 534,035,653,563,227
