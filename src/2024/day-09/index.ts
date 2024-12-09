import * as utils from "../utils";

const realData: string = utils.readFile("day-09/data.txt"); // read

const testData = `2333133121414131402`;

console.log(`Part 1: ${null}`);

interface File {
  id: number;
  fileSize: number;
  gapSize: number;
  gapContents: Array<number>;
}

const identify = (str: string) => {
  const files: Array<File> = new Array(); // id => [length, gap]
  for (let i = 0, id = 0; i < str.length; i += 2, id++) {
    files.push({
      id,
      fileSize: +str[i],
      gapSize: +(str[i + 1] ?? 0),
      gapContents: [],
    });
  }
  return files;
};

// fill gaps backwards
const fillGapsByBlock = (files: Array<File>) => {
  for (let i = 0, j = files.length - 1; i < j; ) {
    if (files[i].gapContents.length === files[i].gapSize) {
      i++;
      continue;
    }

    if (files[j].fileSize === 0) {
      j--;
      continue;
    }

    // move one block from J to I
    files[i].gapContents.push(files[j].id);
    files[j].fileSize--;
  }
  return files;
};

const getChecksumForFileAndGap = (file: File, offset = 0) => {
  const arr = new Array(file.gapContents.length + file.fileSize)
    .fill(offset)
    .map((_, i) => {
      if (i < file.fileSize) return (i + offset) * file.id;
      return (i + offset) * file.gapContents[i - file.fileSize];
    });
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const calculateChecksum = (files: Array<File>) => {
  return files.reduce(
    (acc, file) => {
      acc.sum += getChecksumForFileAndGap(file, acc.pos);
      acc.pos += file.fileSize + file.gapSize;
      return acc;
    },
    { pos: 0, sum: 0 }
  ).sum;
};

type Gaps = Array<[number, number]>; // [index, size]

const logGaps = (files: Array<File>) => {
  return files.reduce(
    (acc, file) => {
      const index = acc.pos + file.fileSize;
      acc.gaps.push([index, file.gapSize]);
      acc.pos += file.fileSize + file.gapSize;
      return acc;
    },
    { pos: 0, gaps: [] } as { pos: number; gaps: Gaps }
  );
};

const fillGapsByFile = (files: Array<File>, gaps: Gaps) => {
  for (let j = files.length - 1; j > 0; j--) {
    for (let i = 0; i < gaps.length; i++) {}
  }
  return files;
};

const files = identify(realData);
const filled = fillGapsByBlock(files);
const checksum = calculateChecksum(filled);
console.log({ checksum });

console.log(`Part 2:`);

// can I use a linked list?

interface LinkedFile {
  id: number;
  // startIndex: number;
  fileSize: number;
  gapSize: number;
}
class Node {
  value: LinkedFile;
  prev: Node | null;
  next: Node | null;

  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoubleLinkedList {
  head: Node | null;
  tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value: LinkedFile) {
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  insertAfter(targetNode: Node, node: Node) {
    if (!targetNode) return; // Ensure targetNode exists
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node.prev) {
      node.prev.value.gapSize += node.value.fileSize + node.value.gapSize;
      node.prev.next = node.next;
    }
    if (node === this.head) this.head = node.next;
    if (node === this.tail) this.tail = node.prev;

    node.next = targetNode.next;
    node.prev = targetNode;

    if (targetNode.next) {
      targetNode.next.prev = node;
    } else {
      this.tail = node; // Update tail if necessary
    }
    targetNode.next = node;

    // move the gap of the new prev to the gap of this node
    node.value.gapSize = targetNode.value.gapSize - node.value.fileSize;

    // remove the gap from prev node
    targetNode.value.gapSize = 0;
  }

  printList() {
    let current = this.head;
    const values: Array<string> = [];
    while (current) {
      values.push(
        `${current.value.id} [FS: ${current.value.fileSize}, GS: ${current.value.gapSize}]`
      );
      current = current.next;
    }
    console.log(values.join(" <-> "));
  }
}

const buildList = (str: string) => {
  let list = new DoubleLinkedList();

  for (let i = 0, id = 0; i < str.length; i += 2, id++) {
    list.append({
      id,
      fileSize: +str[i],
      gapSize: +(str[i + 1] ?? 0),
    });
  }
  return list;
};

const list = buildList(realData);

// fill gaps backwards

let backPointer = list.tail;

while (backPointer) {
  let next;
  let frontPointer = list.head;
  while (frontPointer) {
    if (frontPointer.value.id === backPointer.value.id) {
      break;
    }
    if (frontPointer.value.gapSize >= backPointer!.value.fileSize) {
      next = backPointer.prev;
      list.insertAfter(frontPointer, backPointer as Node);
      break;
    }

    frontPointer = frontPointer.next;
  }

  backPointer = next ?? backPointer!.prev;
}

// now, convert list to checksum

let frontPointer = list.head;
let index = 0;
let sum = 0;
while (frontPointer) {
  const fileCheckSum = Array(frontPointer.value.fileSize)
    .fill(index)
    .map((offset, i) => offset + i)
    .reduce((acc, curr) => acc + curr * frontPointer!.value.id, 0);

  sum += fileCheckSum;
  index += frontPointer.value.fileSize + frontPointer.value.gapSize;
  frontPointer = frontPointer.next;
}

console.log(`Part 2: ${sum}`);
