import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`;

const data = realData;

console.log(`::: Part 1 :::`);

type Gate = {
  a: string;
  b: string;
  operator: string;
  name: string;
  value: boolean | null;
};
const [inputsStr, logicStr] = data.split("\n\n");
const inputs = inputsStr
  .split("\n")
  .map((line) => {
    const [wire, value] = line.split(": ");
    return { wire, value: !!Number(value) };
  })
  .reduce((acc, curr) => {
    return { ...acc, [curr.wire]: curr.value };
  }, {} as { [key: string]: boolean });

console.log({ inputs });

const logic = logicStr
  .split("\n")
  // .slice(0, 4)
  .map((line) => {
    const exp = /(\w+) (\w+) (\w+) -> (\w+)/;

    const [, a, operator, b, name] = line.match(exp)!;
    return { a, b, operator, name, value: null };
  })
  .reduce((acc, curr) => {
    return { ...acc, [curr.name]: curr };
  }, {} as { [key: string]: Gate });

console.log(`Part 1: ${{}}`);

const AND = (a: boolean, b: boolean) => a && b;
const OR = (a: boolean, b: boolean) => a || b;
const XOR = (a: boolean, b: boolean) => a !== b;

// find all z prefix

const results = Object.entries(logic)
  .filter(([key]) => {
    return key.charAt(0) === "z";
  })
  .sort(([keyA], [keyB]) => (keyA < keyB ? 1 : -1));

console.log(results);

const getResultForGate = (gate: Gate) => {
  const { a, b, operator, name, value } = gate;
  if (value !== null) return value;

  if (inputs[name] !== undefined) return inputs[name];

  let aGate = logic[a];
  let aValue;
  if (!aGate) {
    aValue = inputs[a];
    if (aValue === undefined) throw Error(`no gate or input for ${a}`);
  } else {
    aValue = getResultForGate(aGate);
  }

  let bGate = logic[b];
  let bValue;
  if (!aGate) {
    bValue = inputs[b];
    if (bValue === undefined) throw Error(`no gate or input for ${b}`);
  } else {
    bValue = getResultForGate(bGate);
  }

  switch (operator) {
    case "OR":
      return OR(aValue, bValue);
    case "AND":
      return AND(aValue, bValue);
    case "XOR":
      return XOR(aValue, bValue);
  }
  throw Error(`no operator func for ${operator}`);
};

const final: string = results
  .map(([name, gate]) => {
    return getResultForGate(gate);
  })
  .reduce((acc, curr) => `${acc}${Number(curr)}`, "");

console.log({ res: parseInt(final, 2) });

console.log(`::: Part 2 :::`);

console.log(`Part 2: ${{}}`);
