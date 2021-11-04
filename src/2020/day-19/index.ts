import * as utils from "../utils";
const console = require("console");
const dataStr = utils.readFile("day-19/data.txt");

interface Rule {
  id: number;
  options: Array<Array<number>>;
  leaf: boolean;
  leafValue?: string;
}
type RuleMap = Record<number, Rule>;

const [rulesRaw, codesRaw] = dataStr
  .split(/\r?\n\r?\n/)
  .map((section) => section.split(/\r?\n/));

export const transformRuleString = (ruleStr: string): Rule => {
  const [id, definition] = ruleStr.split(": ");
  const optionsRaw = definition.split(" | ");
  const options = optionsRaw
    .filter((opt) => opt[0] !== `"`)
    .map((opt) => transformPatterns(opt));
  const leaf = optionsRaw.length === 1 && optionsRaw[0][0] === `"`;
  const leafValue = (leaf && optionsRaw[0][1]) || undefined;
  return { id: Number(id), options, leaf, leafValue };
};

const transformPatterns = (pattStr: string) => {
  const parts = pattStr.split(" ").map((part) => Number(part));
  return parts;
};

export const stringStartsWith = (hayStack: string, needle: string) => {
  return hayStack.slice(0, needle.length) === needle;
};

export const validateInputAgainstPattern = (
  ruleNumber: number,
  inputString: string,
  ruleMap: { [id: number]: Rule }
) => {
  return (
    inputString.length ===
    countMatchingInputAgainstPattern(ruleNumber, inputString, ruleMap)
  );
};

export const countMatchingInputAgainstPattern = (
  ruleNumber: number,
  inputString: string,
  ruleMap: { [id: number]: Rule }
): number => {
  // console.log({ ruleNumber, inputString });
  const rule = ruleMap[ruleNumber];
  if (!rule) {
    throw new Error(`No rule found for ruleNumber ${ruleNumber} in ruleMap`);
  }
  if (rule.leaf && rule.leafValue) {
    return stringStartsWith(inputString, rule.leafValue) ? 1 : 0;
  }
  if (rule.options.length) {
    const result = rule.options.map((nextRuleNumbers) => {
      // console.log({ nextRuleNumbers });
      const finalString = nextRuleNumbers.reduce(
        (acc: string | number, nextRuleNum: number) => {
          // Ex. rule: "0: 4 5 1" where `1: "a"; 2: "b";
          if (Number.isInteger(acc as number)) {
            return acc;
          }
          // This can be a large pattern (branch), not just one matching string (leaf)
          const charactersValid = countMatchingInputAgainstPattern(
            nextRuleNum,
            acc as string,
            ruleMap
          );
          // console.log({ charactersValid });
          if (!charactersValid) {
            return 0;
          }

          return (acc as string).slice(charactersValid);
        },
        inputString
      );
      // console.log({ finalString });
      if (finalString === "" || !!finalString) {
        return inputString.length - (finalString as string).length;
      }
      return 0;
    });
    return result.reduce((acc, curr) => Math.max(acc, curr), 0);
  }
  throw new Error(`Not sure what to do with this.. ruleNumber: ${ruleNumber}`);
};

interface OptionsAcc {
  isRunning: boolean;
  hasPassed: boolean;
  matchedCharacters: number;
}

const rules: RuleMap = rulesRaw
  .map(transformRuleString)
  .reduce(
    (acc: { [currId: number]: Rule }, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );
const input = codesRaw.filter((input) =>
  validateInputAgainstPattern(0, input, rules)
).length;

console.log("Day 19 :: Part 1");
console.log(input);

// console.log(rules);
