import * as utils from "../utils";
const data = utils.readFile("day-06/data.txt");
const groups = data.split(/\r?\n\r?\n/);

const goupsWithYes = groups
  .map((group) =>
    group
      .split(/\r?\n/)
      .map((person) => person.split(""))
      .reduce((acc, curr) => [...acc, ...curr], [])
  )
  .map((group) => new Set(group))
  .map((groupSet) => groupSet.size)
  .reduce((acc, curr) => acc + curr, 0);

console.log(goupsWithYes);

const groupAllYes = groups
  .map((group) => group.split(/\r?\n/))
  .map((peopleInGroup) => {
    if (peopleInGroup.length === 1) {
      return peopleInGroup[0].length;
    }
    const tally = peopleInGroup.reduce((acc, person) => {
      const yesQs = person.split(""); //each letter they said yes to

      const summed = yesQs.reduce(
        (totals, letter) => ({
          ...totals,
          [letter]: (totals[letter] || 0) + 1,
        }),
        acc
      );

      return summed;
    }, {});

    return Object.entries(tally).filter(
      ([letter, yeses]) => yeses === peopleInGroup.length
    ).length;
  });
const sumOfCounts = groupAllYes.reduce((acc, curr) => acc + curr, 0);
console.log(groupAllYes[0]);
console.log(groupAllYes[1]);
console.log(sumOfCounts);
