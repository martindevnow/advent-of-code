import fs from 'fs';
import path from 'path';

export const readFile = file => {
  const relPath = path.join(__dirname, file);
  return fs.readFileSync(relPath, 'utf8');
};
