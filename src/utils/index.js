const fs = require('fs');
const path = require('path');
// import path from 'path';

export const readFile = file => {
  const relPath = path.join(__dirname, file);
  return fs.readFileSync(relPath, 'utf8');
};
