import * as utils from "../utils";

interface Card {
  id: number;
  numsWin: number[];
  numsHave: number[];
  winningNumbers: number[];
  stack: number;
}

const cards: Card[] = utils
  .readFileAbsolute(__dirname + "/data.txt") // read input data
  .split(/\n/)
  .map((line) => {
    const [cardId, nums] = line.split(": ");
    const [numsWinningDirty, numsHaveDirty] = nums.split(" | ");
    return {
      id: +cardId.split("Card")[1].trim(),
      numsWin: numsWinningDirty
        .split(" ")
        .map((_) => +_.trim())
        .filter(Boolean),
      numsHave: numsHaveDirty
        .split(" ")
        .map((_) => +_.trim())
        .filter(Boolean),
      winningNumbers: [],
      stack: 1,
    };
  });
// .slice(0, 10);

// utils.logIt(cards[0]);

const totalPoint = cards.reduce((acc, curr) => {
  const points = curr.numsHave.filter((num) => curr.numsWin.includes(num));
  if (points.length == 0) return acc;
  return acc + Math.pow(2, points.length - 1);
}, 0);

console.log(`Day 4, Part 1: ${totalPoint}`);
// 20667 is correct

// Part 2
const cardsObj: { [key: string]: Card } = cards.reduce((acc, curr) => {
  return {
    ...acc,
    [curr.id]: curr,
  };
}, {});

const res = cards.reduce((acc, curr) => {
  const matchingNumbers = curr.numsHave.filter((num) =>
    curr.numsWin.includes(num)
  );
  if (matchingNumbers.length === 0) return acc;

  // build a new object with ids starting at the next id (curr.id + 1) up to (curr.id + matchingNumbers)
  // and the stack should increment by the curr.stack
  console.log(
    `Card ${curr.id} is a winner with ${
      matchingNumbers.length
    } matching numbers and I have ${curr.stack} copies. Incrementing the next ${
      matchingNumbers.length
    } tickets' stack by ${acc[curr.id].stack}`
  );

  const newStacks = new Array(matchingNumbers.length)
    .fill({})
    .reduce((acc2, _, i) => {
      const stackId = curr.id + i + 1;
      // console.log({ stackId });
      if (stackId > cards.length) return acc2;
      return {
        ...acc2,
        [stackId]: {
          ...acc[stackId],
          stack: acc[stackId].stack + acc[curr.id].stack,
        },
      };
    }, {});
  // console.log(newStacks);

  return {
    ...acc,
    [curr.id]: { ...acc[curr.id], winningNumbers: matchingNumbers },
    ...newStacks,
  };
}, cardsObj);

// utils.logIt(res);

const finalNumber = Object.entries(res).reduce((acc, [key, curr]) => {
  return acc + curr.stack;
}, 0);

utils.logIt(
  Object.values(res).map(({ id, stack, winningNumbers }) => ({
    id,
    stack,
    winningNumbers,
  }))
);
console.log(`Day 4, part 2: ${finalNumber}`);

// 1093 is too low
// 5833065 is correct!
