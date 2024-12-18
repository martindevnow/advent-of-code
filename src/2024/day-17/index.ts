import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

console.log(`::: Part 1 :::`);

let registers: {
  A: number;
  B: number;
  C: number;
} = { A: 0, B: 0, C: 0 };

let pointer = 0;
let output: Array<number> = [];

const op = {
  0: "adv", // => numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo operand
  1: "bxl", // => bitwise XOR of register B and the instruction's literal operand
  2: "bst", // => calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
  3: "jnz", // => does nothing if the A register is 0. However, if the A register is not zero, it jumps by setting the instruction pointer to the value of its literal operand (and no increase in pointer)
  4: "bxc", // => bitwise XOR of register B and register C, then stores the result in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
  5: "out", // => calculates the value of its combo operand modulo 8, then outputs that value. (If a program outputs multiple values, they are separated by commas.)
  6: "bdv", // like 0 but store in B
  7: "cdv", // like 0 but store in C
};

const comboOperand = (operand: number) => {
  if (operand >= 0 && operand <= 3) return operand;
  switch (operand) {
    case 4:
      return registers.A;
    case 5:
      return registers.B;
    case 6:
      return registers.C;
    case 7:
      throw Error("No combo operand for 7");
  }
  console.error({ operand });
  throw Error("unknown operand");
};

const computer = {
  adv: (operand: number) => {
    const numerator = registers.A;
    const denominator = Math.pow(2, comboOperand(operand));
    registers.A = Math.floor(numerator / denominator);
  }, // adv => numerator is the value in the A register.
  // The denominator is found by raising 2 to the power of the instruction's combo operand
  bxl: (operand: number) => {
    registers.B = operand ^ registers.B;
  }, // bxl => bitwise XOR of register B and the instruction's literal operand
  bst: (operand: number) => {
    registers.B = comboOperand(operand) % 8;
  }, // bst => calculates the value of its combo operand modulo 8
  // (thereby keeping only its lowest 3 bits), then writes that value to the B register.
  jnz: (operand: number) => {
    if (registers.A === 0) return;
    pointer = operand;
  }, // jnz => does nothing if the A register is 0.
  // However, if the A register is not zero,
  // it jumps by setting the instruction pointer to the value of its literal operand (and no increase in pointer)
  bxc: (_: number) => {
    registers.B = registers.B ^ registers.C;
  }, // bxc => bitwise XOR of register B and register C, then stores the result in register B.
  // (For legacy reasons, this instruction reads an operand but ignores it.)
  out: (operand: number) => {
    output.push(comboOperand(operand) % 8);
  }, // out => calculates the value of its combo operand modulo 8, then outputs that value.
  // (If a program outputs multiple values, they are separated by commas.)
  bdv: (operand: number) => {
    const numerator = registers.A;
    const denominator = Math.pow(2, comboOperand(operand));
    registers.B = Math.floor(numerator / denominator);
  }, // bdv
  cdv: (operand: number) => {
    const numerator = registers.A;
    const denominator = Math.pow(2, comboOperand(operand));
    registers.C = Math.floor(numerator / denominator);
  }, // cdv
};

const loadRegisters = (a: number, b: number, c: number) => {
  registers.A = a;
  registers.B = b;
  registers.C = c;
};

loadRegisters(117440, 0, 0);

const runProgram = (program: string) => {
  // console.log({ registers });

  const executeStep = (instructions: Array<number>) => {
    // process.stdout.write(`Line: ${pointer}`);

    const step = instructions[pointer];
    const operand = instructions[pointer + 1];

    if (step === undefined) {
      return output.join(",");
      console.log(`Output: ${output.join(",")}`);
      throw Error("Halt, no step");
    }
    if (operand === undefined) {
      return output.join(",");
      console.log(`Output: ${output.join(",")}`);
      throw Error("Halt, no operand");
    }
    if (op[step] === undefined) {
      return output.join(",");
      console.log(`Output: ${output.join(",")}`);
      throw Error("Halt, operand unknown");
    }

    switch (op[step]) {
      case "jnz":
        computer[op[step]](operand);
        if (registers.A === 0) pointer += 2;
        break;
      default:
        computer[op[step]](operand);
        pointer += 2;
    }

    return undefined;
  };

  const instructions = program.split(",").map(Number);

  let result: string | undefined;
  while (result === undefined) {
    result = executeStep(instructions);
  }

  return result;
};

// runProgram("0,3,5,4,3,0");

console.log(`Part 1: ${{}}`);

console.log(`::: Part 2 :::`);

const PROGRAM = "0,3,5,4,3,0";
let OUTPUT = "";
let a = 0;
while (OUTPUT !== PROGRAM) {
  a++;
  loadRegisters(a, 0, 0);
  OUTPUT = runProgram(PROGRAM);
}

console.log(`Part 2: Register 'A': ${a}`);
