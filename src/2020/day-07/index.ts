import * as utils from "../utils";
const data = utils.readFile("day-07/data.txt");
const rules = data.split(/\r?\n/).map((ruleText) => {
  const [parentText, childrenText] = ruleText.split(" bags contain ");

  const children = childrenText
    .split(/\ bags?[.,]?\ ?/)
    .filter((entry) => !!entry.trim())
    .map((child) => {
      const [digit, ...rest] = child.split(" ");
      if (rest.join(" ") === "other") {
        return null;
      }
      return {
        type: rest.join(" ").trim(),
        quantity: +digit,
      };
    })
    .filter((item) => !!item);
  return {
    type: parentText,
    canContain: children,
  };
});

const bags: {
  [type: string]: Array<{ type: string; quantity: number }>;
} = rules.reduce((acc, { type, canContain }) => {
  return { ...acc, [type]: canContain };
}, {});

console.log(bags);

// const inverted: { [type: string]: string[] } = Object.entries(bags).reduce(
//   (acc, [parentBag, children]) => {
//     return children.reduce((acc2, childBag) => {
//       return {
//         ...acc2,
//         [childBag.type]: [...(acc2[childBag.type] || []), parentBag],
//       };
//     }, acc);
//   },
//   {}
// );

// console.log(inverted);

const visited: string[] = [];

const findLeaves = (
  type: string,
  tree: { [type: string]: string[] }
): string[] => {
  if (visited.includes(type)) {
    return [];
  }

  visited.push(type);

  if (!tree[type]) {
    return [type];
  }

  if (tree[type].length === 1) {
    return [type, ...findLeaves(tree[type][0], tree)];
  }

  return [
    type,
    ...tree[type]
      .map((node) => findLeaves(node, tree))
      .reduce((acc, curr) => acc.concat(curr), []),
  ];
};

const getQuantities = (
  type: string,
  tree: { [type: string]: Array<{ type: string; quantity: number }> },
  soFar = 0
) => {
  console.log(`RUN :: type: ${type}`);
  if (!tree[type] || tree[type].length === 0) {
    console.log("LEAF :: return 1");
    return 1;
  }

  if (tree[type].length === 1) {
    const { type: childType, quantity } = tree[type][0];
    console.log(
      `BRANCH :: 1 Node :: type: ${childType}, quantity: ${quantity}`
    );
    const childrenQuantity = quantity * getQuantities(childType, tree);
    console.log(`RETURN :: type: ${childType} has ${childrenQuantity}`);
    return childrenQuantity + 1;
  }

  console.log(
    `BRANCH :: Many Node :: type: ${type}... has ${tree[type].length} children`
  );

  return tree[type]
    .map(({ type: childType, quantity }) => {
      console.log(`  CHILD :: ${childType} is ${quantity}`);
      return getQuantities(childType, tree) * quantity;
    })
    .reduce((acc, curr) => curr + acc, 1);
};
// const leaves = findLeaves("shiny gold", inverted).filter(
//   (bag) => bag !== "shiny gold"
// );

// console.log(leaves.length);

const bagsInsideGold = getQuantities("shiny gold", bags);
console.log(bagsInsideGold);
