import * as utils from "../utils";
import * as helpers from "./helpers";
import { isInAnyRange } from "./helpers";

const [rulesStr, myTicketStr, nearByTicketsStr] = utils
  .readFile("day-16/data.txt")
  .split(/\r?\n\r?\n/);

const rules = rulesStr.split(/\r?\n/).map((ruleLine) => ruleLine.split(": "));
const [, myTicket] = myTicketStr.split(/\r?\n/);
const [, ...nearbyTickets] = nearByTicketsStr.split(/\r?\n/);

console.log(`There are ${nearbyTickets.length} total tickets`);
const part1 = () => {
  const ranges = rules
    .map(([fieldName, range]) => range.split(" or "))
    .reduce((acc, curr) => [...acc, ...curr], []);

  const reducedRanges = helpers.combineAllRanges(ranges);

  const invalidTickets = nearbyTickets
    .map((ticketLine) =>
      ticketLine.split(",").map((ticketId) => Number(ticketId))
    )
    .map((ticketIdArr) =>
      ticketIdArr
        .map((ticketId) =>
          !isInAnyRange(ticketId, reducedRanges) ? ticketId : -1
        )
        .filter((id) => id >= 0)
        .reduce((acc, curr) => acc + curr, 0)
    )
    .filter((ticketErrorRate) => ticketErrorRate > 0);

  const errorRate = invalidTickets.reduce((acc, curr) => acc + curr, 0);

  console.log("Results :: Part 1");
  console.log(`There are ${invalidTickets.length} invalid tickets`);
  console.log(`The error rate was ${errorRate}`);
};
part1();

console.log("Part 2");
const part2 = () => {
  const reducedRanges = helpers.combineAllRanges(
    rules
      .map(([fieldName, range]) => range.split(" or "))
      .reduce((acc, curr) => [...acc, ...curr], [])
  );

  const rangesObjs = rules.map(([field, range]) => ({
    field,
    ranges: range.split(" or "),
    possibleIndicies: new Array(myTicket.split(",").length)
      .fill(null)
      .map((_, i) => i),
  }));

  const validTickets = nearbyTickets
    .map((ticketLine) =>
      ticketLine.split(",").map((ticketId) => Number(ticketId))
    )
    .filter((ticketIdArr) =>
      ticketIdArr.every((ticketId) => isInAnyRange(ticketId, reducedRanges))
    );

  const fieldNarrowing = rangesObjs
    .map((fieldValidation) => {
      return {
        ...fieldValidation,
        possibleIndicies: fieldValidation.possibleIndicies.filter(
          (ticketFieldIndex) => {
            return validTickets.every((ticketArr) =>
              isInAnyRange(ticketArr[ticketFieldIndex], fieldValidation.ranges)
            );
          }
        ),
      };
    })
    .sort(
      (fieldA, fieldB) =>
        fieldA.possibleIndicies.length - fieldB.possibleIndicies.length
    )
    .reduce(
      (
        acc: {
          fields: {
            field: string;
            ranges: string[];
            possibleIndicies: number[];
            ticketIndex: number;
          }[];
          eliminatedIndicies: number[];
        },
        curr
      ) => {
        const indicies = curr.possibleIndicies.filter(
          (possibleIndex) => !acc.eliminatedIndicies.includes(possibleIndex)
        );

        if (indicies.length !== 1) {
          throw new Error(
            `${curr.field} field had these possible indicies: ${indicies.join(
              ", "
            )}`
          );
        }

        return {
          ...acc,
          fields: [...acc.fields, { ...curr, ticketIndex: indicies[0] }],
          eliminatedIndicies: [...acc.eliminatedIndicies, indicies[0]],
        };
      },
      { fields: [], eliminatedIndicies: [] }
    )
    .fields.map(({ field, ticketIndex }) => ({ field, ticketIndex }))
    .reduce(
      (acc: { [key: string]: number }, curr) => ({
        ...acc,
        [curr.field]: curr.ticketIndex,
      }),
      {}
    );

  const myTicketByFields = myTicket.split(",").map((id) => Number(id));
  const importantFields = Object.entries(fieldNarrowing)
    .filter(([key, val]) => key.split(" ")[0] === "departure")
    .map(([key, val]) => val)
    .map((ticketFieldIndex) => myTicketByFields[ticketFieldIndex]);

  utils.logIt(fieldNarrowing);
  console.log(`There are ${validTickets.length} valid tickets`);
  console.log(
    `The answer is ${importantFields.reduce((acc, curr) => acc * curr, 1)}`
  );
};
part2();
