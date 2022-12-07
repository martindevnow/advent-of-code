import { WatchDirectoryFlags } from "typescript";
import * as utils from "../utils";

const data = utils
  .readFile("day-07/data.txt") // read input data
  .split("\n")
  .map((line) => line.split(" "));

type Command = {
  type: "command";
  name: "ls" | "cd";
  arg?: string; // 'e' or '../..' etc ls has no arg
};

type Directory = {
  type: "dir";
  name: string;
  contents: Array<Directory | File>;
  parent: Directory | null;
  size: number;
};

type File = {
  type: "file";
  size: number;
  name: string;
};

type IAction = Command | File | Directory;

const directoryFactory = (
  name: string,
  parent: Directory | null = null
): Directory => {
  return {
    type: "dir",
    name,
    contents: new Array<any>(),
    parent: parent ?? null,
    size: 0,
  };
};
const commandFactory = (arr: Array<string>): Command => {
  if (arr[1] === "cd") {
    return { type: "command", name: arr[1], arg: arr[2] };
  }
  return { type: "command", name: arr[1] as Command["name"] };
};
const fileFactory = (arr: Array<string>): File => {
  return { type: "file", size: +arr[0], name: arr[1] };
};

function isCommand(act: IAction): act is Command {
  return (act as Command).type === "command";
}
function isFile(act: IAction): act is File {
  return (act as File).type === "file";
}
function isDir(act: IAction): act is Directory {
  return (act as Directory).type === "dir";
}

// part 1
const actions = data.map((arr) => {
  if (arr[0] === "$") {
    return commandFactory(arr);
  }

  if (arr[0] === "dir") {
    return directoryFactory(arr[1]);
  }

  return fileFactory(arr);
});

console.log(actions);

let dirStructure: Directory | null = null;

let currentDirectory: Directory | null = null;
let lastCommand: Command | null = null;
for (let i = 0; i < actions.length; i++) {
  const currentAction = actions[i];
  if (i === 0) {
    currentDirectory = directoryFactory("/");
    dirStructure = currentDirectory;
    continue;
  }

  if (isFile(currentAction)) {
    // add file size to directory
    currentDirectory!.size += currentAction.size;
    currentDirectory?.contents.push(currentAction);
    // add to all parents too

    let parent = currentDirectory?.parent;
    while (true) {
      if (!parent) break;
      parent.size += currentAction.size;
      parent = parent.parent;
    }
    continue;
  }

  if (isCommand(currentAction)) {
    lastCommand = currentAction;

    if (currentAction.name === "ls") continue;

    if (currentAction.name === "cd") {
      if (currentAction.arg === "..") {
        // traverse back up
        currentDirectory = currentDirectory!.parent;
        continue;
      }

      // go deeper
      // check if this dir already exists...
      const childDir = currentDirectory?.contents.find(
        (dir) => dir.name === currentAction.arg
      );

      if (!childDir || !isDir(childDir)) {
        // create new dir
        const newDir = directoryFactory(
          currentAction.arg ?? "",
          currentDirectory
        );
        // add to contents to existing dir
        currentDirectory?.contents.push(newDir);

        // move into new dir
        currentDirectory = newDir;
        continue;
      }

      if (childDir) {
        // dir found, just update pointer to this new dir
        currentDirectory = childDir;
      }
    }
    continue;
  }
}

console.log(dirStructure?.size);
console.log(
  dirStructure?.contents.map((fileOrDir) => ({
    name: fileOrDir.name,
    size: fileOrDir.size,
  }))
);

// now, find all directories with size > 100_000

let runningSize = 0;
const findDirectories = (dir: Directory) => {
  if (dir.size < 100000) runningSize += dir.size;

  if (dir.contents.length === 0) return;

  dir.contents.forEach((fileOrDir) => {
    if (isDir(fileOrDir)) findDirectories(fileOrDir);
  });
};

findDirectories(dirStructure!);
console.log(runningSize);

// part 2
const desiredFreeSpace = 30000000;
const totalDiskSize = 70000000;

const currentFreeSpace = totalDiskSize - dirStructure!.size;
const spaceToFreeUp = desiredFreeSpace - currentFreeSpace;

console.log({
  totalDiskSize,
  desiredFreeSpace,
  currentFreeSpace,
  spaceToFreeUp,
});

let smallestDir: Directory = dirStructure as Directory;
const findSmallDir = (dir: Directory) => {
  if (dir.size > spaceToFreeUp && dir.size < smallestDir!.size)
    smallestDir = dir;

  if (dir.contents.length === 0) return;

  dir.contents.forEach((fileOrDir) => {
    if (isDir(fileOrDir)) findSmallDir(fileOrDir);
  });
};
findSmallDir(dirStructure!);
console.log(
  JSON.stringify({
    name: smallestDir.name,
    size: smallestDir.size,
  })
);
