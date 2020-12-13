import * as utils from "../utils";
const data = utils.readFile("day-08/data.txt");
const instructions = data.split(/\r?\n/).map((instructionText) => {
  const [operation, value] = instructionText.split(" ");
  return { operation, value: +value, executed: false };
});

const run = (
  instructions: Array<{ operation: string; value: number }>,
  swapLine?: number
): number => {
  let acc = 0;
  let currentLine = 0;
  let looped = false;
  let terminated = false;
  let executed: { [lineNum: string]: boolean } = {};

  console.log(`Swap Line: ${swapLine}`);
  while (!looped) {
    if (!instructions[currentLine]) {
      console.error(`Line ${currentLine} is not accessible`);
      looped = true;
      break;
    }

    const { operation, value } = instructions[currentLine];
    const swap = swapLine === currentLine;

    // console.log({ acc, currentLine, operation, value, swapLine });

    if (!!executed[`line-${currentLine}`]) {
      looped = true;
    }

    executed[`line-${currentLine}`] = true;
    switch (operation) {
      case "acc":
        acc += value;
        currentLine++;
        break;
      case "jmp":
        currentLine = currentLine + (swap ? 1 : value);
        break;
      case "nop":
        currentLine = currentLine + (swap ? value : 1);
        break;
    }

    if (currentLine >= instructions.length) {
      terminated = true;
      looped = true;
    }
  }
  if (terminated) {
    console.log(`Terminated!, swap line: ${swapLine}`);
  }
  return acc * (!terminated ? 0 : 1);
};

const lines = new Array(instructions.length)
  .fill(null)
  .map((_, index) => run(instructions, index))
  .filter((acc) => acc !== 0);
console.log(lines);
// console.log(run(instructions));
