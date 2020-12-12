import * as utils from "../utils";
const data = utils.readFile("day-05/data.txt").split(/\r?\n/);

const boardingPasses = data.map((line) => {
  const row = parseInt(
    line.slice(0, 7).replace(/F/g, "0").replace(/B/g, "1"),
    2
  );
  const col = parseInt(line.slice(7).replace(/L/g, "0").replace(/R/g, "1"), 2);
  const seatId = row * 8 + col;
  return { row, col, seatId };
});

const highestSeat = boardingPasses.reduce(
  (acc, curr) => Math.max(acc, curr.seatId),
  0
);

const seats = boardingPasses.map((bp) => bp.seatId).sort();

console.log(highestSeat);

const possibleSeats = new Array(highestSeat)
  .fill(null)
  .map((possibleSeat, index) => {
    return (
      !seats.includes(index) &&
      seats.includes(index + 1) &&
      seats.includes(index - 1) &&
      index
    );
  })
  .filter((item) => !!item);
console.log(possibleSeats);
