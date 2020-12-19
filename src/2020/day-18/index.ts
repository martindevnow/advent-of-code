import * as utils from "../utils";
const data = utils.readFile("day-18/data.txt").split(/\r?\n/);

// 1 + 2 * 3 + 4 * 5 + 6
// 1 + (2 * 3) + (4 * (5 + 6))
// 5 + (8 * 3 + 9 + 3 * 4 * 3)
// 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))

// ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
// ((6 * 9) * (15 * 14) + 6) + 6 * 2
// (54 * 210 + 6) + 6 * 2
// (54 * 216) + 6 * 2
// 11664 + 6 * 2
// 11670 * 2
// 23340

interface Calc {
  operation: string | null;
  mem: number;
  done: boolean;
  layer: number;
}

const processOperation = (
  left: number,
  operation: string | null,
  right: number
) => {
  switch (operation) {
    case "+":
      return left + right;
    case "*":
      return left * right;
    default:
      console.log(`Default Operation :: Loading ${left} ${operation} ${right}`);
      return left + right;
  }
  console.error({ left, operation, right });
  throw new Error("processOperation failed");
  return left;
};

const findIndexOfClosingBracket = (str: string) => {
  return str.split("").reduce(
    (acc, curr, index) => {
      if (acc.index) return acc;
      if (curr === "(") return { ...acc, layer: acc.layer + 1 };
      if (curr === ")") {
        if (acc.layer === 0) {
          return { ...acc, index, layer: acc.layer - 1 };
        }
        return { ...acc, layer: acc.layer - 1 };
      }

      return acc;
    },
    { layer: 0, index: 0 }
  ).index;
};

const processEquation = (equation: string, part2 = false): number => {
  // console.log(`Processing :: ${equation}`);
  const total =
    equation.split("").reduce(
      (acc: Calc, curr: string, index) => {
        // Ignore cases
        if (acc.done) return acc;
        if (curr === " ") return acc;

        // console.log(`Reduce: ${index}`);
        // if (acc.layer === 0) {
        //   console.log({ ...acc, curr });
        // }

        // Always Count
        if (curr === ")") {
          return {
            ...acc,
            layer: acc.layer - 1,
          };
        }
        if (acc.layer && curr === "(") {
          return {
            ...acc,
            layer: acc.layer + 1,
          };
        }

        // Ignore if still in deeper nest
        if (acc.layer) return acc;

        // Store operation
        if (curr === "+") return { ...acc, operation: "+" };
        if (curr === "*") {
          if (part2) {
            const remainingToBeProcessed = equation.slice(index + 1);

            return {
              ...acc,
              layer: acc.layer + 1,
              mem: processOperation(
                acc.mem,
                curr,
                processEquation(remainingToBeProcessed, part2)
              ),
            };
          }

          return { ...acc, operation: "*" };
        }

        // Process Numbers
        const num = Number(curr);
        if (!isNaN(num)) {
          if (!acc.operation && !acc.mem) {
            // Initialize
            return { ...acc, mem: num };
          }

          // Process
          return {
            ...acc,
            mem: processOperation(acc.mem, acc.operation, num),
          };
        }

        if (curr === "(") {
          const remainingToBeProcessed = equation.slice(index + 1);
          const lastBracketIndex = findIndexOfClosingBracket(
            remainingToBeProcessed
          );
          const subEquation = remainingToBeProcessed.slice(0, lastBracketIndex);
          return {
            ...acc,
            layer: acc.layer + 1,
            mem: processOperation(
              acc.mem,
              acc.operation,
              processEquation(subEquation, part2)
            ),
          };
        }

        return acc;
      },
      { mem: 0, operation: null, done: false, layer: 0 }
    ).mem || 0;
  console.log(`Equation :: ${equation} total is ${total}`);
  return total;
};
// const parsed = data
//   .map((equationStr) => processEquation(equationStr))
//   .reduce((acc, curr) => acc + curr, 0);
// console.log("Results :: Part 1");
// console.log(parsed);

const parsed2 = data
  .map((equationStr) => processEquation(equationStr, true))
  .reduce((acc, curr) => acc + curr, 0);
console.log("Results :: Part 2");
console.log(parsed2);
