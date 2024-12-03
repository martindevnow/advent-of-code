import inquirer from "inquirer";
import { readFile } from "../../utils";

export const isPointer = (code, param) => {
  code = code.toString();
  if (param === 3) {
    return !(code.length < 5 ? 0 : !!parseInt(code.charAt(0)));
  }
  if (param === 2) {
    return !(code.length < 4 ? 0 : !!parseInt(code.charAt(code.length - 4))); // code.len =5, then charAt(1); code.len=4, then charAt(0);
  }
  if (param === 1) {
    return !(code.length < 3 ? 0 : !!parseInt(code.charAt(code.length - 3))); // code.len=5, then charAt(2); code.len=4, then charAt(1); code.len=3, then charAt(0);
  }
};

export const getOPCode = (num) => num % 100;

let data = readFile("../2019/day-05/data.txt")
  .split(",")
  .map((a) => parseInt(a));

export const OP_FACTORY = ({ name, code, args, len, stepFunc, opFunc }) => {
  if (!stepFunc) {
    stepFunc = (currentIndex) => (len === -1 ? false : currentIndex + len);
  }

  return {
    name,
    code,
    args,
    len,
    stepFunc,
    opFunc,
  };
};

export const add = (argA, argB, argC, app, code) =>
  (app[argC] =
    (isPointer(code, 1) ? app[argA] : argA) +
    (isPointer(code, 2) ? app[argB] : argB));
export const multiply = (argA, argB, argC, app, code) =>
  (app[argC] =
    (isPointer(code, 1) ? app[argA] : argA) *
    (isPointer(code, 2) ? app[argB] : argB));
export const input = async (argA, app, code) => {
  const result = await inquirer.prompt([
    {
      type: "input",
      name: "inp",
      message: "Input: ",
    },
  ]);
  if (isPointer(code, 1)) {
    console.log(`INPUT :: ${result["inp"]}`);
    app[argA] = parseInt(result["inp"]);
  }
};
export const output = (argA, app, code) => {
  const res = isPointer(code, 1) ? app[argA] : argA;
  console.log(`OUTPUT :: ${res}`);
};
export const isTrue = (argA, _, app, code) =>
  (isPointer(code, 1) ? app[argA] : argA) !== 0;
export const isFalse = (argA, _, app, code) =>
  (isPointer(code, 1) ? app[argA] : argA) === 0;
export const lessThan = (argA, argB, argC, app, code) => {
  app[argC] =
    (isPointer(code, 1) ? app[argA] : argA) <
    (isPointer(code, 2) ? app[argB] : argB)
      ? 1
      : 0;
};
export const equalTo = (argA, argB, argC, app, code) => {
  app[argC] =
    (isPointer(code, 1) ? app[argA] : argA) ===
    (isPointer(code, 2) ? app[argB] : argB)
      ? 1
      : 0;
};

// const OPERATIONS = [
//   {
//     name: 'ADD',
//     code: 1,
//     args: 3,
//     len: 4,
//     stepFunc: (currIndex) => currIndex + 4,
//     opFunc: add,
//   },
//   {
//     name: 'MULTIPLY',
//     code: 2,
//     args: 3,
//     len: 4,
//     stepFunc: (currIndex) => currIndex + 4,
//     opFunc: multiply,
//   },
//   {
//     name: 'INPUT',
//     code: 3,
//     args: 1,
//     len: 2,
//     stepFunc: (currIndex) => currIndex + 2,
//     opFunc: input,
//   },
//   {
//     name: 'OUTPUT',
//     code: 4,
//     args: 1,
//     len: 2,
//     stepFunc: (currIndex) => currIndex + 2,
//     opFunc: output,
//   },
//   {
//     name: 'JUMP_IF_TRUE',
//     code: 5,
//     args: 2,
//     len: 3,
//     stepFunc: (currIndex, argA, argB, app, code) => isTrue(argA, argB, app, code) ? (isPointer(code, 2) ? app[argB] : argB) : currIndex + 3,
//     opFunc: isTrue,
//   },
//   {
//     name: 'JUMP_IF_FALSE',
//     code: 6,
//     args: 2,
//     len: 3,
//     stepFunc: (currIndex, argA, argB, app, code) => isFalse(argA, argB, app, code) ? (isPointer(code, 2) ? app[argB] : argB) : currIndex + 3,
//     opFunc: isFalse,
//   },
//   {
//     name: 'LESS_THAN',
//     code: 7,
//     args: 3,
//     len: 4,
//     stepFunc: (currIndex) => currIndex + 4,
//     opFunc: lessThan,
//   },
//   {
//     name: 'EQUALS',
//     code: 8,
//     args: 3,
//     len: 4,
//     stepFunc: (currIndex) => currIndex + 4,
//     opFunc: equalTo,
//   },
//   {
//     name: 'HALT',
//     code: 99,
//     args: 0,
//     len: -1,
//     stepFunc: (currIndex, argA, argB) => false,
//     opFunc: (app, code) => console.log(`HALT :: `) && false,
//   }
// ];

// // const APPLICATION = '1,1,2,5,2,0,1,7,99';

// // const APPLICATION = '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';
// // const INSTRUCTIONS = APPLICATION.split(',').map(a => parseInt(a));

// const INSTRUCTIONS = data;

// const main = async () => {
//   for (let i = 0; i < INSTRUCTIONS.length;) {
//     const CODE = INSTRUCTIONS[i]
//     console.log([CODE, INSTRUCTIONS[i + 1], INSTRUCTIONS[i + 2], INSTRUCTIONS[i + 3]]);
//     const op = OPERATIONS.find(a => a.code === getOPCode(CODE));
//     console.log({ CODE, op, i })
//     if (op === undefined) {
//       throw new Error('No Operation found...')
//     }
//     let step = 0;
//     if (op.args === 3) {
//       const argA = INSTRUCTIONS[i + 1];
//       const argB = INSTRUCTIONS[i + 2];
//       const argC = INSTRUCTIONS[i + 3];
//       // console.log({ argA, argB, argC })
//       await op.opFunc(argA, argB, argC, INSTRUCTIONS, CODE);
//       step = op.stepFunc(i, argA, argB, argC, INSTRUCTIONS, CODE);
//     }
//     if (op.args === 2) {
//       const argA = INSTRUCTIONS[i + 1];
//       const argB = INSTRUCTIONS[i + 2];
//       // console.log({ argA, argB })
//       await op.opFunc(argA, argB, INSTRUCTIONS, CODE);
//       step = op.stepFunc(i, argA, argB, INSTRUCTIONS, CODE);
//     }
//     if (op.args === 1) {
//       const argA = INSTRUCTIONS[i + 1];
//       // console.log({ argA })
//       await op.opFunc(argA, INSTRUCTIONS, CODE);
//       step = op.stepFunc(i, argA, INSTRUCTIONS, CODE);
//     }
//     if (op.args === 0) {
//       await op.f(INSTRUCTIONS, CODE);
//       step = op.stepFunc(i);
//     }
//     console.log({ i, step });
//     i = step === false ? INSTRUCTIONS.length : step;
//   }
// }
//
// main();
