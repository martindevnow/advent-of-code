import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

const testData = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

const testData2 = `ka-co
ta-co
de-co
ta-ka
de-ta
ka-de`;

const data = realData;

console.log(`::: Part 1 :::`);

type Graph = Map<string, Set<string>>;

/**
 * Parse the input and create an adjacency list.
 * @param input - The network connections as a list of strings.
 */
function parseInput(input: string): Graph {
  const graph: Graph = new Map();

  input.split("\n").forEach((line) => {
    const [a, b] = line.split("-");
    if (!graph.has(a)) graph.set(a, new Set());
    if (!graph.has(b)) graph.set(b, new Set());
    graph.get(a)!.add(b);
    graph.get(b)!.add(a);
  });

  return graph;
}

/**
 * Find all triangles in the graph.
 * @param graph - The adjacency list representing the network.
 */
function findTriangles(graph: Graph): Set<string> {
  const triangles: Set<Set<string>> = new Set();

  for (const [node, neighbors] of graph.entries()) {
    for (const neighbor of neighbors) {
      for (const common of neighbors) {
        if (common !== neighbor && graph.get(neighbor)!.has(common)) {
          const triangle = new Set([node, neighbor, common]);
          triangles.add(triangle);
        }
      }
    }
  }

  // Filter out duplicate triangles by ensuring a consistent ordering.
  const uniqueTriangles = new Set(
    Array.from(triangles).map((triangle) => [...triangle].sort().join(","))
  );

  return uniqueTriangles;
}

/**
 * Count triangles containing at least one node that starts with "t".
 * @param triangles - The set of triangles.
 */
function countTrianglesWithT(triangles: Set<string>): number {
  return Array.from(triangles).filter((triangle) =>
    triangle.split(",").some((node) => node.startsWith("t"))
  ).length;
}

// Input string
const input = data;

// Main execution
const graph = parseInput(input);
const triangles = findTriangles(graph);
console.log({ triangles });
const count = countTrianglesWithT(triangles);

console.log(
  `Number of triangles containing a node starting with "t": ${count}`
);

console.log(`Part 1: ${{}}`);

console.log(`::: Part 2 :::`);

/**
 * Find all connected components in the graph.
 * @param graph - The adjacency list representing the network.
 */
function findConnectedComponents(graph: Graph): string[][] {
  const visited = new Set<string>();
  const components: string[][] = [];

  function dfs(node: string, component: string[]) {
    visited.add(node);
    component.push(node);
    for (const neighbor of graph.get(node) || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, component);
      }
    }
  }

  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      const component: string[] = [];
      dfs(node, component);
      components.push(component);
    }
  }

  return components;
}

/**
 * Prune a component to keep only fully connected nodes.
 * @param component - The nodes in the connected component.
 * @param graph - The original graph.
 */
function pruneFullyConnected(component: string[], graph: Graph): string[] {
  let nodes = component;

  while (true) {
    const toRemove = nodes.filter(
      (node) => graph.get(node)?.size !== nodes.length - 1
    );

    if (toRemove.length === 0) break;

    // Remove nodes that are not fully connected
    for (const node of toRemove) {
      nodes = nodes.filter((n) => n !== node);
      graph.delete(node);
      for (const neighbors of graph.values()) {
        neighbors.delete(node);
      }
    }
  }

  return nodes;
}

/**
 * Find the largest fully connected network in the graph.
 * @param graph - The adjacency list representing the network.
 */
function findLargestFullyConnectedNetwork(graph: Graph): string[] {
  const components = findConnectedComponents(graph);
  let largestFullyConnected: string[] = [];

  for (const component of components) {
    const pruned = pruneFullyConnected(component, new Map(graph));
    if (pruned.length > largestFullyConnected.length) {
      largestFullyConnected = pruned;
    }
  }

  return largestFullyConnected;
}

const largestNetwork = findLargestFullyConnectedNetwork(graph);

console.log(largestNetwork.sort().join(","));

// 520 was incorrect ...

console.log(`Part 2: ${largestNetwork.length}`);
