console.log(process.argv);

const [_, __, day] = process.argv;
const basePath = __dirname + `/day-${day}/index.ts`;

require(basePath);
