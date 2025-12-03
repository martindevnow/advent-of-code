const fs = require("fs");
const path = require("path");

const [yearArg, dayArg] = process.argv.slice(2);

if (!yearArg || !dayArg) {
  console.error("Usage: npm run make-day <year> <day>");
  process.exit(1);
}

const year = `${yearArg}`;
const day = `${dayArg}`.padStart(2, "0");
const dayFolderName = `day-${day}`;
const yearDir = path.join(__dirname, "src", year);
const dayDir = path.join(yearDir, dayFolderName);

fs.mkdirSync(dayDir, { recursive: true });

const indexTemplate = `import * as utils from "../utils";

const realData: string = utils.readFileAbsolute(__dirname + "/data.txt");

/* const testData = \`\`; */

const data = realData;

console.log(\`::: Part 1 :::\`);

console.log(\`Part 1: ${0}\`);

console.log(\`::: Part 2 :::\`);

console.log(\`Part 2: ${0}\`);
`;

const challengeTemplate = `--- Day ${Number(day)}: ??? ---
`;

[
  { name: "challenge.md", contents: challengeTemplate },
  { name: "index.ts", contents: indexTemplate },
  { name: "data.txt", contents: "" },
].forEach(({ name, contents }) => {
  const filePath = path.join(dayDir, name);
  if (fs.existsSync(filePath)) {
    console.log(
      `Skipping ${path.relative(__dirname, filePath)} (already exists)`
    );
    return;
  }
  fs.writeFileSync(filePath, contents, "utf8");
  console.log(`Created ${path.relative(__dirname, filePath)}`);
});
