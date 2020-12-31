import * as utils from "../utils";
const console = require("console");
const dataStr = utils.readFile("day-19/mock.txt");

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
  console.log({ ruleNumber, inputString });
  const rule = ruleMap[ruleNumber];
  if (!rule) {
    throw new Error(`No rule found for ruleNumber ${ruleNumber} in ruleMap`);
  }
  if (rule.leaf && rule.leafValue) {
    return stringStartsWith(inputString, rule.leafValue);
  }
  if (rule.options.length) {
    return rule.options.some((nextRuleNumbers) => {
      console.log({ nextRuleNumbers });
      const finalString = nextRuleNumbers.reduce(
        (acc: string | boolean, nextRuleNum: number) => {
          // Ex. rule: "0: 4 5 1" where `1: "a"; 2: "b";  



          if (acc === false || acc === true) {
            return acc;
          }
          // This can be a large pattern (branch), not just one matching string (leaf)
          const nextCharValid = validateInputAgainstPattern(
            nextRuleNum,
            acc,
            ruleMap
          );
          // const countMatches = countMatchingCharacters(
          //   nextRuleNum,
          //   acc,
          //   ruleMap
          // );
          if (!nextCharValid) {
            return false;
          }
          console.log("Pass");
          return acc.slice(1);
        },
        inputString
      );
      console.log({ finalString });
      if (finalString === "" || !!finalString) {
        return true;
      }
      return false;
    });
  }
  throw new Error(`Not sure what to do with this.. ruleNumber: ${ruleNumber}`);
};

interface OptionsAcc {
  isRunning: boolean;
  hasPassed: boolean;
  matchedCharacters: number;
}

const countMatchingCharacters = (
  ruleNumber: number,
  inputString: string,
  ruleMap: { [id: number]: Rule }
): number => {
  console.log({ ruleNumber, inputString });
  const rule = ruleMap[ruleNumber];
  if (!rule) {
    throw new Error(`No rule found for ruleNumber ${ruleNumber} in ruleMap`);
    return 0;
  }
  if (rule.leaf && rule.leafValue) {
    return stringStartsWith(inputString, rule.leafValue) ? rule.leafValue.length : 0;
  }
  if (rule.options.length) {
    const result = rule.options.map(
      (ruleSet) => {
        console.log('Running RuleSet')
        console.log({ ruleSet });
        const remainingString = ruleSet.reduce(
          (acc: string | boolean, nextRuleNum: number) => {
            if (acc === true || acc === false) {
              return acc;
            }
            // This can be a large pattern, not just one matching string
            const numOfCharsValid = countMatchingCharacters(
              nextRuleNum,
              acc,
              ruleMap
            );
            if (!numOfCharsValid) {
              return false;
            }
            console.log("Pass");
            return acc.slice(numOfCharsValid);
          },
          inputString
        );

        console.log({ remainingString });
        if (remainingString === "" || !!remainingString) {
          return inputString.length;
        }
        return (remainingString && inputString.length - remainingString.length) || 0;
      }
    );
    return result.
  }
  throw new Error(`Not sure what to do with this.. ruleNumber: ${ruleNumber}`);
};
const rules: RuleMap = rulesRaw
  .map(transformRuleString)
  .reduce(
    (acc: { [currId: number]: Rule }, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );
// const input = codesRaw.filter((input) =>
//   validateInputAgainstPattern(0, input, rules)
// ).length;

// console.log("Day 19 :: Part 1");
// console.log(input);

// console.log(rules);
