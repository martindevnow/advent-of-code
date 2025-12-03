import * as utils from "../utils";

const realData = utils.readFileAbsolute(__dirname + "/data.txt");
const input = realData;

const parse = (input) => input.split("\n").map((row) => row.split("-"));

const makegraph = (link) =>
  link.reduce(
    (graph, [a, b]) =>
      graph
        .set(a, [...(graph.get(a) ?? []), b])
        .set(b, [...(graph.get(b) ?? []), a]),
    new Map()
  );

const triplets = (graph) =>
  [...graph.keys()]
    .flatMap((node) =>
      graph.get(node).flatMap((next) =>
        graph
          .get(next)
          .filter((nextnext) => graph.get(nextnext).includes(node))
          .map((nextnext) => [node, next, nextnext])
      )
    )
    .filter((triangle) => triangle.some((node) => node[0] === "t"))
    .map((triangle) => triangle.sort().join(","))
    .filter((v, i, arr) => i === arr.indexOf(v)).length;

const largestSet = (graph) =>
  [...graph.keys()]
    .map((node) =>
      graph
        .get(node)
        .flatMap((next) => [
          node,
          ...graph
            .get(next)
            .filter((nextnext) => graph.get(nextnext).includes(node)),
        ])
        .filter(
          (node, i, arr) =>
            arr.indexOf(node) === i &&
            arr.every(
              (other) => other === node || graph.get(other).includes(node)
            )
        )
    )
    .reduce((max, network) => (max.length > network.length ? max : network))
    .sort()
    .join(",");

export const part1 = triplets(makegraph(parse(input)));
export const part2 = largestSet(makegraph(parse(input)));

console.log({ part1 });
console.log({ part2 });
