import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const data = realData;
console.log(`::: Part 1 :::`);

const hashString = (str: string) => {
  const ascii = utils.toAscii(str);
  return ascii.reduce((acc, curr) => ((acc + curr) * 17) % 256, 0);
};

console.log(hashString("qp"));

const part1 = data
  .split(",")
  .map((ea) => hashString(ea))
  .reduce((acc, curr) => acc + curr, 0);

console.log(`Part 1: ${part1}`);

console.log(`::: Part 2 :::`);

const isAdd = (str: string) => str.includes("=");
const isRemove = (str: string) => str.includes("-");
const getParts = (str: string) => {
  if (str.includes("=")) {
    const [label, lens] = str.split("=");
    const hash = hashString(label);
    return { label, hash, lens: +lens };
  }
  const label = str.slice(0, str.length - 1);
  return { label, hash: hashString(label) };
};

interface LabelLens {
  // hash: number;
  label: string;
  lens: number;
}

console.log(getParts("pb=1"));
console.log(getParts("pb-"));

const steps = data
  .split(",")
  .map((step) => getParts(step))
  .reduce((acc, step) => {
    const { hash, lens, label } = step;
    // new lens
    if (lens) {
      let index = acc[hash]?.findIndex(
        (labeledLens) => labeledLens.label === label
      );
      if (index === undefined) {
        acc[hash] = [{ label, lens }];
        return acc;
      }
      if (index !== -1) {
        // replace
        acc[hash][index] = { label, lens };
        return acc;
      }
      // otherwise, add
      return {
        ...acc,
        [step.hash]: [...acc[step.hash], { label, lens }],
      };
    }

    // remove lens
    let index = acc[hash]?.findIndex(
      (labeledLens) => labeledLens.label === label
    );
    if (index === -1 || index === undefined) return acc; // do nothing
    acc[hash].splice(index, 1);

    return acc;
  }, {} as { [box: number]: Array<LabelLens> });

const focusingPower: number = Object.entries(steps).reduce(
  (acc, [box, lenses]) => {
    const boxPower = lenses.reduce((accLens, { lens }, i) => {
      const focus = (+box + 1) * (i + 1) * lens;
      return accLens + focus;
    }, 0);
    return acc + boxPower;
  },
  0
);

console.log(`Part 2: ${focusingPower}`);
