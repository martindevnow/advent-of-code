const fs = require("fs");
const path = require("path");

export const readFileAbsolute = (file) => {
  return fs.readFileSync(file, "utf8");
};

export const readFile = (file) => {
  const relPath = path.join(__dirname, file);
  return fs.readFileSync(relPath, "utf8");
};
